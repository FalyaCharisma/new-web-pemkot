<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\PerangkatDaerahController;
use App\Http\Controllers\TentangKediriController;
use App\Http\Controllers\KelurahanController;
use App\Http\Controllers\FasilitasKotaController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\DokumenController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\PenghargaanController;
use App\Http\Controllers\PesonaUnggulanController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LayananPublikController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index']);
Route::get('/perangkat-daerah/{slug}', [PerangkatDaerahController::class, 'index']);
Route::get('/tentang-kediri/{slug?}', [TentangKediriController::class, 'tentangKediri'])->name('tentang-kediri');
Route::get('/kelurahan/{kecamatan?}', [KelurahanController::class, 'kelurahan']);
Route::get('/penghargaan', [PenghargaanController::class, 'penghargaan'])->name('penghargaan');
Route::get('/penghargaan/{id}', [PenghargaanController::class, 'show'])->name('penghargaan.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    //*************************************** ADMIN PAGE *************************************************
    Route::controller(UserController::class)->group(function(){
        Route::get('list-user', 'list_user')->name('list_user');
        Route::get('value-user/{id}', 'value_user')->name('value_user');
        Route::post('update-user', 'update_user')->name('update_user');
    });

    //*************************************** HOME PAGE *************************************************    
    Route::controller(HomeController::class)->group(function(){
        Route::get('banner-beranda', 'banner_beranda')->name('banner_beranda');
        Route::get('update-status-banner/{status}/{id}', 'update_status_banner')->name('update_status_banner');
        Route::post('upload-banner', 'upload_banner')->name('upload_banner');
        Route::get('arsip-banner', 'arsip_banner')->name('arsip_banner');
        Route::post('/hapus-banner/{id}', 'hapus_banner')->name('hapus_banner');
    });

    //*************************************** PROGRAM UNGGULAN PAGE *************************************************    
    Route::controller(LayananPublikController::class)->group(function() {
        Route::get('/list-layanan-publik', 'list_layanan_publik')->name('list_layanan_publik');
        Route::get('/form-layanan-publik/{id}', 'form_layanan_publik')->name('form_layanan_publik');
        Route::post('/update-layanan-publik', 'update_layanan_publik')->name('update_layanan_publik');
        Route::post('/hapus-layanan-publik/{id}', 'hapus_layanan_publik')->name('hapus_layanan_publik');
    });

    Route::controller(PetaController::class)->group(function() {
        Route::get('/peta-interaktif', 'peta_interaktif')->name('peta_interaktif');
    });

});

Route::resource('fasilitas-kota', FasilitasKotaController::class);
Route::get('/berita', [BeritaController::class, 'berita'])->name('berita');
Route::get('/berita/{slug}', [BeritaController::class, 'show'])->name('berita.show');
Route::resource('galeri', GaleriController::class);
Route::resource('dokumen', DokumenController::class);
Route::resource('agenda', AgendaController::class);
Route::resource('pesona-unggulan', PesonaUnggulanController::class);
Route::resource('search', SearchController::class);
Route::get('/search', [SearchController::class, 'index'])
    ->name('search');


require __DIR__ . '/auth.php';
