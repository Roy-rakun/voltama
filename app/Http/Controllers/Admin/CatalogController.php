<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Catalog;
use App\Models\CatalogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $catalogs = Catalog::with('category')->orderBy('id', 'desc')->get();
        return Inertia::render('Admin/Catalogs/Index', [
            'catalogs' => $catalogs,
            'success' => session('success')
        ]);
    }

    public function create(): Response
    {
        $categories = CatalogCategory::where('is_active', true)->orderBy('sort_order')->get(['id', 'name']);
        return Inertia::render('Admin/Catalogs/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'catalog_category_id' => 'nullable|exists:catalog_categories,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_file'  => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'specs'       => 'nullable|array',
            'is_active'   => 'boolean',
        ]);

        $slug = Str::slug($request->title);
        // Ensure slug is unique
        $originalSlug = $slug;
        $counter = 1;
        while (Catalog::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        // Handle Image
        $imagePath = null;
        if ($request->hasFile('image_file')) {
            $uploadPath = public_path('uploads/catalogs');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file = $request->file('image_file');
            $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $imagePath = '/uploads/catalogs/' . $fileName;
        }

        // Process specifications from key-value pairs array to key-value object
        $specifications = [];
        if ($request->has('specs')) {
            foreach ($request->input('specs') as $spec) {
                if (isset($spec['name']) && trim($spec['name']) !== '') {
                    $specifications[trim($spec['name'])] = $spec['value'] ?? '';
                }
            }
        }

        Catalog::create([
            'catalog_category_id' => $request->catalog_category_id,
            'title'               => $request->title,
            'slug'                => $slug,
            'description'         => $request->description,
            'image_path'          => $imagePath,
            'specifications'      => $specifications,
            'is_active'           => $request->input('is_active', true),
        ]);

        return redirect()->route('admin.catalogs.index')->with('success', 'Katalog berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Catalog $catalog): Response
    {
        $specs = [];
        if (is_array($catalog->specifications)) {
            foreach ($catalog->specifications as $name => $value) {
                $specs[] = ['name' => $name, 'value' => $value];
            }
        }
        $categories = CatalogCategory::where('is_active', true)->orderBy('sort_order')->get(['id', 'name']);

        return Inertia::render('Admin/Catalogs/Edit', [
            'catalog'    => $catalog,
            'specs'      => $specs,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Catalog $catalog)
    {
        $request->validate([
            'catalog_category_id' => 'nullable|exists:catalog_categories,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'specs'       => 'nullable|array',
            'is_active'   => 'boolean',
        ]);

        // Generate unique slug only if title changes
        $slug = $catalog->slug;
        if ($request->title !== $catalog->title) {
            $slug = Str::slug($request->title);
            $originalSlug = $slug;
            $counter = 1;
            while (Catalog::where('slug', $slug)->where('id', '!=', $catalog->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        // Handle Image
        $imagePath = $catalog->image_path;
        if ($request->hasFile('image_file')) {
            // Delete old image if exists
            if ($imagePath && File::exists(public_path($imagePath))) {
                File::delete(public_path($imagePath));
            }

            $uploadPath = public_path('uploads/catalogs');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file = $request->file('image_file');
            $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $imagePath = '/uploads/catalogs/' . $fileName;
        }

        // Process specifications
        $specifications = [];
        if ($request->has('specs')) {
            foreach ($request->input('specs') as $spec) {
                if (isset($spec['name']) && trim($spec['name']) !== '') {
                    $specifications[trim($spec['name'])] = $spec['value'] ?? '';
                }
            }
        }

        $catalog->update([
            'catalog_category_id' => $request->catalog_category_id,
            'title'               => $request->title,
            'slug'                => $slug,
            'description'         => $request->description,
            'image_path'          => $imagePath,
            'specifications'      => $specifications,
            'is_active'           => $request->input('is_active', true),
        ]);

        return redirect()->route('admin.catalogs.index')->with('success', 'Katalog berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Catalog $catalog)
    {
        if ($catalog->image_path && File::exists(public_path($catalog->image_path))) {
            File::delete(public_path($catalog->image_path));
        }
        $catalog->delete();

        return redirect()->route('admin.catalogs.index')->with('success', 'Katalog berhasil dihapus.');
    }
}
