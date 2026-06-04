import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#ffc400] pt-6 sm:justify-center sm:pt-0">
            {/* Logo Voltama */}
            <div className="mb-2">
                <Link href="/" className="flex items-center justify-center">
                    <img
                        src="/images/logo.png"
                        alt="Voltama"
                        className="h-24 w-auto object-contain drop-shadow-md"
                    />
                </Link>
            </div>

            {/* Label brand kecil di bawah logo */}
            <p className="mb-6 text-xs font-bold tracking-widest uppercase text-[#7a5c00] opacity-70">
                Admin Panel
            </p>

            {/* Card form */}
            <div className="w-full overflow-hidden bg-white px-8 py-8 shadow-2xl sm:max-w-md sm:rounded-2xl">
                {children}
            </div>

            {/* Footer kecil */}
            <p className="mt-6 text-xs text-[#7a5c00] opacity-60">
                © {new Date().getFullYear()} Voltama. Kabel Listrik SNI Premium.
            </p>
        </div>
    );
}
