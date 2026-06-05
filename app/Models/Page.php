<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'is_active',
        'show_in_navbar',
        'gallery_images'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'show_in_navbar' => 'boolean',
        'gallery_images' => 'array'
    ];
}
