import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

interface SettingsProps {
    settings: {
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
        footer_powered_by_text: string;
        footer_powered_by_link: string;
        footer_description: string;
        footer_tiktok: string;
        contact_map_iframe: string;
        contact_description: string;
        contact_address: string;
        contact_hours: string;
        contact_days: string;
    };
    success: string | null;
}

export default function Settings({ settings, success }: SettingsProps) {
    const { data, setData, post, processing, errors } = useForm({
        website_title: settings.website_title || '',
        website_logo_file: null as File | null,
        website_favicon_file: null as File | null,
        facebook_pixel: settings.facebook_pixel || '',
        google_analytics: settings.google_analytics || '',
        footer_copyright: settings.footer_copyright || '',
        footer_address: settings.footer_address || '',
        footer_phone: settings.footer_phone || '',
        footer_email: settings.footer_email || '',
        footer_facebook: settings.footer_facebook || '',
        footer_instagram: settings.footer_instagram || '',
        footer_youtube: settings.footer_youtube || '',
        footer_whatsapp: settings.footer_whatsapp || '',
        footer_powered_by_text: settings.footer_powered_by_text || '',
        footer_powered_by_link: settings.footer_powered_by_link || '',
        footer_description: settings.footer_description || '',
        footer_tiktok: settings.footer_tiktok || '',
        contact_map_iframe: settings.contact_map_iframe || '',
        contact_description: settings.contact_description || '',
        contact_address: settings.contact_address || '',
        contact_hours: settings.contact_hours || '',
        contact_days: settings.contact_days || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Pengaturan Website</h2>}
        >
            <Head title="Pengaturan Website" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="mb-6 rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950 dark:text-green-300 border border-green-200 dark:border-green-800">
                            ✓ {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* ===== SETELAN UMUM ===== */}
                        <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Setelan Umum Website</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Atur judul dasar, logo, dan favicon situs.</p>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul Website</label>
                                    <input
                                        type="text"
                                        value={data.website_title}
                                        onChange={(e) => setData('website_title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.website_title && <div className="mt-1 text-sm text-red-600">{errors.website_title}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Favicon (.ico/.png/.svg)</label>
                                    {settings.website_favicon && (
                                        <img src={settings.website_favicon} alt="Favicon" className="mb-2 h-8 w-8 object-contain" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('website_favicon_file', e.target.files ? e.target.files[0] : null)}
                                        className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                                    />
                                    {errors.website_favicon_file && <div className="mt-1 text-sm text-red-600">{errors.website_favicon_file}</div>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo Website</label>
                                    {settings.website_logo && (
                                        <img src={settings.website_logo} alt="Logo" className="mb-2 h-16 object-contain bg-gray-100 p-2 rounded" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('website_logo_file', e.target.files ? e.target.files[0] : null)}
                                        className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                                    />
                                    {errors.website_logo_file && <div className="mt-1 text-sm text-red-600">{errors.website_logo_file}</div>}
                                </div>
                            </div>
                        </div>

                        {/* ===== SEO & TRACKING ===== */}
                        <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Kode SEO & Tracking Analytics</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Masukkan skrip Google Analytics, Facebook Pixel, atau tag meta SEO kustom.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Google Analytics Script (gtag.js / G-XXXXXX)</label>
                                    <textarea
                                        rows={4}
                                        value={data.google_analytics}
                                        onChange={(e) => setData('google_analytics', e.target.value)}
                                        placeholder="<!-- Global site tag (gtag.js) - Google Analytics -->"
                                        className="mt-1 block w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.google_analytics && <div className="mt-1 text-sm text-red-600">{errors.google_analytics}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Facebook Pixel Code</label>
                                    <textarea
                                        rows={4}
                                        value={data.facebook_pixel}
                                        onChange={(e) => setData('facebook_pixel', e.target.value)}
                                        placeholder="<!-- Facebook Pixel Code -->"
                                        className="mt-1 block w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.facebook_pixel && <div className="mt-1 text-sm text-red-600">{errors.facebook_pixel}</div>}
                                </div>
                            </div>
                        </div>

                        {/* ===== FOOTER & KONTAK ===== */}
                        <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Setelan Footer & Kontak</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Atur hak cipta, info kontak, sosial media, dan tautan marketplace.</p>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat</label>
                                    <textarea rows={2} value={data.footer_address} onChange={(e) => setData('footer_address', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_address && <div className="mt-1 text-sm text-red-600">{errors.footer_address}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Ringkas Footer</label>
                                    <textarea rows={2} value={data.footer_description} onChange={(e) => setData('footer_description', e.target.value)}
                                        placeholder="Voltama adalah produsen kabel listrik berkualitas..."
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_description && <div className="mt-1 text-sm text-red-600">{errors.footer_description}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teks Hak Cipta (Copyright)</label>
                                    <input type="text" value={data.footer_copyright} onChange={(e) => setData('footer_copyright', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_copyright && <div className="mt-1 text-sm text-red-600">{errors.footer_copyright}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telepon / Kontak</label>
                                    <input type="text" value={data.footer_phone} onChange={(e) => setData('footer_phone', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_phone && <div className="mt-1 text-sm text-red-600">{errors.footer_phone}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor WhatsApp (format: 628xxx)</label>
                                    <input type="text" value={data.footer_whatsapp} onChange={(e) => setData('footer_whatsapp', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_whatsapp && <div className="mt-1 text-sm text-red-600">{errors.footer_whatsapp}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input type="email" value={data.footer_email} onChange={(e) => setData('footer_email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_email && <div className="mt-1 text-sm text-red-600">{errors.footer_email}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tautan Facebook</label>
                                    <input type="text" value={data.footer_facebook} onChange={(e) => setData('footer_facebook', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_facebook && <div className="mt-1 text-sm text-red-600">{errors.footer_facebook}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tautan Instagram</label>
                                    <input type="text" value={data.footer_instagram} onChange={(e) => setData('footer_instagram', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_instagram && <div className="mt-1 text-sm text-red-600">{errors.footer_instagram}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tautan Youtube</label>
                                    <input type="text" value={data.footer_youtube} onChange={(e) => setData('footer_youtube', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_youtube && <div className="mt-1 text-sm text-red-600">{errors.footer_youtube}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tautan TikTok</label>
                                    <input type="text" value={data.footer_tiktok} onChange={(e) => setData('footer_tiktok', e.target.value)}
                                        placeholder="https://tiktok.com/@..."
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_tiktok && <div className="mt-1 text-sm text-red-600">{errors.footer_tiktok}</div>}
                                </div>

                                <div className="md:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                                    <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Powered By (Sub-Footer)</h4>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Powered By (Teks - contoh: Voltama)</label>
                                    <input type="text" value={data.footer_powered_by_text} onChange={(e) => setData('footer_powered_by_text', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_powered_by_text && <div className="mt-1 text-sm text-red-600">{errors.footer_powered_by_text}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Powered By (Tautan - contoh: # atau link luar)</label>
                                    <input type="text" value={data.footer_powered_by_link} onChange={(e) => setData('footer_powered_by_link', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" />
                                    {errors.footer_powered_by_link && <div className="mt-1 text-sm text-red-600">{errors.footer_powered_by_link}</div>}
                                </div>

                            </div>
                        </div>

                        {/* ===== SECTION KONTAK & LOKASI ===== */}
                        <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Pengaturan Section Kontak & Lokasi Beranda</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Atur konten untuk section Hubungi Kami/Kontak di halaman beranda, termasuk peta Google Maps embed.</p>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL Embed Google Maps (bagian src dari tag iframe)</label>
                                    <input
                                        type="text"
                                        value={data.contact_map_iframe}
                                        onChange={(e) => setData('contact_map_iframe', e.target.value)}
                                        placeholder="https://www.google.com/maps/embed?pb=..."
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.contact_map_iframe && <div className="mt-1 text-sm text-red-600">{errors.contact_map_iframe}</div>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Kontak</label>
                                    <textarea
                                        rows={3}
                                        value={data.contact_description}
                                        onChange={(e) => setData('contact_description', e.target.value)}
                                        placeholder="Hubungi layanan pelanggan kami untuk konsultasi instalasi kelistrikan..."
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.contact_description && <div className="mt-1 text-sm text-red-600">{errors.contact_description}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lokasi Kami (Alamat Detail)</label>
                                    <input
                                        type="text"
                                        value={data.contact_address}
                                        onChange={(e) => setData('contact_address', e.target.value)}
                                        placeholder="Jl. Raya Maspion No. 12, Sidoarjo"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.contact_address && <div className="mt-1 text-sm text-red-600">{errors.contact_address}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hari Operasional</label>
                                    <input
                                        type="text"
                                        value={data.contact_days}
                                        onChange={(e) => setData('contact_days', e.target.value)}
                                        placeholder="Senin - Sabtu (Minggu Libur)"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.contact_days && <div className="mt-1 text-sm text-red-600">{errors.contact_days}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jam Operasional</label>
                                    <input
                                        type="text"
                                        value={data.contact_hours}
                                        onChange={(e) => setData('contact_hours', e.target.value)}
                                        placeholder="08:00 - 17:00 WIB"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.contact_hours && <div className="mt-1 text-sm text-red-600">{errors.contact_hours}</div>}
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
