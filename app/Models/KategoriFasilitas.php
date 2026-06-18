<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriFasilitas extends Model
{
    use HasFactory;

    protected $table = 'kategori_fasilitas';
    protected $guarded = [];

    public function fasilitas()
    {
        return $this->hasMany(FasilitasKota::class, 'kategori_id');
    }

    public function sub_kategori()
    {
        return $this->hasMany(SubKategoriFasilitas::class, 'kategori_id');
    }
}
