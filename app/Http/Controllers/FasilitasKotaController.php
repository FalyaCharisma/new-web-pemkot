<?php

namespace App\Http\Controllers;

use App\Models\FasilitasKota;
use App\Models\FasilitasMedia;
use App\Models\KategoriFasilitas;
use App\Models\SubKategoriFasilitas;
use App\Models\Berita;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use DataTables;
use Carbon\Carbon;
use Auth;
use Illuminate\Support\Str;

class FasilitasKotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $selectedKategori = $request->integer('kategori', 1);
        $selectedSubKategori = $request->integer('sub_kategori');

        $kategori = KategoriFasilitas::query()
            ->where('status_enabled', 1)
            ->withCount([
                'fasilitas as fasilitas_count' => function ($query) {
                    $query->where('status_enabled', 1);
                },
            ])
            ->orderBy('id')
            ->get();

        $subKategori = SubKategoriFasilitas::query()
            ->where('status_enabled', 1)
            ->when($selectedKategori, function ($query) use ($selectedKategori) {
                $query->where('kategori_id', $selectedKategori);
            })
            ->orderBy('nama_sub')
            ->get();

        $fasilitas = FasilitasKota::query()
            ->where('status_enabled', 1)
            ->with(['kategori', 'sub_kategori'])
            ->when($selectedKategori, function ($q) use ($selectedKategori) {
                $q->where('kategori_id', $selectedKategori);
            })
            ->when($request->sub_kategori, function ($q) use ($request) {
                $q->whereIn('sub_kategori_id', (array) $request->sub_kategori);
            })
            ->when($request->search, function ($query) use ($request) {
                $query->where('nama', 'like', '%' . $request->search . '%');
            })
            ->latest()
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('fasilitaskota/index', [
            'kategori' => $kategori,
            'subKategori' => $subKategori,
            'fasilitas' => $fasilitas,
            'filters' => [
                'kategori' => $selectedKategori,
                'sub_kategori' => $selectedSubKategori,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function show(FasilitasKota $fasilitas)
    {
        $slug = strtolower($fasilitas->slug);
        $keywords = explode('-', $slug);
        $stopWords = ['dan', 'di', 'ke', 'dari', 'yang', 'untuk', 'dengan', 'kota', 'kediri'];

        $berita = Berita::with('kategori')
            ->get()
            ->map(function ($item) use ($keywords, $stopWords) {
                $score = 0;
                $judul = strtolower($item->judul);
                $deskripsi = strtolower(strip_tags($item->deskripsi));
                foreach ($keywords as $word) {
                    $word = trim($word);

                    if (strlen($word) < 3 || in_array($word, $stopWords)) {
                        continue;
                    }

                    // keyword di judul
                    if (str_contains($judul, $word)) {
                        $score += 10;
                    }

                    // keyword di deskripsi
                    if (str_contains($deskripsi, $word)) {
                        $score += 5;
                    }
                }

                $item->score = $score;

                return $item;
            })

            ->filter(fn($item) => $item->score > 0)
            ->sort(function ($a, $b) {
                if ($a->score === $b->score) {
                    return strtotime($b->tanggal) <=> strtotime($a->tanggal);
                }
                return $b->score <=> $a->score;
            })
            ->take(4)
            ->values();

        if ($berita->count() < 4) {
            $tambahan = Berita::with('kategori')
                ->whereNotIn('id', $berita->pluck('id'))
                ->latest('tanggal')
                ->take(4 - $berita->count())
                ->get();
            $berita = $berita->merge($tambahan)->unique('id')->values();
        }

        $agenda = Agenda::latest()->take(4)->get();
        $lainnya = FasilitasKota::where('id', '!=', $fasilitas->id)->inRandomOrder()->take(3)->get();
        return Inertia::render('fasilitaskota/detail', [
            'fasilitas' => FasilitasKota::with(['kategori', 'galeriFoto', 'galeriVideo'])->findOrFail($fasilitas->id),
             'berita' => $berita,
            'agenda' => $agenda,
            'lainnya' => $lainnya,
        ]);
    }
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    //---------------------------------------- ADMINPAGE -----------------------------

    // Datatable Fasilitas
    public function list_fasilitas(Request $request)
    {
        $titlepage = 'List Fasilitas';
        $kategori = KategoriFasilitas::where('status_enabled', 1)->get();
        $sub_kategori = SubKategoriFasilitas::where('status_enabled', 1)->get();

        try {
            if ($request->ajax()) {
                // Ambil data fasilitas dengan filter kategori (jika ada)
                $query = FasilitasKota::where('status_enabled', 1);

                if ($request->has('kategori') && $request->kategori != null) {
                    $query->where('kategori_id', $request->kategori);
                }

                $fasilitas = $query->orderBy('created_at', 'desc')->get();

                return Datatables::of($fasilitas)
                    ->addIndexColumn()
                    ->addColumn('nama', function ($row) {
                        return $row['nama'];
                    })
                    ->addColumn('kategori', function ($row) {
                        return $row->kategori->nama_kategori ?? '-';
                    })
                    ->addColumn('sub_kategori', function ($row) {
                        return $row->sub_kategori->nama_sub ?? '-';
                    })
                    ->addColumn('action', function ($row) {
                        return '<button  type="button" class="btn btn-primary"  onclick="location.href=`/form-fasilitas/' .
                            $row->id .
                            '`" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-edit"></i></button>
                                <button type="button" class="btn btn-danger" onclick="deleteConfirmation(' .
                            $row->id .
                            ')" title="Hapus" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-trash"></i></button>';
                    })
                    ->rawColumns(['nama', 'kategori', 'sub_kategori', 'action'])
                    ->make(true);
            }
        } catch (\Exception $exception) {
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
            return response()->json(['error' => 'Data gagal dimuat'], 500);
        }

        return view('admin.fasilitas.list-fasilitas', compact('titlepage', 'kategori', 'sub_kategori'));
    }

    // Get Form Fasilitas
    public function form_fasilitas($id)
    {
        $kategori = KategoriFasilitas::where('status_enabled', 1)->get();
        $sub_kategori = SubKategoriFasilitas::where('status_enabled', 1)->get();
        if ($id == 'add') {
            $titlepage = 'Tambah Fasilitas Kota';
            $fasilitas = [];
        } else {
            $titlepage = 'Edit Fasilitas Kota';
            $fasilitas = FasilitasKota::with(['galeriFoto', 'galeriVideo'])->findOrFail($id);
        }

        return view('admin.fasilitas.form-fasilitas', compact('titlepage', 'fasilitas', 'kategori', 'sub_kategori'));
    }

    public function get_sub_kategori(Request $request)
    {
        $kategori = $request->input('kategori');
        $sub_kategori = SubKategoriFasilitas::where('kategori_id', $kategori)->orderBy('nama_sub')->get();

        return response()->json($sub_kategori);
    }

    // Insert & Update Fasilitas
    public function update_fasilitas(Request $request)
    {
        $request->validate(
            [
                'lat' => 'nullable|numeric',
                'lng' => 'nullable|numeric',
                'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
                'foto.*' => 'nullable|url',
                'video.*' => 'nullable|url',
            ],
            [
                'gambar.image' => 'File harus berupa gambar.',
                'gambar.mimes' => 'Tipe gambar harus jpeg, jpg, png atau webp.',
                'gambar.max' => 'Ukuran gambar maksimal 2 MB.',
                'foto.*.url' => 'Link Flickr tidak valid.',
                'video.*.url' => 'Link video tidak valid.',
            ],
        );

        /*
    |--------------------------------------------------------------------------
    | Upload Cover
    |--------------------------------------------------------------------------
    */

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');

            $fileName = 'fasilitas-' . time() . '.' . $file->extension();

            $file->move(storage_path('app/public/fasilitas'), $fileName);
        } else {
            $fileName = $request->gambarlama;
        }

        DB::beginTransaction();

        try {
            /*
        |--------------------------------------------------------------------------
        | UPDATE
        |--------------------------------------------------------------------------
        */

            if ($request->filled('id')) {
                FasilitasKota::where('id', $request->id)->update([
                    'kategori_id' => $request->kategori,
                    'sub_kategori_id' => $request->sub_kategori,
                    'nama' => $request->nama,
                    'slug' => Str::slug($request->nama),
                    'foto' => $fileName,
                    'alamat' => $request->alamat,
                    'telp' => $request->telp,
                    'link' => $request->link,
                    'map' => $request->map,
                    'deskripsi' => $request->deskripsi,
                    'lat' => $request->lat,
                    'lng' => $request->lng,
                    'jam_buka' => $request->jam_buka,
                    'jam_tutup' => $request->jam_tutup,
                    'updated_at' => Carbon::now('Asia/Jakarta'),
                ]);

                $fasilitasId = $request->id;

                // hapus seluruh media lama
                FasilitasMedia::where('fasilitas_id', $fasilitasId)->delete();

                $pesan = 'Fasilitas Berhasil Diubah.';
            } /*
        |--------------------------------------------------------------------------
        | INSERT
        |--------------------------------------------------------------------------
        */ else {
                $fasilitas = FasilitasKota::create([
                    'kategori_id' => $request->kategori,
                    'sub_kategori_id' => $request->sub_kategori,
                    'nama' => $request->nama,
                    'slug' => Str::slug($request->nama),
                    'foto' => $fileName,
                    'alamat' => $request->alamat,
                    'telp' => $request->telp,
                    'link' => $request->link,
                    'map' => $request->map,
                    'deskripsi' => $request->deskripsi,
                    'lat' => $request->lat,
                    'lng' => $request->lng,
                    'jam_buka' => $request->jam_buka,
                    'jam_tutup' => $request->jam_tutup,
                    'created_at' => Carbon::now('Asia/Jakarta'),
                ]);

                $fasilitasId = $fasilitas->id;

                $pesan = 'Fasilitas Berhasil Ditambahkan.';
            }

            /*
        |--------------------------------------------------------------------------
        | SIMPAN FOTO
        |--------------------------------------------------------------------------
        */

            if ($request->has('foto')) {
                foreach ($request->foto as $url) {
                    if (blank($url)) {
                        continue;
                    }

                    FasilitasMedia::create([
                        'fasilitas_id' => $fasilitasId,
                        'tipe' => 'foto',
                        'url' => trim($url),
                    ]);
                }
            }

            /*
        |--------------------------------------------------------------------------
        | SIMPAN VIDEO
        |--------------------------------------------------------------------------
        */

            if ($request->has('video')) {
                foreach ($request->video as $url) {
                    if (blank($url)) {
                        continue;
                    }

                    FasilitasMedia::create([
                        'fasilitas_id' => $fasilitasId,
                        'tipe' => 'video',
                        'url' => trim($url),
                    ]);
                }
            }

            DB::commit();

            toastr()->success($pesan);
        } catch (\Exception $exception) {
            DB::rollBack();

            // Hapus setelah debugging selesai
            dd($exception->getMessage());
        }

        return redirect('/list-fasilitas');
    }

    // Hapus fasilitas
    public function hapus_fasilitas($id)
    {
        $aktif = FasilitasKota::where(['id' => $id])->update([
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

    // Insert dan Update Kategori
    public function update_kategori_fasilitas(Request $request)
    {
        DB::beginTransaction();

        try {
            if (isset($request->id)) {
                KategoriFasilitas::where(['id' => $request->id])->update([
                    'nm_kategori' => $request->nm_kategori,
                    'updated_at' => Carbon::now('Asia/Jakarta'),
                ]);

                toastr()->success('Kategori Fasilitas Berhasil Diubah.');
            } else {
                KategoriFasilitas::insert([
                    'nm_kategori' => $request->nm_kategori,
                    'updated_at' => Carbon::now('Asia/Jakarta'),
                ]);

                toastr()->success('Kategori Fasilitas Berhasil Ditambahkan.');
            }

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect()->back();
    }

    public function value_kategori_fasilitas($id)
    {
        $kategori = KategoriFasilitas::where('id', $id)->first();
        return response()->json($kategori);
    }

    // Hapus fasilitas
    public function hapus_kategori_fasilitas($id)
    {
        $aktif = KategoriFasilitas::where(['id' => $id])->update([
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
    public function update_slug_fasilitas()
    {
        $fasilitas = FasilitasKota::all();

        foreach ($fasilitas as $f) {
            FasilitasKota::where('id', $f->id)->update([
                'slug' => Str::slug($f->nama),
            ]);
        }

        toastr()->success('Semua slug fasilitas berhasil diupdate.');

        return redirect()->back();
    }
}
