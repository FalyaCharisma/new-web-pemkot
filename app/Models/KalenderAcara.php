<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KalenderAcara extends Model
{
    use HasFactory;
    protected $table = "kalender_acara";
    protected $dates = ['tanggal_mulai', 'tanggal_selesai'];
    protected $guarded = [];
}
