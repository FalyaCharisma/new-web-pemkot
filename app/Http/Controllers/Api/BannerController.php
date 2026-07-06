<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($kategori)
    {
        $banner = Banner::where([
            ['kategori', $kategori],
            ['status_enabled', 1],
        ])->first();

        if (!$banner) {
            return response()->json([
                'responsCode' => '404',
                'responsDesc' => 'Banner tidak ditemukan',
            ], 404);
        }

        $banner->gambar = asset('storage/banner/' . $banner->gambar);

        return response()->json([
            'responsCode' => '200',
            'responsDesc' => 'Success',
            'data' => $banner,
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
