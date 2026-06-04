<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $articles = Article::with('category')->orderBy('id', 'desc')->get();
        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'success'  => session('success')
        ]);
    }

    public function create(): Response
    {
        $categories = ArticleCategory::where('is_active', true)->orderBy('name')->get(['id', 'name']);
        return Inertia::render('Admin/Articles/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'article_category_id' => 'nullable|exists:article_categories,id',
            'title'      => 'required|string|max:255',
            'content'    => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'is_active'  => 'boolean',
        ]);

        $slug = Str::slug($request->title);
        $originalSlug = $slug;
        $counter = 1;
        while (Article::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        // Handle Image
        $imagePath = null;
        if ($request->hasFile('image_file')) {
            $uploadPath = public_path('uploads/articles');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file = $request->file('image_file');
            $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $imagePath = '/uploads/articles/' . $fileName;
        }

        Article::create([
            'article_category_id' => $request->article_category_id,
            'title'      => $request->title,
            'slug'       => $slug,
            'content'    => $request->content,
            'image_path' => $imagePath,
            'is_active'  => $request->input('is_active', true),
        ]);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil diterbitkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article): Response
    {
        $categories = ArticleCategory::where('is_active', true)->orderBy('name')->get(['id', 'name']);
        return Inertia::render('Admin/Articles/Edit', [
            'article'    => $article,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'article_category_id' => 'nullable|exists:article_categories,id',
            'title'      => 'required|string|max:255',
            'content'    => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'is_active'  => 'boolean',
        ]);

        // Generate unique slug only if title changes
        $slug = $article->slug;
        if ($request->title !== $article->title) {
            $slug = Str::slug($request->title);
            $originalSlug = $slug;
            $counter = 1;
            while (Article::where('slug', $slug)->where('id', '!=', $article->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        // Handle Image
        $imagePath = $article->image_path;
        if ($request->hasFile('image_file')) {
            // Delete old image
            if ($imagePath && File::exists(public_path($imagePath))) {
                File::delete(public_path($imagePath));
            }

            $uploadPath = public_path('uploads/articles');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file = $request->file('image_file');
            $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $imagePath = '/uploads/articles/' . $fileName;
        }

        $article->update([
            'article_category_id' => $request->article_category_id,
            'title'      => $request->title,
            'slug'       => $slug,
            'content'    => $request->content,
            'image_path' => $imagePath,
            'is_active'  => $request->input('is_active', true),
        ]);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        if ($article->image_path && File::exists(public_path($article->image_path))) {
            File::delete(public_path($article->image_path));
        }
        $article->delete();

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dihapus.');
    }
}
