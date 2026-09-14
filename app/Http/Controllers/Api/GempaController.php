<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SplpService;
use Illuminate\Http\JsonResponse;
use Throwable;

class GempaController extends Controller
{
    public function index(SplpService $splpService): JsonResponse
    {
        try {
            $gempaM5 = $splpService->getGempaM5();

            $gempaM5['info'] = array_slice(
                $gempaM5['info'] ?? [], 0, 5
            );

            $gempaDirasakan = $splpService->getGempaDirasakan();

            $gempaDirasakan['info'] = array_slice(
                $gempaDirasakan['info'] ?? [], 0, 5
            );

            $gempaTsunami = $splpService->getGempaTsunami();

            $gempaTsunami['info'] = array_slice(
                $gempaTsunami['info'] ?? [], 0, 5
            );

            return response()->json([
                'success' => true,
                'data' => [
                    'terkini' => $splpService->getGempaTerkini(),
                    'm5' => $gempaM5,
                    'dirasakan' => $gempaDirasakan,
                    'tsunami' => $gempaTsunami,
                ],
            ]);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil informasi gempa.',
            ], 500);
        }
    }
}