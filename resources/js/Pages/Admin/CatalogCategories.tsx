import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { FormEvent, useRef, useState } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, Tag, Check, X, GripVertical } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    image_path: string | null;
    description: string | null;
    sort_order: number;
    is_active: boolean;
    catalogs_count: number;
}

interface Props {
    categories: Category[];
    success: string | null;
}

export default function CatalogCategories({ categories, success }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const editFileRef = useRef<HTMLInputElement>(null);

    // Form tambah baru
    const addForm = useForm({
        name: '',
        description: '',
        sort_order: '0',
        is_active: true as boolean,
        image_file: null as File | null,
    });

    // Form edit
    const editForm = useForm({
        name: '',
        description: '',
        sort_order: '0',
        is_active: true as boolean,
        image_file: null as File | null,
        _method: 'PUT',
    });

    const handleAdd = (e: FormEvent) => {
        e.preventDefault();
        addForm.post(route('admin.catalog-categories.store'), {
            forceFormData: true,
            onSuccess: () => {
                addForm.reset();
                setShowAddForm(false);
                if (fileRef.current) fileRef.current.value = '';
            }
        });
    };

    const startEdit = (cat: Category) => {
        setEditingId(cat.id);
        editForm.setData({
            name: cat.name,
            description: cat.description || '',
            sort_order: String(cat.sort_order),
            is_active: cat.is_active,
            image_file: null,
            _method: 'PUT',
        });
    };

    const handleEdit = (e: FormEvent, id: number) => {
        e.preventDefault();
        editForm.post(route('admin.catalog-categories.update', id), {
            forceFormData: true,
            onSuccess: () => setEditingId(null),
        });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus kategori "${name}"? Katalog yang ada tidak akan terhapus, hanya kategorinya yang dilepas.`)) {
            router.delete(route('admin.catalog-categories.destroy', id));
        }
    };

    const inputClass = 'block w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#ffc400] focus:ring-1 focus:ring-[#ffc400]';

    return (
        <AuthenticatedLayout header={
            <div>
                <p className="text-xs text-gray-400">Admin / Katalog / <span className="text-gray-600">Kategori</span></p>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Kategori Katalog</h2>
            </div>
        }>
            <Head title="Kategori Katalog" />

            {success && (
                <div className="mb-5 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-3 text-sm text-emerald-700 font-medium">
                    <Check size={16} /> {success}
                </div>
            )}

            {/* Header card */}
            <div className="mb-6 bg-[#1a1e2e] rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#ffc400] rounded-xl flex items-center justify-center shrink-0">
                        <Tag size={20} className="text-gray-900" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Kategori Katalog Produk</p>
                        <p className="text-xs text-gray-400">{categories.length} kategori tersedia · Tiap kategori bisa punya gambar dan urutan tampil</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 bg-[#ffc400] text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#e6ac00] transition shrink-0"
                >
                    <Plus size={16} />
                    Tambah Kategori
                </button>
            </div>

            {/* Form tambah kategori */}
            {showAddForm && (
                <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl border border-[#ffc400] shadow-lg p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Plus size={16} className="text-[#ffc400]" /> Tambah Kategori Baru
                    </h3>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Nama Kategori *</label>
                            <input type="text" value={addForm.data.name} onChange={e => addForm.setData('name', e.target.value)}
                                className={inputClass} placeholder="contoh: Kabel Bangunan" required />
                            {addForm.errors.name && <p className="text-red-500 text-xs mt-1">{addForm.errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Urutan Tampil</label>
                            <input type="number" min="0" value={addForm.data.sort_order} onChange={e => addForm.setData('sort_order', e.target.value)}
                                className={inputClass} placeholder="0 = pertama" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Deskripsi Singkat</label>
                            <input type="text" value={addForm.data.description} onChange={e => addForm.setData('description', e.target.value)}
                                className={inputClass} placeholder="Opsional" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Gambar Kategori</label>
                            <input ref={fileRef} type="file" accept="image/*"
                                onChange={e => addForm.setData('image_file', e.target.files ? e.target.files[0] : null)}
                                className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#ffc400] file:text-gray-900 hover:file:bg-[#e6ac00] cursor-pointer" />
                        </div>
                        <div className="flex items-center gap-3 md:col-span-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={addForm.data.is_active}
                                    onChange={e => addForm.setData('is_active', e.target.checked)}
                                    className="w-4 h-4 accent-[#ffc400]" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Aktif (tampil di frontend)</span>
                            </label>
                        </div>
                        <div className="flex gap-3 md:col-span-2">
                            <button type="submit" disabled={addForm.processing}
                                className="bg-[#1a1e2e] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#ffc400] hover:text-gray-900 transition disabled:opacity-50 text-sm">
                                {addForm.processing ? 'Menyimpan...' : 'Simpan Kategori'}
                            </button>
                            <button type="button" onClick={() => setShowAddForm(false)}
                                className="border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Daftar kategori */}
            {categories.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-16 text-center">
                    <Tag size={48} className="mx-auto mb-4 text-gray-200 dark:text-gray-700" />
                    <p className="font-bold text-gray-400">Belum ada kategori katalog.</p>
                    <p className="text-sm text-gray-300 mt-1">Klik "Tambah Kategori" untuk mulai.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                            {editingId === cat.id ? (
                                /* Form Edit */
                                <form onSubmit={(e) => handleEdit(e, cat.id)} className="p-5 space-y-3">
                                    <p className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-2">Edit Kategori</p>
                                    <input type="text" value={editForm.data.name} onChange={e => editForm.setData('name', e.target.value)}
                                        className={inputClass} placeholder="Nama kategori" required />
                                    <input type="text" value={editForm.data.description} onChange={e => editForm.setData('description', e.target.value)}
                                        className={inputClass} placeholder="Deskripsi (opsional)" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input type="number" min="0" value={editForm.data.sort_order} onChange={e => editForm.setData('sort_order', e.target.value)}
                                            className={inputClass} placeholder="Urutan" />
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={editForm.data.is_active}
                                                onChange={e => editForm.setData('is_active', e.target.checked)}
                                                className="w-4 h-4 accent-[#ffc400]" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Aktif</span>
                                        </label>
                                    </div>
                                    <div>
                                        {cat.image_path && (
                                            <img src={cat.image_path} alt={cat.name} className="h-16 object-contain mb-2 rounded-lg bg-gray-50 dark:bg-gray-900 p-1" />
                                        )}
                                        <input ref={editFileRef} type="file" accept="image/*"
                                            onChange={e => editForm.setData('image_file', e.target.files ? e.target.files[0] : null)}
                                            className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer" />
                                    </div>
                                    <div className="flex gap-2 pt-1">
                                        <button type="submit" disabled={editForm.processing}
                                            className="flex-1 bg-[#1a1e2e] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#ffc400] hover:text-gray-900 transition disabled:opacity-50">
                                            Simpan
                                        </button>
                                        <button type="button" onClick={() => setEditingId(null)}
                                            className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-500 text-xs font-bold py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                /* Tampilan kartu kategori */
                                <div>
                                    {/* Gambar atau placeholder */}
                                    <div className="h-36 bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden border-b border-gray-100 dark:border-gray-700 relative">
                                        {cat.image_path ? (
                                            <img src={cat.image_path} alt={cat.name} className="w-full h-full object-contain p-4" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-gray-300 dark:text-gray-700">
                                                <ImageIcon size={36} />
                                                <span className="text-xs font-medium">Belum ada gambar</span>
                                            </div>
                                        )}
                                        {/* Badge nomor urut */}
                                        <div className="absolute top-2 left-2 bg-[#ffc400] text-gray-900 font-black text-xs w-7 h-7 rounded-lg flex items-center justify-center shadow">
                                            {String(cat.sort_order + 1).padStart(2, '0')}
                                        </div>
                                        {/* Status */}
                                        <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full ${cat.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {cat.is_active ? 'Aktif' : 'Non-aktif'}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-black text-gray-900 dark:text-white text-sm">{cat.name}</h3>
                                        {cat.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{cat.description}</p>}
                                        <p className="text-xs text-gray-400 mt-1">{cat.catalogs_count} produk dalam kategori ini</p>
                                        <div className="flex gap-2 mt-3">
                                            <button onClick={() => startEdit(cat)}
                                                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg py-2 hover:border-[#ffc400] hover:text-[#ffc400] transition">
                                                <Pencil size={13} /> Edit
                                            </button>
                                            <button onClick={() => handleDelete(cat.id, cat.name)}
                                                className="flex items-center justify-center gap-1.5 text-xs font-bold text-red-400 border border-red-100 dark:border-red-900/30 rounded-lg px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
