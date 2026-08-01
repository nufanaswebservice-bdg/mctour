import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary/20 font-[family-name:var(--font-heading)]">
          404
        </h1>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mt-4 mb-2">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-dark-text/60 mb-8">
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
