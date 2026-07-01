<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HighlightPesona extends Model
{
    protected $table = 'highlight_pesona';

    protected $guarded = [];

    protected $casts = [
        'images' => 'array',
    ];

    public function kategori()
    {
        return $this->belongsTo(KategoriFasilitas::class, 'kategori_label');
    }
}
