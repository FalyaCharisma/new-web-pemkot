<?php

namespace App\Http\Controllers;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class KelurahanController extends Controller
{
    public function kelurahan(string $kecamatan = null)
    {
        $kecamatanList = Kecamatan::orderBy('nm_kecamatan')
            ->get();

        $selectedKecamatan = $kecamatan
            ? Kecamatan::where('kd_kecamatan', $kecamatan)->first()
            : $kecamatanList->first();

        $kelurahan = Kelurahan::with('kecamatan')
            ->where(
                'kd_kecamatan',
                $selectedKecamatan?->kd_kecamatan
            )
            ->orderBy('nm_kelurahan')
            ->get();

        return Inertia::render(
            'kelurahan/index',
            [
                'kecamatanList' => $kecamatanList,
                'selectedKecamatan' => $selectedKecamatan,
                'kelurahan' => $kelurahan,
            ]
        );
    }
}
