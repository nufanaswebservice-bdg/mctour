"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

const articles = [
  { slug: "travel-bali-terbaik", title: "10 Destinasi Travel Bali Terbaik 2026", excerpt: "Panduan lengkap wisata Bali terbaik untuk liburan keluarga maupun honeymoon.", category: "Travel", date: "28 Jul 2026" },
  { slug: "wisata-bromo-guide", title: "Wisata Bromo: Panduan Lengkap Sunrise Tour", excerpt: "Tips dan trik menikmati sunrise di Gunung Bromo dengan pengalaman terbaik.", category: "Wisata", date: "25 Jul 2026" },
  { slug: "wisata-dieng", title: "Wisata Dieng: Negeri di Atas Awan", excerpt: "Eksplorasi keindahan Dataran Tinggi Dieng yang memukau dengan sunrise goldennya.", category: "Wisata", date: "23 Jul 2026" },
  { slug: "wisata-jogja-murah", title: "Wisata Jogja Murah: 15 Spot Instagramable", excerpt: "Rekomendasi tempat wisata Jogja yang murah meriah tapi tetap aesthetic.", category: "Wisata", date: "20 Jul 2026" },
  { slug: "harga-tiket-pesawat", title: "Tips Mendapatkan Harga Tiket Pesawat Murah", excerpt: "Strategi jitu booking tiket pesawat dengan harga termurah.", category: "Tips Liburan", date: "18 Jul 2026" },
  { slug: "paket-umroh-terbaik", title: "Panduan Memilih Paket Umroh Terbaik 2026", excerpt: "Hal-hal yang perlu diperhatikan saat memilih travel umroh terpercaya.", category: "Umroh", date: "15 Jul 2026" },
  { slug: "gathering-perusahaan-sukses", title: "Tips Gathering Perusahaan yang Sukses & Berkesan", excerpt: "Bagaimana merencanakan gathering perusahaan yang berkesan dan efektif.", category: "Event Organizer", date: "12 Jul 2026" },
  { slug: "tips-liburan-keluarga", title: "Tips Liburan Keluarga Hemat tapi Mewah", excerpt: "Rahasia liburan keluarga berkualitas tanpa menguras dompet.", category: "Tips Liburan", date: "10 Jul 2026" },
];

export default function BlogListContent() {
  return (
    <div className="pt-24 pb-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4"
          >
            Blog & <span className="gradient-text">Artikel</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-text/60"
          >
            Tips, panduan, dan inspirasi perjalanan terbaik dari mcTour & Travel
          </motion.p>
        </div>
      </section>

      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                <span className="text-4xl opacity-50">📝</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-dark-text/40">{article.date}</span>
                </div>
                <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-dark-text mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-dark-text/50 line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Baca Selengkapnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
