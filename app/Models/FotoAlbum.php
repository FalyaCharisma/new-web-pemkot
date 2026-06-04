<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FotoAlbum extends Model
{
    use HasFactory;
    protected $table = "foto_album";
    protected $guarded = [];

    public function album()
    {
        return $this->belongsTo(Album::class, 'id_album');
    }

}
