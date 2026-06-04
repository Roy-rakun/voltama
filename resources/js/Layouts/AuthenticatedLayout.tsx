import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import {
    LayoutDashboard, Package, FileText, Settings, Users, Globe,
    LogOut, User, ChevronDown, Menu, X, Bell, ExternalLink, ShoppingBag, LayoutTemplate, Award
} from 'lucide-react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user as unknown as { name: string; email: string; role: string };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const navItems = [
        {
            label: 'Dashboard',
            href: route('dashboard'),
            active: route().current('dashboard'),
            icon: LayoutDashboard,
        },
        {
            label: 'Katalog Produk',
            href: route('admin.catalogs.index'),
            active: route().current('admin.catalogs.*') || route().current('admin.catalog-categories.*'),
            icon: Package,
            children: [
                {
                    label: 'Semua Katalog',
                    href: route('admin.catalogs.index'),
                    active: route().current('admin.catalogs.*'),
                },
                {
                    label: 'Kategori Katalog',
                    href: route('admin.catalog-categories.index'),
                    active: route().current('admin.catalog-categories.*'),
                },
            ],
        },
        {
            label: 'Artikel',
            href: route('admin.articles.index'),
            active: route().current('admin.articles.*') || route().current('admin.article-categories.*'),
            icon: FileText,
            children: [
                {
                    label: 'Semua Artikel',
                    href: route('admin.articles.index'),
                    active: route().current('admin.articles.*'),
                },
                {
                    label: 'Kategori Artikel',
                    href: route('admin.article-categories.index'),
                    active: route().current('admin.article-categories.*'),
                },
            ],
        },
        ...(user.role === 'admin' ? [
            {
                label: 'Halaman Custom',
                href: route('admin.pages.index'),
                active: route().current('admin.pages.*'),
                icon: Globe,
            },
            {
                label: 'Editor Section',
                href: route('admin.section-editor.index'),
                active: route().current('admin.section-editor.*'),
                icon: LayoutTemplate,
            },
            {
                label: 'E-Commerce',
                href: route('admin.ecommerce.index'),
                active: route().current('admin.ecommerce.*'),
                icon: ShoppingBag,
            },
            {
                label: 'Sertifikasi',
                href: route('admin.certifications.index'),
                active: route().current('admin.certifications.*'),
                icon: Award,
            },
            {
                label: 'Pengaturan',
                href: route('admin.settings.index'),
                active: route().current('admin.settings.*'),
                icon: Settings,
            },
            {
                label: 'Pengguna',
                href: route('admin.users.index'),
                active: route().current('admin.users.*'),
                icon: Users,
            },
        ] : []),
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <img
                    src="/images/logo.png"
                    alt="Voltama"
                    className="h-9 w-auto object-contain brightness-0 invert"
                />
                <div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Admin Panel</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-3">Menu Utama</p>
                {navItems.slice(0, 3).map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.href}>
                            <Link
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                                    item.active
                                        ? 'bg-[#ffc400] text-gray-900 shadow-md shadow-[#ffc400]/20'
                                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Icon size={18} className={item.active ? 'text-gray-900' : 'text-gray-400 group-hover:text-white'} />
                                {item.label}
                            </Link>
                            {/* Sub-menu children */}
                            {'children' in item && item.children && item.active && (
                                <div className="ml-7 mt-0.5 space-y-0.5">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                                child.active
                                                    ? 'text-[#ffc400] bg-white/10'
                                                    : 'text-gray-500 hover:bg-white/10 hover:text-gray-300'
                                            }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${child.active ? 'bg-[#ffc400]' : 'bg-gray-600'}`} />
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {user.role === 'admin' && (
                    <>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mt-6 mb-3">Administrasi</p>
                        {navItems.slice(3).map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                                        item.active
                                            ? 'bg-[#ffc400] text-gray-900 shadow-md shadow-[#ffc400]/20'
                                            : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <Icon size={18} className={item.active ? 'text-gray-900' : 'text-gray-400 group-hover:text-white'} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </>
                )}
            </nav>

            {/* Bottom: Lihat Website + User Info */}
            <div className="border-t border-white/10 p-3 space-y-1">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                    <ExternalLink size={18} />
                    Lihat Website
                </Link>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                >
                    <LogOut size={18} />
                    Keluar
                </Link>
                {/* User badge */}
                <div className="flex items-center gap-3 px-3 py-3 mt-2 bg-white/5 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-[#ffc400] flex items-center justify-center text-gray-900 font-black text-sm shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{user.name}</div>
                        <div className="text-[11px] text-gray-400 truncate capitalize">{user.role}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#f4f6f9] notranslate" translate="no">

            {/* ====== SIDEBAR DESKTOP ====== */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-[#1a1e2e] z-30 shadow-2xl">
                <SidebarContent />
            </aside>

            {/* ====== SIDEBAR MOBILE OVERLAY ====== */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-40 flex">
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="relative flex flex-col w-72 bg-[#1a1e2e] z-50 shadow-2xl">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                        >
                            <X size={20} />
                        </button>
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* ====== MAIN CONTENT AREA ====== */}
            <div className="flex-1 flex flex-col lg:ml-64">

                {/* TOP HEADER BAR */}
                <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                        {/* Left: Mobile menu + Breadcrumb */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                            >
                                <Menu size={20} />
                            </button>
                            {header && (
                                <div className="text-gray-700">
                                    {header}
                                </div>
                            )}
                        </div>

                        {/* Right: Notif + User */}
                        <div className="flex items-center gap-2">
                            {/* Bell notif placeholder */}
                            <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                                <Bell size={18} />
                            </button>

                            {/* User dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium text-gray-700"
                                >
                                    <div className="w-7 h-7 rounded-full bg-[#ffc400] flex items-center justify-center text-gray-900 font-black text-xs">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block">{user.name}</span>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>

                                {profileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                                        <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 overflow-hidden">
                                            <div className="px-4 py-2.5 border-b border-gray-100">
                                                <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                                                <div className="text-xs text-gray-400">{user.email}</div>
                                            </div>
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                <User size={15} className="text-gray-400" />
                                                Edit Profil
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                <LogOut size={15} />
                                                Keluar
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
