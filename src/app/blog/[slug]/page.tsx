import { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));

const articles: Record<string, { title: string; content: string; category: string; date: string; emoji: string }> = {
  "travel-bali-terbaik": {
    title: "10 Destinasi Travel Bali Terbaik 2026",
    content: "Bali merupakan salah satu destinasi wisata terpopuler di dunia. Pulau dewata ini menawarkan keindahan alam, budaya yang kaya, dan pengalaman tak terlupakan.\n\n1. Ubud - Pusat seni dan budaya Bali\n2. Kuta Beach - Pantai ikonik dengan sunset memukau\n3. Tanah Lot - Pura di atas batu karang\n4. Uluwatu - Tebing dramatis dengan pemandangan samudera\n5. Nusa Penida - Pulau eksotis instagramable\n6. Seminyak - Kawasan premium beach club\n7. Tegallalang - Rice terrace terbaik\n8. Lempuyang - Gates of Heaven viral\n9. Jimbaran - Seafood dinner pinggir pantai\n10. Tirta Empul - Pura air suci spiritual",
    category: "Travel",
    date: "28 Juli 2026",
    emoji: "🏝️",
  },
  "wisata-bromo-guide": {
    title: "Panduan Lengkap Sunrise Tour Bromo",
    content: "Gunung Bromo adalah destinasi wisata paling populer di Jawa Timur. Dengan ketinggian 2.329 meter, Bromo menawarkan pemandangan sunrise spektakuler.\n\nTips:\n- Berangkat pukul 03:00 WIB\n- Gunakan jeep 4WD ke viewpoint\n- Bawa jaket tebal (suhu 5°C)\n- Siapkan kamera baterai penuh\n\nmcTour menyediakan paket lengkap termasuk semua biaya dan akomodasi.",
    category: "Wisata",
    date: "25 Juli 2026",
    emoji: "🌋",
  },
  "gathering-perusahaan-sukses": {
    title: "Tips Gathering Perusahaan yang Sukses",
    content: "Gathering perusahaan adalah momen penting untuk mempererat hubungan antar karyawan.\n\n1. Tentukan Tujuan Gathering\n2. Pilih Lokasi yang Tepat\n3. Buat Rundown Matang\n4. Siapkan Ice Breaking\n5. Pertimbangkan Budget\n6. Gunakan Jasa Profesional\n7. Dokumentasi\n8. Evaluasi feedback",
    category: "Event",
    date: "22 Juli 2026",
    emoji: "🏢",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Tidak Ditemukan" };
  return {
    title: article.title,
    description: article.content.substring(0, 155),
    openGraph: { title: article.title, type: "article" },
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
      <AppShell>
        <TopBar />
        <div className="px-4 pt-20 text-center">
          <p className="text-lg font-bold text-dark-text">Artikel tidak ditemukan</p>
          <Link href="/blog" className="btn-primary inline-block mt-4 text-sm">Kembali</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar />
      <article className="px-4 pt-4 pb-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] text-muted mb-4">
          <Link href="/" className="active:text-primary">Home</Link>
          <span>/</span>
          <Link href="/blog" className="active:text-primary">Blog</Link>
          <span>/</span>
          <span className="text-dark-text/70 truncate">{article.title}</span>
        </nav>

        {/* Image */}
        <div className="w-full h-44 rounded-3xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-5">
          <span className="text-6xl opacity-40">{article.emoji}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-bold">
            {article.category}
          </span>
          <span className="text-[11px] text-muted">{article.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4">
          {article.title}
        </h1>

        {/* Content */}
        <div className="text-sm text-dark-text/70 leading-relaxed whitespace-pre-line">
          {article.content}
        </div>

        {/* CTA */}
        <div className="glass-card p-5 text-center mt-8">
          <p className="text-sm font-bold text-dark-text mb-1">Tertarik?</p>
          <p className="text-[11px] text-muted mb-3">Hubungi kami untuk info lengkap</p>
          <a
            href="https://wa.me/62818548833"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm w-full"
          >
            Chat WhatsApp
          </a>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-5 active:opacity-70"
        >
          ← Kembali ke Blog
        </Link>
      </article>
    </AppShell>
  );
}
