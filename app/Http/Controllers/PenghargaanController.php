<?php

namespace App\Http\Controllers;
use App\Models\Penghargaan;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PenghargaanController extends Controller
{
    public function penghargaan(Request $request)
    {
        $query = Penghargaan::query();

        // filter tahun
        if ($request->filled('year')) {
            $query->whereYear('tanggal', $request->year);
        }

        $penghargaan = $query->latest('tanggal')->paginate(9)->withQueryString();

        $years = Penghargaan::query()->selectRaw('YEAR(tanggal) as year')->distinct()->orderByDesc('year')->pluck('year');

        return Inertia::render('penghargaan/index', [
            'penghargaan' => $penghargaan,
            'years' => $years,
            'filters' => [
                'year' => $request->year,
            ],
        ]);
    }

    public function show($id)
    {
        $penghargaan = Penghargaan::findOrFail($id);

        $penghargaanLainnya = Penghargaan::where('id', '!=', $id)->latest('tanggal')->limit(5)->get();

        return Inertia::render('penghargaan/detail', [
            'penghargaan' => $penghargaan,
            'penghargaanLainnya' => $penghargaanLainnya,
        ]);
    }
}
