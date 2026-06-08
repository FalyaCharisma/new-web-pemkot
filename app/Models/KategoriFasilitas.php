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


}
