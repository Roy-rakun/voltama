import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState, useRef, FormEvent } from 'react';
import {
    ShieldCheck, Award, Zap, Truck, ArrowRight, ArrowLeft,
    Bell, ArrowUpRight, Check, Play, Star, ChevronLeft, ChevronRight, Quote,
    Package, Globe, BadgeCheck, Clock, Calendar, MapPin, Phone, Mail
} from 'lucide-react';

interface Catalog {
    id: number;
    title: string;
    slug: string;
    description: string;
    image_path: string;
    specifications: Record<string, string>;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_path: string;
    created_at: string;
}

interface HeroSlideData {
    id: number;
    image_path: string;
    title: string | null;
    description: string | null;
    sort_order: number;
    is_active: boolean;
}

interface SectionImages {
    tentang_foto_pabrik: string;
    tentang_foto_industri: string;
    produk_card_kiri: string;
    produk_card_kanan: string;
    video_mockup: string;
    promo_mockup_wa: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    avatar_path: string | null;
}

interface SectionTexts {
    // Section 2 — Tentang
    tentang_heading: string;
    tentang_sub: string;
    tentang_desc: string;
    tentang_stat1_value: string; tentang_stat1_label: string; tentang_stat1_sub: string; tentang_stat1_link?: string;
    tentang_stat2_value: string; tentang_stat2_label: string; tentang_stat2_sub: string; tentang_stat2_link?: string;
    tentang_stat3_value: string; tentang_stat3_label: string; tentang_stat3_sub: string; tentang_stat3_link?: string;
    tentang_stat4_value: string; tentang_stat4_label: string; tentang_stat4_sub: string; tentang_stat4_link?: string;
    tentang_industri_judul: string;
    tentang_industri_sub: string;
    // Section 3 — Fitur
    features_heading: string;
    features_sub: string;
    features_desc: string;
    features_card1_title: string; features_card1_desc: string;
    features_card2_title: string; features_card2_desc: string;
    features_card3_title: string; features_card3_desc: string;
    // Section 4 — Produk
    produk_heading: string;
    produk_sub: string;
    produk_desc: string;
    produk_btn1_text: string;
    produk_btn2_text: string;
    produk_card_kiri_label: string; produk_card_kiri_nama: string; produk_card_kiri_desc: string;
    produk_card_kanan_label: string; produk_card_kanan_nama: string; produk_card_kanan_desc: string;
    // Section 5 — Video
    video_heading: string;
    video_sub: string;
    video_desc: string;
    video_youtube_url: string;
    video_durasi: string;
    video_checklist_1: string; video_checklist_2: string;
    video_checklist_3: string; video_checklist_4: string;
    video_dark_card1_title: string; video_dark_card1_desc: string;
    video_dark_card2_title: string; video_dark_card2_desc: string;
    video_dark_card3_title: string; video_dark_card3_desc: string;
    video_dark_card4_title: string; video_dark_card4_desc: string;
    // Section 6 — Katalog
    katalog_heading: string;
    katalog_desc: string;
    // Section 7 — Promo
    promo_heading: string;
    promo_desc: string;
    // Section 8 — Testimonial
    testimonial_heading: string;
    testimonial_desc: string;
    // Section 9 — Artikel
    artikel_heading: string;
    artikel_desc: string;
}

interface LandingPageProps {
    globalSettings: any;
    heroSlides: HeroSlideData[];
    heroSlideInterval: number;
    sectionImages: SectionImages;
    sectionTexts: SectionTexts;
    catalogs: Catalog[];
    articles: Article[];
    testimonials: Testimonial[];
}

const parseEmbedUrl = (input: string | null | undefined): string => {
    if (!input) return '';
    const trimmed = input.trim();
    if (trimmed.includes('<iframe')) {
        const match = trimmed.match(/src=["']([^"']+)["']/i);
        if (match && match[1]) {
            return match[1];
        }
    }
    return trimmed;
};

const renderFormattedText = (text: string | null | undefined) => {
    if (!text) return '';
    let escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    
    let formatted = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
};

export default function LandingPage({ globalSettings, heroSlides, heroSlideInterval, sectionImages, sectionTexts, catalogs, articles, testimonials }: LandingPageProps) {

    // --- Email Notification Logic ---
    const [email, setEmail] = useState('');
    const [notified, setNotified] = useState(false);
    const handleNotify = (e: FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setNotified(true);
            setEmail('');
            setTimeout(() => setNotified(false), 5000);
        }
    };

    // --- Hero Slider Logic ---
    const [heroIdx, setHeroIdx] = useState(0);
    const heroSlidesCount = heroSlides?.length || 0;
    const intervalMs = (heroSlideInterval || 5) * 1000;

    useEffect(() => {
        if (heroSlidesCount <= 1) return;
        const timer = setInterval(() => {
            setHeroIdx((prev) => (prev + 1) % heroSlidesCount);
        }, intervalMs);
        return () => clearInterval(timer);
    }, [heroSlidesCount, intervalMs]);

    const heroGoPrev = () => {
        if (heroSlidesCount <= 1) return;
        setHeroIdx((prev) => (prev - 1 + heroSlidesCount) % heroSlidesCount);
    };
    const heroGoNext = () => {
        if (heroSlidesCount <= 1) return;
        setHeroIdx((prev) => (prev + 1) % heroSlidesCount);
    };

    // --- Catalog Slider Logic ---
    const [activeIdx, setActiveIdx] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (catalogs.length === 0) return;
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % catalogs.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [catalogs]);

    useEffect(() => {
        if (sliderRef.current && catalogs.length > 0) {
            const container = sliderRef.current;
            const activeCard = container.children[activeIdx] as HTMLElement;
            if (activeCard) {
                const containerWidth = container.offsetWidth;
                const cardWidth = activeCard.offsetWidth;
                const cardLeft = activeCard.offsetLeft;
                container.scrollTo({
                    left: cardLeft - (containerWidth / 2) + (cardWidth / 2),
                    behavior: 'smooth'
                });
            }
        }
    }, [activeIdx, catalogs]);

    const handlePrevSlide = () => {
        if (catalogs.length === 0) return;
        setActiveIdx((prev) => (prev - 1 + catalogs.length) % catalogs.length);
    };

    const handleNextSlide = () => {
        if (catalogs.length === 0) return;
        setActiveIdx((prev) => (prev + 1) % catalogs.length);
    };

    // --- Testimonial State ---
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    // Gunakan dari DB; fallback ke array kosong
    const testimonialsData = testimonials && testimonials.length > 0 ? testimonials : [
        {
            id: 0,
            name: 'Ir. Bambang Wijaya',
            role: 'Kontraktor Elektrikal Utama',
            quote: 'Voltama benar-benar meredefinisi standar keselamatan kelistrikan. 100% tembaga murni dan isolasi PVC yang ekstra tebal memberikan rasa aman mutlak untuk proyek skala besar yang saya kelola.',
            avatar_path: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120'
        },
        {
            id: 1,
            name: 'Hendra Setiawan',
            role: 'Pemilik Rumah Mewah - Sidoarjo',
            quote: 'Untuk rumah keluarga, saya tidak ingin berkompromi dengan keselamatan listrik. Garansi 10 tahun dan sertifikat resmi SNI dari Voltama membuktikan komitmen kualitas mereka yang luar biasa.',
            avatar_path: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120'
        },
        {
            id: 2,
            name: 'Lina Marsha',
            role: 'Arsitek & Desainer Interior',
            quote: 'Instalasi listrik yang aman adalah fondasi desain interior yang baik. Kabel Voltama sangat fleksibel saat dipasang, rapi, dan performanya sangat stabil menyalurkan daya kelistrikan.',
            avatar_path: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120'
        }
    ];

    // --- Scroll Intersection Observer for fade-in animations ---
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.id) {
                    setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
                }
            });
        }, { threshold: 0.12 });

        const sections = document.querySelectorAll('.observe-section');
        sections.forEach(sec => observer.observe(sec));
        return () => observer.disconnect();
    }, []);

    const isVis = (id: string) => !!visibleSections[id];

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const stripHtml = (html: string) => {
        if (!html) return '';
        const clean = html
            .replace(/<[^>]*>/g, '')
            .replace(/\u00a0/g, ' ')
            .replace(/&nbsp;/g, ' ');
        return clean.substring(0, 120) + '...';
    };

    return (
        <FrontendLayout globalSettings={globalSettings}>
            <Head title={globalSettings.website_title || 'Voltama - Solusi Kabel Listrik SNI Premium'} />

            {/* ============================================================
                SECTION 1: HERO — Full-Width Image Slider with Ken Burns
            ============================================================ */}
            <section
                id="hero-sec"
                className="relative overflow-hidden w-full bg-[#0c0c0c]"
            >
                {/* Slider Background Images */}
                {heroSlides && heroSlides.length > 0 ? (
                    <div className="relative w-full overflow-hidden">
                        {heroSlides.map((slide, idx) => {
                            return (
                                <div
                                    key={slide.id}
                                    className={`w-full transition-opacity duration-1000 ease-in-out ${
                                        idx === heroIdx ? 'opacity-100 relative z-[1]' : 'opacity-0 absolute inset-0 z-0 pointer-events-none'
                                    }`}
                                >
                                    <img
                                        src={slide.image_path}
                                        alt={slide.title || 'Voltama Hero Slide'}
                                        className="w-full h-auto object-contain block"
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Fallback jika tidak ada slide */
                    <div
                        className="w-full aspect-[16/9] md:aspect-[21/9] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
                    />
                )}

                {/* Dark overlay gradient */}
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Overlay content — judul & deskripsi slide */}
                <div className="absolute inset-0 z-[3] flex items-end pb-8 sm:pb-12 md:pb-20 lg:pb-28 xl:pb-32 pointer-events-none">
                    <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

                        {/* Slide Text Content (Sembunyikan di mobile agar teks bawaan gambar terbaca) */}
                        {heroSlides && heroSlides.length > 0 && (
                            <div className="max-w-3xl hidden md:block">
                                {heroSlides[heroIdx]?.title && (
                                    <h1
                                        key={`title-${heroIdx}`}
                                        className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-4 animate-[slideUp_0.8s_ease-out] pointer-events-auto"
                                    >
                                        {heroSlides[heroIdx]?.title}
                                    </h1>
                                )}
                                {heroSlides[heroIdx]?.description && (
                                    <p
                                        key={`desc-${heroIdx}`}
                                        className="text-sm md:text-lg text-white/80 leading-relaxed max-w-xl animate-[slideUp_0.8s_ease-out_0.15s_both] pointer-events-auto"
                                    >
                                        {heroSlides[heroIdx]?.description}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Dots indicator + Prev/Next (Tetap interaktif) */}
                        {heroSlidesCount > 1 && (
                            <div className="flex items-center gap-4 mt-4 md:mt-8 pointer-events-auto">
                                {/* Prev */}
                                <button
                                    onClick={heroGoPrev}
                                    aria-label="Slide sebelumnya"
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#ffc400] hover:text-gray-950 hover:border-[#ffc400] transition-all duration-300"
                                >
                                    <ChevronLeft size={18} strokeWidth={2.5} />
                                </button>

                                {/* Dots */}
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    {heroSlides.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setHeroIdx(idx)}
                                            aria-label={`Slide ${idx + 1}`}
                                            className={`transition-all duration-500 rounded-full ${
                                                idx === heroIdx
                                                    ? 'w-8 h-2.5 bg-[#ffc400]'
                                                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Next */}
                                <button
                                    onClick={heroGoNext}
                                    aria-label="Slide berikutnya"
                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#ffc400] hover:text-gray-950 hover:border-[#ffc400] transition-all duration-300"
                                >
                                    <ChevronRight size={18} strokeWidth={2.5} />
                                </button>

                                {/* Slide counter */}
                                <span className="text-xs text-white/50 font-bold ml-2">
                                    {String(heroIdx + 1).padStart(2, '0')} / {String(heroSlidesCount).padStart(2, '0')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress bar — auto-slide progress indicator */}
                {heroSlidesCount > 1 && (
                    <div className="absolute bottom-0 left-0 right-0 z-[4] h-1 bg-white/10">
                        <div
                            key={heroIdx}
                            className="h-full bg-[#ffc400] animate-[slideProgress_linear_1_forwards]"
                            style={{ animationDuration: `${heroSlideInterval || 5}s` }}
                        />
                    </div>
                )}
            </section>

            {/* ============================================================
                SECTION 2: TENTANG VOLTAMA — Mirip referensi
            ============================================================ */}
            <section
                id="tentang-sec"
                className="observe-section py-20 bg-white dark:bg-[#111111] transition-colors duration-300 overflow-hidden"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">

                    {/* Top: 2 kolom — Teks kiri + Foto pabrik kanan */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">

                        {/* Kiri: Heading + Deskripsi */}
                        <div
                            className={`space-y-6 transition-all duration-1000 ${isVis('tentang-sec') ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'}`}
                        >
                            <div className="space-y-2">
                                <div className="w-12 h-1 bg-[#ffc400] rounded-full mb-6" />
                                <h2 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                                    {sectionTexts?.tentang_heading || 'TENTANG VOLTAMA'}
                                </h2>
                                {sectionTexts?.tentang_sub && (
                                    <p className="text-sm font-bold text-[#ffc400] uppercase tracking-wider">{sectionTexts.tentang_sub}</p>
                                )}
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl text-justify whitespace-pre-line">
                                {renderFormattedText(sectionTexts?.tentang_desc || 'Voltama merupakan brand dari PT. Sinar Intan Putra Nusa, perusahaan manufaktur perlengkapan listrik yang berkomitmen menghadirkan produk berkualitas, aman, dan terpercaya.')}
                            </p>
                        </div>

                        {/* Kanan: Foto pabrik / bangunan */}
                        <div
                            className={`relative transition-all duration-1000 delay-200 ${isVis('tentang-sec') ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={sectionImages.tentang_foto_pabrik || '/assets/Voltama.id_Visual_Mockup_Draft.PNG'}
                                    alt="Pabrik Voltama"
                                    className="w-full h-72 lg:h-80 object-cover"
                                />
                                {/* Overlay brand badge */}
                                <div className="absolute top-4 left-4 bg-[#ffc400] text-gray-950 font-black text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                                    <img
                                        src={globalSettings.website_logo || '/images/logo.png'}
                                        alt="Voltama"
                                        className="h-5 w-auto object-contain"
                                        style={{ filter: 'brightness(0)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: 4 Statistik Kolom */}
                    <div
                        className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-400 ${isVis('tentang-sec') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    >
                        {[
                            { icon: <Clock className="text-[#ffc400]" size={28} />, value: sectionTexts?.tentang_stat1_value || '10+', label: sectionTexts?.tentang_stat1_label || 'BERPENGALAMAN', sub: sectionTexts?.tentang_stat1_sub || 'Lebih dari 10 tahun di industri kelistrikan', link: sectionTexts?.tentang_stat1_link },
                            { icon: <Globe className="text-[#ffc400]" size={28} />, value: sectionTexts?.tentang_stat2_value || '34', label: sectionTexts?.tentang_stat2_label || 'DISTRIBUSI', sub: sectionTexts?.tentang_stat2_sub || 'Seluruh Indonesia', link: sectionTexts?.tentang_stat2_link },
                            { icon: <BadgeCheck className="text-[#ffc400]" size={28} />, value: sectionTexts?.tentang_stat3_value || 'SNI', label: sectionTexts?.tentang_stat3_label || 'KUALITAS TERJAMIN', sub: sectionTexts?.tentang_stat3_sub || 'SNI & LMK', link: sectionTexts?.tentang_stat3_link },
                            { icon: <ShieldCheck className="text-[#ffc400]" size={28} />, value: sectionTexts?.tentang_stat4_value || '10', label: sectionTexts?.tentang_stat4_label || 'GARANSI PRODUK', sub: sectionTexts?.tentang_stat4_sub || 'Hingga 10 Tahun', link: sectionTexts?.tentang_stat4_link },
                        ].map((item, idx) => {
                            const CardContent = (
                                <>
                                    <div className="flex justify-center mb-3">{item.icon}</div>
                                    <div className="text-2xl font-black text-gray-950 dark:text-white mb-1">{item.value}</div>
                                    <div className="text-[10px] font-black text-gray-950 dark:text-gray-100 uppercase tracking-widest mb-1">{item.label}</div>
                                    <div className="text-[11px] text-gray-500 leading-relaxed">{item.sub}</div>
                                </>
                            );

                            if (item.link) {
                                return (
                                    <a
                                        key={idx}
                                        href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition duration-300 block hover:border-[#ffc400] cursor-pointer"
                                    >
                                        {CardContent}
                                    </a>
                                );
                            }

                            return (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition duration-300">
                                    {CardContent}
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom Image: Foto Pekerja / Industri */}
                    <div className={`mt-12 rounded-3xl overflow-hidden shadow-2xl relative transition-all duration-1000 delay-600 ${isVis('tentang-sec') ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                        <img src={sectionImages.tentang_foto_industri || '/assets/Voltama.id_Visual_Mockup_Draft.PNG'} alt="Proses Produksi Voltama" className="w-full h-56 md:h-72 object-cover object-center" />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 to-transparent flex items-center">
                            <div className="px-10">
                                <p className="text-white font-black text-xl md:text-2xl">{sectionTexts?.tentang_industri_judul || 'Diproduksi dengan Teknologi Modern'}</p>
                                <p className="text-gray-300 text-sm mt-1">{sectionTexts?.tentang_industri_sub || 'Di bawah pengawasan mutu ketat berstandar internasional'}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-6 flex items-center gap-1 text-white/70 text-xs font-bold">
                            <Globe size={12} />
                            <span>voltama.id</span>
                        </div>
                    </div>

                    {/* Decorative Ornament */}
                    <div className="absolute right-0 bottom-10 w-96 h-96 opacity-10 dark:opacity-5 pointer-events-none transform translate-x-1/3 z-0 hidden lg:block select-none">
                        <div className="w-full h-full animate-[floating_8s_ease-in-out_infinite]">
                            <img src="/images/1.svg" alt="Voltama Ornament" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 3: KEUNGGULAN 3 KOLOM (How It Works)
            ============================================================ */}
            <section
                id="features-sec"
                className="observe-section py-24 bg-gray-50 dark:bg-[#0c0c0c] transition-colors duration-300 overflow-hidden relative"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <div className="w-12 h-1 bg-[#ffc400] rounded-full mx-auto" />
                        <h2 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                            {sectionTexts?.features_heading || 'Standarisasi Keamanan'}<br />
                            <span className="text-[#ffc400]">{sectionTexts?.features_sub || 'Maksimal Untuk Anda'}</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                            {sectionTexts?.features_desc || 'Melalui riset dan teknologi produksi mutakhir, kami memproduksi kabel listrik dengan standardisasi terbaik demi mencegah risiko kelistrikan.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: sectionTexts?.features_card1_title || 'Konduktor Tembaga Murni', desc: sectionTexts?.features_card1_desc || 'Voltama menggunakan tembaga murni berkualitas tinggi tanpa campuran, memberikan tingkat penghantar arus listrik yang stabil dan efisiensi konsumsi daya maksimal.', icon: <Zap className="text-[#ffc400]" size={32} />, fromClass: '-translate-x-20 opacity-0', toClass: 'translate-x-0 opacity-100' },
                            { title: sectionTexts?.features_card2_title || 'Isolator PVC Tahan Panas', desc: sectionTexts?.features_card2_desc || 'Bahan pelindung PVC kelas premium dengan elastisitas tinggi dan daya tahan termal yang kuat, melindungi kawat tembaga dari kerusakan akibat panas tinggi.', icon: <ShieldCheck className="text-[#ffc400]" size={32} />, fromClass: 'scale-90 opacity-0', toClass: 'scale-100 opacity-100' },
                            { title: sectionTexts?.features_card3_title || 'Garansi Mutu Bersertifikasi', desc: sectionTexts?.features_card3_desc || 'Semua tipe kabel Voltama diuji ketat secara laboratoris dan telah lolos sertifikasi SNI, LMK, serta SPLN guna menjamin keamanan maksimal instalasi rumah Anda.', icon: <Award className="text-[#ffc400]" size={32} />, fromClass: 'translate-x-20 opacity-0', toClass: 'translate-x-0 opacity-100' }
                        ].map((feat, idx) => (
                            <div
                                key={idx}
                                className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden group transition-all duration-1000 ${isVis('features-sec') ? feat.toClass : feat.fromClass}`}
                                style={{ transitionDelay: `${idx * 150}ms` }}
                            >
                                {/* Decorative Line Graph */}
                                <div className="absolute bottom-0 right-0 w-32 h-20 opacity-10 group-hover:opacity-25 transition duration-300">
                                    <svg viewBox="0 0 100 50" className="w-full h-full fill-none">
                                        <path d="M 0,40 Q 20,20 40,35 T 80,10 T 100,25" className="stroke-[#ffc400] stroke-[3]" />
                                    </svg>
                                </div>
                                <div className="bg-[#ffc400]/10 dark:bg-[#ffc400]/5 p-4 rounded-2xl w-fit mb-6">{feat.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{feat.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Decorative Ornament */}
                    <div className="absolute left-0 top-10 w-[450px] h-[450px] opacity-10 dark:opacity-5 pointer-events-none transform -translate-x-1/3 z-0 hidden lg:block select-none">
                        <div className="w-full h-full animate-[floating_10s_ease-in-out_infinite]">
                            <img src="/images/2.svg" alt="Voltama Ornament" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 4: PRODUK BERSILANG MELAYANG
            ============================================================ */}
            <section
                id="produk-sec"
                className="observe-section py-24 bg-white dark:bg-[#111111] transition-colors duration-300 relative overflow-hidden"
            >
                {/* Center glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ffc400]/10 dark:bg-[#ffc400]/4 rounded-full blur-[100px] pointer-events-none" />

                <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
                    <div className="text-center space-y-4 mb-12 max-w-2xl mx-auto">
                        <div className="w-12 h-1 bg-[#ffc400] rounded-full mx-auto" />
                        <h2 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                            {sectionTexts?.produk_heading || 'Solusi Kabel Handal'}<br />
                            <span className="text-[#ffc400]">{sectionTexts?.produk_sub || 'Untuk Segala Kebutuhan'}</span>
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            {sectionTexts?.produk_desc || 'Dari kebutuhan instalasi rumah tinggal sederhana hingga kabel instalasi industri tegangan menengah, kami menyediakan spektrum kabel terlengkap.'}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <Link href="/katalog" className="bg-[#ffc400] hover:bg-[#ffb300] text-gray-950 font-black px-8 py-3.5 rounded-full shadow-lg transition hover:scale-105 text-sm">
                                {sectionTexts?.produk_btn1_text || 'Jelajahi Katalog'}
                            </Link>
                            <a
                                href={`https://wa.me/${globalSettings.footer_whatsapp || '628988898778'}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-950 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-950 font-black px-8 py-3.5 rounded-full shadow-md border border-transparent transition hover:scale-105 text-sm"
                            >
                                {sectionTexts?.produk_btn2_text || 'Hubungi Sales'}
                            </a>
                        </div>
                    </div>

                    {/* Bersilang Cards */}
                    <div className="relative h-[380px] md:h-[480px] flex items-center justify-center mt-4">
                        {/* Card Gelap (Kiri) */}
                        <div
                            className={`absolute z-20 left-[2%] md:left-[18%] transform -rotate-6 hover:rotate-0 transition-all duration-700 w-[220px] md:w-[300px] bg-[#111111] border border-gray-800 p-5 md:p-6 rounded-[28px] shadow-2xl text-left ${isVis('produk-sec') ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'}`}
                            style={{ transitionDuration: '900ms' }}
                        >
                            <div className="bg-gray-900 h-36 md:h-44 rounded-2xl flex items-center justify-center overflow-hidden mb-4 border border-gray-800">
                                <img src={sectionImages.produk_card_kiri || '/assets/Fixx.PNG'} alt="Kabel NYY Voltama" className="max-h-full object-contain" />
                            </div>
                            <span className="text-[10px] font-black text-[#ffc400] uppercase tracking-wider block mb-1">{sectionTexts?.produk_card_kiri_label || 'PRODUK PREMIUM'}</span>
                            <h4 className="text-base font-bold text-white mb-2">{sectionTexts?.produk_card_kiri_nama || 'Kabel NYY Voltama'}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{sectionTexts?.produk_card_kiri_desc || 'Kabel instalasi bawah tanah dengan pelindung ganda, tahan gesekan mekanis dan air.'}</p>
                        </div>

                        {/* Card Terang (Kanan) */}
                        <div
                            className={`absolute z-10 right-[2%] md:right-[18%] transform rotate-6 hover:rotate-0 transition-all duration-700 w-[220px] md:w-[300px] bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-5 md:p-6 rounded-[28px] shadow-2xl text-left ${isVis('produk-sec') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
                            style={{ transitionDuration: '900ms', transitionDelay: '150ms' }}
                        >
                            <div className="bg-gray-50 dark:bg-gray-800 h-36 md:h-44 rounded-2xl flex items-center justify-center overflow-hidden mb-4 border border-gray-100 dark:border-gray-800">
                                <img src={sectionImages.produk_card_kanan || '/assets/Fixxx.PNG'} alt="Kabel NYM Voltama" className="max-h-full object-contain" />
                            </div>
                            <span className="text-[10px] font-black text-[#ffc400] uppercase tracking-wider block mb-1">{sectionTexts?.produk_card_kanan_label || 'BEST SELLER'}</span>
                            <h4 className="text-base font-bold text-gray-950 dark:text-white mb-2">{sectionTexts?.produk_card_kanan_nama || 'Kabel NYM Voltama'}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{sectionTexts?.produk_card_kanan_desc || 'Kabel instalasi rumah standar dengan isolasi PVC tebal, aman digunakan di dinding.'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 5: VIDEO PLAYER & CHECKLIST
            ============================================================ */}
            <section
                id="video-sec"
                className="observe-section py-24 bg-gray-50 dark:bg-[#0c0c0c] transition-colors duration-300 relative overflow-hidden"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

                        {/* Kiri: Video Mockup — klik buka YouTube jika ada URL */}
                        <div
                            className={`relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 group cursor-pointer transition-all duration-1000 ${isVis('video-sec') ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'}`}
                            onClick={() => {
                                const url = sectionTexts?.video_youtube_url;
                                if (url) window.open(url, '_blank', 'noopener,noreferrer');
                            }}
                        >
                            <img src={sectionImages.video_mockup || '/assets/Voltama.id_Visual_Mockup_Draft.PNG'} alt="Video Voltama" className="w-full h-auto object-cover aspect-video group-hover:scale-[1.03] transition duration-700" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition duration-300 flex items-center justify-center">
                                <div className="bg-[#ffc400] text-gray-950 p-5 rounded-full shadow-2xl group-hover:scale-110 transition-all duration-300">
                                    <Play size={28} fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-5 text-xs font-bold text-white bg-black/60 backdrop-blur px-3.5 py-1.5 rounded-full border border-white/10">
                                {sectionTexts?.video_durasi || '02:45 Mins Video'}
                            </div>
                        </div>

                        {/* Kanan: Checklist */}
                        <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVis('video-sec') ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
                            <div className="space-y-3">
                                <div className="w-10 h-1 bg-[#ffc400] rounded-full" />
                                <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white leading-tight">
                                    {sectionTexts?.video_heading || 'Standarisasi Keamanan'}<br />
                                    <span className="text-[#ffc400]">{sectionTexts?.video_sub || 'Tertinggi'}</span>
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {sectionTexts?.video_desc || 'Kami memastikan setiap produk yang keluar dari pabrik kami diproses melalui pengawasan mutu yang ketat.'}
                                </p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    sectionTexts?.video_checklist_1 || '100% Konduktor Tembaga Murni untuk penyaluran arus optimal.',
                                    sectionTexts?.video_checklist_2 || 'Isolator PVC Premium yang tahan api dan tidak merambatkan nyala api.',
                                    sectionTexts?.video_checklist_3 || 'Sertifikasi Resmi SNI dari Lembaga Sertifikasi Produk independen.',
                                    sectionTexts?.video_checklist_4 || 'Lolos uji ketat kebocoran tegangan tinggi di laboratorium uji.',
                                ].filter(Boolean).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl shadow-sm">
                                        <div className="bg-[#ffc400]/15 text-[#ffc400] p-1.5 rounded-full shrink-0 mt-0.5">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 4 Gelap Feature Cards — baca dari sectionTexts */}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${isVis('video-sec') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        {[
                            { title: sectionTexts?.video_dark_card1_title || 'User-Centric Quality', desc: sectionTexts?.video_dark_card1_desc || 'Didesain berdasarkan kebutuhan aman pengguna rumah tinggal & industri.' },
                            { title: sectionTexts?.video_dark_card2_title || 'Scalable Safety', desc: sectionTexts?.video_dark_card2_desc || 'Standardisasi kapasitas hantar arus yang aman di berbagai level tegangan.' },
                            { title: sectionTexts?.video_dark_card3_title || 'Security-First Material', desc: sectionTexts?.video_dark_card3_desc || 'Bahan pelindung kabel tahan korosi, tahan panas, dan tahan gigitan tikus.' },
                            { title: sectionTexts?.video_dark_card4_title || 'Innovation-Driven', desc: sectionTexts?.video_dark_card4_desc || 'Pengembangan isolasi kabel berteknologi ramah lingkungan.' }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-[#111111] text-left border border-gray-800 p-6 rounded-[28px] shadow-xl hover:-translate-y-1.5 transition duration-300 text-white">
                                <span className="text-[#ffc400] font-black text-sm block mb-3">0{idx + 1}.</span>
                                <h4 className="font-black text-sm mb-2">{card.title}</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Decorative Ornament */}
                    <div className="absolute right-0 bottom-10 w-96 h-96 opacity-10 dark:opacity-5 pointer-events-none transform translate-x-1/4 z-0 hidden lg:block select-none">
                        <div className="w-full h-full animate-[floating_9s_ease-in-out_infinite]">
                            <img src="/images/1.svg" alt="Voltama Ornament" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 6: SLIDER KATALOG PREMIUM
            ============================================================ */}
            <section
                id="katalog-sec"
                className="observe-section py-24 bg-white dark:bg-[#111111] transition-colors duration-300 overflow-hidden relative"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="w-10 h-1 bg-[#ffc400] rounded-full" />
                        <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white leading-tight">
                            {sectionTexts?.katalog_heading || 'Jelajahi Produk Terbaik'}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl">
                            {sectionTexts?.katalog_desc || 'Lihat detail spesifikasi teknis dari kabel listrik andalan kami.'}
                        </p>
                    </div>
                </div>

                {catalogs.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">Belum ada katalog produk yang aktif.</div>
                ) : (
                    <div className="relative px-8 md:px-16 lg:px-24">
                        <button
                            onClick={handlePrevSlide}
                            aria-label="Katalog Sebelumnya"
                            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-4 transition shadow-xl text-gray-800 dark:text-gray-100 hover:bg-[#ffc400] hover:text-gray-950"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={handleNextSlide}
                            aria-label="Katalog Selanjutnya"
                            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-4 transition shadow-xl text-gray-800 dark:text-gray-100 hover:bg-[#ffc400] hover:text-gray-950"
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </button>

                        <div
                            ref={sliderRef}
                            className="flex gap-8 overflow-x-auto py-12 px-[15%] md:px-[35%] no-scrollbar snap-x snap-mandatory"
                            style={{ scrollSnapType: 'x mandatory' }}
                        >
                            {catalogs.map((item, idx) => {
                                const isActive = idx === activeIdx;
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setActiveIdx(idx)}
                                        className={`flex-none w-72 md:w-[320px] rounded-[36px] bg-white dark:bg-gray-900 border p-6 md:p-8 snap-center cursor-pointer transition-all duration-500 ease-out select-none ${isActive
                                            ? 'scale-105 md:scale-110 border-[#ffc400] dark:border-[#ffc400] shadow-2xl z-20 opacity-100'
                                            : 'scale-90 border-gray-150 dark:border-gray-800 opacity-40 blur-[0.5px]'
                                            }`}
                                    >
                                        <div className="h-44 w-full flex justify-center items-center overflow-hidden rounded-3xl mb-6 bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                                            <img
                                                src={item.image_path || '/images/product.png'}
                                                alt={item.title}
                                                className="max-h-full object-contain pointer-events-none"
                                            />
                                        </div>
                                        <h3 className="font-black text-lg text-gray-900 dark:text-white line-clamp-1 mb-2">{item.title}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-5">
                                            {item.description || 'Kabel listrik berkualitas premium dengan tingkat isolasi maksimal.'}
                                        </p>
                                        {item.specifications && Object.keys(item.specifications).length > 0 && (
                                            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2">
                                                {Object.entries(item.specifications).slice(0, 2).map(([key, val]) => (
                                                    <div key={key} className="flex justify-between text-xs font-bold">
                                                        <span className="text-gray-400">{key}</span>
                                                        <span className="text-gray-800 dark:text-gray-200">{val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="text-center mt-8">
                    <Link
                        href="/katalog"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-gray-950 dark:border-white bg-gray-950 dark:bg-transparent text-white dark:text-white hover:bg-[#ffc400] hover:border-[#ffc400] hover:text-gray-950 px-8 py-4 text-sm font-black shadow-lg transition duration-300 hover:scale-105"
                    >
                        LIHAT SEMUA KATALOG
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </section>

            {/* ============================================================
                SECTION 7: PROMO / CTA MOCKUP HANDPHONE
            ============================================================ */}
            <section
                id="promo-sec"
                className="observe-section py-24 bg-gradient-to-br from-[#ffc400] via-[#ffcc00] to-[#ffb300] text-gray-950 overflow-hidden relative"
            >
                <div className="absolute right-[-80px] top-[-80px] w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute left-[-100px] bottom-[-100px] w-80 h-80 bg-gray-950/10 rounded-full blur-3xl pointer-events-none" />

                <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="w-10 h-1 bg-gray-950/40 rounded-full" />
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                {sectionTexts?.promo_heading || 'Hubungi Layanan Sales atau Beli Online'}
                            </h2>
                            <p className="text-gray-900 font-medium leading-relaxed max-w-xl">
                                {sectionTexts?.promo_desc || 'Kabel Voltama kini tersedia secara resmi di berbagai platform marketplace terpercaya di Indonesia.'}
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <a
                                    href={`https://wa.me/${globalSettings.footer_whatsapp || '628988898778'}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-950 text-white hover:bg-gray-800 font-black px-8 py-4 rounded-full shadow-2xl transition duration-300 hover:scale-105 text-sm"
                                >
                                    Hubungi Via WA
                                </a>
                                {/* Multiple ecommerce stores */}
                                {globalSettings.ecommerce_stores && globalSettings.ecommerce_stores.length > 0 ? (
                                    globalSettings.ecommerce_stores.map((store: {name: string; logo: string; link: string}, idx: number) => (
                                        <a
                                            key={idx}
                                            href={store.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white px-5 py-3 rounded-2xl shadow-md border border-black/5 flex items-center gap-2 hover:scale-105 transition"
                                            title={store.name}
                                        >
                                            <span className="text-xs font-bold text-gray-400">Tersedia di</span>
                                            <img src={store.logo} alt={store.name} className="h-6 w-auto object-contain" />
                                        </a>
                                    ))
                                ) : (
                                    <a
                                        href={globalSettings.footer_marketplace_link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white px-5 py-3 rounded-2xl shadow-md border border-black/5 flex items-center gap-2 hover:scale-105 transition"
                                    >
                                        <span className="text-xs font-bold text-gray-400">Tersedia di</span>
                                        <img src="/assets/Icon marketplace.png" alt="Marketplace" className="h-6 w-auto object-contain" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end">
                            <img
                                src={sectionImages.promo_mockup_wa || '/assets/Voltama.id_Web Lounching_WA_Mockup_Draft.png'}
                                alt="Voltama WhatsApp Mockup"
                                className="w-full max-w-md object-contain filter drop-shadow-2xl lg:mb-[-100px] transition duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 8: TESTIMONIAL — Baca dari DB
            ============================================================ */}
            <section id="testimonial-sec" className="observe-section py-24 bg-white dark:bg-[#111111] transition-colors duration-300 relative overflow-hidden">
                <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center space-y-10 relative z-10">
                    <div className="flex justify-center text-[#ffc400]/20">
                        <Quote size={80} fill="currentColor" />
                    </div>

                    {testimonialsData.length > 0 ? (
                        <>
                            <div className="min-h-[160px] flex items-center justify-center">
                                <blockquote key={activeTestimonial} className="text-xl md:text-2xl font-black text-gray-950 dark:text-white leading-relaxed italic transition-all duration-500 animate-fade-in">
                                    &ldquo;{testimonialsData[activeTestimonial]?.quote}&rdquo;
                                </blockquote>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-black text-lg text-gray-900 dark:text-white">{testimonialsData[activeTestimonial]?.name}</h4>
                                    <p className="text-xs text-gray-500 font-bold tracking-wider uppercase mt-1">{testimonialsData[activeTestimonial]?.role}</p>
                                </div>
                                <div className="flex items-center justify-center gap-4 pt-2">
                                    {testimonialsData.map((t, idx) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setActiveTestimonial(idx)}
                                            aria-label={`Testimonial ${t.name}`}
                                            className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 ${idx === activeTestimonial ? 'border-[#ffc400] scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-80'}`}
                                        >
                                            <img
                                                src={t.avatar_path || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=ffc400&color=111`}
                                                alt={t.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-400">Belum ada testimonial yang ditampilkan.</p>
                    )}
                </div>

                {/* Decorative Ornament */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-10 dark:opacity-5 pointer-events-none transform -translate-x-1/4 z-0 hidden lg:block select-none">
                    <div className="w-full h-full animate-[floating_11s_ease-in-out_infinite]">
                        <img src="/images/2.svg" alt="Voltama Ornament" className="w-full h-full object-contain" />
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 9: ARTIKEL & EDUKASI
            ============================================================ */}
            <section
                id="artikel-sec"
                className="observe-section py-24 bg-gray-50 dark:bg-[#0c0c0c] transition-colors duration-300 relative overflow-hidden"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                        <div className="space-y-3">
                            <div className="w-10 h-1 bg-[#ffc400] rounded-full" />
                            <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white leading-tight">
                                {sectionTexts?.artikel_heading || 'Artikel & Tips Kelistrikan'}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                {sectionTexts?.artikel_desc || 'Informasi informatif seputar pencegahan risiko korsleting dan cara memilih kabel listrik.'}
                            </p>
                        </div>
                        <Link
                            href="/artikel"
                            className="shrink-0 inline-flex items-center gap-2 text-sm font-black text-gray-950 dark:text-white border-2 border-gray-950 dark:border-white px-6 py-3 rounded-full hover:bg-gray-950 hover:text-white dark:hover:bg-white dark:hover:text-gray-950 transition hover:scale-105"
                        >
                            Lihat Semua Artikel
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>

                    {articles.length === 0 ? (
                        <div className="text-center text-gray-400 py-16">
                            <Package size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="font-semibold">Belum ada artikel yang dipublikasikan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.slice(0, 6).map((article, idx) => (
                                <Link
                                    href={`/artikel/${article.slug}`}
                                    key={article.id}
                                    className={`group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${isVis('artikel-sec') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                                    style={{ transitionDelay: `${idx * 120}ms` }}
                                >
                                    <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        {article.image_path ? (
                                            <img
                                                src={article.image_path}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package size={48} className="text-gray-300 dark:text-gray-600" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <span className="text-[10px] font-black text-[#ffc400] uppercase tracking-widest">{formatDate(article.created_at)}</span>
                                        <h3 className="mt-2 font-black text-base text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#ffc400] transition duration-300">
                                            {article.title}
                                        </h3>
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">{stripHtml(article.content)}</p>
                                        <div className="mt-4 flex items-center gap-1 text-xs font-black text-[#ffc400] group-hover:gap-2 transition-all duration-300">
                                            Baca Selengkapnya <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Decorative Ornament */}
                <div className="absolute right-0 bottom-0 w-80 h-80 opacity-10 dark:opacity-5 pointer-events-none transform translate-x-1/4 z-0 hidden lg:block select-none">
                    <div className="w-full h-full animate-[floating_8s_ease-in-out_infinite]">
                        <img src="/images/1.svg" alt="Voltama Ornament" className="w-full h-full object-contain" />
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 10: KONTAK & LOKASI
            ============================================================ */}
            <section
                id="kontak-sec"
                className="observe-section py-24 bg-white dark:bg-[#111111] transition-colors duration-300 relative overflow-hidden"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <div className="w-10 h-1 bg-[#ffc400] rounded-full mx-auto" />
                        <h2 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                            Hubungi Kami &<br />
                            <span className="text-[#ffc400]">Kunjungi Lokasi Kami</span>
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            {globalSettings.contact_description || 'Kami siap membantu memenuhi kebutuhan kabel listrik premium berstandar SNI untuk proyek Anda. Hubungi tim kami atau kunjungi lokasi operasional kami.'}
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* 1. Lokasi Kantor Utama */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Kiri: Alamat Kantor */}
                            <div className="lg:col-span-5 space-y-4">
                                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-8 rounded-3xl flex gap-4 shadow-sm hover:shadow-md transition">
                                    <div className="bg-[#ffc400]/15 text-[#ffc400] p-3.5 rounded-2xl shrink-0 h-fit">
                                        <MapPin size={26} strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-black text-gray-950 dark:text-white uppercase tracking-wider">Kantor Utama</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                                            {globalSettings.contact_office_address || globalSettings.contact_address || globalSettings.footer_address || 'Kawasan Industri Maspion, Sidoarjo, Jawa Timur'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Map Kantor */}
                            <div className="lg:col-span-7 h-[280px] md:h-[320px]">
                                <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-gray-150 dark:border-gray-800">
                                    <iframe
                                        src={parseEmbedUrl(globalSettings.contact_office_map_iframe) || parseEmbedUrl(globalSettings.contact_map_iframe) || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15825.867909386348!2d112.7237305!3d-7.4134444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e6a2eb24ab83%3A0x6002f8319f39002!2sKawasan%20Industri%20Maspion!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"}
                                        className="w-full h-full border-0"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Maps Kantor Voltama"
                                    ></iframe>
                                </div>
                            </div>
                        </div>

                        {/* 2. Lokasi Pabrik */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Kiri: Alamat Pabrik */}
                            <div className="lg:col-span-5 space-y-4">
                                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-8 rounded-3xl flex gap-4 shadow-sm hover:shadow-md transition">
                                    <div className="bg-[#ffc400]/15 text-[#ffc400] p-3.5 rounded-2xl shrink-0 h-fit">
                                        <MapPin size={26} strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-black text-gray-950 dark:text-white uppercase tracking-wider">Pabrik</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                                            {globalSettings.contact_factory_address || 'Kawasan Industri Maspion, Sidoarjo, Jawa Timur'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Map Pabrik */}
                            <div className="lg:col-span-7 h-[280px] md:h-[320px]">
                                <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-gray-150 dark:border-gray-800">
                                    <iframe
                                        src={parseEmbedUrl(globalSettings.contact_factory_map_iframe) || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15825.867909386348!2d112.7237305!3d-7.4134444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e6a2eb24ab83%3A0x6002f8319f39002!2sKawasan%20Industri%20Maspion!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"}
                                        className="w-full h-full border-0"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Maps Pabrik Voltama"
                                    ></iframe>
                                </div>
                            </div>
                        </div>

                        {/* 3. Detail Kontak & Operasional (Tengah) */}
                        <div className="pt-12 border-t border-gray-150 dark:border-gray-800">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                                {/* Hari & Jam Ops */}
                                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl flex flex-col items-center justify-center gap-3">
                                    <div className="bg-[#ffc400]/15 text-[#ffc400] p-3 rounded-xl w-fit">
                                        <Clock size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Jam & Hari Operasional</h4>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {globalSettings.contact_days || 'Senin - Sabtu (Minggu Libur)'}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {globalSettings.contact_hours || '08:00 - 17:00 WIB'}
                                        </p>
                                    </div>
                                </div>

                                {/* WhatsApp & Telepon */}
                                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl flex flex-col items-center justify-center gap-3">
                                    <div className="bg-[#ffc400]/15 text-[#ffc400] p-3 rounded-xl w-fit">
                                        <Phone size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Hubungi Kami</h4>
                                        {globalSettings.footer_whatsapp && (
                                            <a 
                                                href={`https://wa.me/${globalSettings.footer_whatsapp.replace(/[^0-9]/g, '')}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-sm font-bold text-gray-900 dark:text-white hover:underline hover:text-[#ffc400] transition block"
                                            >
                                                WA: {globalSettings.footer_whatsapp}
                                            </a>
                                        )}
                                        {globalSettings.footer_phone && (
                                            <a 
                                                href={`tel:${globalSettings.footer_phone}`} 
                                                className="text-xs text-gray-600 dark:text-gray-400 hover:underline hover:text-[#ffc400] transition block"
                                            >
                                                Telp: {globalSettings.footer_phone}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Email & Website */}
                                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl flex flex-col items-center justify-center gap-3">
                                    <div className="bg-[#ffc400]/15 text-[#ffc400] p-3 rounded-xl w-fit">
                                        <Globe size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Email & Website</h4>
                                        {globalSettings.footer_email && (
                                            <a 
                                                href={`mailto:${globalSettings.footer_email}`} 
                                                className="text-sm font-bold text-gray-900 dark:text-white hover:underline hover:text-[#ffc400] transition block"
                                            >
                                                {globalSettings.footer_email}
                                            </a>
                                        )}
                                        <a 
                                            href={globalSettings.contact_website ? (globalSettings.contact_website.startsWith('http') ? globalSettings.contact_website : `https://${globalSettings.contact_website}`) : 'https://voltama.id'} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-xs text-gray-600 dark:text-gray-400 hover:underline hover:text-[#ffc400] transition block"
                                        >
                                            {globalSettings.contact_website || 'www.voltama.id'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Ornament */}
                <div className="absolute left-0 bottom-0 w-80 h-80 opacity-10 dark:opacity-5 pointer-events-none transform -translate-x-1/4 z-0 hidden lg:block select-none">
                    <div className="w-full h-full animate-[floating_10s_ease-in-out_infinite]">
                        <img src="/images/2.svg" alt="Voltama Ornament" className="w-full h-full object-contain" />
                    </div>
                </div>
            </section>

        </FrontendLayout>
    );
}
