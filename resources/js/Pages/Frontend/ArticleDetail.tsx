import FrontendLayout from '@/Layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { Calendar, Eye, ArrowLeft, ArrowRight } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_path: string;
    views: number;
    created_at: string;
    category?: Category;
}

interface ArticleDetailProps {
    globalSettings: any;
    article: Article;
    relatedArticles: Article[];
}

const cleanContent = (htmlContent: string) => {
    if (!htmlContent) return '';
    let cleaned = htmlContent.replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ');
    // Hapus paragraf manual Kategori dan Tag jika ada
    cleaned = cleaned.replace(/<p[^>]*>\s*(<strong>\s*)?(Kategori|Tag):\s*.*?<\/p>/gi, '');
    return cleaned;
};

export default function ArticleDetail({ globalSettings, article, relatedArticles }: ArticleDetailProps) {
    const cleanDesc = (htmlContent: string) => {
        if (!htmlContent) return '';
        const noHtml = htmlContent.replace(/<[^>]*>/g, '');
        return noHtml
            .replace(/\u00a0/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/\s+/g, ' ')
            .trim();
    };

    const rawExcerpt = cleanDesc(article.content);
    const excerpt = rawExcerpt.substring(0, 160) + (rawExcerpt.length > 160 ? '...' : '');

    // Buat keywords dari kategori artikel + default keywords + kata dari judul
    const categoryName = article.category?.name ? `${article.category.name}, ` : '';
    const titleKeywords = article.title.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(' ').filter(Boolean).join(', ');
    const keywords = `${categoryName}${titleKeywords}, voltama, tips kelistrikan, alat listrik, instalasi listrik`;

    // Ambil URL saat ini
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    // Menghasilkan tag otomatis dari judul artikel
    const stopWords = ['yang', 'dan', 'untuk', 'dari', 'dengan', 'dalam', 'pada', 'atau', 'oleh', 'juga', 'baru', 'bisa', 'cara', 'untuk', 'agar', 'kita', 'di', 'ke', 'ini', 'itu', 'adalah'];
    const titleWords = article.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .split(' ')
        .filter(word => word.length >= 4 && !stopWords.includes(word));
    const computedTags = Array.from(new Set(titleWords)).slice(0, 7);

    return (
        <FrontendLayout globalSettings={globalSettings} isInnerPage={true}>
            <Head>
                <title>{`${article.title} - ${globalSettings.website_title || 'Voltama'}`}</title>
                <meta name="description" content={excerpt} />
                <meta name="keywords" content={keywords} />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={excerpt} />
                <meta property="og:image" content={article.image_path || '/images/logo.png'} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:site_name" content={globalSettings.website_title || 'Voltama'} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={excerpt} />
                <meta name="twitter:image" content={article.image_path || '/images/logo.png'} />
            </Head>

            <div className="py-12 bg-gray-50 dark:bg-[#0c0c0c] transition-colors duration-300 min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href="/artikel"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-550 hover:text-gray-900 dark:hover:text-white transition"
                        >
                            <ArrowLeft size={16} />
                            Kembali ke Daftar Artikel
                        </Link>
                    </div>

                    {/* Article Content Box */}
                    <article className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-sm overflow-hidden space-y-8">
                        {/* Meta Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    {new Date(article.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Eye size={14} />
                                    {article.views} views
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-tight">
                                {article.title}
                            </h1>
                        </div>

                        {/* Banner Image */}
                        {article.image_path && (
                            <div className="rounded-2xl overflow-hidden bg-gray-100 h-64 md:h-96">
                                <img
                                    src={article.image_path}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Rich HTML Content Body (from Quill) */}
                        <div 
                            className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-normal space-y-6 break-words w-full"
                            dangerouslySetInnerHTML={{ __html: cleanContent(article.content) }}
                        />

                        {/* Tags & Categories Section */}
                        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 space-y-4">
                            {article.category && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Kategori:</span>
                                    <Link
                                        href={`/artikel?kategori=${article.category.slug}`}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-55 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/60 transition"
                                    >
                                        {article.category.name}
                                    </Link>
                                </div>
                            )}

                            {computedTags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Tag:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {computedTags.map((tag, i) => (
                                            <Link
                                                key={i}
                                                href={`/artikel?search=${encodeURIComponent(tag)}`}
                                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-350 dark:hover:bg-gray-700 transition"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>

                    {/* Related Articles Section */}
                    {relatedArticles.length > 0 && (
                        <div className="mt-16 space-y-8">
                            <h2 className="text-2xl font-extrabold text-gray-950 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                                Artikel Terkait
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedArticles.map((art) => (
                                    <Link
                                        key={art.id}
                                        href={route('artikel.show', art.slug)}
                                        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col h-full group"
                                    >
                                        <div className="h-36 overflow-hidden bg-gray-100">
                                            <img
                                                src={art.image_path || '/images/product.png'}
                                                alt={art.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        </div>
                                        <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                                            <h3 className="font-extrabold text-sm text-gray-950 dark:text-white leading-snug line-clamp-2 group-hover:text-[#ffb300] transition">
                                                {art.title}
                                            </h3>
                                            <div className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                                                Baca Artikel
                                                <ArrowRight size={10} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FrontendLayout>
    );
}
