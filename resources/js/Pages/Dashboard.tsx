import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Package, FileText, Globe, Users, TrendingUp, Eye, CheckCircle, XCircle, ArrowUpRight, Clock } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    is_active: boolean;
    created_at: string;
}

interface Catalog {
    id: number;
    title: string;
    is_active: boolean;
    created_at: string;
}

interface Stats {
    articles: number;
    catalogs: number;
    pages: number;
    users: number;
    articles_active: number;
    catalogs_active: number;
}

interface DashboardProps {
    stats: Stats;
    recentArticles: Article[];
    recentCatalogs: Catalog[];
}

export default function Dashboard({ stats, recentArticles, recentCatalogs }: DashboardProps) {

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    const statCards = [
        {
            label: 'Total Artikel',
            value: stats?.articles ?? 0,
            sub: `${stats?.articles_active ?? 0} aktif`,
            icon: FileText,
            color: 'bg-[#ffc400]',
            textColor: 'text-gray-900',
            href: route('admin.articles.index'),
        },
        {
            label: 'Total Katalog',
            value: stats?.catalogs ?? 0,
            sub: `${stats?.catalogs_active ?? 0} aktif`,
            icon: Package,
            color: 'bg-[#1a1e2e]',
            textColor: 'text-white',
            href: route('admin.catalogs.index'),
        },
        {
            label: 'Halaman Custom',
            value: stats?.pages ?? 0,
            sub: 'total halaman',
            icon: Globe,
            color: 'bg-emerald-500',
            textColor: 'text-white',
            href: route('admin.pages.index'),
        },
        {
            label: 'Pengguna',
            value: stats?.users ?? 0,
            sub: 'terdaftar',
            icon: Users,
            color: 'bg-sky-500',
            textColor: 'text-white',
            href: route('admin.users.index'),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-xs text-gray-400">Pages / <span className="text-gray-600">Dashboard</span></p>
                    <h2 className="text-lg font-bold text-gray-800 leading-tight">Dashboarde</h2>
                </div>
            }
        >
            <Head title="Dashboard — Voltama Admin" />

            {/* ===== WELCOME BANNER ===== */}
            <div
                className="relative rounded-2xl overflow-hidden p-6 mb-8 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, #1a1e2e 0%, #2d3348 60%, #ffc400 200%)' }}
            >
                {/* Glow kanan */}
                <div className="absolute right-0 top-0 w-72 h-full bg-[#ffc400]/10 blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <img src="/images/logo.png" alt="Voltama" className="h-8 w-auto brightness-0 invert" />
                    </div>
                    <h1 className="text-xl font-black text-white">Selamat Datang di Admin Panel</h1>
                    <p className="text-sm text-gray-400 mt-1">Kelola konten website Voltama dari sini.</p>
                </div>
                <div className="hidden md:flex items-center gap-3 relative z-10">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 bg-[#ffc400] text-gray-900 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-yellow-300 transition shadow-lg shadow-[#ffc400]/20"
                    >
                        <Eye size={16} />
                        Lihat Website
                        <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>

            {/* ===== STAT CARDS ===== */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${card.color} ${card.textColor} w-12 h-12 rounded-xl flex items-center justify-center shadow-md`}>
                                    <Icon size={22} />
                                </div>
                                <TrendingUp size={14} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                            </div>
                            <div className="text-3xl font-black text-gray-900 mb-0.5">{card.value.toLocaleString()}</div>
                            <div className="text-sm font-semibold text-gray-700">{card.label}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
                        </Link>
                    );
                })}
            </div>

            {/* ===== QUICK ACTION CARDS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Link
                    href={route('admin.articles.create')}
                    className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                    <div className="bg-[#ffc400] w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-gray-900" />
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 text-sm group-hover:text-[#ffc400] transition">+ Artikel Baru</div>
                        <div className="text-xs text-gray-400">Tambah artikel atau tips kelistrikan</div>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-300 ml-auto group-hover:text-[#ffc400] transition" />
                </Link>

                <Link
                    href={route('admin.catalogs.create')}
                    className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                    <div className="bg-[#1a1e2e] w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                        <Package size={20} className="text-[#ffc400]" />
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 text-sm group-hover:text-[#1a1e2e] transition">+ Katalog Baru</div>
                        <div className="text-xs text-gray-400">Tambah produk kabel ke katalog</div>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-300 ml-auto group-hover:text-[#1a1e2e] transition" />
                </Link>

                <Link
                    href={route('admin.settings.index')}
                    className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                    <div className="bg-emerald-500 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                        <Globe size={20} className="text-white" />
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 text-sm group-hover:text-emerald-600 transition">Pengaturan Website</div>
                        <div className="text-xs text-gray-400">Logo, banner, footer & lainnya</div>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-300 ml-auto group-hover:text-emerald-500 transition" />
                </Link>
            </div>

            {/* ===== RECENT DATA TABLES ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Recent Articles */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Artikel Terbaru</h3>
                            <p className="text-xs text-gray-400">5 artikel terakhir yang ditambahkan</p>
                        </div>
                        <Link
                            href={route('admin.articles.index')}
                            className="text-xs font-bold text-[#ffc400] hover:underline flex items-center gap-1"
                        >
                            Lihat Semua <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentArticles && recentArticles.length > 0 ? recentArticles.map((article) => (
                            <div key={article.id} className="flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50/50 transition">
                                <div className="w-8 h-8 rounded-lg bg-[#ffc400]/10 flex items-center justify-center shrink-0">
                                    <FileText size={14} className="text-[#ffc400]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-gray-800 truncate">{article.title}</div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Clock size={10} className="text-gray-300" />
                                        <span className="text-[11px] text-gray-400">{formatDate(article.created_at)}</span>
                                    </div>
                                </div>
                                <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${article.is_active
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {article.is_active ? <CheckCircle size={10} /> : <XCircle size={10} />}
                                    {article.is_active ? 'Aktif' : 'Draft'}
                                </span>
                            </div>
                        )) : (
                            <div className="px-6 py-10 text-center text-sm text-gray-400">
                                Belum ada artikel yang ditambahkan.
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Catalogs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Katalog Terbaru</h3>
                            <p className="text-xs text-gray-400">5 katalog produk terakhir</p>
                        </div>
                        <Link
                            href={route('admin.catalogs.index')}
                            className="text-xs font-bold text-[#ffc400] hover:underline flex items-center gap-1"
                        >
                            Lihat Semua <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentCatalogs && recentCatalogs.length > 0 ? recentCatalogs.map((catalog) => (
                            <div key={catalog.id} className="flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50/50 transition">
                                <div className="w-8 h-8 rounded-lg bg-[#1a1e2e]/10 flex items-center justify-center shrink-0">
                                    <Package size={14} className="text-[#1a1e2e]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-gray-800 truncate">{catalog.title}</div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Clock size={10} className="text-gray-300" />
                                        <span className="text-[11px] text-gray-400">{formatDate(catalog.created_at)}</span>
                                    </div>
                                </div>
                                <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${catalog.is_active
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {catalog.is_active ? <CheckCircle size={10} /> : <XCircle size={10} />}
                                    {catalog.is_active ? 'Aktif' : 'Draft'}
                                </span>
                            </div>
                        )) : (
                            <div className="px-6 py-10 text-center text-sm text-gray-400">
                                Belum ada katalog yang ditambahkan.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer credit */}
            <div className="mt-8 text-center text-xs text-gray-400">
                Voltama Admin Panel — © {new Date().getFullYear()} PT. Sinar Intan Putra Nusa
            </div>
        </AuthenticatedLayout>
    );
}
