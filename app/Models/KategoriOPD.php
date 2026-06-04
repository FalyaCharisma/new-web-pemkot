<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriOPD extends Model
{
    use HasFactory;
    protected $table = "kategori_opd";
    protected $guarded = [];

    public function opd()
    {
        return $this->hasMany(Opd::class, 'kategori', 'id');
    }
}
