import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumen Perjalanan - Paspor, Visa, KITAS",
  description:
    "Jasa pengurusan dokumen perjalanan: paspor, visa, KITAS, dan dokumen travel lainnya. Proses cepat dan terpercaya.",
};

const documents = [
  { icon: "📕", title: "Paspor", desc: "Pembuatan & perpanjangan paspor baru", time: "3-5 hari kerja" },
  { icon: "📋", title: "Visa", desc: "Pengurusan visa ke berbagai negara", time: "5-14 hari kerja" },
  { icon: "🪪", title: "KITAS", desc: "Izin tinggal terbatas untuk WNA", time: "7-21 hari kerja" },
  { icon: "📄", title: "Dokumen Travel", desc: "Surat-surat perjalanan lainnya", time: "Bervariasi" },
];

export default function DokumenPerjalananPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4">
          Dokumen <span className="gradient-text">Perjalanan</span>
        </h1>
        <p className="text-lg text-dark-text/60 mb-12">
          Kami membantu pengurusan seluruh dokumen perjalanan Anda dengan proses
          cepat dan terpercaya.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div key={doc.title} className="glass-card p-6 text-left">
              <div className="text-3xl mb-3">{doc.icon}</div>
              <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
                {doc.title}
              </h2>
              <p className="text-sm text-dark-text/60 mb-2">{doc.desc}</p>
              <p className="text-xs text-primary font-medium">⏱ {doc.time}</p>
            </div>
          ))}
        </div>

        <a
          href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20butuh%20bantuan%20pengurusan%20dokumen."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-block mt-10"
        >
          Konsultasi Dokumen via WhatsApp
        </a>
      </section>
    </div>
  );
}
