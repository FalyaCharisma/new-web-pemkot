<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubKategoriFasilitas extends Model
{
    use HasFactory;

    protected $table = 'sub_kategori_fasilitas';
    protected $guarded = [];

    public function kategori()
    {
        return $this->belongsTo(KategoriFasilitas::class, 'kategori_id');
    }

    // Dipertahankan kalau ada kode lama yang sudah memakai nama relasi ini.
    public function kategori_fasilitas()
    {
        return $this->belongsTo(KategoriFasilitas::class, 'kategori_id');
    }

    public function fasilitas()
    {
        return $this->hasMany(FasilitasKota::class, 'sub_kategori_id');
    }
}
