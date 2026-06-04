import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Eye, ArrowRight } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_path: string;
    views: number;
    created_at: string;
}

interface PaginatedArticles {
    data: Article[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    last_page: number;
}

interface AllArticlesProps {
    globalSettings: any;
    articles: PaginatedArticles;
    filters: {
        search: string;
    };
}

export default function AllArticles({ globalSettings, articles, filters }: AllArticlesProps) {
    const [search, setSearch] = useState(filters.search || '');

    const applySearch = () => {
        router.get(
            route('artikel.index'),
            { search },
            { preserveState: true, replace: true }
        );
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            applySearch();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <FrontendLayout globalSettings={globalSettings} isInnerPage={true}>
            <Head title="Artikel & Edukasi Kelistrikan - Voltama" />

            <div className="py-12 bg-gray-50 dark:bg-[#0c0c0c] transition-colors duration-300 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white">Artikel & Tips Listrik</h1>
                        <p className="mt-2 text-gray-500">Temukan informasi mendalam seputar teknologi kabel listrik, tips instalasi rumah, dan panduan keamanan.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul artikel atau kata kunci..."
                                className="w-full pl-10 pr-4 py-3 rounded-full border-gray-200 bg-white text-sm shadow-sm focus:border-[#ffb300] focus:ring-[#ffb300] dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Articles Grid */}
                    {articles.data.length === 0 ? (
                        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center shadow-sm">
                            <p className="text-gray-500">Tidak ada artikel yang cocok dengan kriteria pencarian Anda.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.data.map((art) => (
                                <Link
                                    key={art.id}
                                    href={route('artikel.show', art.slug)}
                                    className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-lg transition flex flex-col h-full group"
                                >
                                    <div className="h-48 overflow-hidden bg-gray-100">
                                        <img
                                            src={art.image_path || '/images/product.png'}
                                            alt={art.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={10} />
                                                    {new Date(art.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye size={10} />
                                                    {art.views} views
                                                </span>
                                            </div>
                                            <h3 className="font-extrabold text-lg text-gray-950 dark:text-white leading-snug line-clamp-2 group-hover:text-[#ffb300] transition">
                                                {art.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                                                {art.content.replace(/<[^>]*>/g, '')}
                                            </p>
                                        </div>
                                        <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Baca Selengkapnya
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Pagination Links */}
                    {articles.last_page > 1 && (
                        <div className="flex justify-center mt-12 gap-1.5">
                            {articles.links.map((link, idx) => {
                                // Ignore prev/next label styling, make it simple
                                let label = link.label;
                                if (label.includes('Previous')) label = '«';
                                if (label.includes('Next')) label = '»';

                                return link.url ? (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                                            link.active
                                                ? 'bg-[#ffc400] border-[#ffc400] text-gray-950 dark:text-gray-950'
                                                : 'bg-white border-gray-100 hover:bg-gray-100 text-gray-700 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-100 text-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-600 select-none"
                                    >
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </FrontendLayout>
    );
}
