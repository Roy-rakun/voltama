<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'article_category_id',
        'title',
        'slug',
        'content',
        'image_path',
        'views',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'views'     => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(ArticleCategory::class, 'article_category_id');
    }
}
