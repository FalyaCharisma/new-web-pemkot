<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Models\SejarahKota;
use App\Models\TentangKota;
use App\Models\DaftarPimpinan;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\Jabatan;
use App\Models\OPD;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use DataTables;
use Carbon\Carbon;

class TentangKediriController extends Controller
{
    public function tentangKediri(string $slug = 'sekilas')
    {
        $menuList = [['nama' => 'Sekilas Kediri', 'slug' => 'sekilas'], ['nama' => 'Visi & Misi', 'slug' => 'visi-misi'], ['nama' => 'Lambang Daerah', 'slug' => 'lambang-daerah'], ['nama' => 'Sejarah Kediri', 'slug' => 'sejarah-kediri'], ['nama' => 'Profil Pimpinan', 'slug' => 'profil-pimpinan']];

        $kategori = collect($menuList)->firstWhere('slug', $slug);

        abort_if(!$kategori, 404);

        $sejarah = SejarahKota::where('status_enabled', 1)->orderBy('tahun')->get()->map(
            fn($item) => [
                'id' => $item->id,
                'tahun' => $item->tahun,
                'judul' => $item->judul,
                'deskripsi' => strip_tags($item->keterangan),
            ],
        );

        $visi = TentangKota::where([['status_enabled', 1], ['title', 'visi']])->first();

        $misi = TentangKota::where([['status_enabled', 1], ['title', 'misi']])->get();

        $lambang = TentangKota::where([['status_enabled', 1], ['title', 'lambang']])->first();

        $sekilas = TentangKota::where([['status_enabled', 1], ['title', 'sekilas-kota']])->first();

        if ($sekilas) {
            $sekilas->gambar = asset($sekilas->gambar ? 'storage/sekilas/' . $sekilas->gambar : 'assets/images/noimage.png');
        }

        /*
    |--------------------------------------------------------------------------
    | Profil Pimpinan
    |--------------------------------------------------------------------------
    */
        $pimpinan = DaftarPimpinan::with(['jabatan:id,nama_jabatan'])
            ->where('status_enabled', 1)
            ->whereIn('id_jabatan', [1, 2])
            ->orderBy('id_jabatan')
            ->get()
            ->map(
                fn($item) => [
                    'id' => $item->id,
                    'nama_pimpinan' => $item->nama_pimpinan,
                    'foto' => $item->foto,
                    'tempat_lahir' => $item->tempat_lahir,
                    'tanggal_lahir' => $item->tanggal_lahir ? \Carbon\Carbon::parse($item->tanggal_lahir)->format('Y-m-d') : null,
                    'agama' => $item->agama,
                    'jenis_kelamin' => $item->jenis_kelamin,
                    'nip' => $item->nip,
                    'pangkat' => $item->pangkat,
                    'gol_ruang' => $item->gol_ruang,
                    'deskripsi' => $item->deskripsi,
                    'jabatan' => $item->jabatan,
                ],
            );

        $kecamatan = Kecamatan::withCount('kelurahan')->orderBy('nm_kecamatan')->get()->map(
            fn($item) => [
                'id' => $item->id,
                'nama' => $item->nm_kecamatan,
                'jumlah_kelurahan' => $item->kelurahan_count,
            ],
        );

        $tentang = TentangKota::whereIn('title', ['luas-wilayah', 'laki-laki', 'perempuan'])->pluck('deskripsi', 'title');

        $geografis = TentangKota::where([['title', 'geografis'], ['status_enabled', 1]])
            ->get()
            ->map(
                fn($item) => [
                    'id' => $item->id,
                    'deskripsi' => $item->deskripsi,
                ],
            );

        return Inertia::render('tentang-kediri/index', [
            'kategori' => $kategori,
            'kategoriList' => $menuList,
            'kecamatan' => $kecamatan,
            'geografis' => $geografis,
            'sekilas' => $sekilas,
            'visi' => $visi,
            'misi' => $misi,
            'lambang' => $lambang,
            'sejarah' => $sejarah,
            'pimpinan' => $pimpinan,
            'statistik' => [
                'kecamatan' => $kecamatan->count(),
                'kelurahan' => Kelurahan::count(),
                'luas_wilayah' => $tentang['luas-wilayah'] ?? '',
                'laki_laki' => $tentang['laki-laki'] ?? '',
                'perempuan' => $tentang['perempuan'] ?? '',
            ],
        ]);
    }

    //==================================== ADMIN =======================================
    // Adminpage - Visi Misi
    public function form_visimisi()
    {
        $titlepage = 'Visi dan Misi';
        $visi = '';
        $misi = [];
        try {
            $data = TentangKota::where('status_enabled', 1)->get();

            foreach ($data as $data) {
                if ($data->title == 'visi') {
                    $visi = $data->deskripsi;
                }

                if ($data->title == 'misi') {
                    $misi[] = ['id' => $data->id, 'deskripsi' => $data->deskripsi];
                }
            }

            toastr()->success('Data Berhasil Dimuat.');
        } catch (\Exception $exception) {
            $visi = '';
            $misi = [];
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
        }

        return view('admin.tentang-kediri.form-visimisi', compact('titlepage', 'visi', 'misi'));
    }

    // Adminpage - Get Value Misi
    public function valuemisi($id)
    {
        $misi = TentangKota::where('id', $id)->first();
        return response()->json($misi);
    }

    // Adminpage - Update Visi Misi
    public function update_visimisi(Request $request)
    {
        DB::beginTransaction();

        try {
            if ($request->updatevisi == true) {
                TentangKota::where(['title' => 'visi'])->update([
                    'deskripsi' => $request->visi,
                    'updated_at' => Carbon::now('Asia/Jakarta'),
                ]);

                DB::commit();
                toastr()->success('Visi Berhasil Diperbarui.');
            }

            if ($request->simpanmisi == true || isset($request->simpanmisi)) {
                if ($request->idmisi == true || isset($request->idmisi)) {
                    TentangKota::where(['id' => $request->idmisi])->update([
                        'deskripsi' => $request->misi,
                        'updated_at' => Carbon::now('Asia/Jakarta'),
                    ]);

                    toastr()->success('Misi Berhasil Diperbarui.');
                } else {
                    TentangKota::insert([
                        'title' => 'misi',
                        'deskripsi' => $request->misi,
                        'created_at' => Carbon::now('Asia/Jakarta'),
                    ]);

                    toastr()->success('Misi Berhasil Ditambahkan.');
                }

                DB::commit();
            }
        } catch (\Exception $exception) {
            DB::rollback();
            toastr()->error('Update Gagal. Hubungi Programmer!!');
        }

        return redirect()->back();
    }

    // Adminpage - Delete Misi
    public function hapus_misi($id)
    {
        $aktif = TentangKota::where(['id' => $id])->update([
            'status_enabled' => 0,
            'updated_at' => Carbon::now('Asia/Jakarta'),
        ]);

        //Check data deleted or not
        if ($aktif == 1) {
            $success = true;
            $message = 'Berita Berhasil Dihapus';
        } else {
            $success = false;
            $message = 'Berita Tidak Ditemukan!';
        }

        // //Return response
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }

    // List Sejarah Kota
    public function list_sejarah(Request $request)
    {
        if ($request->ajax()) {
            $sejarah = SejarahKota::where('status_enabled', 1)->get();
            return Datatables::of($sejarah)
                ->addIndexColumn()
                ->addColumn('tahun', function ($row) {
                    $tahun = $row['tahun'];
                    return $tahun;
                })
                ->addColumn('judul', function ($row) {
                    $judul = $row['judul'];
                    return $judul;
                })
                ->addColumn('keterangan', function ($row) {
                    $keterangan = substr($row['keterangan'], 0, 200) . '...';
                    return $keterangan;
                })
                ->addColumn('action', function ($row) {
                    $action =
                        '<button type="button" class="btn btn-warning" onclick="edit(' .
                        $row->id .
                        ')" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-pen"></i></button>
                                <button type="button" class="btn btn-danger" onclick="deleteConfirmation(' .
                        $row->id .
                        ')" title="Delete" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-trash"></i></button>';
                    return $action;
                })
                ->rawColumns(['tahun', 'keterangan', 'action'])
                ->make(true);
        }
        return view('admin.tentang-kediri.list-sejarah');
    }

    public function form_sejarah($id)
    {
        $sejarah = SejarahKota::find($id);
        if ($sejarah) {
            return response()->json([
                'success' => true,
                'data' => $sejarah,
            ]);
        } else {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ],
                404,
            );
        }
    }

    // Update Sejarah
    public function update_sejarah(Request $request)
    {
        DB::beginTransaction();

        try {
            if (isset($request->id)) {
                SejarahKota::where(['id' => $request->id])->update([
                    'tahun' => $request->tahun,
                    'judul' => $request->judul,
                    'keterangan' => $request->keterangan,
                    'updated_at' => Carbon::now('Asia/Jakarta'),
                ]);

                toastr()->success('Sejarah Berhasil Diubah.');
            } else {
                SejarahKota::insert([
                    'tahun' => $request->tahun,
                    'judul' => $request->judul,
                    'keterangan' => $request->keterangan,
                    'created_at' => Carbon::now('Asia/Jakarta'),
                ]);

                toastr()->success('Sejarah Berhasil Ditambahkan.');
            }

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect('/list-sejarah');
    }

    // Hapus Sejarah
    public function hapus_sejarah($id)
    {
        $aktif = SejarahKota::where(['id' => $id])->update([
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

    // List Pimpinan
    public function list_pimpinan(Request $request)
    {
        if ($request->ajax()) {
            $pimpinan = DaftarPimpinan::with(['jabatan', 'opd'])
                ->where('status_enabled', 1)
                ->get();

            return Datatables::of($pimpinan)
                ->addIndexColumn()

                ->addColumn('nama_pimpinan', function ($row) {
                    return $row->nama_pimpinan;
                })

                ->addColumn('nama_opd', function ($row) {
                    return $row->opd?->nama ?? '-';
                })

                ->addColumn('jabatan', function ($row) {
                    return $row->jabatan?->nama_jabatan ?? '-';
                })

                ->addColumn('action', function ($row) {
                    return '
                    <button type="button" class="btn btn-warning"
                        onclick="location.href=`/form-pimpinan/' .
                        $row->id .
                        '`"
                        title="Edit"
                        style="margin-right:5px; margin-bottom:5px;">
                        <i class="fa fa-pen"></i>
                    </button>

                    <button type="button" class="btn btn-danger"
                        onclick="deleteConfirmation(' .
                        $row->id .
                        ')"
                        title="Delete"
                        style="margin-right:5px; margin-bottom:5px;">
                        <i class="fa fa-trash"></i>
                    </button>
                ';
                })

                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.tentang-kediri.list-pimpinan');
    }

    // Form Pimpinan
    public function form_pimpinan($id)
    {
        $jabatan = Jabatan::where('status_enabled', 1)->get();
        $opd = OPD::where('status_enabled', 1)->get();

        if ($id == 'add') {
            $titlepage = 'Tambah Pimpinan';
            $pimpinan = null;
        } else {
            $titlepage = 'Edit Pimpinan';
            $pimpinan = DaftarPimpinan::findOrFail($id);
        }

        return view('admin.tentang-kediri.form-pimpinan', compact('titlepage', 'jabatan', 'opd', 'pimpinan'));
    }

    public function update_pimpinan(Request $request)
    {
        $request->validate(
            [
                'nama_pimpinan' => 'required|string|max:255',
                'tempat_lahir' => 'nullable|string|max:255',
                'tanggal_lahir' => 'nullable|date',
                'agama' => 'nullable|string|max:100',
                'jenis_kelamin' => 'nullable|string|max:50',
                'nip' => 'nullable|string|max:100',
                'jabatan' => 'required|exists:jabatan,id',
                'opd' => 'nullable|exists:opd,id',
                'pangkat' => 'nullable|string|max:255',
                'gol_ruang' => 'nullable|string|max:100',
                'deskripsi' => 'nullable',
                'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            ],
            [
                'nama_pimpinan.required' => 'Nama pimpinan wajib diisi.',
                'jabatan.required' => 'Jabatan wajib dipilih.',
                'jabatan.exists' => 'Jabatan tidak ditemukan.',
                'opd.exists' => 'OPD tidak ditemukan.',
                'foto.image' => 'File yang diupload harus gambar.',
                'foto.mimes' => 'Tipe file harus .jpeg, .png, .jpg, atau .webp.',
                'foto.max' => 'Ukuran file maksimal 2MB.',
            ],
        );

        DB::beginTransaction();

        try {
            $fileName = $request->fotolama;

            if ($request->hasFile('foto')) {
                $file = $request->file('foto');

                $fileName = 'foto_pimpinan-' . time() . '.' . $file->extension();

                $file->move(storage_path('app/public/pimpinan'), $fileName);
            }

            $data = [
                'nama_pimpinan' => $request->nama_pimpinan,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'agama' => $request->agama,
                'jenis_kelamin' => $request->jenis_kelamin,
                'nip' => $request->nip,
                'foto' => $fileName,
                'id_jabatan' => $request->jabatan,
                'id_opd' => $request->opd,
                'pangkat' => $request->pangkat,
                'gol_ruang' => $request->gol_ruang,
                'deskripsi' => $request->deskripsi,
            ];

            if ($request->filled('id')) {
                DaftarPimpinan::where('id', $request->id)->update([...$data, 'updated_at' => Carbon::now('Asia/Jakarta')]);

                toastr()->success('Daftar Pimpinan Berhasil Diubah.');
            } else {
                DaftarPimpinan::create([...$data, 'created_at' => Carbon::now('Asia/Jakarta'), 'updated_at' => Carbon::now('Asia/Jakarta')]);

                toastr()->success('Daftar Pimpinan Berhasil Ditambahkan.');
            }

            DB::commit();

            return redirect('/list-pimpinan');
        } catch (\Exception $exception) {
            DB::rollBack();

            report($exception);

            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!');

            return back()->withInput();
        }
    }

    // Adminpage - Delete Pimpinan
    public function hapus_pimpinan($id)
    {
        $aktif = DaftarPimpinan::where(['id' => $id])->update([
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

        //Return response
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }

    public function sekilasKota()
    {
        $sekilas = TentangKota::firstOrCreate(
            ['title' => 'sekilas-kota'],
            [
                'deskripsi' => '',
                'gambar' => null,
            ],
        );

        return view('admin.tentang-kediri.sekilas', [
            'titlepage' => 'Sekilas Kota Kediri',
            'sekilas' => $sekilas,
        ]);
    }
    public function updateSekilas(Request $request)
    {
        $request->validate([
            'deskripsi' => 'required',

            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $sekilas = TentangKota::firstOrCreate([
            'title' => 'sekilas-kota',
        ]);

        $gambar = $sekilas->gambar;

        if ($request->hasFile('gambar')) {
            if ($gambar && file_exists(storage_path('app/public/sekilas/' . $gambar))) {
                unlink(storage_path('app/public/sekilas/' . $gambar));
            }

            $file = $request->gambar;

            $gambar = 'sekilas-' . time() . '.' . $file->extension();

            $file->move(
                storage_path('app/public/sekilas'),

                $gambar,
            );
        }

        $sekilas->update([
            'deskripsi' => $request->deskripsi,

            'gambar' => $gambar,
        ]);

        toastr()->success('Sekilas Kota Kediri berhasil diperbarui');

        return back();
    }

    public function geografis()
    {
        $geografis = TentangKota::where('title', 'geografis')->where('status_enabled', 1)->get();
        $statistik = [
            'luas' => TentangKota::where('title', 'luas-wilayah')->value('deskripsi'),

            'laki' => TentangKota::where('title', 'laki-laki')->value('deskripsi'),

            'perempuan' => TentangKota::where('title', 'perempuan')->value('deskripsi'),
        ];
        return view('admin.tentang-kediri.geografis', [
            'titlepage' => 'Letak Geografis',
            'geografis' => $geografis,
            'statistik' => $statistik,
        ]);
    }
    public function updateGeografis(Request $request)
    {
        $request->validate([
            'deskripsi' => 'required',
        ]);

        if ($request->id) {
            TentangKota::where('id', $request->id)->update([
                'deskripsi' => $request->deskripsi,
            ]);
        } else {
            TentangKota::create([
                'title' => 'geografis',

                'deskripsi' => $request->deskripsi,

                'status_enabled' => 1,
            ]);
        }

        toastr()->success('Data berhasil disimpan');

        return back();
    }
    public function valueGeografis($id)
    {
        return response()->json(TentangKota::findOrFail($id));
    }
    public function hapusGeografis($id)
    {
        TentangKota::where('id', $id)->update([
            'status_enabled' => 0,
        ]);

        return response()->json([
            'success' => true,

            'message' => 'Berhasil',
        ]);
    }
    public function updateStatistikKota(Request $request)
    {
        TentangKota::updateOrCreate(['title' => 'luas-wilayah'], ['deskripsi' => $request->luas]);
        TentangKota::updateOrCreate(['title' => 'laki-laki'], ['deskripsi' => $request->laki]);
        TentangKota::updateOrCreate(['title' => 'perempuan'], ['deskripsi' => $request->perempuan]);
        toastr()->success('Statistik kota berhasil diperbarui');
        return back();
    }
}
