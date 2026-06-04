<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsetKediri extends Model
{
    protected $table = 'aset_kediri';
    protected $guarded = [];

    public function kategori_aset()
    {
        return $this->belongsTo(KategoriAset::class, 'kategori_id');
    }
}
