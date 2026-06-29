<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use App\Models\Banner;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    private function _appAdminSidebar()
    {
        return array(
            [
                'title' => 'Dashboard',
                'url' => '/dashboard',
                'routes' => ['dashboard'],
                'icon' => 'fa-cubes',
            ],
            [
                'title' => 'Home',
                'url' => '#',
                'routes' => ['banner-beranda','list-program-unggulan', 'form-program-unggulan/*', 'list-layanan-digital'],
                'icon' => 'fa-home',
                'children' => array(
                    [
                        'title' => 'Banner',
                        'url' => '/banner-beranda',
                        'routes' => ['banner-beranda'],
                    ],
                    [
                        'title' => 'Layanan Publik',
                        'url' => '/list-layanan-publik',
                        'routes' => ['list-layanan-publik', 'form-layanan-publik/*']
                    ],
                    [
                        'title' => 'Peta Interaktif',
                        'url' => '/peta-interaktif',
                        'routes' => ['peta-interaktif', 'form-peta-interaktif/*']
                    ],
                ),
            ],
            [
                'title' => 'Mengenal Kediri',
                'url' => '#',
                'routes' => ['list-pesona-unggulan', 'ada-apa-kediri', 'form-ada-apa/*', 'list-kategori-aset', 'list-penghargaan', 'form-visimisi', 'list-opd', 'list-sejarah', 'list-jabatan', 'list-pimpinan', 'list-kelurahan', 'list-kelurahan', 'list-fasilitas', 'form-opd/*'],
                'icon' => 'fa-industry',
                'children' => array(
                    [
                        'title' => 'Pesona Unggulan',
                        'url' => '/list-pesona-unggulan',
                        'routes' => ['list-pesona-unggulan']
                    ],
                    [
                        'title' => 'Fasilitas Kota',
                        'url' => '/list-fasilitas',
                        'routes' => ['list-fasilitas']
                    ],
                    [
                        'title' => 'Sekilas Kediri',
                        'url' => '/sekilas-kota',
                        'routes' => ['sekilas-kota']
                    ],
                    [
                        'title' => 'Visi Dan Misi',
                        'url' => '/form-visimisi',
                        'routes' => ['form-visimisi']
                    ],
                    [
                        'title' => 'Lambang Daerah',
                        'url' => '#',
                        'routes' => []
                    ],
                    [
                        'title' => 'Sejarah Kota',
                        'url' => '/list-sejarah',
                        'routes' => ['list-sejarah']
                    ],
                    [
                        'title' => 'Daftar Pimpinan',
                        'url' => '/list-pimpinan',
                        'routes' => ['list-pimpinan']
                    ],
                    [
                        'title' => 'Perangkat Daerah',
                        'url' => '/list-opd',
                        'routes' => ['list-opd', 'form-opd/*']
                    ],
                    [
                        'title' => 'Kelurahan',
                        'url' => '/list-kelurahan',
                        'routes' => ['list-kelurahan']
                    ],
                    [
                        'title' => 'Penghargaan',
                        'url' => '/list-penghargaan',
                        'routes' => ['list-penghargaan']
                    ],
                ),
            ],
            [
                'title' => 'Pusat Media & Informasi',
                'url' => '#',
                'routes' => ['list-pengumuman', 'list-berita', 'list-berita-luar', 'list-galeri', 'list-dokumen', 'list-artikel', 'form-berita/*', 'form-pengumuman/*', 'form-dokumen/*', 'form-artikel/*'],
                'icon' => 'fa-newspaper',
                'children' => array(
                    [
                        'title' => 'Berita & Pengumuman',
                        'url' => '/list-berita',
                        'routes' => ['list-berita', 'form-berita/*']
                    ],
                    [
                        'title' => 'Agenda',
                        'url' => '/list-agenda',
                        'routes' => ['list-agenda', 'form-agenda/*']
                    ],
                    [
                        'title' => 'Album Foto',
                        'url' => '/list-galeri',
                        'routes' => ['list-galeri', 'form-galeri/*']
                    ],
                    [
                        'title' => 'Video',
                        'url' => '/list-video',
                        'routes' => ['list-video', 'form-video/*']
                    ],
                    [
                        'title' => 'Dokumen',
                        'url' => '/list-dokumen',
                        'routes' => ['list-dokumen', 'form-dokumen/*']
                    ],
                ),
            ],
            [
                'title' => 'Feedback',
                'url' => '/list-feedback',
                'routes' => ['list-feedback'],
                'icon' => 'fa-star',
            ],
            [
                'title' => 'User',
                'url' => '/list-user',
                'routes' => ['list-user'],
                'icon' => 'fa-user',
            ],
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        if (! app()->runningInConsole()) {
            View::share('appAdminSidebar', $this->_appAdminSidebar());
        }
        Inertia::share([

        'menuHero' => function () {

            $hero = Banner::where([
                    'kategori' => 'menu',
                    'status_enabled' => 1
                ])
                ->latest()
                ->first();

            return $hero
                ? asset('storage/banner/'.$hero->gambar)
                : null;
        }

    ]);
    }
}
