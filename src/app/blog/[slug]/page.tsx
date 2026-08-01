import { Metadata } from "next";
import Link from "next/link";

const articles: Record<string, { title: string; content: string; category: string; date: string }> = {
  "travel-bali-terbaik": {
    title: "10 Destinasi Travel Bali Terbaik 2026",
    content: "Bali merupakan salah satu destinasi wisata terpopuler di dunia. Pulau dewata ini menawarkan keindahan alam, budaya yang kaya, dan pengalaman yang tak terlupakan. Berikut adalah 10 destinasi terbaik di Bali yang wajib Anda kunjungi bersama mcTour & Travel.\n\n1. Ubud - Pusat seni dan budaya Bali dengan sawah terasering yang menakjubkan.\n2. Kuta Beach - Pantai ikonik dengan sunset yang memukau.\n3. Tanah Lot - Pura di atas batu karang di tengah laut.\n4. Uluwatu - Tebing dramatis dengan pemandangan samudera.\n5. Nusa Penida - Pulau eksotis dengan spot foto instagramable.\n6. Seminyak - Kawasan premium dengan beach club terbaik.\n7. Tegallalang - Rice terrace terbaik untuk foto.\n8. Lempuyang - Gates of Heaven yang viral.\n9. Jimbaran - Seafood dinner di pinggir pantai.\n10. Tirta Empul - Pura air suci untuk pengalaman spiritual.",
    category: "Travel",
    date: "28 Juli 2026",
  },
  "wisata-bromo-guide": {
    title: "Wisata Bromo: Panduan Lengkap Sunrise Tour",
    content: "Gunung Bromo adalah salah satu destinasi wisata paling populer di Jawa Timur. Dengan ketinggian 2.329 meter, Bromo menawarkan pemandangan sunrise yang spektakuler dan lautan pasir yang unik.\n\nTips Sunrise Tour:\n- Berangkat dari penginapan sekitar pukul 03:00-03:30 WIB\n- Gunakan jeep 4WD untuk menuju viewpoint\n- Bawa jaket tebal karena suhu bisa mencapai 5°C\n- Siapkan kamera dengan baterai penuh\n- Setelah sunrise, lanjutkan ke kawah Bromo\n\nBiaya yang perlu disiapkan:\n- Tiket masuk: Rp 220.000 (wisatawan domestik)\n- Sewa jeep: Rp 600.000-800.000 per jeep\n- Sewa kuda: Rp 100.000\n\nmcTour & Travel menyediakan paket lengkap Bromo Sunrise yang sudah termasuk semua biaya dan akomodasi.",
    category: "Wisata",
    date: "25 Juli 2026",
  },
  "gathering-perusahaan-sukses": {
    title: "Tips Gathering Perusahaan yang Sukses & Berkesan",
    content: "Gathering perusahaan merupakan momen penting untuk mempererat hubungan antar karyawan dan meningkatkan semangat kerja tim. Berikut tips agar gathering perusahaan Anda sukses dan berkesan.\n\n1. Tentukan Tujuan Gathering - Apakah untuk team building, reward, atau bonding?\n2. Pilih Lokasi yang Tepat - Sesuaikan dengan jumlah peserta dan aktivitas.\n3. Buat Rundown yang Matang - Kegiatan yang terstruktur namun fleksibel.\n4. Siapkan Aktivitas Ice Breaking - Games dan aktivitas yang melibatkan semua peserta.\n5. Pertimbangkan Budget - Transparansi biaya sejak awal perencanaan.\n6. Gunakan Jasa Profesional - Event organizer berpengalaman seperti mcTour & Travel.\n7. Dokumentasi - Abadikan momen-momen penting.\n8. Evaluasi - Kumpulkan feedback setelah acara.",
    category: "Event Organizer",
    date: "22 Juli 2026",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return {
    title: article.title,
    description: article.content.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="pt-24 pb-20 text-center">
        <h1 className="text-2xl font-bold text-dark-text mt-20">Artikel Tidak Ditemukan</h1>
        <Link href="/blog" className="btn-primary inline-block mt-6">
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: "2026-07-28",
    author: { "@type": "Organization", name: "mcTour & Travel" },
    publisher: {
      "@type": "Organization",
      name: "mcTour & Travel",
      logo: { "@type": "ImageObject", url: "https://mctourtravel.com/logo.png" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="pt-24 pb-20 max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-text/50 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <span>/</span>
          <span className="text-dark-text/70">{article.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {article.category}
            </span>
            <span className="text-sm text-dark-text/50">{article.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-dark-text">
            {article.title}
          </h1>
        </div>

        {/* Image placeholder */}
        <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center mb-8">
          <span className="text-6xl opacity-30">📸</span>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-dark-text/70 leading-relaxed whitespace-pre-line">
          {article.content}
        </div>

        {/* CTA */}
        <div className="mt-12 glass-card p-6 text-center">
          <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-2">
            Tertarik dengan perjalanan ini?
          </p>
          <p className="text-sm text-dark-text/60 mb-4">
            Hubungi kami untuk informasi lengkap dan penawaran terbaik.
          </p>
          <a
            href="https://wa.me/62818548833"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block"
          >
            Hubungi via WhatsApp
          </a>
        </div>

        {/* Back */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="text-primary font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Blog
          </Link>
        </div>
      </article>
    </>
  );
}
