<?php

namespace App\Http\Controllers;
use App\Models\OPD;
use App\Models\KategoriOPD;
use App\Models\Jabatan;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PerangkatDaerahController extends Controller
{
    public function index(string $slug)
    {
        $kategori = KategoriOPD::with([
            'opd.pimpinan.jabatan'
        ])
        ->where('slug', $slug)
        ->firstOrFail();

        $kategoriList = KategoriOPD::select(
            'id',
            'nama',
            'slug'
        )->get();

        return Inertia::render(
            'perangkat-daerah/index',
            [
                'kategori' => $kategori,
                'kategoriList' => $kategoriList,
            ]
        );
    }
}
