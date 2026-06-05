import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEvent, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface Page {
    id: number;
    title: string;
    content: string;
    is_active: boolean;
    show_in_navbar: boolean;
    gallery_images: string[];
}

interface EditProps {
    page: Page;
}

export default function Edit({ page }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: page.title || '',
        content: page.content || '',
        is_active: page.is_active,
        show_in_navbar: page.show_in_navbar,
        retained_gallery_images: page.gallery_images || [] as string[],
        gallery_files: [] as File[],
    });

    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newFiles = [...(data.gallery_files || []), ...filesArray];
            setData('gallery_files', newFiles);

            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removePreview = (index: number) => {
        const updatedFiles = [...(data.gallery_files || [])];
        updatedFiles.splice(index, 1);
        setData('gallery_files', updatedFiles);

        const updatedPreviews = [...previews];
        URL.revokeObjectURL(updatedPreviews[index]);
        updatedPreviews.splice(index, 1);
        setPreviews(updatedPreviews);
    };

    const removeServerImage = (imgUrl: string) => {
        const updatedRetained = data.retained_gallery_images.filter(img => img !== imgUrl);
        setData('retained_gallery_images', updatedRetained);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Menggunakan POST dengan method spoofing _method: 'PUT' agar multipart file upload berhasil di php laravel
        post(route('admin.pages.update', page.id));
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'clean'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link'
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit Halaman Custom</h2>
                    <Link
                        href={route('admin.pages.index')}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Edit Halaman Custom" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul Halaman</label>
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Isi Halaman (Konten Bebas)</label>
                                <div className="bg-white text-gray-900 rounded-md dark:bg-white dark:text-gray-900">
                                    <ReactQuill
                                        theme="snow"
                                        value={data.content}
                                        onChange={(val) => setData('content', val)}
                                        modules={modules}
                                        formats={formats}
                                        style={{ height: '350px', marginBottom: '50px' }}
                                    />
                                </div>
                                {errors.content && <div className="mt-1 text-sm text-red-600">{errors.content}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Galeri Foto Slideshow (Opsional - Bisa pilih banyak gambar)</label>
                                
                                {/* Gambar galeri yang sudah tersimpan di server */}
                                {data.retained_gallery_images && data.retained_gallery_images.length > 0 && (
                                    <div className="mb-4">
                                        <span className="text-xs text-gray-500 block mb-2">Gambar Saat Ini (Klik tombol merah untuk menghapus):</span>
                                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                                            {data.retained_gallery_images.map((img, idx) => (
                                                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50">
                                                    <img src={img} alt={`Server Img ${idx + 1}`} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeServerImage(img)}
                                                        className="absolute top-1 right-1 bg-red-650 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition shadow"
                                                        title="Hapus dari server"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-550 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                                />
                                {errors.gallery_files && <div className="mt-1 text-sm text-red-600">{errors.gallery_files}</div>}
                                
                                {previews.length > 0 && (
                                    <div className="mt-4">
                                        <span className="text-xs text-gray-550 block mb-2">Gambar Baru yang Akan Diunggah:</span>
                                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                                            {previews.map((preview, idx) => (
                                                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50">
                                                    <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removePreview(idx)}
                                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition shadow"
                                                        title="Batal unggah"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Aktifkan Halaman (Dapat Diakses via Link)</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.show_in_navbar}
                                        onChange={(e) => setData('show_in_navbar', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Tampilkan Tautan Halaman di Navbar Website</span>
                                </label>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link
                                    href={route('admin.pages.index')}
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
