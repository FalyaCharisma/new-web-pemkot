<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FasilitasMedia extends Model
{
    use HasFactory;
    protected $table = 'fasilitas_media';
    protected $guarded = [];
    protected $fillable = ['fasilitas_id', 'tipe', 'url'];
    public function fasilitas()
    {
        return $this->belongsTo(FasilitasKota::class);
    }
}
