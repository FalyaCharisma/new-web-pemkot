<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berita;

class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);

        $berita = Berita::where('status_enabled', 1)
            ->orderBy('tanggal', 'desc')
            ->paginate($perPage);

        return response()->json([
            'responsCode' => '200',
            'responsDesc' => 'Success',
            'page' => $berita->currentPage(),
            'per_page' => $berita->perPage(),
            'total' => $berita->total(),
            'total_pages' => $berita->lastPage(),
            'berita' => $berita->items(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
