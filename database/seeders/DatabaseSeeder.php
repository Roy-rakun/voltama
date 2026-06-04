<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Default Users
        User::updateOrCreate(
            ['email' => 'admin@voltama.id'],
            [
                'name' => 'Admin Voltama',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'editor@voltama.id'],
            [
                'name' => 'Editor Voltama',
                'password' => Hash::make('editor123'),
                'role' => 'editor',
                'email_verified_at' => now(),
            ]
        );

        // 2. Seed Default Settings
        $defaultSettings = [
            'website_title'   => 'Voltama - Kabel Listrik SNI Premium',
            'website_logo'    => '/images/logo.png',
            'website_favicon' => '/images/logo.png',
            // Hero Section (4 baris judul)
            'section_hero_title_line1' => 'SOLUSI KABEL',
            'section_hero_title_line2' => 'BERKUALITAS',
            'section_hero_title_line3' => 'UNTUK',
            'section_hero_title_line4' => 'INSTALASI MODERN',
            'section_hero_desc'        => 'Voltama menghadirkan produk kabel listrik dan perlengkapan listrik berkualitas yang berkomitmen menghadirkan produk berkualitas, aman, dan terpercaya.',
            'hero_banner_path'         => '/assets/Fix.png',
            'hero_catalog_year'        => date('Y'),
            // Footer
            'footer_copyright' => '© ' . date('Y') . ' PT. Sinar Intan Putra Nusa. All rights reserved.',
            'footer_address'   => 'Kawasan Industri Maspion, Sidoarjo, Jawa Timur',
            'footer_phone'     => '0898-8898-778',
            'footer_email'     => 'info@voltama.id',
            'footer_whatsapp'  => '628988898778',
            'footer_facebook'  => '#',
            'footer_instagram' => '#',
            'footer_youtube'   => '#',
            // Sertifikasi & Powered By
            'footer_certification_badge' => 'SNI',
            'footer_certification_text'  => 'Lembaga Sertifikasi Produk (LSPr)',
            'footer_powered_by_text'     => 'Voltama',
            'footer_powered_by_link'     => '#',
            // SEO & Tracking
            'facebook_pixel'   => '',
            'google_analytics' => '',
        ];

        foreach ($defaultSettings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
