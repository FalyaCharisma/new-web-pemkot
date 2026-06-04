<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubMenu2 extends Model
{
    use HasFactory;
    protected $table = "submenu2";
    protected $guarded = [];

    
    public function parent()
    {
        return $this->belongsTo(SubMenu::class, 'idSubMenu');
    }


}
