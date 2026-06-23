<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Penghargaan;
use App\Models\Berita;
use App\Models\FasilitasKota;
use App\Models\Agenda;
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

        $berita = Berita::query()
            ->when($keyword, fn($q) =>
                $q->where('judul', 'like', "%{$keyword}%")
                ->orWhere('deskripsi', 'like', "%{$keyword}%")
            )
            ->latest()
            ->get()
            ->map(fn($item) => [
                'type' => 'berita',
                'title' => $item->judul,
                'description' => Str::limit(strip_tags($item->deskripsi), 120),
                'image' => $item->images ? asset('storage/berita/' . $item->images) : null,
                'date' => $item->tanggal,
                'location' => null,
                'url' => route('berita.show', $item->slug),
            ]);

        $agenda = Agenda::query()
            ->when($keyword, fn($q) =>
                $q->where('judul_acara', 'like', "%{$keyword}%")
                ->orWhere('deskripsi', 'like', "%{$keyword}%")
            )
            ->latest()
            ->get()
            ->map(fn($item) => [
                'type' => 'agenda',
                'title' => $item->judul_acara,
                'description' => Str::limit(strip_tags($item->deskripsi), 120),
                'image' => $item->banner ? asset('storage/agenda/' . $item->banner) : null,
                'date' => $item->tanggal_mulai,
                'location' => $item->lokasi_acara,
                'url' => route('agenda.show', $item->id),
            ]);

        $fasilitas = FasilitasKota::query()
            ->when($keyword, fn($q) =>
                $q->where('nama', 'like', "%{$keyword}%")
                ->orWhere('alamat', 'like', "%{$keyword}%")
            )
            ->latest()
            ->get()
            ->map(fn($item) => [
                'type' => 'fasilitas',
                'title' => $item->nama,
                'description' => $item->alamat,
                'image' => $item->foto ? asset('storage/fasilitas/' . $item->foto) : null,
                'date' => $item->created_at,
                'location' => $item->alamat,
                'url' => route('fasilitas.show', $item->slug),
            ]);

        $penghargaan = Penghargaan::query()
            ->when($keyword, fn($q) =>
                $q->where('judul', 'like', "%{$keyword}%")
                ->orWhere('deskripsi', 'like', "%{$keyword}%")
            )
            ->latest()
            ->get()
            ->map(fn($item) => [
                'type' => 'penghargaan',
                'title' => $item->judul,
                'description' => Str::limit(strip_tags($item->deskripsi), 120),
                'image' => $item->foto ? asset('storage/penghargaan/' . $item->foto) : null,
                'date' => $item->tanggal,
                'location' => null,
                'url' => route('penghargaan.show', $item->slug),
            ]);

        return Inertia::render('search/index', [
            'keyword' => $keyword,
            'results' => [
                'berita' => $berita,
                'agenda' => $agenda,
                'fasilitas' => $fasilitas,
                'penghargaan' => $penghargaan,
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
