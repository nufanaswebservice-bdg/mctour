import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tiket Pesawat - Booking Tiket Murah Domestik & Internasional",
  description:
    "Booking tiket pesawat murah domestik dan internasional. Semua maskapai tersedia dengan harga kompetitif. Pesan sekarang via WhatsApp.",
};

export default function TiketPesawatPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4">
          Tiket <span className="gradient-text">Pesawat</span>
        </h1>
        <p className="text-lg text-dark-text/60 mb-8">
          Booking tiket pesawat domestik & internasional dengan harga terbaik.
          Semua maskapai tersedia.
        </p>
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="text-left">
              <label className="text-sm text-dark-text/60 block mb-1">Dari</label>
              <div className="p-3 rounded-xl bg-white/50 border border-primary/10 text-dark-text/80 text-sm">
                Jakarta (CGK)
              </div>
            </div>
            <div className="text-left">
              <label className="text-sm text-dark-text/60 block mb-1">Ke</label>
              <div className="p-3 rounded-xl bg-white/50 border border-primary/10 text-dark-text/80 text-sm">
                Bali (DPS)
              </div>
            </div>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo%20mcTour%2C%20saya%20ingin%20booking%20tiket%20pesawat."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full block text-center"
          >
            Cek Harga via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
