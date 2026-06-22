<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\FeaturedVideo;
use App\Models\Album;
use App\Models\FotoAlbum;


class GaleriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $videos = FeaturedVideo::where('status_enabled', 1)
            ->latest()
            ->get();

        $albums = Album::with([
            'fotos' => function ($query) {
                $query->where('status_enabled', 1);
            }
        ])
        ->where('status_enabled', 1)
        ->when($request->search, function ($q) use ($request) {
            $q->where('judul', 'like', '%' . $request->search . '%');
        })
        ->latest()
        ->paginate(6)
        ->through(function ($album) {
            return [
                'id' => $album->id,
                'judul' => $album->judul,
                'created_at' => $album->created_at,

                'fotos' => $album->fotos?->map(fn($f) => [
                    'foto' => asset('storage/album/'.$f->foto),
                    'nama_foto' => $f->nama_foto,
                ]) ?? [],
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
