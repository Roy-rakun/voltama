import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React from 'react';

interface Catalog {
    id: number;
    title: string;
    slug: string;
    description: string;
    image_path: string;
    is_active: boolean;
    created_at: string;
}

interface IndexProps {
    catalogs: Catalog[];
    success: string | null;
}

export default function Index({ catalogs, success }: IndexProps) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus katalog ini?')) {
            destroy(route('admin.catalogs.destroy', id));
        }
    };

    const handleMoveUp = (id: number) => {
        router.post(route('admin.catalogs.up', id), {}, {
            preserveScroll: true
        });
    };

    const handleMoveDown = (id: number) => {
        router.post(route('admin.catalogs.down', id), {}, {
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Manajemen Katalog</h2>
                    <Link
                        href={route('admin.catalogs.create')}
                        className="rounded-md bg-[#ffc400] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#ffb300]"
                    >
                        Tambah Katalog
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Katalog" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="mb-6 rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
                            {success}
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {catalogs.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">Belum ada katalog. Silakan tambahkan katalog baru.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Gambar</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Nama Produk</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Tanggal Dibuat</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Posisi</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                            {catalogs.map((catalog, index) => (
                                                <tr key={catalog.id}>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {catalog.image_path ? (
                                                            <img src={catalog.image_path} alt={catalog.title} className="h-12 w-12 rounded object-cover border dark:border-gray-700" />
                                                        ) : (
                                                            <span className="text-xs text-gray-400">No Image</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-gray-950 dark:text-white">{catalog.title}</div>
                                                        <div className="text-xs text-gray-500 font-mono">{catalog.slug}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                            catalog.is_active 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                        }`}>
                                                            {catalog.is_active ? 'Aktif' : 'Nonaktif'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(catalog.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium">
                                                        <div className="flex items-center justify-center space-x-1">
                                                            <button
                                                                onClick={() => handleMoveUp(catalog.id)}
                                                                disabled={index === 0}
                                                                className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                                                title="Naikkan Posisi"
                                                            >
                                                                ▲
                                                            </button>
                                                            <button
                                                                onClick={() => handleMoveDown(catalog.id)}
                                                                disabled={index === catalogs.length - 1}
                                                                className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                                                title="Turunkan Posisi"
                                                            >
                                                                ▼
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-2">
                                                        <Link
                                                            href={route('admin.catalogs.edit', catalog.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(catalog.id)}
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
