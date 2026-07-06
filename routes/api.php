<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\AgendaController;
use App\Http\Controllers\Api\TentangKediriController;
use App\Http\Controllers\Api\BannerController;

Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/agenda', [AgendaController::class, 'index']);
Route::prefix('tentang-kediri')->group(function () {
    Route::get('/sekilas', [TentangKediriController::class, 'sekilas']);
    Route::get('/visi-misi', [TentangKediriController::class, 'visiMisi']);
    Route::get('/lambang-daerah', [TentangKediriController::class, 'lambang']);
    Route::get('/sejarah', [TentangKediriController::class, 'sejarah']);
    Route::get('/profil-pimpinan', [TentangKediriController::class, 'profilPimpinan']);
});
Route::get('/banner/{kategori}', [BannerController::class, 'index']);

