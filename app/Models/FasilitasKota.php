<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FasilitasKota extends Model
{
    use HasFactory;
    protected $table = 'fasilitas_kota';
    protected $guarded = [];
    protected $fillable = ['kategori_id', 'sub_kategori_id', 'nama', 'slug', 'foto', 'alamat', 'telp', 'link', 'map', 'deskripsi', 'lat', 'lng', 'jam_buka', 'jam_tutup'];

    public function kategori()
    {
        return $this->belongsTo(KategoriFasilitas::class, 'kategori_id');
    }

    public function sub_kategori()
    {
        return $this->belongsTo(SubKategoriFasilitas::class, 'sub_kategori_id');
    }
    public function getRouteKeyName()
    {
        return 'slug';
    }
    public function media()
    {
        return $this->hasMany(FasilitasMedia::class, 'fasilitas_id');
    }

    public function galeriFoto()
    {
        return $this->hasMany(FasilitasMedia::class, 'fasilitas_id')->where('tipe', 'foto');
    }

    public function galeriVideo()
    {
        return $this->hasMany(FasilitasMedia::class, 'fasilitas_id')->where('tipe', 'video');
    }
}
