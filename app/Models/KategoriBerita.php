<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriBerita extends Model
{
    use HasFactory;
    protected $table = "kategori_berita";
    protected $guarded = [];

    public function beritaKategori()
    {
        return $this->hasMany(Berita::class, 'id_kategori');
    }
}
