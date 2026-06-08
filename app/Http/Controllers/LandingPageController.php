<?php

namespace App\Http\Controllers;
use App\Models\Berita;
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
                    'judul' => Str::limit(strip_tags($item->judul), 65),
                    'slug' => $item->slug,
                    'tanggal' => $item->tanggal,
                    'author' => $item->author,
                    'image_url' => filter_var($item->images, FILTER_VALIDATE_URL)
    ? $item->images
    : asset('storage/berita/' . $item->images),
                    'deskripsi' => Str::limit(strip_tags($item->deskripsi), 80),
                ];
            });

        return Inertia::render('landingpage/index', [
            'berita' => $berita,
        ]);
    }
}
