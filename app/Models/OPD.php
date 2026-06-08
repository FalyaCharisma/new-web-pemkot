<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OPD extends Model
{
    use HasFactory;
    protected $table = "opd";
    protected $guarded = [];

    public function kategori_opd()
    {
        return $this->belongsTo(KategoriOPD::class, 'kategori', 'id');
    }

    public function pimpinan()
    {
        return $this->hasOne(DaftarPimpinan::class, 'id_opd');
    }

}
