<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Catalog;
use App\Models\CatalogCategory;
use App\Models\HeroSlide;
use App\Models\Page;
use App\Models\Setting;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    /**
     * Get shared global settings for header/footer (favicon, logo, GA, tracking, etc)
     */
    private function getGlobalSettings(): array
    {
        $keys = [
            'website_title', 'website_logo', 'website_favicon',
            'facebook_pixel', 'google_analytics',
            'footer_copyright', 'footer_address', 'footer_phone', 'footer_email',
            'footer_facebook', 'footer_instagram', 'footer_youtube', 'footer_whatsapp',
            'footer_marketplace_logo', 'footer_marketplace_link',
            'footer_powered_by_text', 'footer_powered_by_link'
        ];

        $settings = [];
        foreach ($keys as $key) {
            $settings[$key] = Setting::getValue($key, '');
        }

        // Multi ecommerce stores (JSON array)
        $raw = Setting::getValue('ecommerce_stores', '[]');
        $settings['ecommerce_stores'] = json_decode($raw, true) ?: [];

        // Multi certifications (JSON array)
        $rawCert = Setting::getValue('certifications', '[]');
        $settings['certifications'] = json_decode($rawCert, true) ?: [];

        // Get list of active custom pages for dynamic header/footer navigation
        $settings['pages_nav'] = Page::where('is_active', true)->select('title', 'slug')->get();

        return $settings;
    }

    /**
     * Display the main landing page.
     */
    public function index(): Response
    {
        $globalSettings = $this->getGlobalSettings();

        // Get Hero Slides dari database
        $heroSlides = HeroSlide::active()->get();
        $heroSlideInterval = (int) Setting::getValue('hero_slide_interval', '5');

        // Section Images — semua bisa diganti via pengaturan backend
        $sectionImages = [
            'tentang_foto_pabrik'  => Setting::getValue('section_tentang_foto_pabrik', '/assets/Voltama.id_Visual_Mockup_Draft.PNG'),
            'tentang_foto_industri' => Setting::getValue('section_tentang_foto_industri', '/assets/Voltama.id_Visual_Mockup_Draft.PNG'),
            'produk_card_kiri'     => Setting::getValue('section_produk_card_kiri', '/assets/Fixx.PNG'),
            'produk_card_kanan'    => Setting::getValue('section_produk_card_kanan', '/assets/Fixxx.PNG'),
            'video_mockup'         => Setting::getValue('section_video_mockup', '/assets/Voltama.id_Visual_Mockup_Draft.PNG'),
            'promo_mockup_wa'      => Setting::getValue('section_promo_mockup_wa', '/assets/Voltama.id_Web Lounching_WA_Mockup_Draft.png'),
        ];

        // Section Texts — semua teks heading dan deskripsi section bisa diedit
        $sectionTexts = [
            // Section 2 — Tentang
            'tentang_heading'       => Setting::getValue('section_tentang_heading',      'TENTANG VOLTAMA'),
            'tentang_sub'           => Setting::getValue('section_tentang_sub',          'Keunggulan & Visi Kami'),
            'tentang_desc'          => Setting::getValue('section_tentang_desc',         'Voltama merupakan brand kabel listrik premium yang diproduksi oleh PT. Sinar Intan Putra Nusa. Berkomitmen menghadirkan produk berkualitas, aman, dan terpercaya untuk hunian dan industri.'),
            // Section 3 — Fitur
            'features_heading'      => Setting::getValue('section_features_heading',     'Solusi Kabel Terpadu'),
            'features_sub'          => Setting::getValue('section_features_sub',         'Kenapa Memilih Voltama?'),
            'features_desc'         => Setting::getValue('section_features_desc',        'Kabel kami dirancang dengan standar keamanan tertinggi untuk memenuhi kebutuhan instalasi rumah tinggal hingga industri berat.'),
            // Section 4 — Produk
            'produk_heading'        => Setting::getValue('section_produk_heading',       'Produk Unggulan Kami'),
            'produk_desc'           => Setting::getValue('section_produk_desc',          ''),
            // Section 5 — Video
            'video_heading'         => Setting::getValue('section_video_heading',        'Lihat Keunggulan Voltama'),
            'video_sub'             => Setting::getValue('section_video_sub',            'Lebih dari Sekedar Kabel'),
            'video_desc'            => Setting::getValue('section_video_desc',           'Diproduksi dengan teknologi modern dan bahan tembaga murni pilihan, kabel Voltama dirancang untuk ketahanan maksimal.'),
            // Section 6 — Katalog
            'katalog_heading'       => Setting::getValue('section_katalog_heading',      'Jelajahi Produk Terbaik'),
            'katalog_desc'          => Setting::getValue('section_katalog_desc',         'Lihat detail spesifikasi teknis dari kabel listrik andalan kami.'),
            // Section 7 — Promo
            'promo_heading'         => Setting::getValue('section_promo_heading',        'Hubungi Layanan Sales atau Beli Online'),
            'promo_desc'            => Setting::getValue('section_promo_desc',           'Kabel Voltama kini tersedia secara resmi di berbagai platform marketplace terpercaya di Indonesia. Dapatkan pengiriman cepat dan garansi resmi.'),
            // Section 8 — Testimonial
            'testimonial_heading'   => Setting::getValue('section_testimonial_heading',  'Apa Kata Pelanggan Kami'),
            'testimonial_desc'      => Setting::getValue('section_testimonial_desc',     ''),
            // Section 9 — Artikel
            'artikel_heading'       => Setting::getValue('section_artikel_heading',      'Artikel & Tips Kelistrikan'),
            'artikel_desc'          => Setting::getValue('section_artikel_desc',         'Informasi informatif seputar pencegahan risiko korsleting dan cara memilih kabel listrik.'),

            // Section 2 — Stat Cards
            'tentang_stat1_value'   => Setting::getValue('tentang_stat1_value', '10+'),
            'tentang_stat1_label'   => Setting::getValue('tentang_stat1_label', 'BERPENGALAMAN'),
            'tentang_stat1_sub'     => Setting::getValue('tentang_stat1_sub',   'Lebih dari 10 tahun di industri kelistrikan'),
            'tentang_stat2_value'   => Setting::getValue('tentang_stat2_value', '34'),
            'tentang_stat2_label'   => Setting::getValue('tentang_stat2_label', 'DISTRIBUSI'),
            'tentang_stat2_sub'     => Setting::getValue('tentang_stat2_sub',   'Seluruh Indonesia'),
            'tentang_stat3_value'   => Setting::getValue('tentang_stat3_value', 'SNI'),
            'tentang_stat3_label'   => Setting::getValue('tentang_stat3_label', 'KUALITAS TERJAMIN'),
            'tentang_stat3_sub'     => Setting::getValue('tentang_stat3_sub',   'SNI & LMK'),
            'tentang_stat4_value'   => Setting::getValue('tentang_stat4_value', '10'),
            'tentang_stat4_label'   => Setting::getValue('tentang_stat4_label', 'GARANSI PRODUK'),
            'tentang_stat4_sub'     => Setting::getValue('tentang_stat4_sub',   'Hingga 10 Tahun'),
            // Section 2 — Overlay industri
            'tentang_industri_judul'=> Setting::getValue('tentang_industri_judul', 'Diproduksi dengan Teknologi Modern'),
            'tentang_industri_sub'  => Setting::getValue('tentang_industri_sub',   'Di bawah pengawasan mutu ketat berstandar internasional'),
            // Section 3 — 3 Fitur Cards
            'features_card1_title'  => Setting::getValue('features_card1_title', 'Konduktor Tembaga Murni'),
            'features_card1_desc'   => Setting::getValue('features_card1_desc',  'Voltama menggunakan tembaga murni berkualitas tinggi tanpa campuran, memberikan tingkat penghantar arus listrik yang stabil dan efisiensi konsumsi daya maksimal.'),
            'features_card2_title'  => Setting::getValue('features_card2_title', 'Isolator PVC Tahan Panas'),
            'features_card2_desc'   => Setting::getValue('features_card2_desc',  'Bahan pelindung PVC kelas premium dengan elastisitas tinggi dan daya tahan termal yang kuat, melindungi kawat tembaga dari kerusakan akibat panas tinggi.'),
            'features_card3_title'  => Setting::getValue('features_card3_title', 'Garansi Mutu Bersertifikasi'),
            'features_card3_desc'   => Setting::getValue('features_card3_desc',  'Semua tipe kabel Voltama diuji ketat secara laboratoris dan telah lolos sertifikasi SNI, LMK, serta SPLN guna menjamin keamanan maksimal instalasi rumah Anda.'),
            // Section 4 — Tombol & Kartu
            'produk_sub'            => Setting::getValue('section_produk_sub',   ''),
            'produk_btn1_text'      => Setting::getValue('produk_btn1_text',      'Jelajahi Katalog'),
            'produk_btn2_text'      => Setting::getValue('produk_btn2_text',      'Hubungi Sales'),
            'produk_card_kiri_label'=> Setting::getValue('produk_card_kiri_label','PRODUK PREMIUM'),
            'produk_card_kiri_nama' => Setting::getValue('produk_card_kiri_nama', 'Kabel NYY Voltama'),
            'produk_card_kiri_desc' => Setting::getValue('produk_card_kiri_desc', 'Kabel instalasi bawah tanah dengan pelindung ganda, tahan gesekan mekanis dan air.'),
            'produk_card_kanan_label'=> Setting::getValue('produk_card_kanan_label','BEST SELLER'),
            'produk_card_kanan_nama' => Setting::getValue('produk_card_kanan_nama', 'Kabel NYM Voltama'),
            'produk_card_kanan_desc' => Setting::getValue('produk_card_kanan_desc', 'Kabel instalasi rumah standar dengan isolasi PVC tebal, aman digunakan di dinding.'),
            // Section 5 — Video
            'video_youtube_url'     => Setting::getValue('video_youtube_url',    ''),
            'video_durasi'          => Setting::getValue('video_durasi',         '02:45 Mins Video'),
            'video_checklist_1'     => Setting::getValue('video_checklist_1',    '100% Konduktor Tembaga Murni untuk penyaluran arus optimal.'),
            'video_checklist_2'     => Setting::getValue('video_checklist_2',    'Isolator PVC Premium yang tahan api dan tidak merambatkan nyala api.'),
            'video_checklist_3'     => Setting::getValue('video_checklist_3',    'Sertifikasi Resmi SNI dari Lembaga Sertifikasi Produk independen.'),
            'video_checklist_4'     => Setting::getValue('video_checklist_4',    'Lolos uji ketat kebocoran tegangan tinggi di laboratorium uji.'),
            'video_dark_card1_title'=> Setting::getValue('video_dark_card1_title','User-Centric Quality'),
            'video_dark_card1_desc' => Setting::getValue('video_dark_card1_desc', 'Didesain berdasarkan kebutuhan aman pengguna rumah tinggal & industri.'),
            'video_dark_card2_title'=> Setting::getValue('video_dark_card2_title','Scalable Safety'),
            'video_dark_card2_desc' => Setting::getValue('video_dark_card2_desc', 'Standardisasi kapasitas hantar arus yang aman di berbagai level tegangan.'),
            'video_dark_card3_title'=> Setting::getValue('video_dark_card3_title','Security-First Material'),
            'video_dark_card3_desc' => Setting::getValue('video_dark_card3_desc', 'Bahan pelindung kabel tahan korosi, tahan panas, dan tahan gigitan tikus.'),
            'video_dark_card4_title'=> Setting::getValue('video_dark_card4_title','Innovation-Driven'),
            'video_dark_card4_desc' => Setting::getValue('video_dark_card4_desc', 'Pengembangan isolasi kabel berteknologi ramah lingkungan.'),
        ];

        // Get 6 latest catalogs for landing page slider
        $catalogs = Catalog::where('is_active', true)->orderBy('id', 'desc')->limit(6)->get();

        // Get latest 6 active articles for landing page
        $articles = Article::where('is_active', true)->orderBy('id', 'desc')->limit(6)->get();

        // Testimonials dari database
        $testimonials = Testimonial::active()->get();

        return Inertia::render('Frontend/LandingPage', [
            'globalSettings'    => $globalSettings,
            'heroSlides'        => $heroSlides,
            'heroSlideInterval' => $heroSlideInterval,
            'sectionImages'     => $sectionImages,
            'sectionTexts'      => $sectionTexts,
            'catalogs'          => $catalogs,
            'articles'          => $articles,
            'testimonials'      => $testimonials,
        ]);
    }

    /**
     * Display listing of all catalogs with search and filter.
     */
    public function catalogs(Request $request): Response
    {
        $globalSettings = $this->getGlobalSettings();
        $search = $request->input('search');
        $specFilter = $request->input('spec'); // e.g. voltage, SNI, dst

        $query = Catalog::where('is_active', true);

        // Filter berdasarkan kategori
        $categorySlug = $request->input('kategori');
        $activeCategory = null;
        if ($categorySlug) {
            $activeCategory = CatalogCategory::where('slug', $categorySlug)->where('is_active', true)->first();
            if ($activeCategory) {
                $query->where('catalog_category_id', $activeCategory->id);
            }
        }

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Advanced Filter using SQLite JSON extraction
        if ($specFilter && is_array($specFilter)) {
            foreach ($specFilter as $key => $value) {
                if ($value) {
                    $query->where('specifications->' . $key, 'like', "%{$value}%");
                }
            }
        }

        $catalogs = $query->orderBy('id', 'desc')->get();

        // Extract all available spec keys and values for dynamic filter sidebar/dropdown
        $allCatalogs = Catalog::where('is_active', true)->get();
        $availableSpecs = [];
        foreach ($allCatalogs as $cat) {
            if (is_array($cat->specifications)) {
                foreach ($cat->specifications as $k => $v) {
                    if ($v) {
                        $availableSpecs[$k][] = $v;
                    }
                }
            }
        }

        // Make spec values unique
        foreach ($availableSpecs as $k => $v) {
            $availableSpecs[$k] = array_values(array_unique($v));
        }

        // Ambil semua kategori katalog yang aktif
        $catalogCategories = CatalogCategory::where('is_active', true)
            ->withCount(['catalogs' => fn($q) => $q->where('is_active', true)])
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Frontend/AllCatalogs', [
            'globalSettings'   => $globalSettings,
            'catalogs'         => $catalogs,
            'catalogCategories'=> $catalogCategories,
            'activeCategory'   => $activeCategory,
            'availableSpecs'   => $availableSpecs,
            'filters'          => [
                'search'   => $search,
                'spec'     => $specFilter,
                'kategori' => $categorySlug,
            ]
        ]);
    }

    /**
     * Display listing of all articles.
     */
    public function articles(Request $request): Response
    {
        $globalSettings = $this->getGlobalSettings();
        $search = $request->input('search');

        $query = Article::where('is_active', true);

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $articles = $query->orderBy('id', 'desc')->paginate(9)->withQueryString();

        return Inertia::render('Frontend/AllArticles', [
            'globalSettings' => $globalSettings,
            'articles' => $articles,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    /**
     * Display article detail page.
     */
    public function articleDetail(string $slug): Response
    {
        $globalSettings = $this->getGlobalSettings();
        
        $article = Article::where('slug', $slug)->where('is_active', true)->firstOrFail();
        
        // Increment view count safely
        $article->increment('views');

        // Get related articles (same active, exclude current, limit 3)
        $relatedArticles = Article::where('is_active', true)
            ->where('id', '!=', $article->id)
            ->inRandomOrder()
            ->limit(3)
            ->get();

        return Inertia::render('Frontend/ArticleDetail', [
            'globalSettings' => $globalSettings,
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ]);
    }

    /**
     * Display dynamic custom page.
     */
    public function page(string $slug): Response
    {
        $globalSettings = $this->getGlobalSettings();

        $page = Page::where('slug', $slug)->where('is_active', true)->firstOrFail();

        return Inertia::render('Frontend/CustomPage', [
            'globalSettings' => $globalSettings,
            'page' => $page
        ]);
    }
}
