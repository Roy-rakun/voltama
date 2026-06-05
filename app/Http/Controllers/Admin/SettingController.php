<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Display the settings form.
     */
    public function index(): Response
    {
        $keys = [
            'website_title', 'website_logo', 'website_favicon',
            'facebook_pixel', 'google_analytics',
            'footer_copyright', 'footer_address', 'footer_phone', 'footer_email',
            'footer_facebook', 'footer_instagram', 'footer_youtube', 'footer_whatsapp',
            'footer_powered_by_text', 'footer_powered_by_link',
            'footer_description', 'footer_tiktok',
            'contact_map_iframe', 'contact_description', 'contact_address', 'contact_hours', 'contact_days',
            'contact_office_address', 'contact_office_map_iframe',
            'contact_factory_address', 'contact_factory_map_iframe',
            'contact_website'
        ];

        $settings = [];
        foreach ($keys as $key) {
            $settings[$key] = Setting::getValue($key, '');
        }

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
            'success' => session('success')
        ]);
    }

    /**
     * Update the settings.
     */
    public function update(Request $request)
    {
        $request->validate([
            'website_title'              => 'nullable|string|max:255',
            'website_logo_file'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'website_favicon_file'       => 'nullable|image|mimes:ico,png,jpg,jpeg,svg|max:2048',
            'facebook_pixel'             => 'nullable|string',
            'google_analytics'           => 'nullable|string',
            'footer_copyright'           => 'nullable|string|max:255',
            'footer_address'             => 'nullable|string',
            'footer_phone'               => 'nullable|string|max:100',
            'footer_email'               => 'nullable|email|max:255',
            'footer_facebook'            => 'nullable|string|max:255',
            'footer_instagram'           => 'nullable|string|max:255',
            'footer_youtube'             => 'nullable|string|max:255',
            'footer_whatsapp'            => 'nullable|string|max:100',
            'footer_powered_by_text'     => 'nullable|string|max:100',
            'footer_powered_by_link'     => 'nullable|string|max:255',
            'footer_description'         => 'nullable|string',
            'footer_tiktok'              => 'nullable|string|max:255',
            'contact_map_iframe'         => 'nullable|string',
            'contact_description'        => 'nullable|string',
            'contact_address'            => 'nullable|string',
            'contact_hours'              => 'nullable|string|max:255',
            'contact_days'               => 'nullable|string|max:255',
            'contact_office_address'     => 'nullable|string',
            'contact_office_map_iframe'  => 'nullable|string',
            'contact_factory_address'    => 'nullable|string',
            'contact_factory_map_iframe' => 'nullable|string',
            'contact_website'            => 'nullable|string|max:255',
        ]);

        $textFields = [
            'website_title', 'facebook_pixel', 'google_analytics',
            'footer_copyright', 'footer_address', 'footer_phone', 'footer_email',
            'footer_facebook', 'footer_instagram', 'footer_youtube', 'footer_whatsapp',
            'footer_powered_by_text', 'footer_powered_by_link',
            'footer_description', 'footer_tiktok',
            'contact_map_iframe', 'contact_description', 'contact_address', 'contact_hours', 'contact_days',
            'contact_office_address', 'contact_office_map_iframe',
            'contact_factory_address', 'contact_factory_map_iframe',
            'contact_website'
        ];

        foreach ($textFields as $field) {
            Setting::setValue($field, $request->input($field));
        }

        // Handle File Uploads (Simpan langsung di public/uploads untuk kemudahan deploy)
        $uploadPath = public_path('uploads/settings');
        if (!File::isDirectory($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        if ($request->hasFile('website_logo_file')) {
            $logo = $request->file('website_logo_file');
            $logoName = 'logo_' . time() . '.' . $logo->getClientOriginalExtension();
            $logo->move($uploadPath, $logoName);
            Setting::setValue('website_logo', '/uploads/settings/' . $logoName);
        }

        if ($request->hasFile('website_favicon_file')) {
            $favicon = $request->file('website_favicon_file');
            $faviconName = 'favicon_' . time() . '.' . $favicon->getClientOriginalExtension();
            $favicon->move($uploadPath, $faviconName);
            Setting::setValue('website_favicon', '/uploads/settings/' . $faviconName);
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
