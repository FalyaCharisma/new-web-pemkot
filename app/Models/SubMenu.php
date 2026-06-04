<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubMenu extends Model
{
    use HasFactory;

    protected $table = "submenu";
    protected $guarded = [];

    public function submenu()
    {
        return $this->hasMany(SubMenu2::class, 'idSubMenu');
    }
}
