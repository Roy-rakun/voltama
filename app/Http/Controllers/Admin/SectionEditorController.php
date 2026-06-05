<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use App\Models\Setting;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class SectionEditorController extends Controller
{
    private array $textKeys = [
        // Section 2 — Tentang
        'section_tentang_heading',
        'section_tentang_sub',
        'section_tentang_desc',
        // Section 2 — 4 Stat Cards
        'tentang_stat1_value', 'tentang_stat1_label', 'tentang_stat1_sub', 'tentang_stat1_link',
        'tentang_stat2_value', 'tentang_stat2_label', 'tentang_stat2_sub', 'tentang_stat2_link',
        'tentang_stat3_value', 'tentang_stat3_label', 'tentang_stat3_sub', 'tentang_stat3_link',
        'tentang_stat4_value', 'tentang_stat4_label', 'tentang_stat4_sub', 'tentang_stat4_link',
        // Section 2 — Overlay foto industri
        'tentang_industri_judul',
        'tentang_industri_sub',
        // Section 3 — Fitur (heading + 3 kartu)
        'section_features_heading',
        'section_features_sub',
        'section_features_desc',
        'features_card1_title', 'features_card1_desc',
        'features_card2_title', 'features_card2_desc',
        'features_card3_title', 'features_card3_desc',
        // Section 4 — Produk Cards
        'section_produk_heading',
        'section_produk_sub',
        'section_produk_desc',
        'produk_btn1_text',
        'produk_btn2_text',
        'produk_card_kiri_label',
        'produk_card_kiri_nama',
        'produk_card_kiri_desc',
        'produk_card_kanan_label',
        'produk_card_kanan_nama',
        'produk_card_kanan_desc',
        // Section 5 — Video
        'section_video_heading',
        'section_video_sub',
        'section_video_desc',
        'video_youtube_url',
        'video_durasi',
        'video_checklist_1',
        'video_checklist_2',
        'video_checklist_3',
        'video_checklist_4',
        'video_dark_card1_title', 'video_dark_card1_desc',
        'video_dark_card2_title', 'video_dark_card2_desc',
        'video_dark_card3_title', 'video_dark_card3_desc',
        'video_dark_card4_title', 'video_dark_card4_desc',
        // Section 6 — Katalog
        'section_katalog_heading',
        'section_katalog_desc',
        // Section 7 — Promo
        'section_promo_heading',
        'section_promo_desc',
        // Section 8 — Testimonial heading
        'section_testimonial_heading',
        'section_testimonial_desc',
        // Section 9 — Artikel
        'section_artikel_heading',
        'section_artikel_desc',
    ];

    private array $imageKeys = [
        'section_tentang_foto_pabrik',
        'section_tentang_foto_industri',
        'section_produk_card_kiri',
        'section_produk_card_kanan',
        'section_video_mockup',
        'section_promo_mockup_wa',
    ];

    public function index(): Response
    {
        $settings = [];
        foreach (array_merge($this->textKeys, $this->imageKeys) as $key) {
            $settings[$key] = Setting::getValue($key, '');
        }

        // Hero slide interval setting
        $settings['hero_slide_interval'] = Setting::getValue('hero_slide_interval', '5');

        $heroSlides = HeroSlide::ordered()->get();
        $testimonials = Testimonial::orderBy('sort_order')->orderBy('id')->get();

        return Inertia::render('Admin/SectionEditor', [
            'settings'     => $settings,
            'heroSlides'   => $heroSlides,
            'testimonials' => $testimonials,
            'success'      => session('success'),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate(array_merge(
            array_fill_keys($this->textKeys, 'nullable|string'),
            [
                'hero_slide_interval'                => 'nullable|integer|min:1|max:60',
                'section_tentang_foto_pabrik_file'   => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
                'section_tentang_foto_industri_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
                'section_produk_card_kiri_file'      => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
                'section_produk_card_kanan_file'     => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
                'section_video_mockup_file'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
                'section_promo_mockup_wa_file'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
            ]
        ));

        // Simpan text fields
        foreach ($this->textKeys as $key) {
            Setting::setValue($key, $request->input($key, ''));
        }

        // Simpan hero slide interval
        if ($request->has('hero_slide_interval')) {
            Setting::setValue('hero_slide_interval', (string) ($request->input('hero_slide_interval') ?: '5'));
        }

        // Handle image uploads
        $uploadPath = public_path('uploads/settings');
        if (!File::isDirectory($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        $imageFileMap = [
            'section_tentang_foto_pabrik_file'   => 'section_tentang_foto_pabrik',
            'section_tentang_foto_industri_file' => 'section_tentang_foto_industri',
            'section_produk_card_kiri_file'      => 'section_produk_card_kiri',
            'section_produk_card_kanan_file'     => 'section_produk_card_kanan',
            'section_video_mockup_file'          => 'section_video_mockup',
            'section_promo_mockup_wa_file'       => 'section_promo_mockup_wa',
        ];

        foreach ($imageFileMap as $fileField => $settingKey) {
            if ($request->hasFile($fileField)) {
                $file     = $request->file($fileField);
                $fileName = $settingKey . '_' . time() . '.' . $file->getClientOriginalExtension();
                $file->move($uploadPath, $fileName);
                Setting::setValue($settingKey, '/uploads/settings/' . $fileName);
            }
        }

        return redirect()->back()->with('success', 'Pengaturan section berhasil diperbarui.');
    }

    // ============================================================
    // Hero Slides CRUD
    // ============================================================

    public function storeSlide(Request $request)
    {
        $request->validate([
            'image_file'  => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
            'title'       => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable',
        ]);

        $uploadPath = public_path('uploads/hero-slides');
        if (!File::isDirectory($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        $file = $request->file('image_file');
        $fileName = 'hero_slide_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move($uploadPath, $fileName);

        HeroSlide::create([
            'image_path'  => '/uploads/hero-slides/' . $fileName,
            'title'       => $request->input('title'),
            'description' => $request->input('description'),
            'sort_order'  => (int) ($request->input('sort_order') ?? 0),
            'is_active'   => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->back()->with('success', 'Slide hero berhasil ditambahkan.');
    }

    public function updateSlide(Request $request, HeroSlide $heroSlide)
    {
        $request->validate([
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:8192',
            'title'       => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable',
        ]);

        $data = [
            'title'       => $request->input('title'),
            'description' => $request->input('description'),
            'sort_order'  => (int) ($request->input('sort_order') ?? 0),
            'is_active'   => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('image_file')) {
            $uploadPath = public_path('uploads/hero-slides');
            if (!File::isDirectory($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true, true);
            }

            $file = $request->file('image_file');
            $fileName = 'hero_slide_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $data['image_path'] = '/uploads/hero-slides/' . $fileName;
        }

        $heroSlide->update($data);

        return redirect()->back()->with('success', 'Slide hero berhasil diperbarui.');
    }

    public function deleteSlide(HeroSlide $heroSlide)
    {
        $heroSlide->delete();
        return redirect()->back()->with('success', 'Slide hero berhasil dihapus.');
    }
}
