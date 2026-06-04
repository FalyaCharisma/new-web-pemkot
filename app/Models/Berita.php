<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;
    protected $table = "berita";
    protected $guarded = [];

    public function kategori()
    {
        return $this->belongsTo(KategoriBerita::class, 'id_kategori');
    }
}
