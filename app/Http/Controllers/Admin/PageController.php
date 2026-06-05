<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $pages = Page::orderBy('id', 'desc')->get();
        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Pages/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'is_active' => 'boolean',
            'show_in_navbar' => 'boolean',
            'gallery_files.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:3072',
        ]);

        $gallery = [];
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/pages'), $filename);
                $gallery[] = '/uploads/pages/' . $filename;
            }
        }

        $slug = Str::slug($request->title);
        $originalSlug = $slug;
        $counter = 1;
        while (Page::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        Page::create([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'is_active' => $request->input('is_active', true),
            'show_in_navbar' => $request->input('show_in_navbar', true),
            'gallery_images' => $gallery,
        ]);

        return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page): Response
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'is_active' => 'boolean',
            'show_in_navbar' => 'boolean',
            'gallery_files.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:3072',
        ]);

        // Mengambil daftar gambar lama yang dipertahankan
        $retained = $request->input('retained_gallery_images', []);
        if (is_string($retained)) {
            $retained = json_decode($retained, true) ?: [];
        }

        // Hapus file fisik gambar yang dibuang admin
        $oldGallery = $page->gallery_images ?: [];
        foreach ($oldGallery as $oldImg) {
            if (!in_array($oldImg, $retained)) {
                $filePath = public_path($oldImg);
                if (File::exists($filePath)) {
                    File::delete($filePath);
                }
            }
        }

        $gallery = $retained;

        // Upload gambar-gambar baru jika ada
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/pages'), $filename);
                $gallery[] = '/uploads/pages/' . $filename;
            }
        }

        $slug = $page->slug;
        if ($request->title !== $page->title) {
            $slug = Str::slug($request->title);
            $originalSlug = $slug;
            $counter = 1;
            while (Page::where('slug', $slug)->where('id', '!=', $page->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        $page->update([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'is_active' => $request->input('is_active', true),
            'show_in_navbar' => $request->input('show_in_navbar', true),
            'gallery_images' => $gallery,
        ]);

        return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        // Hapus file galeri secara fisik sebelum menghapus row dari database
        $gallery = $page->gallery_images ?: [];
        foreach ($gallery as $img) {
            $filePath = public_path($img);
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
        }

        $page->delete();
        return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil dihapus.');
    }
}
