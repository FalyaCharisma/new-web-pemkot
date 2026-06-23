<?php

namespace App\Http\Controllers;

use App\Models\Dokumen;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use DataTables;
use Carbon\Carbon;

class DokumenController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $tahun = $request->tahun;
        $sort = $request->sort ?? 'latest';

        $query = Dokumen::query()->where('status_published', 1)->where('status_enabled', 1);

        $query->when($search, function ($q) use ($search) {
            $q->where('judul', 'like', "%{$search}%");
        });

        $query->when($tahun, function ($q) use ($tahun) {
            $q->whereYear('tanggal', $tahun);
        });


        if ($sort == 'oldest') {
            $query->oldest('tanggal');
        } else {
            $query->latest('tanggal');
        }

        $dokumen = $query->paginate(12)->withQueryString();

        $totalDokumen = Dokumen::query()->where('status_published', 1)->where('status_enabled', 1)->count();

        $rentang = Dokumen::query()
            ->where('status_published', 1)
            ->where('status_enabled', 1)
            ->selectRaw('MIN(YEAR(tanggal)) as awal')
            ->selectRaw('MAX(YEAR(tanggal)) as akhir')
            ->first();

        $tahunList = Dokumen::query()
            ->where('status_published', 1)
            ->where('status_enabled', 1)
            ->selectRaw('YEAR(tanggal) as tahun')
            ->distinct()
            ->orderByDesc('tahun')
            ->pluck('tahun');

        return Inertia::render('dokumen/index', [
            'dokumen' => $dokumen,
            'totalDokumen' => $totalDokumen,
            'rentang' => $rentang,
            'tahunList' => $tahunList,
            'filters' => [
                'search' => $search,
                'tahun' => $tahun,
                'sort' => $sort,
            ],
        ]);
    }


    // ------------------------------ ADMINPAGE -------------------------------------
    public function list_dokumen(Request $request)
    {
        $titlepage = 'List Dokumen';

        if ($request->ajax()) {
            $dokumen = Dokumen::where('status_enabled', 1)->orderBy('tanggal', 'desc')->get();
            return Datatables::of($dokumen)
                ->addIndexColumn()
                ->addColumn('judul', function($row){
                    $judul = substr($row['judul'], 0, 300);
                    return $judul;
                // })->addColumn('deskripsi', function($row){
                //     $deskripsi = substr(strip_tags($row['deskripsi']), 0, 200);
                //     return $deskripsi;
                // })->addColumn('gambar', function($row){
                //     $gambar = '<img src="'. url('storage/pengumuman/' . $row->gambar) .'" width="200">';
                //     return $gambar;
                })->addColumn('tanggal', function($row){
                    $tanggal = date('d-m-Y', strtotime($row['tanggal']));
                    return $tanggal;
                })->addColumn('status', function($row){
                    if ($row->status_published == 1) {
                        $status = '<button type="button" class="btn btn-success" onclick="location.href=`/update-status-dokumen/1/'.$row->id.'`" style="margin-right:5px; margin-bottom:5px;">
                                        Published
                                   </button>';
                    } else {
                        $status = '<button type="button" class="btn btn-warning" onclick="location.href=`/update-status-dokumen/0/'.$row->id.'`" style="margin-right:5px; margin-bottom:10px;">
                                        Draft
                                   </button>';
                    }
                    return $status;
                })->addColumn('action', function($row){
                    $actionBtn = '<button  type="button" class="btn btn-primary" onclick="location.href=`/form-dokumen/' . $row->id .'`" title="Edit" style="margin-right:5px; margin-bottom:10px;"><i class="fas fa-edit"></i></button>
                                        <button type="button" class="btn btn-danger" onclick="deletedokumenConfirmation('. $row->id . ')" title="Hapus" style="margin-right:5px; margin-bottom:10px;"><i class="fas fa-trash"></i></button>';
                    return $actionBtn;
                })->rawColumns(['judul','tanggal', 'action', 'status'])
                ->make(true);
        }

        return view ('admin.dokumen.list-dokumen', compact('titlepage'));
    }

    public function form_dokumen($id)
    {
        if ($id == 'add'){
            $titlepage = 'Tambah Dokumen';
            $dokumen = [];
        }else{
            $titlepage = 'Edit Dokumen';
            $dokumen = Dokumen::where('id', $id)->first();
        }

        return view ('admin.dokumen.form-dokumen', compact('titlepage', 'dokumen'));
    }

    public function update_dokumen(Request $request)
    {
        $request->validate([
            'file' => 'mimes:zip,rar,doc,docx,pdf,ppt,pptx,xls,xlsx|max:5120'
        ], [
            'file.required' => trans('File tidak boleh kosong!'),
            'file.mimes'    => trans('Tipe file harus zip, rar, doc, docx, pdf, ppt, pptx, xls, atau xlsx!'),
            'file.max'      => trans('Ukuran file maksimal 5MB!')
        ]);        
        

        if (isset($request->file)){
            $file = $request->file;
            $fileName = $request->judul.'.'.$file->extension();
            $file->move(storage_path('app/public/dokumen'), $fileName);
        }else{
            $fileName = $request->filelama;
        }

        if (isset($request->id)){
            Dokumen::where(['id' => $request->id])->update([
                'judul' => $request->judul,
                'tanggal' => $request->tanggal,
                'dokumen' => $fileName,
                'status_published' => $request->status,
                'updated_at' => Carbon::now('Asia/Jakarta')
            ]);

            toastr()->success('Pengumuman Berhasil Diubah.');

        }else{
            Dokumen::insert([
                'judul' => $request->judul,
                'tanggal' => $request->tanggal,
                'dokumen' => $fileName,
                'status_published' => $request->status,
                'created_at' => Carbon::now('Asia/Jakarta')
            ]);

            if ($request->status == 1){
                toastr()->success('Pengumuman Berhasil Dipublish.');
            }else{
                toastr()->success('Pengumuman Berhasil Ditambahkan Sebagai Draft.');
            }
        }

        return redirect('/list-dokumen');
    }

    public function hapus_dokumen($id)
    {
        $aktif = Dokumen::where(['id'=>$id])->update([
            'status_enabled' => 0,
            'status_published' => 0,
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

    public function update_status_dokumen($status, $id)
    {   
        if ($status == 1){
            Dokumen::where(['id' => $id])->update([
                'status_published' => 0,
            ]);

            toastr()->warning('Dokumen Diturunkan Menjadi Draft.');
        }else{
            Dokumen::where(['id' => $id])->update([
                'status_published' => 1,
            ]);

            toastr()->success('Dokumen Berhasil Dipublish.');
        }

        return redirect('/list-dokumen');
    }
}
