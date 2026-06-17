<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\PerangkatDaerahController;
use App\Http\Controllers\TentangKediriController;
use App\Http\Controllers\KelurahanController;
use App\Http\Controllers\FasilitasKotaController;
use App\Http\Controllers\PesonaController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\PenghargaanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index']);
Route::get('/perangkat-daerah/{slug}', [PerangkatDaerahController::class, 'index']);
Route::get('/tentang-kediri/{slug?}', [TentangKediriController::class, 'tentangKediri'])->name('tentang-kediri');
Route::get('/kelurahan/{kecamatan?}', [KelurahanController::class, 'kelurahan']);
Route::get('/penghargaan', [PenghargaanController::class, 'penghargaan'])->name('penghargaan');
Route::get('/penghargaan/{id}', [PenghargaanController::class, 'show'])->name('penghargaan.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('fasilitas-kota', FasilitasKotaController::class);
Route::resource('pesona-kediri', PesonaController::class);
Route::resource('berita', BeritaController::class);



require __DIR__ . '/auth.php';
