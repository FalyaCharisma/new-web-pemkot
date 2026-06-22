<?php

namespace App\Http\Controllers;
use App\Models\Berita;
use App\Models\KategoriBerita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     return Inertia::render('berita/index');
    // }

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

    public function berita(Request $request)
    {
        $search = $request->search;
        $kategori = $request->kategori;
        $sort = $request->sort ?? 'latest';

        $query = Berita::query()->with('kategori')->where('status_published', 1)->where('status_enabled', 1);

        $query->when($search, function ($q) use ($search) {
            $q->where('judul', 'like', "%{$search}%");
        });

        $query->when($kategori, function ($q) use ($kategori) {
            $q->where('id_kategori', $kategori);
        });

        if ($sort == 'oldest') {
            $query->oldest('tanggal');
        } else {
            $query->latest('tanggal');
        }

        $berita = $query->paginate(12)->withQueryString();
        $beritaEkslusif = $query->clone()->where('eksklusif', 1)->latest('tanggal')->first();

        $beritaLainnya = $query
            ->clone()
            ->where(function ($q) {
                $q->whereNull('eksklusif')->orWhere('eksklusif', 0);
            })
            ->paginate(12)
            ->withQueryString();

        $kategoriBerita = KategoriBerita::query()->where('status_enabled', 1)->orderBy('nama_kategori')->get();

        return Inertia::render('berita/index', [
            'beritaEkslusif' => $beritaEkslusif,
            'berita' => $beritaLainnya,
            'kategoriBerita' => $kategoriBerita,
            'filters' => [
                'search' => $search,
                'kategori' => $kategori,
                'sort' => $sort,
            ],
        ]);
    }

    public function show($slug)
    {
        $berita = Berita::with('kategori')
            ->where('slug',$slug)
            ->firstOrFail();

        return Inertia::render('berita/detail',[
            'berita'=>$berita
        ]);
    }
}
