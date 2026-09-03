<?php

namespace App\Http\Controllers;
use App\Models\Berita;
use App\Models\PetaInteraktif;
use App\Models\LayananPublik;
use App\Models\Agenda;
use App\Models\Banner;
use App\Models\FasilitasKota;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Models\BudayaWarisan;

class LandingPageController extends Controller
{
    public function index()
    {
        $hero = Banner::where('status_enabled', 1)->first();
        $hero = $hero ? asset('storage/banner/' . $hero->gambar) : null;

        $beritaProkopim = Berita::query()
            ->where('status_published', 1)
            ->where('status_enabled', 1)
            ->where('author', 2)
            ->latest('tanggal')
            ->take(10)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => Str::limit(strip_tags($item->judul), 90),
                    'slug' => $item->slug,
                    'tanggal' => $item->tanggal,
                    'author' => $item->author,
                    'images' => filter_var($item->images, FILTER_VALIDATE_URL)
                        ? $item->images
                        : asset('storage/berita/' . $item->images),
                    'deskripsi' => Str::limit(strip_tags($item->deskripsi), 80),
                ];
            });

        $beritaKominfo = Berita::query()
            ->where('status_published', 1)
            ->where('status_enabled', 1)
            ->whereNull('author')
            ->latest('tanggal')
            ->take(4)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => Str::limit(strip_tags($item->judul), 90),
                    'slug' => $item->slug,
                    'tanggal' => $item->tanggal,
                    'author' => $item->author,
                    'images' => filter_var($item->images, FILTER_VALIDATE_URL)
                        ? $item->images
                        : asset('storage/berita/' . $item->images),
                    'deskripsi' => Str::limit(strip_tags($item->deskripsi), 80),
                ];
            });

        $layanan = LayananPublik::where('status_enabled', 1)
            ->orderBy('id')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->judul,
                    'desc' => Str::limit(strip_tags($item->deskripsi), 50),
                    'url' => $item->link,

                    'icon' => $item->gambar ? asset('storage/layanan-publik/' . $item->gambar) : null,
                ];
            });

        $peta = FasilitasKota::with('kategori', 'galeriVideo')
        ->where('status_enabled', 1)
        ->whereNotNull('lat')
        ->whereNotNull('lng')
        ->latest()
        ->get()
        ->map(
            fn($item) => [
                'id' => $item->id,
                'name' => $item->nama,
                'slug' => $item->slug,
                'desc' => $item->alamat,

                'category_id' => $item->kategori_id,
                'category' => $item->kategori?->nama_kategori,
                'icon' => $item->kategori?->icon,

                'lat' => (float) $item->lat,
                'lng' => (float) $item->lng,
                'foto' => $item->foto,
                'jam_buka' => $item->jam_buka,
                'jam_tutup' => $item->jam_tutup,
                'map' => $item->map,

                'has_video' => $item->galeriVideo->isNotEmpty(),
                'video_url' => optional($item->galeriVideo->first())->url,
            ],
        );

        $now = Carbon::now();
        $today = Carbon::today();

        $agendaData = Agenda::where('status_enabled', 1)
            ->get()
            ->map(function ($item) use ($today) {

                $mulai = Carbon::parse($item->tanggal_mulai);

                $selesai = $item->tanggal_selesai
                    ? Carbon::parse($item->tanggal_selesai)
                    : $mulai->copy();

                /*
                |--------------------------------------------------------------------------
                | STATUS AGENDA BERDASARKAN TANGGAL
                |--------------------------------------------------------------------------
                |
                | Contoh:
                | Mulai   : 03 September 2026
                | Selesai : 05 September 2026
                | Hari ini: 03 September 2026
                |
                | Maka status = Sedang Berlangsung
                |
                */

                $isOngoing = $today->between(
                    $mulai->copy()->startOfDay(),
                    $selesai->copy()->endOfDay()
                );

                $isUpcoming = $today->lt(
                    $mulai->copy()->startOfDay()
                );

                $isFinished = $today->gt(
                    $selesai->copy()->endOfDay()
                );

                return [
                    'id' => $item->id,

                    'tanggal_mulai' => $item->tanggal_mulai,
                    'tanggal_selesai' => $item->tanggal_selesai,

                    'judul_acara' => $item->judul_acara,
                    'lokasi_acara' => $item->lokasi_acara,
                    'maps_lokasi' => $item->maps_lokasi,

                    'banner' => $item->banner
                        ? asset('storage/agenda/' . $item->banner)
                        : null,

                    'deskripsi' => strip_tags($item->deskripsi),

                    'status_enabled' => $item->status_enabled,

                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,

                    // STATUS
                    'is_ongoing' => $isOngoing,
                    'is_upcoming' => $isUpcoming,
                    'is_finished' => $isFinished,

                    // LABEL BADGE
                    'status_label' => $isOngoing
                        ? 'Sedang Berlangsung'
                        : ($isUpcoming
                            ? 'Agenda Mendatang'
                            : 'Sudah Selesai'),

                    // FORMAT TANGGAL
                    'tanggal_mulai_formatted' => $mulai
                        ->translatedFormat('d F Y'),

                    'tanggal_selesai_formatted' => $selesai
                        ->translatedFormat('d F Y'),
                ];
            });


        /*
        |--------------------------------------------------------------------------
        | KELOMPOK AGENDA
        |--------------------------------------------------------------------------
        */

        // 1. SEDANG BERLANGSUNG
        $ongoing = $agendaData
            ->filter(fn ($item) => $item['is_ongoing'])
            ->sortBy('tanggal_mulai')
            ->values();


        // 2. AGENDA MENDATANG
        // Yang paling dekat ditampilkan terlebih dahulu
        $upcoming = $agendaData
            ->filter(fn ($item) => $item['is_upcoming'])
            ->sortBy('tanggal_mulai')
            ->values();


        // 3. SUDAH SELESAI
        // Yang paling baru selesai ditampilkan terlebih dahulu
        $finished = $agendaData
            ->filter(fn ($item) => $item['is_finished'])
            ->sortByDesc(
                fn ($item) =>
                    $item['tanggal_selesai'] ?? $item['tanggal_mulai']
            )
            ->values();


        /*
        |--------------------------------------------------------------------------
        | FEATURED AGENDA
        |--------------------------------------------------------------------------
        |
        | Prioritas:
        |
        | 1. Sedang Berlangsung
        | 2. Agenda Mendatang terdekat
        | 3. Agenda yang baru selesai
        |
        */

        $featured = $ongoing->first()
            ?? $upcoming->first()
            ?? $finished->first();


        /*
        |--------------------------------------------------------------------------
        | AGENDA LAINNYA
        |--------------------------------------------------------------------------
        |
        | Urutan:
        |
        | 1. Agenda Mendatang
        | 2. Agenda Sudah Selesai
        |
        */

        $otherAgenda = $upcoming
            ->concat($finished)
            ->values();


        /*
        |--------------------------------------------------------------------------
        | GABUNGKAN FEATURED + AGENDA LAINNYA
        |--------------------------------------------------------------------------
        */

        if ($featured) {

            // Jangan tampilkan featured dua kali
            $otherAgenda = $otherAgenda
                ->reject(
                    fn ($item) =>
                        $item['id'] === $featured['id']
                )
                ->values();

            /*
            |--------------------------------------------------------------------------
            | AGENDA FINAL
            |--------------------------------------------------------------------------
            |
            | Index 0 = Featured
            | Index berikutnya = Agenda lainnya
            |
            */

            $agenda = collect([$featured])
                ->concat($otherAgenda)
                ->values();

        } else {

            $agenda = collect();
        }

        $wisata = FasilitasKota::with(['kategori'])
            ->where('status_enabled', 1)
            ->whereIn('kategori_id', [13, 6, 4, 5, 2])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama' => $item->nama,

                    'foto' => $item->foto ? asset('storage/fasilitas/' . $item->foto) : null,

                    'alamat' => $item->alamat,
                    'map' => $item->map,
                    'slug' => $item->slug,

                    'kategori_id' => $item->kategori_id,

                    'kategori' => [
                        'id' => $item->kategori?->id,
                        'nama_kategori' => $item->kategori?->nama_kategori,
                    ],
                ];
            });

        $budayaWarisan = BudayaWarisan::where('status', 1)
            ->orderBy('urutan', 'asc')
            ->get();

        return Inertia::render('landingpage/index', [
            'beritaProkopim' => $beritaProkopim,
            'beritaKominfo' => $beritaKominfo,
            'layanan' => $layanan,
            'peta' => $peta,
            'agenda' => $agenda,
            'hero' => $hero,
            'wisata' => $wisata,
            'budayaWarisan' => $budayaWarisan,
        ]);
    }
}
