"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Link from "next/link";
import { Shield, LogIn } from "lucide-react";

// Email yang diizinkan akses admin
const ADMIN_EMAILS = [
  "nufanaswebservice@gmail.com",
  // Tambahkan email admin lain di sini
];

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  // Loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-3 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Memeriksa akses...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Akses Ditolak</h1>
          <p className="text-sm text-gray-500 mb-6">
            Anda harus login terlebih dahulu untuk mengakses Admin Dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <LogIn size={16} />
            Login
          </Link>
        </div>
      </div>
    );
  }

  // Logged in but not admin
  if (!ADMIN_EMAILS.includes(session.user.email || "")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-amber-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Tidak Punya Izin</h1>
          <p className="text-sm text-gray-500 mb-2">
            Akun <strong>{session.user.email}</strong> tidak memiliki akses admin.
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Hubungi administrator untuk mendapatkan akses.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-300 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // Admin authorized
  return <>{children}</>;
}
