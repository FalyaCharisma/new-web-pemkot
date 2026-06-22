<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class PesonaUnggulan extends Model
{
    use HasFactory;
    protected $table = "pesona_unggulan";
    protected $guarded = [];
    protected $appends = ['created_at_formatted'];

    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)
            ->locale('id')
            ->translatedFormat('j F Y');
    }

    public function kategori()
    {
        return $this->belongsTo(KategoriBerita::class, 'id_kategori');
    }
}
