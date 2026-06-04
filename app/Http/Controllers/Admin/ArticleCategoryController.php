<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ArticleCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ArticleCategoryController extends Controller
{
    public function index(): Response
    {
        $categories = ArticleCategory::withCount('articles')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/ArticleCategories', [
            'categories' => $categories,
            'success'    => session('success'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active'   => 'boolean',
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        $slug = Str::slug($request->name);
        $base = $slug;
        $i    = 1;
        while (ArticleCategory::where('slug', $slug)->exists()) {
            $slug = $base . '-' . $i++;
        }

        $imagePath = null;
        if ($request->hasFile('image_file')) {
            $uploadPath = public_path('uploads/categories');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file      = $request->file('image_file');
            $fileName  = 'artcat_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $imagePath = '/uploads/categories/' . $fileName;
        }

        ArticleCategory::create([
            'name'        => $request->name,
            'slug'        => $slug,
            'description' => $request->description,
            'is_active'   => $request->boolean('is_active', true),
            'image_path'  => $imagePath,
        ]);

        return redirect()->route('admin.article-categories.index')
            ->with('success', 'Kategori artikel berhasil ditambahkan.');
    }

    public function update(Request $request, ArticleCategory $articleCategory)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active'   => 'boolean',
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        if ($request->hasFile('image_file')) {
            $uploadPath = public_path('uploads/categories');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file      = $request->file('image_file');
            $fileName  = 'artcat_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $articleCategory->image_path = '/uploads/categories/' . $fileName;
        }

        $articleCategory->update([
            'name'        => $request->name,
            'description' => $request->description,
            'is_active'   => $request->boolean('is_active', true),
            'image_path'  => $articleCategory->image_path,
        ]);

        return redirect()->route('admin.article-categories.index')
            ->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(ArticleCategory $articleCategory)
    {
        $articleCategory->delete();
        return redirect()->route('admin.article-categories.index')
            ->with('success', 'Kategori berhasil dihapus.');
    }
}
