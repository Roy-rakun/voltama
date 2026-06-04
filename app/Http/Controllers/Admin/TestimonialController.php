<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class TestimonialController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'role'        => 'nullable|string|max:255',
            'quote'       => 'required|string',
            'avatar_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'boolean',
        ]);

        $avatarPath = null;
        if ($request->hasFile('avatar_file')) {
            $uploadPath = public_path('uploads/testimonials');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file       = $request->file('avatar_file');
            $fileName   = 'testimonial_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $avatarPath = '/uploads/testimonials/' . $fileName;
        }

        Testimonial::create([
            'name'       => $request->name,
            'role'       => $request->role,
            'quote'      => $request->quote,
            'avatar_path'=> $avatarPath,
            'sort_order' => $request->input('sort_order', 0),
            'is_active'  => $request->boolean('is_active', true),
        ]);

        return redirect()->back()->with('success', 'Testimonial berhasil ditambahkan.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'role'        => 'nullable|string|max:255',
            'quote'       => 'required|string',
            'avatar_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'boolean',
        ]);

        $avatarPath = $testimonial->avatar_path;
        if ($request->hasFile('avatar_file')) {
            if ($avatarPath && File::exists(public_path($avatarPath))) {
                File::delete(public_path($avatarPath));
            }
            $uploadPath = public_path('uploads/testimonials');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }
            $file       = $request->file('avatar_file');
            $fileName   = 'testimonial_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $avatarPath = '/uploads/testimonials/' . $fileName;
        }

        $testimonial->update([
            'name'       => $request->name,
            'role'       => $request->role,
            'quote'      => $request->quote,
            'avatar_path'=> $avatarPath,
            'sort_order' => $request->input('sort_order', 0),
            'is_active'  => $request->boolean('is_active', true),
        ]);

        return redirect()->back()->with('success', 'Testimonial berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->avatar_path && File::exists(public_path($testimonial->avatar_path))) {
            File::delete(public_path($testimonial->avatar_path));
        }
        $testimonial->delete();
        return redirect()->back()->with('success', 'Testimonial berhasil dihapus.');
    }
}
