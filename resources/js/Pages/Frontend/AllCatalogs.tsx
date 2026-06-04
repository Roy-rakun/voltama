import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

interface Catalog {
    id: number;
    title: string;
    slug: string;
    description: string;
    image_path: string;
    specifications: Record<string, string>;
}

interface CatalogCategory {
    id: number;
    name: string;
    slug: string;
    image_path: string | null;
    description: string | null;
    sort_order: number;
    catalogs_count: number;
}

interface AllCatalogsProps {
    globalSettings: any;
    catalogs: Catalog[];
    catalogCategories: CatalogCategory[];
    activeCategory: CatalogCategory | null;
    availableSpecs: Record<string, string[]>;
    filters: {
        search: string;
        spec: Record<string, string>;
        kategori: string;
    };
}

export default function AllCatalogs({ globalSettings, catalogs, catalogCategories, activeCategory, availableSpecs, filters }: AllCatalogsProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>(filters.spec || {});

    const applyFilters = (overrides: Record<string, any> = {}) => {
        router.get(
            route('katalog.index'),
            { search, spec: selectedSpecs, ...overrides },
            { preserveState: true, replace: true }
        );
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            applyFilters({ kategori: filters.kategori });
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search, selectedSpecs]);

    const handleSpecFilterChange = (specKey: string, value: string) => {
        setSelectedSpecs(prev => {
            const updated = { ...prev };
            if (value === '') {
                delete updated[specKey];
            } else {
                updated[specKey] = value;
            }
            return updated;
        });
    };

    const resetFilters = () => {
        setSearch('');
        setSelectedSpecs({});
        router.get(route('katalog.index'), {}, { replace: true });
    };

    const handleCategoryClick = (slug: string) => {
        const isActive = filters.kategori === slug;
        router.get(route('katalog.index'), { kategori: isActive ? '' : slug }, { replace: true });
    };

    return (
        <FrontendLayout globalSettings={globalSettings} isInnerPage={true}>
            <Head title="Katalog Kabel Listrik Premium - Voltama" />

            <div className="min-h-screen bg-gray-50 dark:bg-[#0c0c0c] transition-colors duration-300">

                {/* ====================================================
                    SECTION KATEGORI PRODUK — seperti referensi
                ==================================================== */}
                {catalogCategories.length > 0 && (
                    <section className="bg-white dark:bg-[#111111] pt-12 pb-10 border-b border-gray-100 dark:border-gray-800">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            {/* Heading */}
                            <div className="mb-8">
                                <div className="w-10 h-1 bg-[#ffc400] rounded-full mb-4" />
                                <h1 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                                    KATEGORI{' '}
                                    <span className="text-[#ffc400]">PRODUK</span>
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-md">
                                    Voltama menyediakan berbagai produk perlengkapan listrik untuk memenuhi kebutuhan instalasi Anda.
                                </p>
                            </div>

                            {/* Grid Kategori — mirip referensi 2x2 atau lebih */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {/* Tombol "Semua" */}
                                <button
                                    onClick={resetFilters}
                                    className={`group relative flex flex-col items-center justify-end rounded-2xl overflow-hidden aspect-square p-4 transition-all duration-300 ${
                                        !filters.kategori
                                            ? 'ring-2 ring-[#ffc400] shadow-lg shadow-[#ffc400]/20'
                                            : 'hover:shadow-md'
                                    }`}
                                    style={{ background: !filters.kategori ? '#ffc400' : '#f5f5f5' }}
                                >
                                    <div className={`absolute top-3 left-3 text-xs font-black w-6 h-6 rounded-md flex items-center justify-center ${!filters.kategori ? 'bg-gray-950 text-[#ffc400]' : 'bg-[#ffc400] text-gray-950'}`}>
                                        ✦
                                    </div>
                                    <span className={`text-sm font-black text-center leading-tight ${!filters.kategori ? 'text-gray-950' : 'text-gray-700'}`}>
                                        Semua Produk
                                    </span>
                                </button>

                                {catalogCategories.map((cat, idx) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryClick(cat.slug)}
                                        className={`group relative flex flex-col rounded-2xl overflow-hidden aspect-square transition-all duration-300 ${
                                            filters.kategori === cat.slug
                                                ? 'ring-2 ring-[#ffc400] shadow-lg shadow-[#ffc400]/20'
                                                : 'hover:shadow-md hover:-translate-y-0.5'
                                        }`}
                                    >
                                        {/* Background gambar atau warna */}
                                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                            {cat.image_path ? (
                                                <img
                                                    src={cat.image_path}
                                                    alt={cat.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                                                    <span className="text-4xl font-black text-gray-300 dark:text-gray-600">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Label nama di bawah */}
                                        <div className={`px-3 py-2.5 flex items-center justify-between ${filters.kategori === cat.slug ? 'bg-[#ffc400]' : 'bg-white dark:bg-gray-900'}`}>
                                            <div>
                                                <div className={`text-xs font-black uppercase tracking-wide leading-tight ${filters.kategori === cat.slug ? 'text-gray-950' : 'text-gray-900 dark:text-white'}`}>
                                                    {cat.name}
                                                </div>
                                                <div className={`text-[10px] ${filters.kategori === cat.slug ? 'text-gray-700' : 'text-gray-400'}`}>
                                                    {cat.catalogs_count} produk
                                                </div>
                                            </div>
                                            <div className={`text-xs font-black w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${filters.kategori === cat.slug ? 'bg-gray-950 text-[#ffc400]' : 'bg-[#ffc400] text-gray-950'}`}>
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Kategori aktif label */}
                            {activeCategory && (
                                <div className="mt-6 flex items-center gap-3">
                                    <span className="text-sm text-gray-500">Menampilkan kategori:</span>
                                    <span className="inline-flex items-center gap-2 bg-[#ffc400] text-gray-950 text-sm font-bold px-4 py-1.5 rounded-full">
                                        {activeCategory.name}
                                        <button onClick={resetFilters} className="hover:opacity-70 transition">✕</button>
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Daftar Produk */}
                <div className="py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Filter dan Search */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm mb-8 flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari nama kabel atau deskripsi..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-full border-gray-200 bg-gray-50 text-sm focus:border-[#ffb300] focus:ring-[#ffb300] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                                <button
                                    onClick={resetFilters}
                                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1.5 transition"
                                >
                                    <RefreshCw size={14} />
                                    Reset Filter
                                </button>
                            </div>

                            {Object.keys(availableSpecs).length > 0 && (
                                <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                                    <h3 className="text-sm font-bold text-gray-950 dark:text-white mb-3 flex items-center gap-1.5">
                                        <Filter size={16} />
                                        Saring berdasarkan spesifikasi:
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {Object.entries(availableSpecs).map(([specKey, values]) => (
                                            <div key={specKey} className="space-y-1.5">
                                                <label className="block text-xs font-bold text-gray-400 uppercase">{specKey}</label>
                                                <select
                                                    value={selectedSpecs[specKey] || ''}
                                                    onChange={(e) => handleSpecFilterChange(specKey, e.target.value)}
                                                    className="w-full text-xs rounded-xl border-gray-200 bg-gray-50 focus:border-[#ffb300] focus:ring-[#ffb300] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                >
                                                    <option value="">Semua {specKey}</option>
                                                    {values.map((val) => (
                                                        <option key={val} value={val}>{val}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Jumlah hasil */}
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {activeCategory
                                    ? <span>Kategori: <strong className="text-gray-800 dark:text-white">{activeCategory.name}</strong> — {catalogs.length} produk ditemukan</span>
                                    : <span>{catalogs.length} produk tersedia</span>
                                }
                            </p>
                        </div>

                        {/* Grid produk */}
                        {catalogs.length === 0 ? (
                            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center shadow-sm">
                                <p className="text-gray-500">Tidak ada produk yang cocok dengan kriteria pencarian Anda.</p>
                                <button onClick={resetFilters} className="mt-4 text-sm font-bold text-[#ffc400] hover:underline">
                                    Lihat semua produk →
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {catalogs.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition duration-300"
                                    >
                                        <div>
                                            <div className="h-48 w-full flex justify-center items-center overflow-hidden rounded-2xl mb-4 bg-gray-50 dark:bg-gray-800">
                                                <img
                                                    src={item.image_path || '/images/product.png'}
                                                    alt={item.title}
                                                    className="max-h-full object-contain"
                                                />
                                            </div>
                                            <h3 className="font-extrabold text-lg text-gray-950 dark:text-white mb-2 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-6">
                                                {item.description || 'Kabel berkualitas tinggi bersertifikat SNI dengan isolator tebal tahan panas.'}
                                            </p>
                                        </div>

                                        {item.specifications && Object.keys(item.specifications).length > 0 && (
                                            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-1.5">
                                                {Object.entries(item.specifications).map(([key, val]) => (
                                                    <div key={key} className="flex justify-between text-[11px] font-semibold">
                                                        <span className="text-gray-400">{key}</span>
                                                        <span className="text-gray-900 dark:text-gray-200">{val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
