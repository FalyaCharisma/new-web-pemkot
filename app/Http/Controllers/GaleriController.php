<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\FeaturedVideo;
use App\Models\FotoAlbum;
use Carbon\Carbon;
use DataTables;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GaleriController extends Controller
{
    /**
     * Helper untuk membaca foto galeri.
     * Jika database berisi URL lengkap, pakai langsung.
     * Jika database berisi nama file lokal, arahkan ke storage/galeri.
     */
    private function resolveFotoUrl(?string $foto): string
    {
        if (!$foto) {
            return 'https://placehold.co/600x400?text=Galeri';
        }

        $value = trim($foto);

        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }

        if (str_starts_with($value, '/storage/')) {
            return url($value);
        }

        if (str_starts_with($value, 'storage/')) {
            return url('/' . $value);
        }

        if (str_starts_with($value, '/')) {
            return url($value);
        }

        return asset('storage/galeri/' . $value);
    }

    /**
     * Public page galeri.
     */
    public function index(Request $request)
    {
        $videos = FeaturedVideo::where('status_enabled', 1)->latest()->get();

        $albums = Album::with([
            'fotos' => function ($query) {
                $query->where('status_enabled', 1)->orderBy('id', 'asc');
            },
        ])
            ->where('status_enabled', 1)
            ->when($request->search, function ($q) use ($request) {
                $q->where('judul', 'like', '%' . $request->search . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate(6)
            ->through(function ($album) {
                return [
                    'id' => $album->id,
                    'judul' => $album->judul,
                    'created_at' => $album->created_at,
                    'fotos' => $album->fotos->map(function ($f) {
                        return [
                            'id' => $f->id,
                            'foto' => $this->resolveFotoUrl($f->foto),
                            'foto_raw' => $f->foto,
                            'nama_foto' => $f->nama_foto,
                        ];
                    }),
                ];
            });

        $totalFoto = FotoAlbum::where('status_enabled', 1)->count();
        $totalVideo = FeaturedVideo::where('status_enabled', 1)->count();
        $totalAlbum = Album::where('status_enabled', 1)->count();

        return Inertia::render('galeri/index', [
            'videos' => $videos,
            'albums' => $albums,
            'totalFoto' => $totalFoto,
            'totalVideo' => $totalVideo,
            'totalAlbum' => $totalAlbum,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }

    // ------------------------------------------------- ADMINPAGE ----------------------------------------------

    public function list_galeri(Request $request)
    {
        if ($request->ajax()) {
            $album = Album::where('status_enabled', 1)->orderBy('id', 'desc')->get();

            return Datatables::of($album)
                ->addIndexColumn()
                ->addColumn('judul', function ($row) {
                    return e($row->judul);
                })
                ->addColumn('jumlah_foto', function ($row) {
                    return FotoAlbum::where('id_album', $row->id)
                        ->where('status_enabled', 1)
                        ->count() . ' Foto';
                })
                ->addColumn('tanggal', function ($row) {
                    return $row->created_at ? date('d-m-Y H:i', strtotime($row->created_at)) : '-';
                })
                ->addColumn('action', function ($row) {
                    return '
                        <button type="button" class="btn btn-primary btn-sm" onclick="location.href=\'/form-galeri/' . $row->id . '\'" title="Edit" style="margin-right:5px; margin-bottom:5px;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deletealbumConfirmation(' . $row->id . ')" title="Hapus" style="margin-right:5px; margin-bottom:5px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    ';
                })
                ->rawColumns(['judul', 'jumlah_foto', 'tanggal', 'action'])
                ->make(true);
        }

        return view('admin.galeri.list-galeri');
    }

    public function form_galeri(Request $request, $id)
    {
        if ($id === 'add') {
            $titlepage = 'Tambah Album Galeri';
            $table = 'off';
            $album = null;
        } else {
            $titlepage = 'Edit Album Galeri';
            $table = 'on';

            if ($id === 'view') {
                $album = Album::where('status_enabled', 1)->latest('id')->first();
            } else {
                $album = Album::where('status_enabled', 1)->where('id', $id)->firstOrFail();
            }
        }

        return view('admin.galeri.form-galeri', compact('titlepage', 'table', 'album'));
    }

    public function data_foto(Request $request, $id)
    {
        $album = Album::where('status_enabled', 1)->where('id', $id)->firstOrFail();

        $fotoAlbum = FotoAlbum::where('id_album', $album->id)
            ->where('status_enabled', 1)
            ->orderBy('id', 'desc')
            ->get();

        if ($request->ajax()) {
            return Datatables::of($fotoAlbum)
                ->addIndexColumn()
                ->addColumn('nama_foto', function ($row) {
                    return e($row->nama_foto ?: '-');
                })
                ->addColumn('foto', function ($row) {
                    $src = e($this->resolveFotoUrl($row->foto));
                    return '<img src="' . $src . '" alt="Foto Galeri" style="max-width:140px; max-height:90px; object-fit:cover; border-radius:8px;" onerror="this.src=\'https://placehold.co/300x180?text=Foto+Tidak+Tampil\'">';
                })
                ->addColumn('link_foto', function ($row) {
                    $url = e($row->foto);
                    return '<a href="' . $url . '" target="_blank" rel="noopener" style="word-break:break-all;">' . $url . '</a>';
                })
                ->addColumn('action', function ($row) {
                    $nama = htmlspecialchars(json_encode($row->nama_foto ?? ''), ENT_QUOTES, 'UTF-8');
                    $foto = htmlspecialchars(json_encode($row->foto ?? ''), ENT_QUOTES, 'UTF-8');

                    return '
                        <button type="button" class="btn btn-warning btn-sm" onclick="editFoto(' . $row->id . ', ' . $nama . ', ' . $foto . ')" title="Edit" style="margin-right:5px; margin-bottom:5px;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deletefotoConfirmation(' . $row->id . ')" title="Hapus" style="margin-right:5px; margin-bottom:5px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    ';
                })
                ->rawColumns(['foto', 'link_foto', 'action'])
                ->make(true);
        }

        return redirect('/form-galeri/' . $album->id);
    }

    /**
     * Nama route lama tetap dipertahankan untuk kompatibilitas.
     * Sekarang dipakai untuk menyimpan link foto, bukan upload file Dropzone.
     */
    public function dropzoneStore(Request $request)
    {
        return $this->store_foto($request);
    }

    public function store_foto(Request $request)
    {
        $request->validate([
            'id_album' => ['required', 'exists:album,id'],
            'nama_foto' => ['required', 'string', 'max:200'],
            'foto' => ['required', 'url', 'max:255'],
        ], [
            'id_album.required' => 'Album tidak ditemukan.',
            'nama_foto.required' => 'Nama foto wajib diisi.',
            'foto.required' => 'Link foto wajib diisi.',
            'foto.url' => 'Link foto harus berupa URL yang valid.',
        ]);

        $now = Carbon::now('Asia/Jakarta');

        FotoAlbum::create([
            'id_album' => $request->id_album,
            'nama_foto' => $request->nama_foto,
            'foto' => $request->foto,
            'status_enabled' => 1,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        return redirect('/form-galeri/' . $request->id_album)->with('success', 'Foto berhasil ditambahkan.');
    }

    public function update_foto(Request $request, $id)
    {
        $foto = FotoAlbum::where('status_enabled', 1)->where('id', $id)->firstOrFail();

        $request->validate([
            'nama_foto' => ['required', 'string', 'max:200'],
            'foto' => ['required', 'url', 'max:255'],
        ], [
            'nama_foto.required' => 'Nama foto wajib diisi.',
            'foto.required' => 'Link foto wajib diisi.',
            'foto.url' => 'Link foto harus berupa URL yang valid.',
        ]);

        $foto->update([
            'nama_foto' => $request->nama_foto,
            'foto' => $request->foto,
            'updated_at' => Carbon::now('Asia/Jakarta'),
        ]);

        return redirect('/form-galeri/' . $foto->id_album)->with('success', 'Foto berhasil diperbarui.');
    }

    public function update_album(Request $request)
    {
        $request->validate([
            'judul_album' => ['required', 'string', 'max:255'],
        ], [
            'judul_album.required' => 'Judul album wajib diisi.',
        ]);

        $now = Carbon::now('Asia/Jakarta');

        if ($request->filled('id')) {
            $album = Album::where('status_enabled', 1)->where('id', $request->id)->firstOrFail();

            $album->update([
                'judul' => $request->judul_album,
                'updated_at' => $now,
            ]);

            return redirect('/form-galeri/' . $album->id)->with('success', 'Judul album berhasil diperbarui.');
        }

        $album = Album::create([
            'judul' => $request->judul_album,
            'status_enabled' => 1,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        return redirect('/form-galeri/' . $album->id)->with('success', 'Album berhasil dibuat. Silakan tambahkan link foto.');
    }

    public function hapus_foto($id)
    {
        $aktif = FotoAlbum::where('id', $id)->update([
            'status_enabled' => 0,
            'updated_at' => Carbon::now('Asia/Jakarta'),
        ]);

        return response()->json([
            'success' => $aktif == 1,
            'message' => $aktif == 1 ? 'Foto berhasil dihapus.' : 'Foto tidak ditemukan.',
        ]);
    }

    public function hapus_album($id)
    {
        $aktif = Album::where('id', $id)->update([
            'status_enabled' => 0,
            'updated_at' => Carbon::now('Asia/Jakarta'),
        ]);

        if ($aktif == 1) {
            FotoAlbum::where('id_album', $id)->update([
                'status_enabled' => 0,
                'updated_at' => Carbon::now('Asia/Jakarta'),
            ]);
        }

        return response()->json([
            'success' => $aktif == 1,
            'message' => $aktif == 1 ? 'Album berhasil dihapus.' : 'Album tidak ditemukan.',
        ]);
    }

    public function list_video(Request $request)
    {
        if ($request->ajax()) {
            $video = FeaturedVideo::where('status_enabled', 1)->latest()->get();

            return Datatables::of($video)
                ->addIndexColumn()
                ->addColumn('title', function ($row) {
                    return $row->title;
                })
                ->addColumn('video_url', function ($row) {
                    return '<a href="' . $row->video_url . '" target="_blank">Lihat Video</a>';
                })
                ->addColumn('action', function ($row) {
                    return '
                        <button type="button" class="btn btn-primary" onclick="location.href=`/form-video/' . $row->id . '`">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="deleteVideoConfirmation(' . $row->id . ')">
                            <i class="fas fa-trash"></i>
                        </button>
                    ';
                })
                ->rawColumns(['video_url', 'action'])
                ->make(true);
        }

        return view('admin.galeri.list-video');
    }

    public function form_video($id = 'add')
    {
        if ($id == 'add') {
            $titlepage = 'Tambah Video';
            $video = null;
        } else {
            $titlepage = 'Edit Video';
            $video = FeaturedVideo::findOrFail($id);
        }

        return view('admin.galeri.form-video', compact('titlepage', 'video'));
    }

    public function store_video(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'video_url' => 'required',
        ]);

        FeaturedVideo::create([
            'title' => $request->title,
            'description' => $request->description,
            'video_url' => $request->video_url,
            'status_enabled' => 1,
        ]);

        toastr()->success('Video berhasil ditambahkan');

        return redirect('/list-video');
    }

    public function update_video(Request $request)
    {
        FeaturedVideo::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'video_url' => $request->video_url,
            'updated_at' => Carbon::now('Asia/Jakarta'),
        ]);

        toastr()->success('Video berhasil diperbarui');

        return redirect('/list-video');
    }

    public function hapus_video($id)
    {
        $aktif = FeaturedVideo::where('id', $id)->update([
            'status_enabled' => 0,
            'updated_at' => Carbon::now('Asia/Jakarta'),
        ]);

        return response()->json([
            'success' => $aktif,
            'message' => 'Video berhasil dihapus',
        ]);
    }
}
