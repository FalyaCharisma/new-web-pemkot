<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelurahan extends Model
{
    use HasFactory;
    protected $table = "kelurahan";
    protected $guarded = [];

    public function kecamatan()
    {
        return $this->belongsTo(Kecamatan::class, 'kd_kecamatan', 'kd_kecamatan');
    }
}
