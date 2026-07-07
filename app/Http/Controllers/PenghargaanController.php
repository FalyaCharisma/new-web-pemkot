<?php

namespace App\Http\Controllers;
use App\Models\Penghargaan;
use App\Models\Berita;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use DataTables;
use Auth;

class PenghargaanController extends Controller
{
    public function penghargaan(Request $request)
    {
        $query = Berita::query()
            ->where([['status_enabled', 1], ['id_kategori', 15]]);

        // SEARCH
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $search = $request->input('search');

                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        // FILTER TAHUN
        if ($request->filled('year')) {
            $query->whereYear('tanggal', $request->year);
        }

        $penghargaan = $query->latest('tanggal')
            ->paginate(9)
            ->withQueryString();

        $years = Berita::query()
            ->where('status_enabled', 1)
            ->where('id_kategori', 15)
            ->selectRaw('YEAR(tanggal) as year')
            ->whereNotNull('tanggal')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year');

        return Inertia::render('penghargaan/index', [
            'penghargaan' => $penghargaan,
            'years' => $years,
            'filters' => [
                'year' => $request->year,
                'search' => $request->search,
            ],
        ]);
    }

    public function show($slug)
    {
        $penghargaan = Penghargaan::where('slug', $slug)
            ->where('status_enabled', 1)
            ->firstOrFail();

        $penghargaan->increment('count_view');
        $penghargaan->refresh();

        $penghargaanLainnya = Penghargaan::where('status_enabled', 1)
            ->where('id', '!=', $penghargaan->id)
            ->latest('tanggal')
            ->limit(5)
            ->get();

        return Inertia::render('penghargaan/detail', [
            'penghargaan' => $penghargaan,
            'penghargaanLainnya' => $penghargaanLainnya,
        ]);
    }

    
    // ------------------------------ ADMIN ------------------------------------

    // DATATBLE PENGHARGAAN
    public function list_penghargaan(Request $request)
    {
        $titlepage = 'List Penghargaan';

        if ($request->ajax()) {
            $penghargaan = Penghargaan::where('status_enabled', 1)->orderBy('created_at', 'desc')->get();

            return Datatables::of($penghargaan)
                ->addIndexColumn()
                ->addColumn('foto', function($row){
                    $foto = '<img src="'. url('storage/penghargaan/' . $row->foto) .'" width="200">';
                    return $foto;
                })->addColumn('tanggal', function($row){
                    $tanggal = date('d-m-Y', strtotime($row['tanggal']));
                    return $tanggal;
                })->addColumn('deskripsi', function($row){
                    $deskripsi =   substr(strip_tags($row['deskripsi']), 0, 200);
                    return $deskripsi;
                })->addColumn('action', function($row){
                    $action = '<button type="button" class="btn btn-warning" onclick="location.href=`/form-penghargaan/'. $row->id .'`" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-pen"></i></button>
                                    <button type="button" class="btn btn-danger" onclick="deleteConfirmation('. $row->id . ')" title="Delete" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-trash"></i></button>';
                    return $action;
                })->rawColumns(['foto', 'tanggal', 'deskripsi', 'action'])
                ->make(true);
        }

        return view ('admin.penghargaan.list-penghargaan', compact('titlepage'));
    }

    // FORM PENGHARGAAN
    public function form_penghargaan($id)
    {
        if ($id == 'add'){
            $titlepage = 'Tambah Penghargaan';
            $penghargaan = [];
        }else{
            $titlepage = 'Edit Penghargaan';
            $penghargaan = Penghargaan::where('id', $id)->first();
        }

        return view ('admin.penghargaan.form-penghargaan', compact('titlepage','penghargaan'));
    }

    public function update_penghargaan(Request $request)
    {
        $request->validate([
            'foto' => 'image|mimes:jpeg,png,jpg,webp,svg|max:2024'
        ],
        [
            'foto.image'=>trans('File yang di upload harus gambar !'),
            'foto.mimes'=>trans('Tipe file harus .jpeg .png .jpg .webp .svg !'),
            'foto.max'=>trans('Ukuran file maksimal 2mb !')
        ]);

        if (isset($request->foto)){
            $file = $request->foto;
            $fileName = 'penghargaan'.'-'.time().'.'.$file->extension();
            $file->move(storage_path('app/public/penghargaan'), $fileName);
        }else{
            $fileName = $request->fotolama;
        }

        if (isset($request->id)){
            Penghargaan::where(['id'=>$request->id])->update([
                'judul' => $request->judul,
                'tanggal' => $request->tanggal,
                'deskripsi' => $request->deskripsi,
                'foto' => $fileName,
                'slug' => Str::slug($request->judul),
                'author' => Auth::user()->id,
                'updated_at' => Carbon::now('Asia/Jakarta')
            ]);

            toastr()->success('Data Penghargaan Berhasil Diubah.');

        }else{
            Penghargaan::insert([
                'judul' => $request->judul,
                'tanggal' => $request->tanggal,
                'deskripsi' => $request->deskripsi,
                'foto' => $fileName,
                'slug' => Str::slug($request->judul),
                'author' => Auth::user()->id,
                'created_at' => Carbon::now('Asia/Jakarta')
            ]);

            toastr()->success('Data Penghargaan Berhasil Ditambahkan.');
        }

        return redirect('/list-penghargaan');
    }

    public function hapus_penghargaan($id)
    {
        $aktif = Penghargaan::where(['id'=>$id])->update([
            'status_enabled' => 0,
            'updated_at' => Carbon::now('Asia/Jakarta')
        ]);

        if ($aktif == 1){
            $success = true;
            $message = "Data Berhasil Dihapus";
        }else{
            $success = false;
            $message = "Data Tidak Ditemukan";
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }
}
