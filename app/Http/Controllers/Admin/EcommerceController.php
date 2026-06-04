<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class EcommerceController extends Controller
{
    private function getStores(): array
    {
        $raw = Setting::getValue('ecommerce_stores', '[]');
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Display the ecommerce stores management page.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Ecommerce', [
            'stores' => $this->getStores(),
            'success' => session('success'),
        ]);
    }

    /**
     * Add a new store.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:100',
            'link'       => 'required|url|max:500',
            'logo_file'  => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
        ]);

        $stores = $this->getStores();

        $uploadPath = public_path('uploads/settings/ecommerce');
        if (!File::isDirectory($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        $logo = $request->file('logo_file');
        $logoName = 'store_' . time() . '_' . uniqid() . '.' . $logo->getClientOriginalExtension();
        $logo->move($uploadPath, $logoName);

        $stores[] = [
            'name' => $request->input('name'),
            'link' => $request->input('link'),
            'logo' => '/uploads/settings/ecommerce/' . $logoName,
        ];

        Setting::setValue('ecommerce_stores', json_encode($stores));

        return redirect()->back()->with('success', "Toko '{$request->input('name')}' berhasil ditambahkan.");
    }

    /**
     * Delete a store by index.
     */
    public function destroy(int $index)
    {
        $stores = $this->getStores();

        if (isset($stores[$index])) {
            // Hapus file logo lama jika ada
            $logoPath = public_path($stores[$index]['logo'] ?? '');
            if ($logoPath && File::exists($logoPath)) {
                File::delete($logoPath);
            }
            array_splice($stores, $index, 1);
        }

        Setting::setValue('ecommerce_stores', json_encode(array_values($stores)));

        return redirect()->back()->with('success', 'Toko berhasil dihapus.');
    }
}
