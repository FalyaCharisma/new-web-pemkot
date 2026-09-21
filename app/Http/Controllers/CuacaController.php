<?php

namespace App\Http\Controllers;

use App\Models\Kelurahan;
use App\Models\Kecamatan;
use App\Services\SplpService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;

class CuacaController extends Controller
{
    /**
     * Ambil daftar kecamatan.
     */
    public function kecamatan(): JsonResponse
    {
        $data = Kecamatan::query()
            ->where('status_enabled', 1)
            ->orderBy('nm_kecamatan')
            ->get([
                'kd_kecamatan',
                'nm_kecamatan',
            ]);

        return response()->json($data);
    }

    /**
     * Ambil kelurahan berdasarkan kecamatan.
     */
    public function kelurahan(string $kdKecamatan): JsonResponse
    {
        $data = Kelurahan::query()
            ->where('kd_kecamatan', $kdKecamatan)
            ->orderBy('nm_kelurahan')
            ->get([
                'kd_kelurahan',
                'nm_kelurahan',
            ]);

        return response()->json($data);
    }

    /**
     * Ambil cuaca berdasarkan kelurahan.
     */
    public function cuaca(
        Request $request,
        SplpService $splp
    ): JsonResponse {
        $request->validate([
            'kd_kelurahan' => ['required', 'string'],
        ]);

        try {

            $kelurahan = Kelurahan::query()
                ->where('kd_kelurahan', $request->kd_kelurahan)
                ->firstOrFail();

            $data = $splp->getCuacaSaatIni(
                $kelurahan->kd_kelurahan
            );

            return response()->json($data);

        } catch (Throwable $e) {

            return response()->json([
                'status' => 500,
                'message' => 'Gagal mengambil data cuaca.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}