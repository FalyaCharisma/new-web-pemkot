<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Models\BudayaWarisan;
use App\Models\KategoriBerita;
use DataTables;

class BudayaWarisanController extends Controller
{
    // -------------------------------------------- ADMIN -------------------------------------

    /**
     * List Budaya & Warisan
     */
    public function list_budaya_warisan(Request $request)
    {
        $titlepage = 'Budaya & Warisan';

        try {

            if ($request->ajax()) {

                $budaya = BudayaWarisan::with('kategori')
                    ->whereNull('deleted_at')
                    ->orderBy('urutan', 'asc')
                    ->orderBy('id', 'desc')
                    ->get();

                return Datatables::of($budaya)

                    ->addIndexColumn()

                    ->addColumn('gambar', function ($row) {

                        if (!empty($row->gambar)) {

                            return '<img src="' .
                                url('storage/' . $row->gambar) .
                                '" width="150"
                                class="img-thumbnail">';

                        }

                        return '<span class="text-muted">
                                    Tidak ada gambar
                                </span>';
                    })

                    ->addColumn('kategori', function ($row) {

                        if ($row->kategori) {
                            return $row->kategori->nama_kategori;
                        }

                        return '-';
                    })

                    ->addColumn('status', function ($row) {

                        if ($row->status == 1) {

                            return '<span class="badge bg-success">
                                        Aktif
                                    </span>';

                        }

                        return '<span class="badge bg-danger">
                                    Nonaktif
                                </span>';
                    })

                    ->addColumn('action', function ($row) {

                        $actionBtn = '

                            <button type="button"
                                class="btn btn-warning"
                                onclick="editBudayaWarisan(' . $row->id . ')"
                                title="Edit"
                                style="margin-right:5px; margin-bottom:10px;">

                                <i class="fas fa-edit"></i>

                            </button>

                            <button type="button"
                                class="btn btn-danger"
                                onclick="deleteBudayaWarisanConfirmation(' . $row->id . ')"
                                title="Hapus"
                                style="margin-right:5px; margin-bottom:10px;">

                                <i class="fas fa-trash"></i>

                            </button>

                        ';

                        return $actionBtn;
                    })

                    ->rawColumns([
                        'gambar',
                        'kategori',
                        'status',
                        'action'
                    ])

                    ->make(true);
            }

            toastr()->success('Konten Berhasil Dimuat');

        } catch (\Exception $e) {

            $titlepage = [];

            toastr()->error(
                'Konten Gagal Dimuat. Hubungi Programmer!!'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Data kategori untuk modal
        |--------------------------------------------------------------------------
        */

        $kategori = KategoriBerita::orderBy('nama_kategori', 'asc')->get();

        return view('admin.budaya-warisan.index', compact('titlepage', 'kategori'));
    }


    /**
     * Mengambil data untuk Edit
     */
    public function value_budaya_warisan($id)
    {
        try {

            $data = BudayaWarisan::with('kategori')
                ->find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data Tidak Ditemukan!'
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Data Gagal Dimuat!'
            ]);
        }
    }


    /**
     * Tambah / Update Budaya & Warisan
     */
    public function update_budaya_warisan(Request $request)
    {
        $request->validate(
            [
                'id' => 'nullable|integer',
                'kategori_id' => 'nullable|exists:kategori_berita,id',
                'tag' => 'nullable|string|max:100',
                'judul' => 'required|string|max:150',
                'deskripsi' => 'nullable|string',
                'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:8024',
                'urutan' => 'nullable|integer|min:0',
                'status' => 'required|in:0,1',
            ],
            [
                'judul.required' =>
                    'Judul wajib diisi.',

                'judul.max' =>
                    'Judul maksimal 150 karakter.',

                'kategori_id.exists' =>
                    'Kategori tidak valid.',

                'gambar.image' =>
                    'File yang diupload harus berupa gambar.',

                'gambar.mimes' =>
                    'Tipe file harus .jpeg .png .jpg atau .webp.',

                'gambar.max' =>
                    'Ukuran file maksimal 8MB.',
            ]
        );

        DB::beginTransaction();

        try {

            /*
            |--------------------------------------------------------------------------
            | UPDATE
            |--------------------------------------------------------------------------
            */

            if ($request->filled('id')) {

                $data = BudayaWarisan::find($request->id);

                if (!$data) {

                    DB::rollback();

                    toastr()->error(
                        'Data Tidak Ditemukan!'
                    );

                    return redirect()->back();
                }

            } else {

                /*
                |--------------------------------------------------------------------------
                | INSERT
                |--------------------------------------------------------------------------
                */

                $data = new BudayaWarisan();

                $data->created_at =
                    Carbon::now('Asia/Jakarta');
            }


            /*
            |--------------------------------------------------------------------------
            | Data
            |--------------------------------------------------------------------------
            */

            $data->kategori_id =
                $request->kategori_id;

            $data->tag =
                $request->tag;

            $data->judul =
                $request->judul;

            $data->deskripsi =
                $request->deskripsi;

            $data->urutan =
                $request->urutan ?? 0;

            $data->status =
                $request->status;


            /*
            |--------------------------------------------------------------------------
            | Upload Gambar
            |--------------------------------------------------------------------------
            */

            if ($request->hasFile('gambar')) {

                /*
                | Hapus gambar lama ketika edit
                */

                if (!empty($data->gambar)) {

                    Storage::disk('public')
                        ->delete($data->gambar);
                }


                $file =
                    $request->file('gambar');

                $fileName =
                    'budaya-warisan-' .
                    time() .
                    '-' .
                    uniqid() .
                    '.' .
                    $file->extension();


                /*
                | Pastikan folder tersedia
                */

                $folder =
                    storage_path(
                        'app/public/budaya-warisan'
                    );

                if (!file_exists($folder)) {

                    mkdir(
                        $folder,
                        0755,
                        true
                    );
                }


                $file->move(
                    $folder,
                    $fileName
                );


                /*
                | Simpan path ke database
                */

                $data->gambar =
                    'budaya-warisan/' .
                    $fileName;
            }


            $data->updated_at =
                Carbon::now('Asia/Jakarta');


            $data->save();


            DB::commit();


            /*
            |--------------------------------------------------------------------------
            | Success
            |--------------------------------------------------------------------------
            */

            if ($request->filled('id')) {

                toastr()->success(
                    'Budaya & Warisan Berhasil Diperbarui.'
                );

            } else {

                toastr()->success(
                    'Budaya & Warisan Berhasil Ditambahkan.'
                );
            }

        } catch (\Exception $e) {

            DB::rollback();

            toastr()->error(
                'Terdapat kesalahan dalam memproses data. Hubungi Programmer!!'
            );
        }

        return redirect()->route(
            'list_budaya_warisan'
        );
    }


    /**
     * Hapus Budaya & Warisan
     */
    public function hapus_budaya_warisan($id)
    {
        try {

            $data =
                BudayaWarisan::find($id);


            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' =>
                        'Data Tidak Ditemukan!'
                ]);
            }


            /*
            |--------------------------------------------------------------------------
            | Hapus gambar
            |--------------------------------------------------------------------------
            */

            if (!empty($data->gambar)) {

                Storage::disk('public')
                    ->delete($data->gambar);
            }


            /*
            |--------------------------------------------------------------------------
            | Soft Delete
            |--------------------------------------------------------------------------
            */

            $data->delete();


            return response()->json([
                'success' => true,
                'message' =>
                    'Data Berhasil Dihapus'
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' =>
                    'Data Gagal Dihapus'
            ]);
        }
    }
}