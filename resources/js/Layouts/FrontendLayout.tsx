import { Link, Head } from '@inertiajs/react';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Sun, Moon, Globe, Phone, Mail, MapPin, Menu, X, ArrowUpRight, ShoppingCart } from 'lucide-react';

interface PageNav {
    title: string;
    slug: string;
}

interface GlobalSettings {
    website_title: string;
    website_logo: string;
    website_favicon: string;
    facebook_pixel: string;
    google_analytics: string;
    footer_copyright: string;
    footer_address: string;
    footer_phone: string;
    footer_email: string;
    footer_facebook: string;
    footer_instagram: string;
    footer_youtube: string;
    footer_whatsapp: string;
    footer_marketplace_logo: string;
    footer_marketplace_link?: string;
    ecommerce_stores: { name: string; logo: string; link: string }[];
    pages_nav: PageNav[];
    footer_powered_by_text?: string;
    footer_powered_by_link?: string;
    certifications: { name: string; logo: string }[];
    footer_description?: string;
    footer_tiktok?: string;
    contact_map_iframe?: string;
    contact_description?: string;
    contact_address?: string;
    contact_hours?: string;
    contact_days?: string;
}

interface FrontendLayoutProps {
    globalSettings: GlobalSettings;
    isInnerPage?: boolean;
}

export default function FrontendLayout({
    globalSettings,
    children,
    isInnerPage = false,
}: PropsWithChildren<FrontendLayoutProps>) {
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Sync Dark Mode state with HTML class list and LocalStorage
    // Default = LIGHT MODE kecuali user sudah simpan 'dark' sebelumnya
    useEffect(() => {
        // Paksa hapus dark class terlebih dahulu (prevent flash of dark)
        document.documentElement.classList.remove('dark');

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            // Pastikan default light, simpan ke localStorage jika belum ada
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
            if (!savedTheme) {
                localStorage.setItem('theme', 'light');
            }
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    };

    // Inject Facebook Pixel and Google Analytics scripts dynamically to Document head
    useEffect(() => {
        // Remove existing custom script elements to prevent duplicate execution
        const existingScripts = document.querySelectorAll('.dynamic-seo-script');
        existingScripts.forEach(el => el.remove());

        if (globalSettings.google_analytics) {
            // Google Analytics Script Injection
            const gaTemp = document.createElement('div');
            gaTemp.innerHTML = globalSettings.google_analytics;
            Array.from(gaTemp.childNodes).forEach((node) => {
                if (node instanceof HTMLScriptElement) {
                    const script = document.createElement('script');
                    script.className = 'dynamic-seo-script';
                    if (node.src) {
                        script.src = node.src;
                        script.async = true;
                    } else {
                        script.innerHTML = node.innerHTML;
                    }
                    document.head.appendChild(script);
                }
            });
        }

        if (globalSettings.facebook_pixel) {
            // Facebook Pixel Script Injection
            const fbTemp = document.createElement('div');
            fbTemp.innerHTML = globalSettings.facebook_pixel;
            Array.from(fbTemp.childNodes).forEach((node) => {
                if (node instanceof HTMLScriptElement) {
                    const script = document.createElement('script');
                    script.className = 'dynamic-seo-script';
                    script.innerHTML = node.innerHTML;
                    document.head.appendChild(script);
                }
            });
        }
    }, [globalSettings.google_analytics, globalSettings.facebook_pixel]);

    // Favicon Dynamic Update
    useEffect(() => {
        let faviconEl = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!faviconEl) {
            faviconEl = document.createElement('link');
            faviconEl.rel = 'icon';
            document.head.appendChild(faviconEl);
        }
        faviconEl.href = globalSettings.website_favicon || '/images/logo.png';
    }, [globalSettings.website_favicon]);

    const websiteLogo = globalSettings.website_logo || '/images/logo.png';
    const waNumber = globalSettings.footer_whatsapp || '628988898778';
    const cleanWaNumber = waNumber.replace(/[^0-9]/g, '');

    const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
        // Selalu scroll ke section jika element ditemukan di halaman ini
        const el = document.getElementById(sectionId);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Jika tidak ada di halaman ini, arahkan ke homepage dengan hash
            // biarkan default navigation terjadi
        }
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-gray-900 transition-colors duration-300 dark:bg-[#0c0c0c] dark:text-gray-100 flex flex-col font-sans">
            <Head>
                <title>{globalSettings.website_title || 'Voltama - Kabel Listrik SNI Premium'}</title>
            </Head>

            {/* HEADER / NAVIGATION */}
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 dark:bg-[#0c0c0c]/70 dark:border-gray-800 transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2 group">
                                <img
                                    src={websiteLogo}
                                    alt="Voltama Logo"
                                    className="w-auto object-contain transition group-hover:scale-105"
                                    style={{ height: '100px' }}
                                />
                            </Link>
                        </div>

                        {/* Desktop Nav: Beda tampilan untuk inner pages vs landing page */}
                        {isInnerPage ? (
                            /* Inner page (Katalog/Artikel): hanya tombol Kembali ke Home */
                            <nav className="hidden md:flex items-center">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#ffc400] transition px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:border-[#ffc400]"
                                >
                                    ← Kembali ke Home
                                </Link>
                            </nav>
                        ) : (
                            /* Landing page: full navigation dengan scroll per-section */
                            <nav className="hidden md:flex items-center space-x-6 text-sm font-bold">
                                <a
                                    href="/#tentang-sec"
                                    onClick={(e) => handleSectionClick(e, 'tentang-sec')}
                                    className="transition hover:text-[#ffc400] text-gray-600 dark:text-gray-300"
                                >
                                    Tentang
                                </a>
                                <a
                                    href="/#features-sec"
                                    onClick={(e) => handleSectionClick(e, 'features-sec')}
                                    className="transition hover:text-[#ffc400] text-gray-600 dark:text-gray-300"
                                >
                                    Solusi
                                </a>
                                <a
                                    href="/#video-sec"
                                    onClick={(e) => handleSectionClick(e, 'video-sec')}
                                    className="transition hover:text-[#ffc400] text-gray-600 dark:text-gray-300"
                                >
                                    Keunggulan
                                </a>
                                <a
                                    href="/#katalog-sec"
                                    onClick={(e) => handleSectionClick(e, 'katalog-sec')}
                                    className="transition hover:text-[#ffc400] text-gray-600 dark:text-gray-300"
                                >
                                    Produk
                                </a>

                                {/* Dynamic Custom Pages Nav */}
                                {globalSettings.pages_nav && globalSettings.pages_nav.map((navPage) => (
                                    <Link
                                        key={navPage.slug}
                                        href={`/p/${navPage.slug}`}
                                        className={`transition hover:text-[#ffc400] ${decodeURIComponent(window.location.pathname) === `/p/${navPage.slug}`
                                            ? 'text-[#ffc400]'
                                            : 'text-gray-600 dark:text-gray-300'
                                            }`}
                                    >
                                        {navPage.title}
                                    </Link>
                                ))}

                                {/* Divider & Testimoni/Artikel */}
                                <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 self-center mx-2" />
                                <a
                                    href="/#testimonial-sec"
                                    onClick={(e) => handleSectionClick(e, 'testimonial-sec')}
                                    className="relative py-1 transition hover:text-[#ffc400] text-gray-600 dark:text-gray-300 font-bold"
                                >
                                    Testimoni
                                </a>
                                 <a
                                    href="/#artikel-sec"
                                    onClick={(e) => handleSectionClick(e, 'artikel-sec')}
                                    className="relative py-1 transition hover:text-[#ffc400] text-gray-600 dark:text-gray-300 font-bold"
                                >
                                    Artikel
                                </a>
                                <a
                                    href="/#kontak-sec"
                                    onClick={(e) => handleSectionClick(e, 'kontak-sec')}
                                    className="relative py-1 transition hover:text-[#ffc400] text-gray-600 dark:text-gray-300 font-bold"
                                >
                                    Kontak
                                </a>
                            </nav>
                        )}

                        {/* Controls (Theme toggle, Belanja & Mobile Toggle) */}
                        <div className="flex items-center gap-4">
                            {/* Tombol Belanja (Desktop) */}
                            <a
                                href="/#promo-sec"
                                onClick={(e) => handleSectionClick(e, 'promo-sec')}
                                className="hidden lg:flex items-center gap-2 rounded-full bg-[#ffc400] text-gray-950 px-5 py-2.5 text-sm font-black hover:bg-[#ffb300] hover:scale-105 transition-all duration-300 shadow-md"
                            >
                                <ShoppingCart size={16} strokeWidth={2.5} />
                                Belanja
                            </a>

                            {/* Light/Dark Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                aria-label="Toggle Dark Mode"
                                className="rounded-full p-2.5 bg-gray-50 border border-gray-100 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-sm"
                            >
                                {darkMode ? <Sun size={18} className="animate-spin-slow" /> : <Moon size={18} />}
                            </button>

                            {/* Mobile Menu Toggle Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden rounded-xl border border-gray-100 dark:border-gray-800 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition shadow-sm"
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 py-4 dark:border-gray-800 dark:bg-[#0c0c0c]/95 transition-colors duration-300 space-y-1.5 shadow-xl animate-fade-in-down">
                        {isInnerPage ? (
                            /* Inner page: hanya tombol kembali */
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-xl px-4 py-2.5 text-sm font-bold bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-[#ffc400] transition"
                            >
                                ← Kembali ke Home
                            </Link>
                        ) : (
                            /* Landing page: full menu */
                            <>
                                <a
                                    href="/#tentang-sec"
                                    onClick={(e) => handleSectionClick(e, 'tentang-sec')}
                                    className="block rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                                >
                                    Tentang
                                </a>
                                <a
                                    href="/#features-sec"
                                    onClick={(e) => handleSectionClick(e, 'features-sec')}
                                    className="block rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                                >
                                    Solusi
                                </a>
                                <a
                                    href="/#video-sec"
                                    onClick={(e) => handleSectionClick(e, 'video-sec')}
                                    className="block rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                                >
                                    Keunggulan
                                </a>
                                <a
                                    href="/#katalog-sec"
                                    onClick={(e) => handleSectionClick(e, 'katalog-sec')}
                                    className="block rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                                >
                                    Produk
                                </a>
                                {globalSettings.pages_nav && globalSettings.pages_nav.map((navPage) => (
                                    <Link
                                        key={navPage.slug}
                                        href={`/p/${navPage.slug}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                                    >
                                        {navPage.title}
                                    </Link>
                                ))}
                                <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                                <a
                                    href="/#testimonial-sec"
                                    onClick={(e) => handleSectionClick(e, 'testimonial-sec')}
                                    className="block rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 text-[#ffc400]"
                                >
                                    Testimoni
                                </a>
                                <a
                                    href="/#artikel-sec"
                                    onClick={(e) => handleSectionClick(e, 'artikel-sec')}
                                    className="block rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 text-[#ffc400]"
                                >
                                    Artikel & Edukasi
                                </a>
                                <a
                                    href="/#kontak-sec"
                                    onClick={(e) => handleSectionClick(e, 'kontak-sec')}
                                    className="block rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 text-[#ffc400]"
                                >
                                    Kontak Kami
                                </a>
                                <div className="pt-2">
                                    <a
                                        href="/#promo-sec"
                                        onClick={(e) => handleSectionClick(e, 'promo-sec')}
                                        className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black bg-[#ffc400] text-gray-950 hover:bg-[#ffb300] transition"
                                    >
                                        <ShoppingCart size={16} strokeWidth={2.5} />
                                        Belanja Sekarang
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="flex-grow">
                {children}
            </main>

            {/* SECTION 9: FOOTER (Dark Theme & 4 Columns) */}
            <footer className="bg-[#0c0c0c] text-gray-300 border-t border-gray-800 transition-colors duration-300 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-gray-850">

                        {/* Kolom 1: Profil Perusahaan */}
                        <div className="space-y-4">
                            <img
                                src={websiteLogo}
                                alt="Voltama Logo"
                                className="object-contain brightness-0 invert"
                                style={{ width: '190px', height: 'auto' }}
                            />
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                {globalSettings.footer_description || 'Voltama adalah produsen kabel listrik berkualitas premium bersertifikat SNI dengan konduktor 100% tembaga murni untuk keamanan maksimal Anda.'}
                            </p>
                            <p className="text-xs text-gray-500 font-light leading-relaxed">
                                {globalSettings.footer_address || 'Kawasan Industri Maspion, Sidoarjo, Jawa Timur'}
                            </p>
                        </div>

                        {/* Kolom 2: Quick Links */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Tautan Cepat</h4>
                            <ul className="space-y-2.5 text-sm font-medium">
                                <li>
                                    <a href="/#hero-sec" onClick={(e) => handleSectionClick(e, 'hero-sec')} className="hover:text-[#ffc400] transition-colors">Beranda</a>
                                </li>
                                <li>
                                    <a href="/#tentang-sec" onClick={(e) => handleSectionClick(e, 'tentang-sec')} className="hover:text-[#ffc400] transition-colors">Tentang Voltama</a>
                                </li>
                                <li>
                                    <a href="/#features-sec" onClick={(e) => handleSectionClick(e, 'features-sec')} className="hover:text-[#ffc400] transition-colors">Keunggulan</a>
                                </li>
                                <li>
                                    <a href="/#katalog-sec" onClick={(e) => handleSectionClick(e, 'katalog-sec')} className="hover:text-[#ffc400] transition-colors">Katalog Produk</a>
                                </li>
                                <li>
                                    <a href="/#artikel-sec" onClick={(e) => handleSectionClick(e, 'artikel-sec')} className="hover:text-[#ffc400] transition-colors">Artikel</a>
                                </li>
                                {globalSettings.pages_nav && globalSettings.pages_nav.map((navPage) => (
                                    <li key={navPage.slug}>
                                        <Link href={`/p/${navPage.slug}`} className="hover:text-[#ffc400] transition-colors">{navPage.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kolom 3: Hubungi Kami */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Hubungi Kami</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-center gap-3">
                                    <Phone size={16} className="text-[#ffc400] shrink-0" />
                                    <a href={`tel:${globalSettings.footer_phone || '0898-8898-778'}`} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#ffc400] transition">
                                        {globalSettings.footer_phone || '0898-8898-778'}
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={16} className="text-[#ffc400] shrink-0" />
                                    <a href={`mailto:${globalSettings.footer_email || 'info@voltama.id'}`} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#ffc400] transition">
                                        {globalSettings.footer_email || 'info@voltama.id'}
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Globe size={16} className="text-[#ffc400] shrink-0" />
                                    <a href="https://voltama.id" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#ffc400] transition">
                                        voltama.id
                                    </a>
                                </li>
                            </ul>

                            {/* Sosial Media Icons */}
                            <div className="flex items-center gap-3 pt-2">
                                {globalSettings.footer_facebook && (
                                    <a href={globalSettings.footer_facebook} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-800 text-white hover:bg-[#ffc400] hover:text-gray-950 p-2 transition shadow-sm" title="Facebook">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                                        </svg>
                                    </a>
                                )}
                                {globalSettings.footer_instagram && (
                                    <a href={globalSettings.footer_instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-800 text-white hover:bg-[#ffc400] hover:text-gray-950 p-2 transition shadow-sm" title="Instagram">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </a>
                                )}
                                {globalSettings.footer_youtube && (
                                    <a href={globalSettings.footer_youtube} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-800 text-white hover:bg-[#ffc400] hover:text-gray-950 p-2 transition shadow-sm" title="Youtube">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.528 3.545 12 3.545 12 3.545s-7.528 0-9.388.51a3.004 3.004 0 00-2.11 2.108C0 8.022 0 12 0 12s0 3.978.502 5.837a3.004 3.004 0 002.11 2.108c1.86.51 9.388.51 9.388.51s7.53 0 9.388-.51a3.004 3.004 0 002.11-2.108C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                )}
                                {globalSettings.footer_tiktok && (
                                    <a href={globalSettings.footer_tiktok} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-800 text-white hover:bg-[#ffc400] hover:text-gray-950 p-2 transition shadow-sm" title="TikTok">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.18.94 1.13 2.27 1.9 3.73 2.18v3.98c-1.78-.05-3.52-.75-4.83-1.97-.02 1.48-.01 2.97-.01 4.45 0 2.24-.76 4.45-2.22 6.13-1.72 1.98-4.38 3.12-7.05 2.92-2.92-.22-5.69-2.2-6.72-4.96C-.17 14.51.5 11.08 2.58 8.87c1.78-1.9 4.43-2.9 7.03-2.61.1 0 .2.02.3.04v4.06c-.84-.28-1.79-.19-2.54.29-.8.51-1.32 1.4-1.4 2.34-.11 1.25.5 2.51 1.54 3.17.98.62 2.3.62 3.28 0 1.05-.66 1.66-1.92 1.55-3.17V.02z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Kolom 4: Sertifikasi & Marketplace */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Sertifikasi</h4>

                            {/* Logo Sertifikasi Resmi (Multi atau Fallback) */}
                            {globalSettings.certifications && globalSettings.certifications.length > 0 ? (
                                <div className="flex flex-wrap gap-2.5">
                                    {globalSettings.certifications.map((cert: { name: string; logo: string }, idx: number) => (
                                        <div key={idx} className="inline-block transition hover:scale-105 duration-300" title={cert.name}>
                                            <img
                                                src={cert.logo}
                                                alt={cert.name}
                                                className="h-10 w-auto object-contain bg-white rounded-lg p-1.5 shadow-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex gap-2 items-center text-xs text-gray-400 bg-gray-900 border border-gray-800 p-2.5 rounded-xl">
                                    <span className="px-2 py-0.5 bg-[#ffc400] text-gray-950 font-extrabold rounded text-[10px]">SNI</span>
                                    <span>Lembaga Sertifikasi Produk (LSPr)</span>
                                </div>
                            )}

                            {/* Toko Online — multiple ecommerce stores */}
                            {globalSettings.ecommerce_stores && globalSettings.ecommerce_stores.length > 0 ? (
                                <div className="pt-2">
                                    <span className="text-xs text-gray-500 block mb-2 font-medium">Toko Online Resmi Kami:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {globalSettings.ecommerce_stores.map((store: { name: string; logo: string; link: string }, idx: number) => (
                                            <a
                                                key={idx}
                                                href={store.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block transition hover:scale-105 duration-300"
                                                title={store.name}
                                            >
                                                <img
                                                    src={store.logo}
                                                    alt={store.name}
                                                    className="h-10 w-auto object-contain bg-white rounded-lg p-1.5 shadow-sm"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : globalSettings.footer_marketplace_logo ? (
                                <div className="pt-2">
                                    <span className="text-xs text-gray-550 block mb-2 font-medium">Toko Online Resmi Kami:</span>
                                    <a
                                        href={globalSettings.footer_marketplace_link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block transition hover:scale-105 duration-300"
                                    >
                                        <img
                                            src={globalSettings.footer_marketplace_logo}
                                            alt="Beli Online"
                                            className="h-10 w-auto object-contain bg-white rounded-lg p-1.5 shadow-sm"
                                        />
                                    </a>
                                </div>
                            ) : (
                                <div className="pt-2">
                                    <span className="text-xs text-gray-500 block mb-2 font-medium">Toko Online Resmi Kami:</span>
                                    <a
                                        href={globalSettings.footer_marketplace_link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block transition hover:scale-105 duration-300"
                                    >
                                        <img
                                            src="/assets/Icon marketplace.png"
                                            alt="Beli di Tokopedia & Shopee"
                                            className="h-10 w-auto object-contain bg-white rounded-lg p-1.5 shadow-sm"
                                        />
                                    </a>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Copyright & Subfooter */}
                    <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-light gap-4">
                        <span>{globalSettings.footer_copyright || '© 2026 PT. Sinar Intan Putra Nusa. All rights reserved.'}</span>
                        <div className="flex items-center gap-1">
                            <span>Powered by</span>
                            <a
                                href={globalSettings.footer_powered_by_link || '#'}
                                className="underline hover:text-white transition-colors"
                            >
                                {globalSettings.footer_powered_by_text || 'Voltama'}
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* FLOATING WHATSAPP CALL BUTTON */}
            <a
                href={`https://wa.me/${cleanWaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi kami melalui WhatsApp"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-bounce-slow"
            >
                <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.233-1.371a9.936 9.936 0 004.777 1.216h.005c5.505 0 9.99-4.478 9.99-9.985C22.007 6.476 17.519 2 12.012 2zm6.757 14.283c-.277.78-1.597 1.526-2.195 1.6-.597.075-1.196.34-3.842-.715-2.646-1.055-4.305-3.766-4.437-3.942-.132-.177-1.077-1.432-1.077-2.729s.677-1.936.92-2.19c.243-.255.53-.32.707-.32a.855.855 0 01.62.292c.176.292.62 1.503.673 1.614.053.11.088.24.017.382-.07.143-.105.23-.212.355-.106.126-.22.28-.318.381-.11.11-.225.23-.097.45.128.22.57 1.012 1.22 1.59.838.745 1.547.975 1.77.1083.22.108.484-.11.61-.27.124-.16.27-.08.41-.03.14.05.885.418 1.037.493.153.076.255.112.293.177.037.065.037.377-.24.783z" />
                </svg>
            </a>
        </div>
    );
}
