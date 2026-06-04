import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import React, { FormEvent, useRef } from 'react';
import { Plus, Trash2, Upload, Award } from 'lucide-react';

interface Certification {
    name: string;
    logo: string;
}

interface CertificationsProps {
    certifications: Certification[];
    success: string | null;
}

export default function Certifications({ certifications, success }: CertificationsProps) {
    const logoInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        logo_file: null as File | null,
    });

    const logoPreview = data.logo_file ? URL.createObjectURL(data.logo_file) : null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.certifications.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (logoInputRef.current) logoInputRef.current.value = '';
            }
        });
    };

    const handleDelete = (index: number, name: string) => {
        if (confirm(`Hapus sertifikasi "${name}"?`)) {
            router.delete(route('admin.certifications.destroy', index));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-xs text-gray-400">Pages / <span className="text-gray-600">Sertifikasi</span></p>
                    <h2 className="text-lg font-bold text-gray-800 leading-tight">Kelola Sertifikasi</h2>
                </div>
            }
        >
            <Head title="Kelola Sertifikasi — Voltama Admin" />

            {success && (
                <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-3.5 text-sm text-emerald-700 font-medium flex items-center gap-2">
                    ✓ {success}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ===== FORM TAMBAH SERTIFIKASI ===== */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-9 h-9 bg-[#ffc400] rounded-xl flex items-center justify-center">
                                <Plus size={18} className="text-gray-900" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">Tambah Sertifikasi</h3>
                                <p className="text-xs text-gray-400">SNI, LMK, KAN, ISO, dll.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nama Sertifikasi */}
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama Sertifikasi</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="SNI (Standar Nasional Indonesia)"
                                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#ffc400] focus:ring-1 focus:ring-[#ffc400] transition"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            {/* Upload Logo */}
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5">Logo Sertifikasi</label>
                                {logoPreview && (
                                    <div className="mb-2 p-2 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex justify-center">
                                        <img src={logoPreview} alt="Preview" className="h-14 object-contain" />
                                    </div>
                                )}
                                <label className="flex flex-col items-center gap-2 w-full rounded-xl border-2 border-dashed border-gray-200 px-4 py-4 cursor-pointer hover:border-[#ffc400] hover:bg-yellow-50/50 transition text-center">
                                    <Upload size={18} className="text-gray-400" />
                                    <span className="text-xs text-gray-500">Klik untuk upload logo</span>
                                    <span className="text-[10px] text-gray-400">JPG, PNG, SVG, WEBP (maks. 4MB)</span>
                                    <input
                                        ref={logoInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setData('logo_file', e.target.files ? e.target.files[0] : null)}
                                    />
                                </label>
                                {errors.logo_file && <p className="mt-1 text-xs text-red-500">{errors.logo_file}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 bg-[#1a1e2e] hover:bg-[#ffc400] hover:text-gray-900 text-white font-bold text-sm py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
                            >
                                <Plus size={16} />
                                {processing ? 'Menyimpan...' : 'Tambah Sertifikasi'}
                            </button>
                        </form>
                    </div>

                    {/* Info Card */}
                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-700 space-y-1.5">
                        <p className="font-bold text-blue-800">ℹ️ Info Penggunaan</p>
                        <p>Logo-logo sertifikasi ini akan tampil di bagian <strong>Footer</strong> website.</p>
                        <p>Untuk estetika terbaik, gunakan gambar logo yang terpotong rapi dengan latar belakang transparan.</p>
                    </div>
                </div>

                {/* ===== DAFTAR SERTIFIKASI ===== */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">Daftar Sertifikasi Resmi</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{certifications.length} logo terdaftar</p>
                            </div>
                            <div className="bg-[#ffc400]/10 text-[#ffc400] text-xs font-bold px-3 py-1.5 rounded-full">
                                {certifications.length} Aktif
                            </div>
                        </div>

                        {certifications.length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <Award size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="text-sm font-medium">Belum ada logo sertifikasi yang ditambahkan.</p>
                                <p className="text-xs mt-1">Tambah sertifikasi pertama Anda menggunakan form di sebelah kiri.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition group">
                                        {/* Logo */}
                                        <div className="w-16 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                                            <img
                                                src={cert.logo}
                                                alt={cert.name}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-gray-800 text-sm">{cert.name}</div>
                                            <div className="text-xs text-gray-400 truncate mt-0.5">{cert.logo}</div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => handleDelete(index, cert.name)}
                                                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                                                title="Hapus sertifikasi"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Preview cara tampil di website */}
                    {certifications.length > 0 && (
                        <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Preview — Tampil di Footer</p>
                            <div className="flex flex-wrap gap-4 items-center bg-gray-950 p-4 rounded-2xl">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="inline-block">
                                        <img src={cert.logo} alt={cert.name} className="h-10 w-auto object-contain bg-white rounded-lg p-1.5 shadow-sm" title={cert.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
