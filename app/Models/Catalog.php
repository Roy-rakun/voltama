<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    protected $fillable = [
        'catalog_category_id',
        'title',
        'slug',
        'description',
        'image_path',
        'specifications',
        'is_active',
        'order_position',
    ];

    protected $casts = [
        'specifications' => 'array',
        'is_active'      => 'boolean',
        'order_position' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(CatalogCategory::class, 'catalog_category_id');
    }
}
