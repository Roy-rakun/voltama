import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { FormEvent, useRef, useState } from 'react';
import { LayoutTemplate, Save, Image as ImageIcon, Type, Plus, Trash2, Edit3, Check, X, Clock, Layers } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    avatar_path: string | null;
    sort_order: number;
    is_active: boolean;
}

interface HeroSlide {
    id: number;
    image_path: string;
    title: string | null;
    description: string | null;
    sort_order: number;
    is_active: boolean;
}

interface SectionEditorProps {
    settings: Record<string, string>;
    heroSlides: HeroSlide[];
    testimonials: Testimonial[];
    success: string | null;
}

const inputClass = 'mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ffc400] focus:ring-1 focus:ring-[#ffc400] transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300';
const textareaClass = inputClass;
const labelClass = 'block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide';

function SectionCard({ number, title, color, children }: {
    number: string; title: string; color: string; children: React.ReactNode
}) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className={`flex items-center gap-3 px-6 py-4 ${color}`}>
                <span className="w-8 h-8 rounded-xl bg-white/20 text-white font-black text-sm flex items-center justify-center shadow-inner shrink-0">
                    {number}
                </span>
                <div>
                    <p className="text-[10px] font-semibold text-white/70 uppercase tracking-widest">Section {number}</p>
                    <h3 className="text-sm font-bold text-white">{title}</h3>
                </div>
            </div>
            <div className="p-6 space-y-5">
                {children}
            </div>
        </div>
    );
}

// Fix: Preview gambar baru yang dipilih, bukan hanya gambar lama
function ImageUploadField({ label, hint, currentSrc, fieldName, onChange }: {
    label: string;
    hint?: string;
    currentSrc?: string;
    fieldName: string;
    onChange: (file: File | null) => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        onChange(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setPreviewSrc(ev.target?.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreviewSrc(null);
        }
    };

    const displaySrc = previewSrc || currentSrc;

    return (
        <div>
            <label className={labelClass + ' flex items-center gap-1'}>
                <ImageIcon size={11} className="opacity-50" />
                {label}
            </label>
            {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
            {displaySrc && (
                <div className={`mb-2 bg-gray-50 dark:bg-gray-900 rounded-xl border p-2 inline-block ${previewSrc ? 'border-[#ffc400] ring-1 ring-[#ffc400]' : 'border-gray-200 dark:border-gray-700'}`}>
                    <img src={displaySrc} alt={label} className="h-24 object-contain" />
                    {previewSrc && <p className="text-[10px] text-[#ffc400] font-bold text-center mt-1">✓ Gambar baru dipilih</p>}
                </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer group">
                <div className="flex-1 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-center hover:border-[#ffc400] transition group-hover:bg-yellow-50/30">
                    <p className="text-xs text-gray-400 group-hover:text-gray-600 transition">Klik untuk {displaySrc ? 'ganti' : 'upload'} gambar</p>
                    <p className="text-[10px] text-gray-300 mt-0.5">JPG, PNG, WEBP (maks. 8MB)</p>
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    name={fieldName}
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                />
            </label>
        </div>
    );
}

// ============================================================
// Hero Slides CRUD Manager
// ============================================================
function HeroSlideManager({ slides, slideInterval }: { slides: HeroSlide[]; slideInterval: string }) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showAdd, setShowAdd] = useState(false);

    const defaultForm = { title: '', description: '', sort_order: 0, is_active: true, image_file: null as File | null };
    const [addForm, setAddForm] = useState({ ...defaultForm });
    const [editForms, setEditForms] = useState<Record<number, any>>({});
    const [addPreview, setAddPreview] = useState<string | null>(null);
    const [editPreviews, setEditPreviews] = useState<Record<number, string | null>>({});

    const startEdit = (s: HeroSlide) => {
        setEditingId(s.id);
        setEditForms(prev => ({ ...prev, [s.id]: { title: s.title || '', description: s.description || '', sort_order: s.sort_order, is_active: s.is_active, image_file: null } }));
    };

    const handleSaveEdit = (id: number) => {
        const form = editForms[id];
        const fd = new FormData();
        fd.append('_method', 'POST');
        fd.append('title', form.title);
        fd.append('description', form.description);
        fd.append('sort_order', String(form.sort_order));
        fd.append('is_active', form.is_active ? '1' : '0');
        if (form.image_file) fd.append('image_file', form.image_file);

        router.post(route('admin.hero-slides.update', id), fd, {
            onSuccess: () => { setEditingId(null); setEditPreviews(p => ({ ...p, [id]: null })); }
        });
    };

    const handleAdd = () => {
        if (!addForm.image_file) return;
        const fd = new FormData();
        fd.append('image_file', addForm.image_file);
        fd.append('title', addForm.title);
        fd.append('description', addForm.description);
        fd.append('sort_order', String(addForm.sort_order));
        fd.append('is_active', addForm.is_active ? '1' : '0');

        router.post(route('admin.hero-slides.store'), fd, {
            onSuccess: () => { setAddForm({ ...defaultForm }); setAddPreview(null); setShowAdd(false); }
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus slide ini?')) return;
        router.delete(route('admin.hero-slides.destroy', id));
    };

    return (
        <div className="space-y-4">
            {/* List slides */}
            {slides.length === 0 && !showAdd && (
                <p className="text-sm text-gray-400 text-center py-6">
                    Belum ada slide hero. Klik "+ Tambah Slide" untuk menambahkan gambar banner.
                </p>
            )}

            {slides.map((s) => (
                <div key={s.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    {editingId === s.id ? (
                        /* Edit Mode */
                        <div className="p-4 space-y-3 bg-yellow-50/30 dark:bg-yellow-900/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Judul (opsional)</label>
                                    <input type="text" value={editForms[s.id]?.title || ''} onChange={e => setEditForms(p => ({ ...p, [s.id]: { ...p[s.id], title: e.target.value } }))} className={inputClass} placeholder="Judul banner..." />
                                </div>
                                <div>
                                    <label className={labelClass}>Deskripsi (opsional)</label>
                                    <input type="text" value={editForms[s.id]?.description || ''} onChange={e => setEditForms(p => ({ ...p, [s.id]: { ...p[s.id], description: e.target.value } }))} className={inputClass} placeholder="Keterangan singkat..." />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className={labelClass}>Ganti Gambar</label>
                                    {(editPreviews[s.id] || s.image_path) && (
                                        <img src={editPreviews[s.id] || s.image_path || ''} alt="slide" className="w-full max-w-[200px] h-24 object-cover rounded-lg mb-2 border-2 border-[#ffc400]" />
                                    )}
                                    <input type="file" accept="image/*" className="text-xs text-gray-500" onChange={e => {
                                        const file = e.target.files?.[0] || null;
                                        setEditForms(p => ({ ...p, [s.id]: { ...p[s.id], image_file: file } }));
                                        if (file) { const r = new FileReader(); r.onload = ev => setEditPreviews(p => ({ ...p, [s.id]: ev.target?.result as string })); r.readAsDataURL(file); }
                                    }} />
                                </div>
                                <div>
                                    <label className={labelClass}>Urutan</label>
                                    <input type="number" value={editForms[s.id]?.sort_order || 0} onChange={e => setEditForms(p => ({ ...p, [s.id]: { ...p[s.id], sort_order: parseInt(e.target.value) } }))} className={inputClass + ' w-20'} />
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <input type="checkbox" id={`active-slide-${s.id}`} checked={editForms[s.id]?.is_active ?? true} onChange={e => setEditForms(p => ({ ...p, [s.id]: { ...p[s.id], is_active: e.target.checked } }))} className="rounded" />
                                    <label htmlFor={`active-slide-${s.id}`} className="text-xs text-gray-600 dark:text-gray-400">Aktif</label>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => handleSaveEdit(s.id)} className="flex items-center gap-1.5 bg-[#ffc400] text-gray-950 font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#ffb300] transition">
                                    <Check size={14} /> Simpan
                                </button>
                                <button type="button" onClick={() => setEditingId(null)} className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                    <X size={14} /> Batal
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* View Mode */
                        <div className="p-4 flex items-start gap-3">
                            <img
                                src={s.image_path}
                                alt={s.title || 'Hero slide'}
                                className="w-32 h-20 rounded-lg object-cover shrink-0 border-2 border-gray-200 dark:border-gray-700"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm text-gray-800 dark:text-white">
                                        {s.title || <span className="text-gray-400 italic">Tanpa judul</span>}
                                    </p>
                                    {!s.is_active && <span className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded-full">Non-aktif</span>}
                                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold">#{s.sort_order}</span>
                                </div>
                                {s.description && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{s.description}</p>
                                )}
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button type="button" onClick={() => startEdit(s)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-[#ffc400]/20 transition text-gray-600 dark:text-gray-400">
                                    <Edit3 size={14} />
                                </button>
                                <button type="button" onClick={() => handleDelete(s.id)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 transition text-gray-600 dark:text-gray-400">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Add New */}
            {showAdd ? (
                <div className="border-2 border-[#ffc400] rounded-xl p-4 space-y-3 bg-yellow-50/30 dark:bg-yellow-900/10">
                    <p className="text-xs font-bold text-[#ffc400] uppercase tracking-wide">Tambah Slide Baru</p>
                    <div>
                        <label className={labelClass}>Gambar Banner *</label>
                        {addPreview && <img src={addPreview} alt="preview" className="w-full max-w-[300px] h-32 object-cover rounded-lg mb-2 border-2 border-[#ffc400]" />}
                        <input type="file" accept="image/*" className="text-xs text-gray-500" onChange={e => {
                            const file = e.target.files?.[0] || null;
                            setAddForm(p => ({ ...p, image_file: file }));
                            if (file) { const r = new FileReader(); r.onload = ev => setAddPreview(ev.target?.result as string); r.readAsDataURL(file); }
                        }} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Judul (opsional)</label>
                            <input type="text" value={addForm.title} onChange={e => setAddForm(p => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Judul banner..." />
                        </div>
                        <div>
                            <label className={labelClass}>Deskripsi (opsional)</label>
                            <input type="text" value={addForm.description} onChange={e => setAddForm(p => ({ ...p, description: e.target.value }))} className={inputClass} placeholder="Keterangan singkat..." />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <label className={labelClass}>Urutan</label>
                            <input type="number" value={addForm.sort_order} onChange={e => setAddForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} className={inputClass + ' w-20'} />
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <input type="checkbox" id="add-slide-active" checked={addForm.is_active} onChange={e => setAddForm(p => ({ ...p, is_active: e.target.checked }))} className="rounded" />
                            <label htmlFor="add-slide-active" className="text-xs text-gray-600 dark:text-gray-400">Aktif</label>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={handleAdd} disabled={!addForm.image_file}
                            className="flex items-center gap-1.5 bg-[#ffc400] text-gray-950 font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#ffb300] transition disabled:opacity-50">
                            <Check size={14} /> Simpan Slide
                        </button>
                        <button type="button" onClick={() => { setShowAdd(false); setAddForm({ ...defaultForm }); setAddPreview(null); }}
                            className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                            <X size={14} /> Batal
                        </button>
                    </div>
                </div>
            ) : (
                <button type="button" onClick={() => setShowAdd(true)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl py-3 text-xs font-bold text-gray-500 hover:border-[#ffc400] hover:text-[#ffc400] transition">
                    <Plus size={16} /> Tambah Slide
                </button>
            )}
        </div>
    );
}

// ============================================================
// Testimonial CRUD
// ============================================================
function TestimonialManager({ testimonials }: { testimonials: Testimonial[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showAdd, setShowAdd] = useState(false);

    const defaultForm = { name: '', role: '', quote: '', sort_order: 0, is_active: true, avatar_file: null as File | null };
    const [addForm, setAddForm] = useState({ ...defaultForm });
    const [editForms, setEditForms] = useState<Record<number, any>>({});
    const [addPreview, setAddPreview] = useState<string | null>(null);
    const [editPreviews, setEditPreviews] = useState<Record<number, string | null>>({});

    const startEdit = (t: Testimonial) => {
        setEditingId(t.id);
        setEditForms(prev => ({ ...prev, [t.id]: { name: t.name, role: t.role || '', quote: t.quote, sort_order: t.sort_order, is_active: t.is_active, avatar_file: null } }));
    };

    const handleSaveEdit = (id: number) => {
        const form = editForms[id];
        const fd = new FormData();
        fd.append('_method', 'POST');
        fd.append('name', form.name);
        fd.append('role', form.role);
        fd.append('quote', form.quote);
        fd.append('sort_order', form.sort_order);
        fd.append('is_active', form.is_active ? '1' : '0');
        if (form.avatar_file) fd.append('avatar_file', form.avatar_file);

        router.post(route('admin.testimonials.update', id), fd, {
            onSuccess: () => { setEditingId(null); setEditPreviews(p => ({ ...p, [id]: null })); }
        });
    };

    const handleAdd = () => {
        const fd = new FormData();
        fd.append('name', addForm.name);
        fd.append('role', addForm.role);
        fd.append('quote', addForm.quote);
        fd.append('sort_order', String(addForm.sort_order));
        fd.append('is_active', addForm.is_active ? '1' : '0');
        if (addForm.avatar_file) fd.append('avatar_file', addForm.avatar_file);

        router.post(route('admin.testimonials.store'), fd, {
            onSuccess: () => { setAddForm({ ...defaultForm }); setAddPreview(null); setShowAdd(false); }
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus testimonial ini?')) return;
        router.delete(route('admin.testimonials.destroy', id));
    };

    return (
        <div className="space-y-4">
            {/* List testimonials */}
            {testimonials.length === 0 && !showAdd && (
                <p className="text-sm text-gray-400 text-center py-4">Belum ada testimonial. Klik "+ Tambah" untuk menambahkan.</p>
            )}

            {testimonials.map((t) => (
                <div key={t.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    {editingId === t.id ? (
                        /* Edit Mode */
                        <div className="p-4 space-y-3 bg-yellow-50/30 dark:bg-yellow-900/10">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Nama</label>
                                    <input type="text" value={editForms[t.id]?.name || ''} onChange={e => setEditForms(p => ({ ...p, [t.id]: { ...p[t.id], name: e.target.value } }))} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Jabatan / Peran</label>
                                    <input type="text" value={editForms[t.id]?.role || ''} onChange={e => setEditForms(p => ({ ...p, [t.id]: { ...p[t.id], role: e.target.value } }))} className={inputClass} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Kutipan / Quote</label>
                                <textarea rows={3} value={editForms[t.id]?.quote || ''} onChange={e => setEditForms(p => ({ ...p, [t.id]: { ...p[t.id], quote: e.target.value } }))} className={textareaClass} />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className={labelClass}>Foto Profil</label>
                                    {(editPreviews[t.id] || t.avatar_path) && (
                                        <img src={editPreviews[t.id] || t.avatar_path || ''} alt="avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-[#ffc400]" />
                                    )}
                                    <input type="file" accept="image/*" className="text-xs text-gray-500" onChange={e => {
                                        const file = e.target.files?.[0] || null;
                                        setEditForms(p => ({ ...p, [t.id]: { ...p[t.id], avatar_file: file } }));
                                        if (file) { const r = new FileReader(); r.onload = ev => setEditPreviews(p => ({ ...p, [t.id]: ev.target?.result as string })); r.readAsDataURL(file); }
                                    }} />
                                </div>
                                <div>
                                    <label className={labelClass}>Urutan</label>
                                    <input type="number" value={editForms[t.id]?.sort_order || 0} onChange={e => setEditForms(p => ({ ...p, [t.id]: { ...p[t.id], sort_order: parseInt(e.target.value) } }))} className={inputClass + ' w-20'} />
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <input type="checkbox" id={`active-${t.id}`} checked={editForms[t.id]?.is_active ?? true} onChange={e => setEditForms(p => ({ ...p, [t.id]: { ...p[t.id], is_active: e.target.checked } }))} className="rounded" />
                                    <label htmlFor={`active-${t.id}`} className="text-xs text-gray-600 dark:text-gray-400">Aktif</label>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => handleSaveEdit(t.id)} className="flex items-center gap-1.5 bg-[#ffc400] text-gray-950 font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#ffb300] transition">
                                    <Check size={14} /> Simpan
                                </button>
                                <button type="button" onClick={() => setEditingId(null)} className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                    <X size={14} /> Batal
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* View Mode */
                        <div className="p-4 flex items-start gap-3">
                            <img
                                src={t.avatar_path || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=ffc400&color=111`}
                                alt={t.name}
                                className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-gray-200 dark:border-gray-700"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm text-gray-800 dark:text-white">{t.name}</p>
                                    {!t.is_active && <span className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded-full">Non-aktif</span>}
                                </div>
                                <p className="text-xs text-[#ffc400] font-medium">{t.role}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 italic">"{t.quote}"</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button type="button" onClick={() => startEdit(t)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-[#ffc400]/20 transition text-gray-600 dark:text-gray-400">
                                    <Edit3 size={14} />
                                </button>
                                <button type="button" onClick={() => handleDelete(t.id)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 transition text-gray-600 dark:text-gray-400">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Add New */}
            {showAdd ? (
                <div className="border-2 border-[#ffc400] rounded-xl p-4 space-y-3 bg-yellow-50/30 dark:bg-yellow-900/10">
                    <p className="text-xs font-bold text-[#ffc400] uppercase tracking-wide">Tambah Testimonial Baru</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Nama *</label>
                            <input type="text" value={addForm.name} onChange={e => setAddForm(p => ({ ...p, name: e.target.value }))} className={inputClass} placeholder="Ir. Bambang Wijaya" />
                        </div>
                        <div>
                            <label className={labelClass}>Jabatan / Peran</label>
                            <input type="text" value={addForm.role} onChange={e => setAddForm(p => ({ ...p, role: e.target.value }))} className={inputClass} placeholder="Kontraktor Elektrikal" />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Kutipan / Quote *</label>
                        <textarea rows={3} value={addForm.quote} onChange={e => setAddForm(p => ({ ...p, quote: e.target.value }))} className={textareaClass} placeholder="Voltama benar-benar meredefinisi standar keselamatan kelistrikan..." />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className={labelClass}>Foto Profil</label>
                            {addPreview && <img src={addPreview} alt="preview" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-[#ffc400]" />}
                            <input type="file" accept="image/*" className="text-xs text-gray-500" onChange={e => {
                                const file = e.target.files?.[0] || null;
                                setAddForm(p => ({ ...p, avatar_file: file }));
                                if (file) { const r = new FileReader(); r.onload = ev => setAddPreview(ev.target?.result as string); r.readAsDataURL(file); }
                            }} />
                        </div>
                        <div>
                            <label className={labelClass}>Urutan</label>
                            <input type="number" value={addForm.sort_order} onChange={e => setAddForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} className={inputClass + ' w-20'} />
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <input type="checkbox" id="add-active" checked={addForm.is_active} onChange={e => setAddForm(p => ({ ...p, is_active: e.target.checked }))} className="rounded" />
                            <label htmlFor="add-active" className="text-xs text-gray-600 dark:text-gray-400">Aktif</label>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={handleAdd} disabled={!addForm.name || !addForm.quote}
                            className="flex items-center gap-1.5 bg-[#ffc400] text-gray-950 font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#ffb300] transition disabled:opacity-50">
                            <Check size={14} /> Simpan Testimonial
                        </button>
                        <button type="button" onClick={() => { setShowAdd(false); setAddForm({ ...defaultForm }); setAddPreview(null); }}
                            className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                            <X size={14} /> Batal
                        </button>
                    </div>
                </div>
            ) : (
                <button type="button" onClick={() => setShowAdd(true)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl py-3 text-xs font-bold text-gray-500 hover:border-[#ffc400] hover:text-[#ffc400] transition">
                    <Plus size={16} /> Tambah Testimonial
                </button>
            )}
        </div>
    );
}

export default function SectionEditor({ settings, heroSlides, testimonials, success }: SectionEditorProps) {
    const { data, setData, post, processing } = useForm<Record<string, any>>({
        // Hero Slide Interval
        hero_slide_interval: settings.hero_slide_interval || '5',
        // Section 2 — Tentang
        section_tentang_heading: settings.section_tentang_heading || '',
        section_tentang_sub: settings.section_tentang_sub || '',
        section_tentang_desc: settings.section_tentang_desc || '',
        // Section 2 — 4 Stat Cards
        tentang_stat1_value: settings.tentang_stat1_value || '10+',
        tentang_stat1_label: settings.tentang_stat1_label || 'BERPENGALAMAN',
        tentang_stat1_sub: settings.tentang_stat1_sub || 'Lebih dari 10 tahun di industri kelistrikan',
        tentang_stat1_link: settings.tentang_stat1_link || '',
        tentang_stat2_value: settings.tentang_stat2_value || '34',
        tentang_stat2_label: settings.tentang_stat2_label || 'DISTRIBUSI',
        tentang_stat2_sub: settings.tentang_stat2_sub || 'Seluruh Indonesia',
        tentang_stat2_link: settings.tentang_stat2_link || '',
        tentang_stat3_value: settings.tentang_stat3_value || 'SNI',
        tentang_stat3_label: settings.tentang_stat3_label || 'KUALITAS TERJAMIN',
        tentang_stat3_sub: settings.tentang_stat3_sub || 'SNI & LMK',
        tentang_stat3_link: settings.tentang_stat3_link || '',
        tentang_stat4_value: settings.tentang_stat4_value || '10',
        tentang_stat4_label: settings.tentang_stat4_label || 'GARANSI PRODUK',
        tentang_stat4_sub: settings.tentang_stat4_sub || 'Hingga 10 Tahun',
        tentang_stat4_link: settings.tentang_stat4_link || '',
        // Section 2 — Overlay industri
        tentang_industri_judul: settings.tentang_industri_judul || 'Diproduksi dengan Teknologi Modern',
        tentang_industri_sub: settings.tentang_industri_sub || 'Di bawah pengawasan mutu ketat berstandar internasional',
        section_tentang_foto_pabrik_file: null,
        section_tentang_foto_industri_file: null,
        // Section 3 — Fitur
        section_features_heading: settings.section_features_heading || '',
        section_features_sub: settings.section_features_sub || '',
        section_features_desc: settings.section_features_desc || '',
        features_card1_title: settings.features_card1_title || 'Konduktor Tembaga Murni',
        features_card1_desc: settings.features_card1_desc || '',
        features_card2_title: settings.features_card2_title || 'Isolator PVC Tahan Panas',
        features_card2_desc: settings.features_card2_desc || '',
        features_card3_title: settings.features_card3_title || 'Garansi Mutu Bersertifikasi',
        features_card3_desc: settings.features_card3_desc || '',
        // Section 4 — Produk Cards
        section_produk_heading: settings.section_produk_heading || '',
        section_produk_sub: settings.section_produk_sub || '',
        section_produk_desc: settings.section_produk_desc || '',
        produk_btn1_text: settings.produk_btn1_text || 'Jelajahi Katalog',
        produk_btn2_text: settings.produk_btn2_text || 'Hubungi Sales',
        produk_card_kiri_label: settings.produk_card_kiri_label || 'PRODUK PREMIUM',
        produk_card_kiri_nama: settings.produk_card_kiri_nama || 'Kabel NYY Voltama',
        produk_card_kiri_desc: settings.produk_card_kiri_desc || '',
        produk_card_kanan_label: settings.produk_card_kanan_label || 'BEST SELLER',
        produk_card_kanan_nama: settings.produk_card_kanan_nama || 'Kabel NYM Voltama',
        produk_card_kanan_desc: settings.produk_card_kanan_desc || '',
        section_produk_card_kiri_file: null,
        section_produk_card_kanan_file: null,
        // Section 5 — Video
        section_video_heading: settings.section_video_heading || '',
        section_video_sub: settings.section_video_sub || '',
        section_video_desc: settings.section_video_desc || '',
        video_youtube_url: settings.video_youtube_url || '',
        video_durasi: settings.video_durasi || '02:45 Mins Video',
        video_checklist_1: settings.video_checklist_1 || '100% Konduktor Tembaga Murni untuk penyaluran arus optimal.',
        video_checklist_2: settings.video_checklist_2 || 'Isolator PVC Premium yang tahan api dan tidak merambatkan nyala api.',
        video_checklist_3: settings.video_checklist_3 || 'Sertifikasi Resmi SNI dari Lembaga Sertifikasi Produk independen.',
        video_checklist_4: settings.video_checklist_4 || 'Lolos uji ketat kebocoran tegangan tinggi di laboratorium uji.',
        video_dark_card1_title: settings.video_dark_card1_title || 'User-Centric Quality',
        video_dark_card1_desc: settings.video_dark_card1_desc || '',
        video_dark_card2_title: settings.video_dark_card2_title || 'Scalable Safety',
        video_dark_card2_desc: settings.video_dark_card2_desc || '',
        video_dark_card3_title: settings.video_dark_card3_title || 'Security-First Material',
        video_dark_card3_desc: settings.video_dark_card3_desc || '',
        video_dark_card4_title: settings.video_dark_card4_title || 'Innovation-Driven',
        video_dark_card4_desc: settings.video_dark_card4_desc || '',
        section_video_mockup_file: null,
        // Section 6 — Katalog
        section_katalog_heading: settings.section_katalog_heading || '',
        section_katalog_desc: settings.section_katalog_desc || '',
        // Section 7 — Promo
        section_promo_heading: settings.section_promo_heading || '',
        section_promo_desc: settings.section_promo_desc || '',
        section_promo_mockup_wa_file: null,
        // Section 8 — Testimonial
        section_testimonial_heading: settings.section_testimonial_heading || '',
        section_testimonial_desc: settings.section_testimonial_desc || '',
        // Section 9 — Artikel
        section_artikel_heading: settings.section_artikel_heading || '',
        section_artikel_desc: settings.section_artikel_desc || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.section-editor.update'), { forceFormData: true });
    };

    const txt = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData(key, e.target.value);
    const img = (key: string) => (file: File | null) => setData(key, file);

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-xs text-gray-400">Admin / <span className="text-gray-600">Editor Section</span></p>
                    <h2 className="text-lg font-bold text-gray-800 leading-tight">Editor Teks & Gambar Section</h2>
                </div>
            }
        >
            <Head title="Editor Section — Voltama Admin" />

            {success && (
                <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-3.5 text-sm text-emerald-700 font-medium flex items-center gap-2">
                    ✓ {success}
                </div>
            )}

            <div className="mb-6 bg-[#1a1e2e] rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#ffc400] rounded-xl flex items-center justify-center shrink-0">
                    <LayoutTemplate size={20} className="text-gray-900" />
                </div>
                <div>
                    <p className="text-sm font-bold text-white">Edit Teks & Gambar per Section</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Kosongkan field teks untuk menggunakan default. Gambar baru akan menggantikan gambar lama.
                        Klik <strong className="text-[#ffc400]">Simpan Semua</strong> di bawah setelah selesai.
                        Hero Slides & Testimonial tersimpan langsung tanpa perlu klik Simpan Semua.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* ==================== SECTION 1 — HERO SLIDER ==================== */}
                <SectionCard number="1" title="Hero — Image Slider / Banner" color="bg-gradient-to-r from-[#1a1e2e] to-[#2d3348]">
                    {/* Durasi Slide */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-[#ffc400]" />
                            <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Durasi Auto-Slide</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                min={1}
                                max={60}
                                value={data.hero_slide_interval}
                                onChange={txt('hero_slide_interval')}
                                className={inputClass + ' w-24 text-center font-black text-lg'}
                            />
                            <span className="text-sm text-gray-500">detik sebelum slide ke gambar berikutnya</span>
                        </div>
                    </div>

                    {/* Slide Manager (CRUD) */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Layers size={14} className="text-[#ffc400]" />
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Daftar Slide Banner</p>
                        </div>
                        <HeroSlideManager slides={heroSlides} slideInterval={data.hero_slide_interval} />
                    </div>
                </SectionCard>

                {/* ==================== SECTION 2 — TENTANG ==================== */}
                <SectionCard number="2" title="Tentang Voltama" color="bg-gradient-to-r from-gray-700 to-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Heading</label>
                                <input type="text" value={data.section_tentang_heading} onChange={txt('section_tentang_heading')} className={inputClass} placeholder="TENTANG VOLTAMA" />
                            </div>
                            <div>
                                <label className={labelClass}>Sub-heading (kuning)</label>
                                <input type="text" value={data.section_tentang_sub} onChange={txt('section_tentang_sub')} className={inputClass} placeholder="Keunggulan & Visi Kami" />
                            </div>
                            <div>
                                <label className={labelClass}>Deskripsi</label>
                                <textarea rows={3} value={data.section_tentang_desc} onChange={txt('section_tentang_desc')} className={textareaClass} placeholder="Voltama merupakan brand kabel listrik premium..." />
                            </div>

                            {/* 4 Stat Cards */}
                            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">4 Stat Card (angka statistik)</p>
                                {[1, 2, 3, 4].map(n => (
                                    <div key={n} className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b border-gray-100 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0">
                                        <div>
                                            <label className={labelClass}>Card {n} — Angka</label>
                                            <input type="text" value={data[`tentang_stat${n}_value`]} onChange={txt(`tentang_stat${n}_value`)} className={inputClass} placeholder={['10+', '34', 'SNI', '10'][n - 1]} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Label</label>
                                            <input type="text" value={data[`tentang_stat${n}_label`]} onChange={txt(`tentang_stat${n}_label`)} className={inputClass} placeholder={['BERPENGALAMAN', 'DISTRIBUSI', 'KUALITAS', 'GARANSI'][n - 1]} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Sub-label</label>
                                            <input type="text" value={data[`tentang_stat${n}_sub`]} onChange={txt(`tentang_stat${n}_sub`)} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Link Tautan</label>
                                            <input type="text" value={data[`tentang_stat${n}_link`] || ''} onChange={txt(`tentang_stat${n}_link`)} className={inputClass} placeholder="https://... atau /file-path" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Overlay teks foto industri */}
                            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Teks Overlay Foto Bawah</p>
                                <div>
                                    <label className={labelClass}>Judul</label>
                                    <input type="text" value={data.tentang_industri_judul} onChange={txt('tentang_industri_judul')} className={inputClass} placeholder="Diproduksi dengan Teknologi Modern" />
                                </div>
                                <div>
                                    <label className={labelClass}>Sub-judul</label>
                                    <input type="text" value={data.tentang_industri_sub} onChange={txt('tentang_industri_sub')} className={inputClass} placeholder="Di bawah pengawasan mutu ketat..." />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <ImageUploadField label="Foto Pabrik / Bangunan (kanan atas)" currentSrc={settings.section_tentang_foto_pabrik} fieldName="section_tentang_foto_pabrik_file" onChange={img('section_tentang_foto_pabrik_file')} />
                            <ImageUploadField label="Foto Industri / Pekerja (bawah)" hint="Banner panorama di bawah statistik" currentSrc={settings.section_tentang_foto_industri} fieldName="section_tentang_foto_industri_file" onChange={img('section_tentang_foto_industri_file')} />
                        </div>
                    </div>
                </SectionCard>

                {/* ==================== SECTION 3 — FITUR ==================== */}
                <SectionCard number="3" title="Fitur & Keunggulan (3 Kartu)" color="bg-gradient-to-r from-blue-700 to-blue-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                        <div>
                            <label className={labelClass}>Heading Atas</label>
                            <input type="text" value={data.section_features_heading} onChange={txt('section_features_heading')} className={inputClass} placeholder="Standarisasi Keamanan" />
                        </div>
                        <div>
                            <label className={labelClass}>Sub-heading (kuning)</label>
                            <input type="text" value={data.section_features_sub} onChange={txt('section_features_sub')} className={inputClass} placeholder="Maksimal Untuk Anda" />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Deskripsi</label>
                        <textarea rows={2} value={data.section_features_desc} onChange={txt('section_features_desc')} className={textareaClass} placeholder="Melalui riset dan teknologi produksi mutakhir..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {[1, 2, 3].map(n => (
                            <div key={n} className="border border-blue-100 dark:border-gray-700 rounded-xl p-4 space-y-3">
                                <p className="text-xs font-bold text-blue-500 uppercase">Kartu {n}</p>
                                <div>
                                    <label className={labelClass}>Judul</label>
                                    <input type="text" value={data[`features_card${n}_title`]} onChange={txt(`features_card${n}_title`)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Deskripsi</label>
                                    <textarea rows={3} value={data[`features_card${n}_desc`]} onChange={txt(`features_card${n}_desc`)} className={textareaClass} />
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* ==================== SECTION 4 — PRODUK CARDS ==================== */}
                <SectionCard number="4" title="Produk Cards (Dua Kartu Bersilang)" color="bg-gradient-to-r from-violet-700 to-violet-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-3">
                            <div>
                                <label className={labelClass}>Heading</label>
                                <input type="text" value={data.section_produk_heading} onChange={txt('section_produk_heading')} className={inputClass} placeholder="Solusi Kabel Handal" />
                            </div>
                            <div>
                                <label className={labelClass}>Sub-heading (kuning)</label>
                                <input type="text" value={data.section_produk_sub} onChange={txt('section_produk_sub')} className={inputClass} placeholder="Untuk Segala Kebutuhan" />
                            </div>
                            <div>
                                <label className={labelClass}>Deskripsi</label>
                                <textarea rows={2} value={data.section_produk_desc} onChange={txt('section_produk_desc')} className={textareaClass} placeholder="Dari kebutuhan instalasi rumah..." />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Tombol 1 (kuning)</label>
                                    <input type="text" value={data.produk_btn1_text} onChange={txt('produk_btn1_text')} className={inputClass} placeholder="Jelajahi Katalog" />
                                </div>
                                <div>
                                    <label className={labelClass}>Tombol 2 (gelap)</label>
                                    <input type="text" value={data.produk_btn2_text} onChange={txt('produk_btn2_text')} className={inputClass} placeholder="Hubungi Sales" />
                                </div>
                            </div>
                            {/* Kartu Kiri & Kanan */}
                            <div className="border border-violet-100 dark:border-gray-700 rounded-xl p-4 space-y-3">
                                <p className="text-xs font-bold text-violet-500 uppercase">Kartu Kiri (gelap)</p>
                                <div>
                                    <label className={labelClass}>Label Kecil</label>
                                    <input type="text" value={data.produk_card_kiri_label} onChange={txt('produk_card_kiri_label')} className={inputClass} placeholder="PRODUK PREMIUM" />
                                </div>
                                <div>
                                    <label className={labelClass}>Nama Produk</label>
                                    <input type="text" value={data.produk_card_kiri_nama} onChange={txt('produk_card_kiri_nama')} className={inputClass} placeholder="Kabel NYY Voltama" />
                                </div>
                                <div>
                                    <label className={labelClass}>Deskripsi Produk</label>
                                    <textarea rows={2} value={data.produk_card_kiri_desc} onChange={txt('produk_card_kiri_desc')} className={textareaClass} />
                                </div>
                            </div>
                            <div className="border border-violet-100 dark:border-gray-700 rounded-xl p-4 space-y-3">
                                <p className="text-xs font-bold text-violet-500 uppercase">Kartu Kanan (terang)</p>
                                <div>
                                    <label className={labelClass}>Label Kecil</label>
                                    <input type="text" value={data.produk_card_kanan_label} onChange={txt('produk_card_kanan_label')} className={inputClass} placeholder="BEST SELLER" />
                                </div>
                                <div>
                                    <label className={labelClass}>Nama Produk</label>
                                    <input type="text" value={data.produk_card_kanan_nama} onChange={txt('produk_card_kanan_nama')} className={inputClass} placeholder="Kabel NYM Voltama" />
                                </div>
                                <div>
                                    <label className={labelClass}>Deskripsi Produk</label>
                                    <textarea rows={2} value={data.produk_card_kanan_desc} onChange={txt('produk_card_kanan_desc')} className={textareaClass} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <ImageUploadField label="Gambar Produk Card Kiri (kartu gelap)" currentSrc={settings.section_produk_card_kiri} fieldName="section_produk_card_kiri_file" onChange={img('section_produk_card_kiri_file')} />
                            <ImageUploadField label="Gambar Produk Card Kanan (kartu terang)" currentSrc={settings.section_produk_card_kanan} fieldName="section_produk_card_kanan_file" onChange={img('section_produk_card_kanan_file')} />
                        </div>
                    </div>
                </SectionCard>

                {/* ==================== SECTION 5 — VIDEO ==================== */}
                <SectionCard number="5" title="Video & Keunggulan" color="bg-gradient-to-r from-teal-700 to-teal-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-3">
                            <div>
                                <label className={labelClass}>Heading</label>
                                <input type="text" value={data.section_video_heading} onChange={txt('section_video_heading')} className={inputClass} placeholder="Standarisasi Keamanan" />
                            </div>
                            <div>
                                <label className={labelClass}>Sub-heading (kuning)</label>
                                <input type="text" value={data.section_video_sub} onChange={txt('section_video_sub')} className={inputClass} placeholder="Tertinggi" />
                            </div>
                            <div>
                                <label className={labelClass}>Deskripsi</label>
                                <textarea rows={2} value={data.section_video_desc} onChange={txt('section_video_desc')} className={textareaClass} />
                            </div>
                            <div>
                                <label className={labelClass}>URL YouTube (klik tombol Play)</label>
                                <input type="url" value={data.video_youtube_url} onChange={txt('video_youtube_url')} className={inputClass} placeholder="https://www.youtube.com/watch?v=..." />
                                <p className="text-[10px] text-gray-400 mt-1">Jika diisi, klik play akan membuka YouTube di tab baru</p>
                            </div>
                            <div>
                                <label className={labelClass}>Label Durasi Video</label>
                                <input type="text" value={data.video_durasi} onChange={txt('video_durasi')} className={inputClass} placeholder="02:45 Mins Video" />
                            </div>

                            {/* Checklist */}
                            <div className="border border-teal-100 dark:border-gray-700 rounded-xl p-4 space-y-2">
                                <p className="text-xs font-bold text-teal-600 uppercase">4 Poin Checklist</p>
                                {[1, 2, 3, 4].map(n => (
                                    <div key={n}>
                                        <label className={labelClass}>Poin {n}</label>
                                        <input type="text" value={data[`video_checklist_${n}`]} onChange={txt(`video_checklist_${n}`)} className={inputClass} />
                                    </div>
                                ))}
                            </div>

                            {/* 4 Dark Cards */}
                            <div className="border border-teal-100 dark:border-gray-700 rounded-xl p-4 space-y-3">
                                <p className="text-xs font-bold text-teal-600 uppercase">4 Dark Card (bawah)</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[1, 2, 3, 4].map(n => (
                                        <div key={n} className="space-y-2">
                                            <div>
                                                <label className={labelClass}>Card {n} — Judul</label>
                                                <input type="text" value={data[`video_dark_card${n}_title`]} onChange={txt(`video_dark_card${n}_title`)} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Card {n} — Deskripsi</label>
                                                <textarea rows={2} value={data[`video_dark_card${n}_desc`]} onChange={txt(`video_dark_card${n}_desc`)} className={textareaClass} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <ImageUploadField
                            label="Thumbnail / Poster Video"
                            hint="Gambar yang tampil sebelum play diklik"
                            currentSrc={settings.section_video_mockup}
                            fieldName="section_video_mockup_file"
                            onChange={img('section_video_mockup_file')}
                        />
                    </div>
                </SectionCard>

                {/* ==================== SECTION 6 — KATALOG ==================== */}
                <SectionCard number="6" title="Katalog Produk" color="bg-gradient-to-r from-orange-600 to-orange-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Heading</label>
                            <input type="text" value={data.section_katalog_heading} onChange={txt('section_katalog_heading')} className={inputClass} placeholder="Jelajahi Produk Terbaik" />
                        </div>
                        <div>
                            <label className={labelClass}>Deskripsi</label>
                            <input type="text" value={data.section_katalog_desc} onChange={txt('section_katalog_desc')} className={inputClass} placeholder="Lihat detail spesifikasi teknis..." />
                        </div>
                    </div>
                </SectionCard>

                {/* ==================== SECTION 7 — PROMO ==================== */}
                <SectionCard number="7" title="Promo / CTA (Section Kuning)" color="bg-gradient-to-r from-[#e6ac00] to-[#ffc400]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-3">
                            <div>
                                <label className={labelClass + ' !text-yellow-900'}>Heading</label>
                                <input type="text" value={data.section_promo_heading} onChange={txt('section_promo_heading')} className={inputClass} placeholder="Hubungi Layanan Sales atau Beli Online" />
                            </div>
                            <div>
                                <label className={labelClass + ' !text-yellow-900'}>Deskripsi</label>
                                <textarea rows={2} value={data.section_promo_desc} onChange={txt('section_promo_desc')} className={textareaClass} placeholder="Kabel Voltama kini tersedia secara resmi..." />
                            </div>
                        </div>
                        <ImageUploadField
                            label="Gambar Mockup WA / Promo (kanan)"
                            hint="Gambar tangan pegang HP di section kuning"
                            currentSrc={settings.section_promo_mockup_wa}
                            fieldName="section_promo_mockup_wa_file"
                            onChange={img('section_promo_mockup_wa_file')}
                        />
                    </div>
                </SectionCard>

                {/* ==================== SECTION 8 — TESTIMONIAL (CRUD) ==================== */}
                <SectionCard number="8" title="Testimonial / Review (CRUD)" color="bg-gradient-to-r from-rose-700 to-rose-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                        <div>
                            <label className={labelClass}>Heading Section</label>
                            <input type="text" value={data.section_testimonial_heading} onChange={txt('section_testimonial_heading')} className={inputClass} placeholder="Apa Kata Pelanggan Kami" />
                        </div>
                        <div>
                            <label className={labelClass}>Deskripsi</label>
                            <input type="text" value={data.section_testimonial_desc} onChange={txt('section_testimonial_desc')} className={inputClass} placeholder="Ribuan pelanggan telah mempercayai Voltama..." />
                        </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Daftar Testimonial</p>
                        <TestimonialManager testimonials={testimonials} />
                    </div>
                </SectionCard>

                {/* ==================== SECTION 9 — ARTIKEL ==================== */}
                <SectionCard number="9" title="Artikel & Edukasi" color="bg-gradient-to-r from-emerald-700 to-emerald-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Heading</label>
                            <input type="text" value={data.section_artikel_heading} onChange={txt('section_artikel_heading')} className={inputClass} placeholder="Artikel & Tips Kelistrikan" />
                        </div>
                        <div>
                            <label className={labelClass}>Deskripsi</label>
                            <input type="text" value={data.section_artikel_desc} onChange={txt('section_artikel_desc')} className={inputClass} placeholder="Informasi informatif seputar kelistrikan..." />
                        </div>
                    </div>
                </SectionCard>

                {/* Sticky Submit */}
                <div className="sticky bottom-4 z-10">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between gap-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Perubahan teks & gambar akan langsung diterapkan ke website.
                        </p>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 bg-[#1a1e2e] hover:bg-[#ffc400] hover:text-gray-900 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 shrink-0 shadow-lg"
                        >
                            <Save size={16} />
                            {processing ? 'Menyimpan...' : 'Simpan Semua'}
                        </button>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
