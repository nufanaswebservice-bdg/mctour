"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const articles = [
  { slug: "travel-bali-terbaik", title: "10 Destinasi Travel Bali Terbaik 2026", category: "Travel", date: "28 Jul", emoji: "🏝️" },
  { slug: "wisata-bromo-guide", title: "Panduan Lengkap Sunrise Bromo", category: "Wisata", date: "25 Jul", emoji: "🌋" },
  { slug: "gathering-perusahaan-sukses", title: "Tips Gathering Perusahaan Sukses", category: "Event", date: "22 Jul", emoji: "🏢" },
  { slug: "tips-liburan-keluarga", title: "Tips Liburan Keluarga Hemat", category: "Tips", date: "20 Jul", emoji: "👨‍👩‍👧‍👦" },
  { slug: "paket-umroh-terbaik", title: "Memilih Paket Umroh Terbaik", category: "Umroh", date: "18 Jul", emoji: "🕋" },
  { slug: "wisata-jogja-murah", title: "15 Spot Instagramable Jogja", category: "Wisata", date: "15 Jul", emoji: "🏯" },
];

export default function BlogList() {
  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Blog & <span className="gradient-text">Artikel</span>
      </h1>
      <p className="text-sm text-muted mb-5">Tips dan inspirasi perjalanan</p>

      <div className="space-y-3">
        {articles.map((article, i) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
          >
            <Link
              href={`/blog/${article.slug}`}
              className="glass-card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform block"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                <span className="text-2xl">{article.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-semibold text-primary">{article.category}</span>
                  <span className="text-[10px] text-muted">{article.date}</span>
                </div>
                <h2 className="text-sm font-semibold text-dark-text truncate">{article.title}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
