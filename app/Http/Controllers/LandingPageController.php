<?php

namespace App\Http\Controllers;
use App\Models\Berita;
use App\Models\LayananPublik;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LandingPageController extends Controller
{
    public function index()
{
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
                'image_url' => filter_var($item->images, FILTER_VALIDATE_URL)
                    ? $item->images
                    : asset('storage/berita/' . $item->images),

                'deskripsi' => Str::limit(strip_tags($item->deskripsi), 80),
            ];
        });


    $layanan = LayananPublik::where('status_enabled',1)
        ->orderBy('id')
        ->get()
        ->map(function ($item) {

            return [
                'id' => $item->id,
                'title' => $item->judul,
                'desc' => Str::limit(strip_tags($item->deskripsi), 50),
                'url' => $item->link,

                'icon' => $item->gambar
                    ? asset('storage/layanan-publik/'.$item->gambar)
                    : null,
            ];
        });


    return Inertia::render('landingpage/index',[
        'berita'=>$berita,
        'layanan'=>$layanan
    ]);
}
}
