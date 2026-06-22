<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Berita extends Model
{
    use HasFactory;
    protected $table = "berita";
    protected $guarded = [];

    public function kategori()
    {
        return $this->belongsTo(KategoriBerita::class, 'id_kategori');
    }

    protected $appends = ['created_at_formatted'];

    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->tanggal)
            ->locale('id')
            ->translatedFormat('j F Y');
    }
}
