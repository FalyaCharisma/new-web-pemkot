<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Penghargaan;
use App\Models\Berita;
use App\Models\FasilitasKota;
use App\Models\Agenda;
use App\Models\Dokumen;
use App\Models\Album;
use Illuminate\Support\Str;
use Illuminate\Pagination\LengthAwarePaginator;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->search;
        $types = $request->input('type', []);

        $results = [];

        /*
    |--------------------------------------------------------------------------
    | BERITA
    |--------------------------------------------------------------------------
    */
        if (empty($types) || in_array('berita', $types)) {
            $beritaQuery = Berita::query()->when($keyword, function ($q) use ($keyword) {
                $q->where(function ($query) use ($keyword) {
                    $query->where('judul', 'like', "%{$keyword}%")->orWhere('deskripsi', 'like', "%{$keyword}%");
                });
            });

            $results['berita'] = [
                'items' => $beritaQuery->clone()->latest('tanggal')->take(3)->get()->map(
                    fn($item) => [
                        'type' => 'berita',
                        'title' => $item->judul,
                        'description' => Str::limit(strip_tags($item->deskripsi), 120),
                        'image' => $item->images ? (str_starts_with($item->images, 'http') ? $item->images : asset('storage/berita/' . $item->images)) : null,
                        'date' => $item->tanggal,
                        'location' => null,
                        'url' => route('berita.show', $item->slug),
                    ],
                ),
                'total' => $beritaQuery->count(),
            ];
        } else {
            $results['berita'] = [
                'items' => [],
                'total' => 0,
            ];
        }

        /*
    |--------------------------------------------------------------------------
    | AGENDA
    |--------------------------------------------------------------------------
    */
        if (empty($types) || in_array('agenda', $types)) {
            $agendaQuery = Agenda::query()->when($keyword, function ($q) use ($keyword) {
                $q->where(function ($query) use ($keyword) {
                    $query->where('judul_acara', 'like', "%{$keyword}%")->orWhere('deskripsi', 'like', "%{$keyword}%");
                });
            });

            $results['agenda'] = [
                'items' => $agendaQuery->clone()->latest('tanggal_mulai')->take(3)->get()->map(
                    fn($item) => [
                        'type' => 'agenda',
                        'title' => $item->judul_acara,
                        'description' => Str::limit(strip_tags($item->deskripsi), 120),
                        'image' => $item->banner ? (str_starts_with($item->banner, 'http') ? $item->banner : asset('storage/agenda/' . $item->banner)) : null,
                        'date' => $item->tanggal_mulai,
                        'location' => $item->lokasi_acara,
                        'url' => route('agenda.show', $item->id),
                    ],
                ),
                'total' => $agendaQuery->count(),
            ];
        } else {
            $results['agenda'] = [
                'items' => [],
                'total' => 0,
            ];
        }

        /*
    |--------------------------------------------------------------------------
    | FASILITAS
    |--------------------------------------------------------------------------
    */
        if (empty($types) || in_array('fasilitas', $types)) {
            $fasilitasQuery = FasilitasKota::query()->when($keyword, function ($q) use ($keyword) {
                $q->where(function ($query) use ($keyword) {
                    $query->where('nama', 'like', "%{$keyword}%")->orWhere('alamat', 'like', "%{$keyword}%");
                });
            });

            $results['fasilitas'] = [
                'items' => $fasilitasQuery->clone()->latest()->take(3)->get()->map(
                    fn($item) => [
                        'type' => 'fasilitas',
                        'title' => $item->nama,
                        'description' => $item->alamat,
                        'image' => $item->foto ? (str_starts_with($item->foto, 'http') ? $item->foto : asset('storage/fasilitas/' . $item->foto)) : null,
                        'date' => $item->created_at,
                        'location' => $item->alamat,
                        'url' => $item->link,
                    ],
                ),
                'total' => $fasilitasQuery->count(),
            ];
        } else {
            $results['fasilitas'] = [
                'items' => [],
                'total' => 0,
            ];
        }

        /*
    |--------------------------------------------------------------------------
    | PENGHARGAAN
    |--------------------------------------------------------------------------
    */
        if (empty($types) || in_array('penghargaan', $types)) {
            $penghargaanQuery = Penghargaan::query()->when($keyword, function ($q) use ($keyword) {
                $q->where(function ($query) use ($keyword) {
                    $query->where('judul', 'like', "%{$keyword}%")->orWhere('deskripsi', 'like', "%{$keyword}%");
                });
            });

            $results['penghargaan'] = [
                'items' => $penghargaanQuery->clone()->latest('tanggal')->take(3)->get()->map(
                    fn($item) => [
                        'type' => 'penghargaan',
                        'title' => $item->judul,
                        'description' => Str::limit(strip_tags($item->deskripsi), 120),
                        'image' => $item->foto ? (str_starts_with($item->foto, 'http') ? $item->foto : asset('storage/penghargaan/' . $item->foto)) : null,
                        'date' => $item->tanggal,
                        'location' => null,
                        'url' => route('penghargaan.show', $item->slug),
                    ],
                ),
                'total' => $penghargaanQuery->count(),
            ];
        } else {
            $results['penghargaan'] = [
                'items' => [],
                'total' => 0,
            ];
        }
        /*
|--------------------------------------------------------------------------
| DOKUMEN
|--------------------------------------------------------------------------
*/
        if (empty($types) || in_array('dokumen', $types)) {
            $dokumenQuery = Dokumen::query()
                ->where('status_published', 1)
                ->where('status_enabled', 1)
                ->when($keyword, function ($q) use ($keyword) {
                    $q->where('judul', 'like', "%{$keyword}%");
                });

            $results['dokumen'] = [
                'items' => $dokumenQuery->clone()->latest('tanggal')->take(3)->get()->map(
                    fn($item) => [
                        'type' => 'dokumen',

                        'title' => $item->judul,

                        'description' => Str::limit(strip_tags($item->deskripsi ?? ''), 120),

                        'image' => null,

                        'date' => $item->tanggal,

                        'location' => null,

                        'url' => asset('storage/dokumen/'.$item->dokumen),
                        // sesuaikan route milikmu
                    ],
                ),

                'total' => $dokumenQuery->count(),
            ];
        } else {
            $results['dokumen'] = [
                'items' => [],
                'total' => 0,
            ];
        }
        /*
|--------------------------------------------------------------------------
| GALERI
|--------------------------------------------------------------------------
*/
        if (empty($types) || in_array('galeri', $types)) {
            $galeriQuery = Album::with([
                'fotos' => function ($q) {
                    $q->where('status_enabled', 1);
                },
            ])
                ->where('status_enabled', 1)

                ->when($keyword, function ($q) use ($keyword) {
                    $q->where('judul', 'like', "%{$keyword}%");
                });

            $results['galeri'] = [
    'items' => $galeriQuery->clone()
        ->latest()
        ->take(3)
        ->get()
        ->map(function ($album) {

            return [

                'type' => 'galeri',

                'title' => $album->judul,

                'description' => 'Album Galeri',

                'image' => optional($album->fotos->first())
                    ? asset('storage/album/' . optional($album->fotos->first())->foto)
                    : null,

                'images' => $album->fotos->map(fn($foto) =>
                    asset('storage/album/' . $foto->foto)
                ),

                'date' => $album->created_at,

                'location' => null,

                'url' => null,

            ];
        }),

    'total' => $galeriQuery->count(),
];
        } else {
            $results['galeri'] = [
                'items' => [],
                'total' => 0,
            ];
        }

        return Inertia::render('search/index', [
            'keyword' => $keyword,
            'selectedTypes' => $types,
            'results' => $results,
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
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
}
