<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FeaturedVideo extends Model
{
    use HasFactory;
    protected $table = "featured_videos";
    protected $guarded = [];
}
