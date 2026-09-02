<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BudayaWarisan extends Model
{
    use SoftDeletes;

    protected $table = 'budaya_warisan';

    protected $guarded = [];

    protected $casts = [
        'status' => 'boolean',
        'urutan' => 'integer',
    ];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(KategoriBerita::class, 'kategori_id');
    }
}