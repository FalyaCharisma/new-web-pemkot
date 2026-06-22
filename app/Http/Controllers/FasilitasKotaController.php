<?php

namespace App\Http\Controllers;

use App\Models\FasilitasKota;
use App\Models\KategoriFasilitas;
use App\Models\SubKategoriFasilitas;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        ->orderBy('nama_kategori')
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
        ->when($request->kategori, function ($q) use ($request) {
            $q->where('kategori_id', $request->kategori);
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
