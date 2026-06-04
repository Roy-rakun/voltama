<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->foreignId('article_category_id')
                  ->nullable()
                  ->after('id')
                  ->constrained('article_categories')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeignIdFor(\App\Models\ArticleCategory::class);
            $table->dropColumn('article_category_id');
        });
    }
};
