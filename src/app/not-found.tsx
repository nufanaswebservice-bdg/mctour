import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary/15 font-[family-name:var(--font-heading)]">404</p>
        <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text mt-3 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-muted mb-6">Halaman yang Anda cari tidak tersedia.</p>
        <Link href="/" className="btn-primary text-sm">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
