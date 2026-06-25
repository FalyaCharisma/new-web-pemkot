<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PesonaUnggulan;
use App\Models\Berita;
use App\Models\KategoriBerita;
use App\Models\PetaInteraktif;
use Inertia\Inertia;

class PesonaUnggulanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $kategori = $request->kategori;

        $pesona = PesonaUnggulan::with('kategori')
            ->when($kategori, function ($q) use ($kategori) {
                $q->where('id_kategori', $kategori);
            })
            ->latest()
            ->get();

        $peta = PetaInteraktif::with('kategoriFasilitas')->where('menu', 'pesona')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'desc' => $item->desc,
                    'lat' => $item->lat,
                    'lng' => $item->lng,
                    'category' => $item->category,
                    'icon' => $item->kategoriFasilitas?->icon,
                    'jam_buka' => $item->jam_buka,
                    'jam_tutup' => $item->jam_tutup,
                ];
            });

        return Inertia::render('pesonakediri/index', [
            'pesona' => $pesona,
            'kategori' => $kategori,
            'peta' => $peta,
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
    public function show($slug)
    {
        $kategori_berita = KategoriBerita::where('status_enabled', 1)->get();
        $pesona = PesonaUnggulan::with('kategori')->where('slug', $slug)->firstOrFail();

        // dd($pesona);

        // tambah viewer
        $pesona->increment('views');

        $judulPesona = strtolower($pesona->judul);

        $keywords = preg_split('/\s+/', $judulPesona);

        $stopWords = ['dan', 'di', 'ke', 'dari', 'yang', 'untuk', 'dengan', 'kota', 'kabupaten'];

        $related = Berita::with('kategori')
            ->get()
            ->map(function ($berita) use ($pesona, $judulPesona, $keywords, $stopWords) {
                $score = 0;

                $judul = strtolower($berita->judul);
                $deskripsi = strtolower(strip_tags($berita->deskripsi));

                // 1. Judul mengandung frasa lengkap
                if (str_contains($judul, $judulPesona)) {
                    $score += 100;
                }

                // 2. Keyword
                foreach ($keywords as $word) {
                    $word = trim($word);

                    if (strlen($word) < 3 || in_array($word, $stopWords)) {
                        continue;
                    }

                    // Keyword di judul
                    if (str_contains($judul, $word)) {
                        $score += 10;
                    }

                    // Keyword di deskripsi
                    if (str_contains($deskripsi, $word)) {
                        $score += 5;
                    }
                }

                // 3. Bonus kategori
                if (!empty($berita->id_kategori) && $berita->id_kategori == $pesona->kategori_id) {
                    $score += 3;
                }

                $berita->score = $score;

                return $berita;
            })
            ->filter(fn($berita) => $berita->score > 0)
            ->sort(function ($a, $b) {
                // Skor tertinggi
                if ($a->score === $b->score) {
                    // Jika skor sama, tampilkan yang terbaru
                    return strtotime($b->tanggal) <=> strtotime($a->tanggal);
                }

                return $b->score <=> $a->score;
            })
            ->take(4)
            ->values();

        // Jika hasil kurang dari 4,
        // tambahkan berita terbaru yang belum ada
        if ($related->count() < 4) {
            $additional = Berita::with('kategori')
                ->whereNotIn('id', $related->pluck('id')->toArray())
                ->orderByDesc('tanggal')
                ->take(4 - $related->count())
                ->get();

            $related = $related->merge($additional)->unique('id')->values();
        }

        return Inertia::render('pesonakediri/detail', [
            'pesona' => $pesona,
            'related' => $related,
            'kategori_berita' => $kategori_berita,
        ]);
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
