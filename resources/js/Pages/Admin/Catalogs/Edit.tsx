import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEvent, useState } from 'react';

interface SpecItem {
    name: string;
    value: string;
}

interface Catalog {
    id: number;
    title: string;
    description: string;
    image_path: string;
    is_active: boolean;
    catalog_category_id: number | null;
}

interface Category {
    id: number;
    name: string;
}

interface EditProps {
    catalog: Catalog;
    specs: SpecItem[];
    categories: Category[];
}

export default function Edit({ catalog, specs, categories }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        catalog_category_id: catalog.catalog_category_id || '' as string | number,
        title: catalog.title || '',
        description: catalog.description || '',
        image_file: null as File | null,
        specs: specs || [],
        is_active: catalog.is_active,
    });

    const [specsList, setSpecsList] = useState<SpecItem[]>(specs || []);

    const handleAddSpec = () => {
        setSpecsList([...specsList, { name: '', value: '' }]);
    };

    const handleRemoveSpec = (index: number) => {
        const updated = specsList.filter((_, i) => i !== index);
        setSpecsList(updated);
        setData('specs', updated);
    };

    const handleSpecChange = (index: number, key: 'name' | 'value', value: string) => {
        const updated = [...specsList];
        updated[index][key] = value;
        setSpecsList(updated);
        setData('specs', updated);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Set specs final sebelum submit
        setData('specs', specsList);
        // Kirim menggunakan POST dengan method spoofing PUT
        post(route('admin.catalogs.update', catalog.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit Katalog</h2>
                    <Link
                        href={route('admin.catalogs.index')}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Edit Katalog" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Dropdown Kategori */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori Produk</label>
                                <select
                                    value={data.catalog_category_id}
                                    onChange={(e) => setData('catalog_category_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                >
                                    <option value="">-- Tanpa Kategori --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Produk / Tipe Kabel</label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                />
                                {errors.title && <div className="mt-1 text-sm text-red-600">{errors.title}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Singkat</label>
                                <textarea
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                />
                                {errors.description && <div className="mt-1 text-sm text-red-600">{errors.description}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gambar Produk</label>
                                {catalog.image_path && (
                                    <img src={catalog.image_path} alt="Preview" className="mb-2 h-24 w-24 rounded object-cover border dark:border-gray-700" />
                                )}
                                <input
                                    type="file"
                                    onChange={(e) => setData('image_file', e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                                />
                                <span className="text-xs text-gray-500">Biarkan kosong jika tidak ingin mengubah gambar</span>
                                {errors.image_file && <div className="mt-1 text-sm text-red-600">{errors.image_file}</div>}
                            </div>

                            {/* Section Dynamic Specifications */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Spesifikasi Produk (Opsional)</label>
                                    <button
                                        type="button"
                                        onClick={handleAddSpec}
                                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        + Tambah Baris Spesifikasi
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {specsList.map((spec, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <input
                                                type="text"
                                                value={spec.name}
                                                placeholder="Nama Spek (misal: Tegangan)"
                                                onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                                                className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 text-sm"
                                            />
                                            <input
                                                type="text"
                                                value={spec.value}
                                                placeholder="Nilai Spek (misal: 300/500 V)"
                                                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                                className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSpec(index)}
                                                className="text-sm text-red-500 hover:text-red-700"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Aktifkan Katalog (Tampil di Frontend)</span>
                                </label>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link
                                    href={route('admin.catalogs.index')}
                                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
