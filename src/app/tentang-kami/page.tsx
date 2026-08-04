import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "mcTour and Travel adalah perusahaan biro perjalanan wisata di bawah naungan PT. Maheswara Cahya Abadi (MCA). Melayani tour domestik, internasional, tiket pesawat, hotel, umroh, haji, dan dokumen perjalanan.",
};

export default function TentangKamiPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Tentang <span className="gradient-text">Kami</span>
        </h1>
        <p className="text-sm text-muted mb-6">PT. Maheswara Cahya Abadi (MCA)</p>

        <div className="space-y-4">
          {/* Main Description */}
          <div className="glass-card p-5">
            <div className="space-y-3 text-sm text-dark-text/70 leading-relaxed">
              <p>
                <strong className="text-dark-text">mcTour and Travel</strong> adalah sebuah perusahaan yang bergerak dalam bidang usaha biro perjalanan wisata yang melayani berbagai tujuan wisata baik dalam maupun luar negeri untuk perorangan, group dan insentive tour.
              </p>
              <p>
                Perusahaan kami berada di bawah naungan <strong className="text-dark-text">PT. Maheswara Cahya Abadi (MCA)</strong>.
              </p>
              <p>
                mcTour and Travel juga melayani online booking untuk Tiket Pesawat dan Voucher Hotel International dan Domestik, Umroh dan Haji, Asuransi Perjalanan serta Dokumen Perjalanan seperti Visa dan Pasport.
              </p>
              <p>
                Kami senantiasa menempatkan nilai dan layanan berkualitas tinggi sebagai prioritas pertama karena kami ingin memberikan yang terbaik untuk Anda. Adalah tujuan kami untuk selalu memenuhi dan melampaui harapan anda terhadap sebuah biro perjalanan wisata.
              </p>
              <p>
                Kami akan membuat penawaran paket wisata anda sesuai dengan anggaran dan waktu yang Anda miliki. Anda juga mendapatkan informasi yang lebih lengkap mengenai daerah tujuan anda, pertunjukan budaya dan makanan khas daerah tersebut.
              </p>
              <p className="font-medium text-dark-text">
                Kami berharap kami dapat menjadi mitra terbaik perjalanan wisata anda.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">15+</p>
              <p className="text-[11px] text-muted">Tahun Pengalaman</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">10K+</p>
              <p className="text-[11px] text-muted">Pelanggan Puas</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">250+</p>
              <p className="text-[11px] text-muted">Gathering Sukses</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">4.9/5</p>
              <p className="text-[11px] text-muted">Rating</p>
            </div>
          </div>

          {/* Services */}
          <div className="glass-card p-5">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-dark-text mb-3">Layanan Kami</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                "✈️ Tiket Pesawat",
                "🏨 Voucher Hotel",
                "🏝️ Paket Tour Domestik",
                "🌍 Paket Tour Internasional",
                "🏢 Gathering & Event",
                "🕋 Umroh & Haji",
                "📄 Visa & Pasport",
                "🛡️ Asuransi Perjalanan",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs text-dark-text/70">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="glass-card p-5">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-dark-text mb-3">📍 Kantor Kami</h2>
            <p className="text-sm text-dark-text/70 leading-relaxed">
              Mall Ambasador, Jl. Prof. DR. Satrio Lantai LG Blok A69, RT.11/RW.4, Kuningan, Karet Kuningan, Kec. Setiabudi, Kota Jakarta Selatan, DKI Jakarta 12940
            </p>
            <div className="mt-3 space-y-1.5 text-sm text-dark-text/70">
              <p>📱 WhatsApp: <a href="https://wa.me/62818548833" className="text-primary font-medium">0818-548-833</a></p>
              <p>🕐 Senin - Sabtu, 08:00 - 20:00 WIB</p>
            </div>
          </div>
        </div>
      </div>
      <CTABanner />
    </AppShell>
  );
}
