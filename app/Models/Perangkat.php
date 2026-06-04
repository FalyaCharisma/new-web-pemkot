<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perangkat extends Model
{
    use HasFactory;
    protected $table = "pages";
    protected $guarded = [];

    public function submenu()
    {
        return $this->hasOne(SubMenu2::class, 'idSubMenu2');
    }
}
