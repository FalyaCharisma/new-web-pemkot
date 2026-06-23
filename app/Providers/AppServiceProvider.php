<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

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
                'routes' => ['form-pesona-kediri', 'ada-apa-kediri', 'form-ada-apa/*', 'list-kategori-aset', 'list-penghargaan', 'form-visimisi', 'list-opd', 'list-sejarah', 'list-jabatan', 'list-pimpinan', 'list-kelurahan', 'list-kelurahan', 'list-fasilitas', 'form-opd/*'],
                'icon' => 'fa-industry',
                'children' => array(
                    [
                        'title' => 'Pesona Kediri Raya',
                        'url' => '/form-pesona-kediri',
                        'routes' => ['form-pesona-kediri']
                    ],
                    [
                        'title' => 'Ada Apa Di Kediri',
                        'url' => '/ada-apa-kediri',
                        'routes' => ['ada-apa-kediri', 'form-ada-apa/*', 'list-kategori-aset']
                    ],
                    [
                        'title' => 'Penghargaan',
                        'url' => '/list-penghargaan',
                        'routes' => ['list-penghargaan']
                    ],
                    [
                        'title' => 'Visi Dan Misi',
                        'url' => '/form-visimisi',
                        'routes' => ['form-visimisi']
                    ],
                    [
                        'title' => 'Perangkat Daerah',
                        'url' => '/list-opd',
                        'routes' => ['list-opd', 'form-opd/*']
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
                        'title' => 'Kelurahan',
                        'url' => '/list-kelurahan',
                        'routes' => ['list-kelurahan']
                    ],
                    [
                        'title' => 'Fasilitas Kota',
                        'url' => '/list-fasilitas',
                        'routes' => ['list-fasilitas']
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
                        'title' => 'Pengumuman',
                        'url' => '/list-pengumuman',
                        'routes' => ['list-pengumuman', 'form-pengumuman/*']
                    ],
                    [
                        'title' => 'Berita',
                        'url' => '/list-berita',
                        'routes' => ['list-berita', 'form-berita/*']
                    ],
                    [
                        'title' => 'Berita Luar',
                        'url' => '/list-berita-luar',
                        'routes' => ['list-berita-luar']
                    ],
                    [
                        'title' => 'Galeri',
                        'url' => '/list-galeri',
                        'routes' => ['list-galeri']
                    ],
                    [
                        'title' => 'Dokumen',
                        'url' => '/list-dokumen',
                        'routes' => ['list-dokumen', 'form-dokumen/*']
                    ],
                    [
                        'title' => 'Artikel',
                        'url' => '/list-artikel',
                        'routes' => ['list-artikel', 'form-artikel/*']
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
            // [
            //     'title' => 'Profil Kota',
            //     'url' => '#',
            //     'routes' => ['profil-kota-editor/*'],
            //     'icon' => 'fa-building',
            //     'children' => [
            //         [
            //             'title' => 'Kediri The Service City',
            //             'url' => '/profil-kota-editor/1',
            //             'routes' => ['profil-kota-editor/1']
            //         ],
            //         [
            //             'title' => 'Makna Lambang',
            //             'url' => '/profil-kota-editor/2',
            //             'routes' => ['profil-kota-editor/2']
            //         ],
                   
            //         [
            //             'title' => 'Renstra',
            //             'url' => '/profil-kota-editor/5',
            //             'routes' => ['profil-kota-editor/5']
            //         ],
            //         [
            //             'title' => 'Ekonomi',
            //             'url' => '/profil-kota-editor/6',
            //             'routes' => ['profil-kota-editor/6']
            //         ],
            //     ],
            // ],
            // [
            //     'title' => 'Deskripsi Kota',
            //     'url' => '#',
            //     'routes' => ['deskripsi-kota-editor/*'],
            //     'icon' => 'fa-university',
            //     'children' => array(
            //         [
            //             'title' => 'Kondisi Geografis',
            //             'url' => '/deskripsi-kota-editor/7',
            //             'routes' => ['deskripsi-kota-editor/7']
            //         ],
            //         [
            //             'title' => 'Kondisi Demografis',
            //             'url' => '/deskripsi-kota-editor/8',
            //             'routes' => ['deskripsi-kota-editor/8']
            //         ],
            //         [
            //             'title' => 'Kebudayaan Dan Kesenian',
            //             'url' => '/deskripsi-kota-editor/10',
            //             'routes' => ['deskripsi-kota-editor/10']
            //         ],
            //         [
            //             'title' => 'Kelurahan',
            //             'url' => '/deskripsi-kota-editor/11',
            //             'routes' => ['deskripsi-kota-editor/11']
            //         ],
            //     ),
            // ],
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
    }
}
