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

    /**
     * Sidebar Admin
     */
    private function _appAdminSidebar()
    {
        return array(

            /*
            |--------------------------------------------------------------------------
            | DASHBOARD
            |--------------------------------------------------------------------------
            */

            [
                'title' => 'Dashboard',
                'url' => '/dashboard',
                'routes' => ['dashboard'],
                'icon' => 'fa-cubes',
            ],


            /*
            |--------------------------------------------------------------------------
            | HOME
            |--------------------------------------------------------------------------
            */

            [
                'title' => 'Home',
                'url' => '#',
                'routes' => [
                    'banner-beranda',
                    'list-layanan-publik',
                    'form-layanan-publik/*',
                    'peta-interaktif',
                    'form-peta-interaktif/*',
                    'list-budaya-warisan'
                ],
                'icon' => 'fa-home',

                'children' => [

                    [
                        'title' => 'Banner',
                        'url' => '/banner-beranda',
                        'routes' => ['banner-beranda'],
                    ],

                    [
                        'title' => 'Layanan Publik',
                        'url' => '/list-layanan-publik',
                        'routes' => [
                            'list-layanan-publik',
                            'form-layanan-publik/*'
                        ]
                    ],

                    [
                        'title' => 'Budaya & Warisan',
                        'url' => '/list-budaya-warisan',
                        'routes' => [
                            'list-budaya-warisan',
                            'form-budaya-warisan/*'
                        ]
                    ],

                    // [
                    //     'title' => 'Peta Interaktif',
                    //     'url' => '/peta-interaktif',
                    //     'routes' => [
                    //         'peta-interaktif',
                    //         'form-peta-interaktif/*'
                    //     ]
                    // ],

                ],
            ],


            /*
            |--------------------------------------------------------------------------
            | MENGENAL KEDIRI
            |--------------------------------------------------------------------------
            */

            [
                'title' => 'Mengenal Kediri',
                'url' => '#',
                'routes' => [
                    'list-pesona-unggulan',
                    'form-pesona-unggulan/*',
                    'list-fasilitas',
                    'form-fasilitas/*',
                    'list-kategori-fasilitas',
                    'sub-kategori-fasilitas/*',
                    'sekilas-kota',
                    'form-visimisi',
                    'list-sejarah',
                    'list-pimpinan',
                    'form-pimpinan/*',
                    'list-jabatan',
                    'list-opd',
                    'form-opd/*',
                    'list-kelurahan',
                    'list-penghargaan'
                ],
                'icon' => 'fa-industry',

                'children' => [

                    [
                        'title' => 'Pesona Unggulan',
                        'url' => '/list-pesona-unggulan',
                        'routes' => [
                            'list-pesona-unggulan',
                            'form-pesona-unggulan/*'
                        ]
                    ],

                    [
                        'title' => 'Fasilitas Kota',
                        'url' => '/list-fasilitas',
                        'routes' => [
                            'list-fasilitas',
                            'form-fasilitas/*',
                            'list-kategori-fasilitas',
                            'sub-kategori-fasilitas/*'
                        ]
                    ],

                    [
                        'title' => 'Sekilas Kediri',
                        'url' => '/sekilas-kota',
                        'routes' => [
                            'sekilas-kota'
                        ]
                    ],

                    [
                        'title' => 'Visi Dan Misi',
                        'url' => '/form-visimisi',
                        'routes' => [
                            'form-visimisi'
                        ]
                    ],

                    [
                        'title' => 'Sejarah Kota',
                        'url' => '/list-sejarah',
                        'routes' => [
                            'list-sejarah'
                        ]
                    ],

                    [
                        'title' => 'Daftar Pimpinan',
                        'url' => '/list-pimpinan',
                        'routes' => [
                            'list-pimpinan',
                            'form-pimpinan/*',
                            'list-jabatan'
                        ]
                    ],

                    /*
                    |--------------------------------------------------------------------------
                    | PERANGKAT DAERAH
                    |--------------------------------------------------------------------------
                    | Role 1 dan 2
                    */

                    [
                        'title' => 'Perangkat Daerah',
                        'url' => '/list-opd',
                        'routes' => [
                            'list-opd',
                            'form-opd/*'
                        ],
                        'roles' => [0, 1, 2],
                    ],

                    [
                        'title' => 'Kelurahan',
                        'url' => '/list-kelurahan',
                        'routes' => [
                            'list-kelurahan'
                        ]
                    ],

                ],
            ],


            /*
            |--------------------------------------------------------------------------
            | PUSAT MEDIA & INFORMASI
            |--------------------------------------------------------------------------
            */

            [
                'title' => 'Pusat Media & Informasi',
                'url' => '#',
                'routes' => [
                    'list-berita',
                    'form-berita/*',
                    'list-kategori-berita',
                    'list-agenda',
                    'form-agenda/*',
                    'list-galeri',
                    'form-galeri/*',
                    'list-video',
                    'form-video/*',
                    'list-dokumen',
                    'form-dokumen/*'
                ],
                'icon' => 'fa-newspaper',

                'children' => [

                    /*
                    |--------------------------------------------------------------------------
                    | BERITA & PENGUMUMAN
                    |--------------------------------------------------------------------------
                    | Role 1 dan 2
                    */

                    [
                        'title' => 'Berita & Pengumuman',
                        'url' => '/list-berita',
                        'routes' => [
                            'list-berita',
                            'form-berita/*',
                            'list-kategori-berita'
                        ],
                        'roles' => [0, 1, 2],
                    ],

                    [
                        'title' => 'Agenda',
                        'url' => '/list-agenda',
                        'routes' => [
                            'list-agenda',
                            'form-agenda/*'
                        ]
                    ],

                    [
                        'title' => 'Album Foto',
                        'url' => '/list-galeri',
                        'routes' => [
                            'list-galeri',
                            'form-galeri/*'
                        ]
                    ],

                    [
                        'title' => 'Video',
                        'url' => '/list-video',
                        'routes' => [
                            'list-video',
                            'form-video/*'
                        ]
                    ],

                    [
                        'title' => 'Dokumen',
                        'url' => '/list-dokumen',
                        'routes' => [
                            'list-dokumen',
                            'form-dokumen/*'
                        ]
                    ],

                ],
            ],


            /*
            |--------------------------------------------------------------------------
            | FEEDBACK
            |--------------------------------------------------------------------------
            */

            [
                'title' => 'Feedback',
                'url' => '/list-feedback',
                'routes' => ['list-feedback'],
                'icon' => 'fa-star',
            ],


            /*
            |--------------------------------------------------------------------------
            | USER
            |--------------------------------------------------------------------------
            | Hanya role 0
            */

            [
                'title' => 'User',
                'url' => '/list-user',
                'routes' => ['list-user'],
                'icon' => 'fa-user',
                'roles' => [0],
            ],

        );
    }


    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        if (!app()->runningInConsole()) {
            View::share(
                'appAdminSidebar',
                $this->_appAdminSidebar()
            );
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
                    ? asset('storage/banner/' . $hero->gambar)
                    : null;
            }

        ]);
    }
}