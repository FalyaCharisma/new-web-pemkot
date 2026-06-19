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
        $filters = [
            'search' => $request->input('search', ''),
            'kategori' => $request->input('kategori', ''),
            'sub_kategori' => $request->input('sub_kategori', ''),
        ];

        $fasilitas = FasilitasKota::query()
            ->with(['kategori', 'sub_kategori'])
            ->where('status_enabled', 1)
            ->when($request->filled('kategori'), function ($query) use ($request) {
                $query->where('kategori_id', $request->integer('kategori'));
            })
            ->when($request->filled('sub_kategori'), function ($query) use ($request) {
                $query->where('sub_kategori_id', $request->integer('sub_kategori'));
            })
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->input('search');

                $query->where(function ($q) use ($search) {
                    $q->where('nama', 'like', "%{$search}%")
                        ->orWhere('alamat', 'like', "%{$search}%")
                        ->orWhere('telp', 'like', "%{$search}%");
                });
            })
            ->latest('id')
            ->paginate(12)
            ->withQueryString();

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
            ->when($request->filled('kategori'), function ($query) use ($request) {
                $query->where('kategori_id', $request->integer('kategori'));
            })
            ->orderBy('nama_sub')
            ->get();

        return Inertia::render('fasilitaskota/index', [
            'fasilitas' => $fasilitas,
            'kategori' => $kategori,
            'subKategori' => $subKategori,
            'filters' => $filters,
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
