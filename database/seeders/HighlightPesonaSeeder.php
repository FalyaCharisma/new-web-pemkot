<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HighlightPesona;

class HighlightPesonaSeeder extends Seeder
{
    public function run(): void
    {
        HighlightPesona::create([

            'kategori_label' => 'KULINER KHAS',

            'judul' => 'Nasi Pecel Tumpang',

            'deskripsi' =>
                'Nasi Pecel Tumpang adalah kuliner khas Kediri yang terdiri dari nasi putih, sayuran rebus, dan sambal tumpang berbahan tempe semangit yang dimasak dengan bumbu khas.',

            'highlight1_icon' => 'barrel',
            'highlight1_judul' => 'Asal Usul',
            'highlight1_deskripsi' => 'Berasal dari tradisi masyarakat Kediri sejak zaman dahulu.',

            'highlight2_icon' => 'sparkles',
            'highlight2_judul' => 'Keunikan',
            'highlight2_deskripsi' => 'Sambal tumpang dengan cita rasa yang berbeda.',

            'highlight3_icon' => 'utensils',
            'highlight3_judul' => 'Cocok Untuk',
            'highlight3_deskripsi' => 'Sarapan, makan siang, hingga oleh-oleh.',

            'cta_judul' => 'Ingin mencicipi Nasi Pecel Tumpang?',

            'cta_deskripsi' => 'Temukan rumah makan dan warung terbaik yang menyajikan Nasi Pecel Tumpang di Kota Kediri.',

            'cta_button' => 'Cari Kuliner Terkait',

            'cta_kategori' => 4,

            'cta_keyword' => 'Nasi Pecel',

        ]);
    }
}