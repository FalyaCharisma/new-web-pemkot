<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriAset extends Model
{
    use HasFactory;
    protected $table = 'kategori_aset';
    protected $guarded = [];

    public function asetKediri()
    {
        return $this->hasMany(AsetKediri::class, 'kategori_id');
    }
}
