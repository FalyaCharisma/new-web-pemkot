<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Penghargaan;
use App\Models\Berita;
use App\Models\FasilitasKota;
use App\Models\Agenda;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->search;

        $results = $results->merge(
            $berita->map(function ($item) {
                return [
                    'type' => 'berita',
                    'title' => $item->judul,
                    'description' => $item->deskripsi,
                    'image' => $item->images,
                    'date' => $item->tanggal,
                    'location' => null,
                    'url' => route('berita.show', $item->slug),
                ];
            })
        );

        $results = $results->merge(
            $fasilitas->map(function ($item) {
                return [
                    'type' => 'fasilitas',
                    'title' => $item->nama,
                    'description' => $item->alamat,
                    'image' => $item->foto,
                    'date' => null,
                    'location' => $item->alamat,
                    'url' => route('fasilitas-kota.show', $item->slug),
                ];
            })
        );

        $results = $results->merge(
            $agenda->map(function ($item) {
                return [
                    'type' => 'agenda',
                    'title' => $item->judul_acara,
                    'description' => $item->deskripsi,
                    'image' => $item->banner,
                    'date' => $item->tanggal_mulai,
                    'location' => $item->lokasi_acara,
                    'url' => route('agenda.show', $item->slug),
                ];
            })
        );

        $results = $results->merge(
            $penghargaan->map(function ($item) {
                return [
                    'type' => 'penghargaan',
                    'title' => $item->judul,
                    'description' => $item->deskripsi,
                    'image' => $item->foto,
                    'date' => $item->tanggal,
                    'location' => null,
                    'url' => route('penghargaan.show', $item->slug),
                ];
            })
        );

        dd($keyword, $berita, $fasilitas, $agenda, $penghargaan);

        return Inertia::render('search/index', [
            'keyword' => $keyword,
            'berita' => $berita,
            'fasilitas' => $fasilitas,
            'agenda' => $agenda,
            'penghargaan' => $penghargaan,
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
