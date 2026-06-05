import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    gallery_images?: string[];
}

interface CustomPageProps {
    globalSettings: any;
    page: Page;
}

const cleanContent = (htmlContent: string) => {
    if (!htmlContent) return '';
    return htmlContent.replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ');
};

export default function CustomPage({ globalSettings, page }: CustomPageProps) {
    const images = page.gallery_images || [];
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleNext = () => {
        setCurrentIdx(prev => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIdx(prev => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <FrontendLayout globalSettings={globalSettings}>
            <Head title={`${page.title} - ${globalSettings.website_title || 'Voltama'}`} />

            <div className="py-16 bg-gray-50 dark:bg-[#0c0c0c] transition-colors duration-300 min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Content Box */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
                        <div className="border-b border-gray-100 dark:border-gray-800 pb-4 text-center">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                                {page.title}
                            </h1>
                        </div>

                        {/* Slideshow Galeri Gambar */}
                        {images.length > 0 && (
                            <div className="relative w-full h-[260px] sm:h-[380px] md:h-[450px] rounded-2xl overflow-hidden shadow-md group border border-gray-100 dark:border-gray-800">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                            idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${page.title} Slide ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}

                                {/* Kontrol Panah Slideshow */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrev}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/65 text-white rounded-full p-2.5 transition duration-300 opacity-0 group-hover:opacity-100 shadow-md backdrop-blur-sm"
                                            title="Slide Sebelumnya"
                                        >
                                            <ChevronLeft size={20} strokeWidth={2.5} />
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/65 text-white rounded-full p-2.5 transition duration-300 opacity-0 group-hover:opacity-100 shadow-md backdrop-blur-sm"
                                            title="Slide Berikutnya"
                                        >
                                            <ChevronRight size={20} strokeWidth={2.5} />
                                        </button>

                                        {/* Dots Indikator Posisi */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                            {images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentIdx(idx)}
                                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                                        idx === currentIdx
                                                            ? 'bg-[#ffc400] w-6'
                                                            : 'bg-white/50 hover:bg-white'
                                                    }`}
                                                    title={`Lihat Slide ${idx + 1}`}
                                                ></button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Custom content HTML body (from Quill) */}
                        {page.content ? (
                            <div 
                                className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-normal space-y-6 break-words w-full"
                                dangerouslySetInnerHTML={{ __html: cleanContent(page.content) }}
                            />
                        ) : (
                            <p className="text-center text-gray-500 py-8">Halaman ini belum memiliki konten.</p>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
