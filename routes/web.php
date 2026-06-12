<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\PerangkatDaerahController;
use App\Http\Controllers\TentangKediriController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index']);
Route::get('/perangkat-daerah/{slug}', [PerangkatDaerahController::class, 'index']);
Route::get('/tentang-kediri/{slug?}', [TentangKediriController::class, 'tentangKediri'])->name('tentang-kediri');

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

Route::get('/akomodasi', function () {
    return Inertia::render('akomodasi/index');
})->name('akomodasi.index');

Route::get('/pesona-kediri', function () {
    return Inertia::render('pesonakediri/index');
})->name('pesonakediri.index');

require __DIR__ . '/auth.php';
