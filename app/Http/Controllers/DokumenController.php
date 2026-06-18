<?php

namespace App\Http\Controllers;

use App\Models\Dokumen;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class DokumenController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $tahun = $request->tahun;
        $sort = $request->sort ?? 'latest';

        $query = Dokumen::query()->where('status_published', 1)->where('status_enabled', 1);

        $query->when($search, function ($q) use ($search) {
            $q->where('judul', 'like', "%{$search}%");
        });

        $query->when($tahun, function ($q) use ($tahun) {
            $q->whereYear('tanggal', $tahun);
        });


        if ($sort == 'oldest') {
            $query->oldest('tanggal');
        } else {
            $query->latest('tanggal');
        }

        $dokumen = $query->paginate(12)->withQueryString();

        $totalDokumen = Dokumen::query()->where('status_published', 1)->where('status_enabled', 1)->count();

        $rentang = Dokumen::query()
            ->where('status_published', 1)
            ->where('status_enabled', 1)
            ->selectRaw('MIN(YEAR(tanggal)) as awal')
            ->selectRaw('MAX(YEAR(tanggal)) as akhir')
            ->first();

        $tahunList = Dokumen::query()
            ->where('status_published', 1)
            ->where('status_enabled', 1)
            ->selectRaw('YEAR(tanggal) as tahun')
            ->distinct()
            ->orderByDesc('tahun')
            ->pluck('tahun');

        return Inertia::render('dokumen/index', [
            'dokumen' => $dokumen,
            'totalDokumen' => $totalDokumen,
            'rentang' => $rentang,
            'tahunList' => $tahunList,
            'filters' => [
                'search' => $search,
                'tahun' => $tahun,
                'sort' => $sort,
            ],
        ]);
    }
}
