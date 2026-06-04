<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    private function getCertifications(): array
    {
        $raw = Setting::getValue('certifications', '[]');
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Display the certifications management page.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Certifications', [
            'certifications' => $this->getCertifications(),
            'success' => session('success'),
        ]);
    }

    /**
     * Add a new certification.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:100',
            'logo_file'  => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
        ]);

        $certifications = $this->getCertifications();

        $uploadPath = public_path('uploads/settings/certifications');
        if (!File::isDirectory($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        $logo = $request->file('logo_file');
        $logoName = 'cert_' . time() . '_' . uniqid() . '.' . $logo->getClientOriginalExtension();
        $logo->move($uploadPath, $logoName);

        $certifications[] = [
            'name' => $request->input('name'),
            'logo' => '/uploads/settings/certifications/' . $logoName,
        ];

        Setting::setValue('certifications', json_encode($certifications));

        return redirect()->back()->with('success', "Sertifikasi '{$request->input('name')}' berhasil ditambahkan.");
    }

    /**
     * Delete a certification by index.
     */
    public function destroy(int $index)
    {
        $certifications = $this->getCertifications();

        if (isset($certifications[$index])) {
            $logoPath = public_path($certifications[$index]['logo'] ?? '');
            if ($logoPath && File::exists($logoPath)) {
                File::delete($logoPath);
            }
            array_splice($certifications, $index, 1);
        }

        Setting::setValue('certifications', json_encode(array_values($certifications)));

        return redirect()->back()->with('success', 'Sertifikasi berhasil dihapus.');
    }
}
