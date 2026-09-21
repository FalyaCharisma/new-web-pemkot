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
            return response()->json([
                'success' => true,
                'data' => [
                    'terkini' => $splpService->getGempaTerkini(),
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