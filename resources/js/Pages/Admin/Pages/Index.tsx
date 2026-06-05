import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface Page {
    id: number;
    title: string;
    slug: string;
    is_active: boolean;
    show_in_navbar: boolean;
    created_at: string;
}

interface IndexProps {
    pages: Page[];
    success: string | null;
}

export default function Index({ pages, success }: IndexProps) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus halaman ini?')) {
            destroy(route('admin.pages.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Manajemen Halaman Custom</h2>
                    <Link
                        href={route('admin.pages.create')}
                        className="rounded-md bg-[#ffc400] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#ffb300]"
                    >
                        Buat Halaman
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Halaman Custom" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="mb-6 rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
                            {success}
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {pages.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">Belum ada halaman custom. Silakan buat halaman baru (seperti About, Kontak, atau Layanan).</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Judul Halaman</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Tautan (Slug)</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Tampil di Navbar</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Tanggal Dibuat</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                            {pages.map((page) => (
                                                <tr key={page.id}>
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-gray-950 dark:text-white">{page.title}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-mono text-gray-500 dark:text-gray-400">
                                                        /p/{page.slug}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                            page.is_active 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                        }`}>
                                                            {page.is_active ? 'Aktif' : 'Nonaktif'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                            page.show_in_navbar 
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300'
                                                        }`}>
                                                            {page.show_in_navbar ? 'Ya' : 'Tidak'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(page.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-2">
                                                        <Link
                                                            href={route('admin.pages.edit', page.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(page.id)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
