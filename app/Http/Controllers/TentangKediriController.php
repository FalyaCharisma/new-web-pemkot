<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Models\SejarahKota;
use App\Models\TentangKota;
use App\Models\DaftarPimpinan;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\Jabatan;
use App\Models\OPD;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TentangKediriController extends Controller
{
    public function tentangKediri(string $slug = 'sekilas')
    {
        $menuList = [
            [
                'nama' => 'Sekilas Kediri',
                'slug' => 'sekilas',
            ],
            [
                'nama' => 'Visi & Misi',
                'slug' => 'visi-misi',
            ],
            [
                'nama' => 'Lambang Daerah',
                'slug' => 'lambang-daerah',
            ],
            [
                'nama' => 'Sejarah Kediri',
                'slug' => 'sejarah-kediri',
            ],
            [
                'nama' => 'Profil Pimpinan',
                'slug' => 'profil-pimpinan',
            ],
        ];

        $kategori = collect($menuList)->firstWhere('slug', $slug);

        if (!$kategori) {
            abort(404);
        }

        $jumlahKelurahan = Kelurahan::count();

        $sejarah = SejarahKota::where('status_enabled', 1)->orderBy('tahun')->get();

        $visi = TentangKota::where([['status_enabled', 1], ['title', 'visi']])->first();

        $misi = TentangKota::where([['status_enabled', 1], ['title', 'misi']])->get();

        $lambang = TentangKota::where([['status_enabled', 1], ['title', 'lambang']])->first();

        $sekilas = TentangKota::where([['status_enabled', 1], ['title', 'sekilas']])->first();

        $pimpinan = DaftarPimpinan::with('jabatan')->where('status_enabled', 1)
            ->whereIn('id_jabatan', [1, 2])
            ->get();

        return Inertia::render('tentang-kediri/index', [
            'kategori' => $kategori,
            'kategoriList' => $menuList,

            'sekilas' => $sekilas,
            'visi' => $visi,
            'misi' => $misi,
            'lambang' => $lambang,
            'sejarah' => $sejarah,
            'pimpinan' => $pimpinan,

            'statistik' => [
                'kecamatan' => Kecamatan::count(),
                'kelurahan' => Kelurahan::count(),
                'luas_wilayah' => '63,40',
                'jumlah_penduduk' => '298.820',
                'laki_laki' => '148.296',
                'perempuan' => '150.524',
            ],
        ]);
    }
}
