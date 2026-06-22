<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Agenda extends Model
{
    use HasFactory;
    protected $table = "kalender_acara";
    protected $dates = ['tanggal_mulai', 'tanggal_selesai'];
    protected $guarded = [];

    protected $casts = [
        'tanggal_mulai' => 'datetime',
        'tanggal_selesai' => 'datetime',
    ];

    protected $appends = [
        'tanggal_mulai_formatted',
        'tanggal_selesai_formatted',
    ];

    public function getTanggalMulaiFormattedAttribute()
    {
        return Carbon::parse($this->tanggal_mulai)
            ->locale('id')
            ->translatedFormat('j F Y');
    }

    public function getTanggalSelesaiFormattedAttribute()
    {
        return Carbon::parse($this->tanggal_selesai)
            ->locale('id')
            ->translatedFormat('j F Y');
    }
}
