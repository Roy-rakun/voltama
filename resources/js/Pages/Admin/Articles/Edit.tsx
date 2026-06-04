import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface Article {
    id: number;
    title: string;
    content: string;
    image_path: string;
    is_active: boolean;
}

interface EditProps {
    article: Article;
}

export default function Edit({ article }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put', // Method spoofing untuk Laravel PUT request
        title: article.title || '',
        content: article.content || '',
        image_file: null as File | null,
        is_active: article.is_active,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.articles.update', article.id));
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
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit Artikel</h2>
                    <Link
                        href={route('admin.articles.index')}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Edit Artikel" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul Artikel</label>
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gambar Banner Utama</label>
                                {article.image_path && (
                                    <img src={article.image_path} alt="Preview" className="mb-2 h-32 w-48 rounded object-cover border dark:border-gray-700" />
                                )}
                                <input
                                    type="file"
                                    onChange={(e) => setData('image_file', e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                                />
                                <span className="text-xs text-gray-500">Biarkan kosong jika tidak ingin mengubah gambar banner</span>
                                {errors.image_file && <div className="mt-1 text-sm text-red-600">{errors.image_file}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Konten Artikel</label>
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
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Publikasikan Artikel (Tampil di Website)</span>
                                </label>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link
                                    href={route('admin.articles.index')}
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
