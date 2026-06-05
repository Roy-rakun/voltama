import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
}

interface CustomPageProps {
    globalSettings: any;
    page: Page;
}

export default function CustomPage({ globalSettings, page }: CustomPageProps) {
    return (
        <FrontendLayout globalSettings={globalSettings}>
            <Head title={`${page.title} - ${globalSettings.website_title || 'Voltama'}`} />

            <div className="py-16 bg-gray-50 dark:bg-[#0c0c0c] transition-colors duration-300 min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Content Box */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
                        <div className="border-b border-gray-100 dark:border-gray-800 pb-4 text-center">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                                {page.title}
                            </h1>
                        </div>

                        {/* Custom content HTML body (from Quill) */}
                        {page.content ? (
                            <div 
                                className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-normal space-y-6 break-words w-full"
                                dangerouslySetInnerHTML={{ __html: page.content }}
                            />
                        ) : (
                            <p className="text-center text-gray-500 py-8">Halaman ini belum memiliki konten.</p>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
