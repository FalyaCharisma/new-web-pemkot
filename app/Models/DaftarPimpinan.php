<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaftarPimpinan extends Model
{
    use HasFactory;

    protected $table = "daftar_pimpinan";
    protected $guarded = [];

    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'id_jabatan');
    }

    public function opd()
    {
        return $this->belongsTo(OPD::class, 'id_opd');
    }
}
