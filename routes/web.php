<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\CatalogController;
use App\Http\Controllers\Admin\CatalogCategoryController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\ArticleCategoryController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\EcommerceController;
use App\Http\Controllers\Admin\CertificationController;
use App\Http\Controllers\Admin\SectionEditorController;
use App\Http\Controllers\Admin\TestimonialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- Rute Publik (Frontend) ---
Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/katalog', [FrontendController::class, 'catalogs'])->name('katalog.index');
Route::get('/artikel', [FrontendController::class, 'articles'])->name('artikel.index');
Route::get('/artikel/{slug}', [FrontendController::class, 'articleDetail'])->name('artikel.show');
Route::get('/p/{slug}', [FrontendController::class, 'page'])->name('page.show');

// --- Rute Autentikasi / Dashboard Bawaan ---
Route::get('/dashboard', function () {
    $stats = [
        'articles'  => \App\Models\Article::count(),
        'catalogs'  => \App\Models\Catalog::count(),
        'pages'     => \App\Models\Page::count(),
        'users'     => \App\Models\User::count(),
        'articles_active'  => \App\Models\Article::where('is_active', true)->count(),
        'catalogs_active'  => \App\Models\Catalog::where('is_active', true)->count(),
    ];
    $recentArticles = \App\Models\Article::latest()->limit(5)->get(['id', 'title', 'is_active', 'created_at']);
    $recentCatalogs = \App\Models\Catalog::latest()->limit(5)->get(['id', 'title', 'is_active', 'created_at']);
    return Inertia::render('Dashboard', compact('stats', 'recentArticles', 'recentCatalogs'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --- Rute Backend Admin Panel ---
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    
    // Rute yang dapat diakses oleh Admin & Editor (Katalog & Artikel)
    Route::post('catalogs/{catalog}/up', [CatalogController::class, 'moveUp'])->name('catalogs.up');
    Route::post('catalogs/{catalog}/down', [CatalogController::class, 'moveDown'])->name('catalogs.down');
    Route::resource('catalogs', CatalogController::class);
    Route::resource('catalog-categories', CatalogCategoryController::class)->except(['show', 'create', 'edit']);
    Route::resource('articles', ArticleController::class);
    Route::resource('article-categories', ArticleCategoryController::class)->except(['show', 'create', 'edit']);

    // Rute khusus untuk Admin saja (Settings, Pages, Users, Ecommerce)
    Route::middleware('role:admin')->group(function() {
        Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
        Route::post('settings', [SettingController::class, 'update'])->name('settings.update');
        Route::resource('pages', PageController::class);
        Route::resource('users', UserController::class);
        // Ecommerce Stores
        Route::get('ecommerce', [EcommerceController::class, 'index'])->name('ecommerce.index');
        Route::post('ecommerce', [EcommerceController::class, 'store'])->name('ecommerce.store');
        Route::delete('ecommerce/{index}', [EcommerceController::class, 'destroy'])->name('ecommerce.destroy');
        // Certifications
        Route::get('certifications', [CertificationController::class, 'index'])->name('certifications.index');
        Route::post('certifications', [CertificationController::class, 'store'])->name('certifications.store');
        Route::delete('certifications/{index}', [CertificationController::class, 'destroy'])->name('certifications.destroy');
        // Section Editor
        Route::get('section-editor', [SectionEditorController::class, 'index'])->name('section-editor.index');
        Route::post('section-editor', [SectionEditorController::class, 'update'])->name('section-editor.update');
        // Hero Slides CRUD
        Route::post('hero-slides', [SectionEditorController::class, 'storeSlide'])->name('hero-slides.store');
        Route::post('hero-slides/{heroSlide}', [SectionEditorController::class, 'updateSlide'])->name('hero-slides.update');
        Route::delete('hero-slides/{heroSlide}', [SectionEditorController::class, 'deleteSlide'])->name('hero-slides.destroy');
        // Testimonials CRUD
        Route::post('testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
        Route::post('testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update');
        Route::delete('testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
    });
});

require __DIR__.'/auth.php';
