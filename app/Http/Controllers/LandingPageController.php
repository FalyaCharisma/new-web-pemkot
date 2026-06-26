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

class LandingPageController extends Controller
{
    public function index()
    {
        $hero = Banner::where('status_enabled', 1)->first();
        $hero = $hero ? asset('storage/banner/' . $hero->gambar) : null;

        $berita = Berita::query()
            ->where('status_published', 1)
            ->where('status_enabled', 1)
            ->latest('tanggal')
            ->take(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => Str::limit(strip_tags($item->judul), 90),
                    'slug' => $item->slug,
                    'tanggal' => $item->tanggal,
                    'author' => $item->author,
                    'image_url' => filter_var($item->images, FILTER_VALIDATE_URL) ? $item->images : asset('storage/berita/' . $item->images),

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

        $peta = PetaInteraktif::where('menu', 'landing')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'desc' => strip_tags($item->desc),
                    'category' => $item->category,
                    'lat' => (float) $item->lat,
                    'lng' => (float) $item->lng,
                ];
            });

        $agenda = Agenda::where('status_enabled', 1)
            ->orderBy('tanggal_mulai')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'tanggal_mulai' => $item->tanggal_mulai,
                    'tanggal_selesai' => $item->tanggal_selesai,
                    'judul_acara' => $item->judul_acara,
                    'lokasi_acara' => $item->lokasi_acara,
                    'maps_lokasi' => $item->maps_lokasi,
                    'banner' => $item->banner ? asset('storage/acara/' . $item->banner) : null,
                    'deskripsi' => strip_tags($item->deskripsi),
                    'status_enabled' => $item->status_enabled,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,

                    // tambahan sesuai types
                    'is_ongoing' => Carbon::now()->between(Carbon::parse($item->tanggal_mulai), Carbon::parse($item->tanggal_selesai)),
                    'tanggal_mulai_formatted' => Carbon::parse($item->tanggal_mulai)->translatedFormat('d F Y'),
                    'tanggal_selesai_formatted' => Carbon::parse($item->tanggal_selesai)->translatedFormat('d F Y'),
                ];
            });

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

        return Inertia::render('landingpage/index', [
            'berita' => $berita,
            'layanan' => $layanan,
            'peta' => $peta,
            'agenda' => $agenda,
            'hero' => $hero,
            'wisata' => $wisata,
        ]);
    }
}
