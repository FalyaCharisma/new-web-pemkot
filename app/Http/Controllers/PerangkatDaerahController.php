<?php

namespace App\Http\Controllers;
use App\Models\OPD;
use App\Models\KategoriOPD;
use App\Models\Jabatan;
use App\Models\DaftarPimpinan;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use DataTables;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class PerangkatDaerahController extends Controller
{
    public function index(string $slug)
    {
        $kategori = KategoriOPD::with([
            'opd' => function ($query) {
                $query->where('status_enabled', 1);
            },
            'opd.pimpinan.jabatan',
        ])
            ->where('slug', $slug)
            ->firstOrFail();

        $kategoriList = KategoriOPD::select('id', 'nama', 'slug')->where('status_enabled', 1)->get();

        dd($kategoriList);

        return Inertia::render('perangkat-daerah/index', [
            'kategori' => $kategori,
            'kategoriList' => $kategoriList,
        ]);
    }

    // ------------------------------ ADMINPAGE ---------------------------------
    // Adminpage - List Jabatan
    public function list_jabatan(Request $request)
    {
        try {
            if ($request->ajax()) {
                $jabatan = Jabatan::where('status_enabled', 1)->orderBy('created_at', 'desc')->get();
                return Datatables::of($jabatan)
                    ->addIndexColumn()
                    ->addColumn('jabatan', function ($row) {
                        $jabatan = $row['nama_jabatan'];
                        return $jabatan;
                    })
                    ->addColumn('action', function ($row) {
                        $actionBtn =
                            '<button  type="button" class="btn btn-primary" onclick="editjabatan(' .
                            $row->id .
                            ')" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-edit"></i></button>
                                    <button type="button" class="btn btn-danger" onclick="deleteConfirmation(' .
                            $row->id .
                            ')" title="Hapus" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-trash"></i></button>';
                        return $actionBtn;
                    })
                    ->rawColumns(['action', 'jabatan'])
                    ->make(true);
            }
        } catch (\Exception $exception) {
            $jabatan = [];
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
        }

        return view('admin.perangkat-daerah.list-jabatan');
    }

    // Adminpage - Update Jabatan
    public function update_jabatan(Request $request)
    {
        DB::beginTransaction();

        try {
            if (isset($request->id)) {
                Jabatan::where(['id' => $request->id])->update([
                    'nama_jabatan' => $request->nama_jabatan,
                    'updated_at' => Carbon::now('Asia/Jakarta'),
                ]);

                toastr()->success('Jabatan Berhasil Diperbarui.');
            } else {
                Jabatan::insert([
                    'nama_jabatan' => $request->nama_jabatan,
                    'created_at' => Carbon::now('Asia/Jakarta'),
                ]);

                toastr()->success('Jabatan Berhasil Ditambahkan.');
            }

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect('/list-jabatan');
    }

    // Adminpage - Value Jabatan
    public function value_jabatan($id)
    {
        $jabatan = Jabatan::where('id', $id)->first();
        return response()->json($jabatan);
    }

    // Adminpage - Delete Jabatan
    public function hapus_jabatan($id)
    {
        $jabatan = DaftarPimpinan::where('id_jabatan', $id)->get();

        if (count($jabatan) == 0) {
            $aktif = Jabatan::where(['id' => $id])->update([
                'status_enabled' => 0,
                'updated_at' => Carbon::now('Asia/Jakarta'),
            ]);

            //Check data deleted or not
            if ($aktif == 1) {
                $success = true;
                $message = 'Data Berhasil Dihapus';
            } else {
                $success = false;
                $message = 'Data Tidak Ditemukan!';
            }
        } else {
            $success = false;
            $message = 'Data Tidak Bisa Dihapus Karena Terhubung Dengan Data Lain!';
        }

        //Return response
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }

    // Adminpage - List Kategori OPD
    public function list_kategori_opd(Request $request)
    {
        try {
            if ($request->ajax()) {
                $kategori_opd = KategoriOPD::where('status_enabled', 1)->orderBy('created_at', 'desc')->get();
                return Datatables::of($kategori_opd)
                    ->addIndexColumn()
                    ->addColumn('kategori_opd', function ($row) {
                        $kategori_opd = $row['nama'];
                        return $kategori_opd;
                    })
                    ->addColumn('action', function ($row) {
                        $actionBtn =
                            '<button  type="button" class="btn btn-primary" onclick="edit(' .
                            $row->id .
                            ')" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-edit"></i></button>
                                    <button type="button" class="btn btn-danger" onclick="deleteConfirmation(' .
                            $row->id .
                            ')" title="Hapus" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-trash"></i></button>';
                        return $actionBtn;
                    })
                    ->rawColumns(['action', 'kategori_opd'])
                    ->make(true);
            }
        } catch (\Exception $exception) {
            $kategori_opd = [];
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
        }

        return view('admin.perangkat-daerah.list-kategori-opd');
    }

    // Adminpage - Update Kategori OPD
    public function update_kategori_opd(Request $request)
    {
        DB::beginTransaction();

        try {
            if (isset($request->id)) {
                KategoriOPD::where(['id' => $request->id])->update([
                    'nama' => $request->nama,
                    'updated_at' => Carbon::now('Asia/Jakarta'),
                ]);

                toastr()->success('Kategori OPD Berhasil Diperbarui.');
            } else {
                KategoriOPD::insert([
                    'nama' => $request->nama,
                    'created_at' => Carbon::now('Asia/Jakarta'),
                ]);

                toastr()->success('Kategori OPD Berhasil Ditambahkan.');
            }

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect('/list-kategori-opd');
    }

    // Adminpage - Value Kategori OPD
    public function value_kategori_opd($id)
    {
        $kategori_opd = KategoriOPD::where('id', $id)->first();
        return response()->json($kategori_opd);
    }

    // Adminpage - Delete Kategori OPD
    public function hapus_kategori_opd($id)
    {
        $kategori_opd = OPD::where('kategori', $id)->get();

        if (count($kategori_opd) == 0) {
            $aktif = KategoriOPD::where(['id' => $id])->update([
                'status_enabled' => 0,
                'updated_at' => Carbon::now('Asia/Jakarta'),
            ]);

            //Check data deleted or not
            if ($aktif == 1) {
                $success = true;
                $message = 'Data Berhasil Dihapus';
            } else {
                $success = false;
                $message = 'Data Tidak Ditemukan!';
            }
        } else {
            $success = false;
            $message = 'Data Tidak Bisa Dihapus Karena Terhubung Dengan Data Lain!';
        }

        //Return response
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }

    // Adminpage - List OPD
    public function list_opd(Request $request)
    {
        if ($request->ajax()) {
            $opd = OPD::where('status_enabled', 1)->get();
            return Datatables::of($opd)
                ->addIndexColumn()
                ->addColumn('nama', function ($row) {
                    $nama = substr($row['nama'], 0, 200) . '...';
                    return $nama;
                })
                ->addColumn('kategori', function ($row) {
                    $kategori = $row->kategori_opd->nama;
                    return $kategori;
                })
                ->addColumn('website', function ($row) {
                    $website = $row['website'];
                    return $website;
                })
                ->addColumn('action', function ($row) {
                    $action =
                        '<button type="button" class="btn btn-warning" onclick="location.href=`/form-opd/' .
                        $row->id .
                        '`" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-pen"></i></button>
                                <button type="button" class="btn btn-danger" onclick="deleteConfirmation(' .
                        $row->id .
                        ')" title="Delete" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-trash"></i></button>';
                    return $action;
                })
                ->rawColumns(['nama', 'kategori', 'logo', 'website', 'action'])
                ->make(true);
        }
        return view('admin.perangkat-daerah.list-opd');
    }

    // Halaman Form Tambah/Edit OPD
    public function form_opd($id)
    {
        $kategori = KategoriOPD::where('status_enabled', 1)->get();

        if ($id == 'new') {
            $titlepage = 'Tambah OPD';
            $opd = null;
            $pimpinan = null;
        } else {
            $titlepage = 'Edit OPD';

            $opd = OPD::with('pimpinan')->where('id', $id)->firstOrFail();

            $pimpinan = $opd->pimpinan;
        }

        return view('admin.perangkat-daerah.form-opd', compact('titlepage', 'opd', 'kategori', 'pimpinan'));
    }

    // Update opd
    public function update_opd(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:200',
            'kategori' => 'required',
            'alamat' => 'required',
            'website' => 'nullable|string|max:200',
            'detail_opd' => 'nullable',
            'nama_pimpinan' => 'required|string|max:255',
            'nip' => 'nullable|string|max:50',
            'pangkat' => 'nullable|string|max:100',
            'gol_ruang' => 'nullable|string|max:50',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        DB::beginTransaction();

        try {
            if ($request->filled('id')) {
                $opd = OPD::findOrFail($request->id);

                $opd->update([
                    'nama' => $request->nama,
                    'kategori' => $request->kategori,
                    'website' => $request->website,
                    'alamat' => $request->alamat,
                    'detail_opd' => $request->detail_opd,
                ]);
            } else {
                $opd = OPD::create([
                    'nama' => $request->nama,
                    'kategori' => $request->kategori,
                    'website' => $request->website,
                    'alamat' => $request->alamat,
                    'detail_opd' => $request->detail_opd,
                ]);
            }

            $fotoName = $request->fotolama;

            if ($request->hasFile('foto')) {
                $file = $request->file('foto');

                $fotoName = time() . '_' . $file->getClientOriginalName();

                $file->storeAs('pimpinan', $fotoName, 'public');
            }

            DaftarPimpinan::updateOrCreate(
                [
                    'id_opd' => $opd->id,
                ],
                [
                    'nama_pimpinan' => $request->nama_pimpinan,
                    'nip' => $request->nip,
                    'pangkat' => $request->pangkat,
                    'gol_ruang' => $request->gol_ruang,
                    'foto' => $fotoName,
                    'id_jabatan' => 5,
                ],
            );

            DB::commit();

            return redirect('/list-opd')->with('success', 'Data OPD berhasil disimpan.');
        } catch (\Throwable $exception) {
            DB::rollBack();

            dd($exception->getMessage());
        }
    }

    // Hapus OPD
    public function hapus_opd($id)
    {
        $aktif = OPD::where(['id' => $id])->update([
            'status_enabled' => 0,
            'updated_at' => Carbon::now('Asia/Jakarta'),
        ]);

        //Check data deleted or not
        if ($aktif == 1) {
            $success = true;
            $message = 'Data Berhasil Dihapus';
        } else {
            $success = false;
            $message = 'Data Tidak Ditemukan!';
        }

        // //Return response
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }
}
