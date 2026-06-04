<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('catalogs', function (Blueprint $table) {
            $table->foreignId('catalog_category_id')
                  ->nullable()
                  ->after('id')
                  ->constrained('catalog_categories')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('catalogs', function (Blueprint $table) {
            $table->dropForeignIdFor(\App\Models\CatalogCategory::class);
            $table->dropColumn('catalog_category_id');
        });
    }
};
