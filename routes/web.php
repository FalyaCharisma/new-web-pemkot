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
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PetaController;
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

    //*************************************** FASILITAS PAGE *************************************************    
    Route::controller(FasilitasKotaController::class)->group(function() {
        Route::get('/list-fasilitas', 'list_fasilitas')->name('list_fasilitas');
        Route::get('/form-fasilitas/{id}', 'form_fasilitas')->name('form_fasilitas');   
        Route::post('/update-fasilitas', 'update_fasilitas')->name('update_fasilitas'); 
        Route::post('/hapus-fasilitas/{id}', 'hapus_fasilitas')->name('hapus_fasilitas');
        Route::get('/get-sub-kategori', 'get_sub_kategori')->name('get_sub_kategori');
    });

    //*************************************** PETA INTERAKTIF *************************************************    
    Route::controller(PetaController::class)->group(function () {
        Route::get('/peta-interaktif', 'list_peta_interaktif')->name('list_peta_interaktif');
        Route::get('/form-peta-interaktif/{id}', 'form_peta_interaktif')->name('form_peta_interaktif');
        Route::post('/update-peta-interaktif', 'update_peta_interaktif')->name('update_peta_interaktif');
        Route::post('/hapus-peta-interaktif/{id}', 'hapus_peta_interaktif')->name('hapus_peta_interaktif');
    });

    //*************************************** TENTANG KEDIRI PAGE *************************************************    
    Route::controller(TentangKediriController::class)->group(function() {
        // Sejarah
        Route::get('/list-sejarah', 'list_sejarah')->name('list_sejarah');
        Route::post('/update-sejarah', 'update_sejarah')->name('update_sejarah');
        Route::get('/form-sejarah/{id}', 'form_sejarah')->name('form-sejarah');
        Route::post('/hapus-sejarah/{id}', 'hapus_sejarah')->name('hapus_sejarah');
        // Visi Misi
        Route::get('/form-visimisi', 'form_visimisi')->name('form_visimisi');
        Route::post('/update-visimisi', 'update_visimisi')->name('update_visimisi');
        Route::get('/valuemisi/{id}', 'valuemisi')->name('valuemisi');
        Route::post('/hapus-misi/{id}', 'hapus_misi')->name('hapus_misi');
        // Profil Pimpinan
        Route::get('/list-pimpinan', 'list_pimpinan')->name('list_pimpinan');
        Route::get('/form-pimpinan/{id}', 'form_pimpinan')->name('form-pimpinan');
        Route::post('/update-pimpinan', 'update_pimpinan')->name('update_pimpinan');
        Route::post('/hapus-pimpinan/{id}', 'hapus_pimpinan')->name('hapus_pimpinan');
    });

    //*************************************** PERANGKAT DAERAH PAGE *************************************************    
    Route::controller(PerangkatDaerahController::class)->group(function() {
        // OPD
        Route::get('/list-opd', 'list_opd')->name('list_opd');
        Route::get('/form-opd/{id}', 'form_opd')->name('form-opd');
        Route::post('/update-opd', 'update_opd')->name('update_opd');
        Route::post('/hapus-opd/{id}', 'hapus_opd')->name('hapus_opd');
        // Jabatan
        Route::get('/list-jabatan', 'list_jabatan')->name('list_jabatan');
        Route::post('/update-jabatan', 'update_jabatan')->name('update_jabatan');
        Route::get('/value-jabatan/{id}', 'value_jabatan')->name('value_jabatan');
        Route::post('/hapus-jabatan/{id}', 'hapus_jabatan')->name('hapus_jabatan');
        // Kategori OPD
        Route::get('/list-kategori-opd', 'list_kategori_opd')->name('list_kategori_opd');
        Route::post('/update-kategori-opd', 'update_kategori_opd')->name('update_kategori_opd');
        Route::get('/value-kategori-opd/{id}', 'value_kategori_opd')->name('value_kategori_opd');
        Route::post('/hapus-kategori-opd/{id}', 'hapus_kategori_opd')->name('hapus_kategori_opd');
    });

    //*************************************** KELURAHAN PAGE *************************************************    
    Route::controller(KelurahanController::class)->group(function() {
        Route::post('/update-kelurahan', 'update_kelurahan')->name('update_kelurahan');
        Route::get('/list-kelurahan', 'list_kelurahan')->name('list_kelurahan');
        Route::get('/value-kelurahan/{id}', 'value_kelurahan')->name('value_kelurahan');
        Route::get('/sync-kelurahan', 'sync_kelurahan')->name('sync_kelurahan');
        Route::get('/sync-kecamatan', 'sync_kecamatan')->name('sync_kecamatan');
    });

    //*************************************** PENGHARGAAN PAGE *************************************************    
    Route::controller(PenghargaanController::class)->group(function() {
        Route::get('/list-penghargaan', 'list_penghargaan')->name('list_penghargaan');
        Route::get('/form-penghargaan/{id}', 'form_penghargaan')->name('form_penghargaan');
        Route::post('/update-penghargaan', 'update_penghargaan')->name('update_penghargaan');
        Route::post('/hapus-penghargaan/{id}', 'hapus_penghargaan')->name('hapus_penghargaan');
    });

    //*************************************** BERITA PAGE *************************************************    
    Route::controller(BeritaController::class)->group(function(){
        Route::get('/list-kategori-berita', 'list_kategori_berita')->name('list_kategori');
        Route::post('/update-kategori', 'update_kategori')->name('update_kategori');
        Route::get('/valuekategori/{id}', 'valuekategori')->name('valuekategori');
        Route::post('/hapus-kategori/{id}', 'hapus_kategori')->name('hapus_kategori');
        Route::get('/form-berita/{id}', 'form_berita')->name('form_berita');
        Route::post('update-berita', 'update_berita')->name('update_berita');
        Route::get('/list-berita', 'list_berita')->name('list_berita');
        Route::post('/hapus-berita/{id}', 'hapus_berita')->name('hapus_berita');
        Route::get('/update-status-berita/{status}/{id}', 'update_status_berita')->name('update_status_berita');
        Route::get('/list-berita-luar', 'list_berita_luar')->name('list_berita_luar');
        Route::get('/form-berita-luar/{id}', 'form_berita_luar')->name('form_berita_luar');
        Route::post('update-berita-luar', 'update_berita_luar')->name('update_berita_luar');
        Route::get('/update-status-berita-luar/{status}/{id}', 'update_status_berita_luar')->name('update_status_berita_luar');
        Route::post('/hapus-berita-luar/{id}', 'hapus_berita_luar')->name('hapus_berita_luar');
    });

    //*************************************** GALERI PAGE *************************************************    
    Route::controller(GaleriController::class)->group(function(){
        Route::get('/list-galeri', 'list_galeri')->name('list_galeri');
        Route::get('/form-galeri/{id}', 'form_galeri')->name('form_galeri');
        Route::get('/data-foto/{id}', 'data_foto')->name('data_foto');
        Route::post('dropzone/store', 'dropzoneStore')->name('dropzone.store');
        Route::post('/update-album', 'update_album')->name('update_album');
        Route::post('/hapus-foto/{id}', 'hapus_foto')->name('hapus_foto');
        Route::post('/hapus-album/{id}', 'hapus_album')->name('hapus_album');
    });

    //*************************************** DOKUMEN PAGE *************************************************    
    Route::controller(DokumenController::class)->group(function(){
        Route::get('/list-dokumen', 'list_dokumen')->name('list_dokumen');
        Route::get('/form-dokumen/{id}', 'form_dokumen')->name('form_dokumen');
        Route::post('/update-dokumen', 'update_dokumen')->name('update_dokumen');
        Route::get('/update-status-dokumen/{status}/{id}', 'update_status_dokumen')->name('update_status_dokumen');
        Route::post('/hapus-dokumen/{id}', 'hapus_dokumen')->name('hapus_dokumen');
    });   

    //*************************************** FEEDBACK PAGE *************************************************    
    Route::controller(FeedbackController::class)->group(function(){
        Route::get('/list-feedback', 'list_feedback')->name('list_feedback');
    });

    //*************************************** USER SETTING *************************************************   
    Route::controller(UserController::class)->group(function(){
        Route::get('list-user', 'list_user')->name('list_user');
        Route::get('value-user/{id}', 'value_user')->name('value_user');
        Route::post('update-user', 'update_user')->name('update_user');
    });

});

Route::resource('fasilitas-kota', FasilitasKotaController::class);
Route::get('/berita', [BeritaController::class, 'berita'])->name('berita');
Route::get('/berita/{slug}', [BeritaController::class, 'show'])->name('berita.show');
Route::resource('galeri', GaleriController::class);
Route::resource('dokumen', DokumenController::class);
Route::resource('agenda', AgendaController::class);
Route::resource('pesona-unggulan', PesonaUnggulanController::class);
Route::get('/search', [SearchController::class, 'index'])
    ->name('search');


require __DIR__ . '/auth.php';
