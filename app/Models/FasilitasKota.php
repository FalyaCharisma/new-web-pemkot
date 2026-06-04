<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FasilitasKota extends Model
{
    use HasFactory;
    protected $table = 'fasilitas_kota';
    protected $guarded = [];

    public function kategori()
    {
        return $this->belongsTo(KategoriFasilitas::class, 'kategori_id');
    }

    public function sub_kategori()
    {
        return $this->belongsTo(SubKategoriFasilitas::class, 'sub_kategori_id');
    }
}
