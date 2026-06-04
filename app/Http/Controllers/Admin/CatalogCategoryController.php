<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CatalogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CatalogCategoryController extends Controller
{
    public function index(): Response
    {
        $categories = CatalogCategory::withCount('catalogs')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/CatalogCategories', [
            'categories' => $categories,
            'success'    => session('success'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'sort_order'  => 'nullable|integer|min:0',
            'is_active'   => 'boolean',
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        $slug = Str::slug($request->name);
        $base = $slug;
        $i    = 1;
        while (CatalogCategory::where('slug', $slug)->exists()) {
            $slug = $base . '-' . $i++;
        }

        $imagePath = null;
        if ($request->hasFile('image_file')) {
            $uploadPath = public_path('uploads/categories');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file      = $request->file('image_file');
            $fileName  = 'cat_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $imagePath = '/uploads/categories/' . $fileName;
        }

        CatalogCategory::create([
            'name'        => $request->name,
            'slug'        => $slug,
            'description' => $request->description,
            'sort_order'  => $request->sort_order ?? 0,
            'is_active'   => $request->boolean('is_active', true),
            'image_path'  => $imagePath,
        ]);

        return redirect()->route('admin.catalog-categories.index')
            ->with('success', 'Kategori katalog berhasil ditambahkan.');
    }

    public function update(Request $request, CatalogCategory $catalogCategory)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'sort_order'  => 'nullable|integer|min:0',
            'is_active'   => 'boolean',
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        if ($request->hasFile('image_file')) {
            $uploadPath = public_path('uploads/categories');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file      = $request->file('image_file');
            $fileName  = 'cat_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $catalogCategory->image_path = '/uploads/categories/' . $fileName;
        }

        $catalogCategory->update([
            'name'        => $request->name,
            'description' => $request->description,
            'sort_order'  => $request->sort_order ?? 0,
            'is_active'   => $request->boolean('is_active', true),
            'image_path'  => $catalogCategory->image_path,
        ]);

        return redirect()->route('admin.catalog-categories.index')
            ->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(CatalogCategory $catalogCategory)
    {
        $catalogCategory->delete();
        return redirect()->route('admin.catalog-categories.index')
            ->with('success', 'Kategori berhasil dihapus.');
    }
}
