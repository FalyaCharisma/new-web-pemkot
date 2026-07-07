<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SejarahKota;
use App\Models\TentangKota;
use App\Models\DaftarPimpinan;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\Jabatan;
use App\Models\OPD;

class TentangKediriController extends Controller
{
    public function sekilas()
    {
        $sekilas = TentangKota::where([
            ['status_enabled',1],
            ['title','sekilas-kota']
        ])->first();

        if($sekilas){
            $sekilas->gambar = asset(
                $sekilas->gambar
                    ? 'storage/sekilas/'.$sekilas->gambar
                    : 'assets/images/noimage.png'
            );
        }

        $kecamatan = Kecamatan::withCount('kelurahan')
            ->orderBy('nm_kecamatan')
            ->get();

        $tentang = TentangKota::whereIn('title',[
            'luas-wilayah',
            'laki-laki',
            'perempuan'
        ])->pluck('deskripsi','title');

        return response()->json([
            'responsCode'=>'200',
            'responsDesc'=>'Success',
            'data'=>[
                'sekilas'=>$sekilas,
                'statistik'=>[
                    'kecamatan'=>$kecamatan->count(),
                    'kelurahan'=>Kelurahan::count(),
                    'luas_wilayah'=>$tentang['luas-wilayah'] ?? '',
                    'laki_laki'=>$tentang['laki-laki'] ?? '',
                    'perempuan'=>$tentang['perempuan'] ?? '',
                ]
            ]
        ]);
    }

    public function visiMisi()
    {
        $visi = TentangKota::where([
            ['status_enabled',1],
            ['title','visi']
        ])->first();

        $misi = TentangKota::where([
            ['status_enabled',1],
            ['title','misi']
        ])->get();

        return response()->json([
            'responsCode'=>'200',
            'responsDesc'=>'Success',
            'data'=>[
                'visi'=>$visi,
                'misi'=>$misi
            ]
        ]);
    }

    public function lambang()
    {
        $lambang = TentangKota::where([
            ['status_enabled',1],
            ['title','lambang']
        ])->first();

        return response()->json([
            'responsCode'=>'200',
            'responsDesc'=>'Success',
            'data'=>$lambang
        ]);
    }

    public function sejarah()
    {
        $sejarah = SejarahKota::where('status_enabled',1)
            ->orderBy('tahun')
            ->get()
            ->map(function($item){
                return [
                    'id'=>$item->id,
                    'tahun'=>$item->tahun,
                    'judul'=>$item->judul,
                    'deskripsi'=>strip_tags($item->keterangan),
                ];
            });

        return response()->json([
            'responsCode'=>'200',
            'responsDesc'=>'Success',
            'data'=>$sejarah
        ]);
    }

    public function profilPimpinan()
    {
        $pimpinan = DaftarPimpinan::with('jabatan')
            ->where('status_enabled',1)
            ->whereIn('id_jabatan',[1,2])
            ->get();

        return response()->json([
            'responsCode'=>'200',
            'responsDesc'=>'Success',
            'data'=>$pimpinan
        ]);
    }

    public function geografis()
    {
        $geografis = TentangKota::where([
            ['title','geografis'],
            ['status_enabled',1]
        ])->get();

        return response()->json([
            'responsCode'=>'200',
            'responsDesc'=>'Success',
            'data'=>$geografis
        ]);
    }
}
