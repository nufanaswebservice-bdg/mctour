"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutContent() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4"
          >
            Tentang <span className="gradient-text">mcTour & Travel</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-text/60 max-w-2xl mx-auto"
          >
            Lebih dari 15 tahun berpengalaman melayani kebutuhan perjalanan wisata,
            gathering perusahaan, dan event organizer di seluruh Indonesia.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4">
              Perjalanan Kami
            </h2>
            <div className="space-y-4 text-dark-text/60 leading-relaxed">
              <p>
                mcTour & Travel didirikan dengan visi menjadi mitra perjalanan
                terpercaya bagi masyarakat Indonesia. Berawal dari kecintaan terhadap
                dunia pariwisata, kami tumbuh menjadi perusahaan travel yang melayani
                ribuan pelanggan setiap tahunnya.
              </p>
              <p>
                Dengan tim profesional yang berpengalaman, armada transportasi
                berkualitas, dan jaringan partnership yang luas, kami berkomitmen
                memberikan layanan perjalanan terbaik dengan harga yang kompetitif.
              </p>
              <p>
                Kepuasan pelanggan adalah prioritas utama kami. Setiap perjalanan
                dirancang dengan detail untuk memastikan pengalaman yang tak terlupakan.
              </p>
            </div>
          </div>
          <div className="glass-card p-8 text-center">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">15+</p>
                <p className="text-sm text-dark-text/50">Tahun Berpengalaman</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">10K+</p>
                <p className="text-sm text-dark-text/50">Pelanggan Puas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">250+</p>
                <p className="text-sm text-dark-text/50">Gathering Sukses</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">4.9</p>
                <p className="text-sm text-dark-text/50">Rating Pelanggan</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Visi Misi */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4">
              🎯 Visi
            </h3>
            <p className="text-dark-text/60 leading-relaxed">
              Menjadi perusahaan travel terdepan di Indonesia yang memberikan
              pengalaman perjalanan berkualitas dengan pelayanan prima dan harga
              terjangkau untuk semua kalangan.
            </p>
          </div>
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4">
              🚀 Misi
            </h3>
            <ul className="space-y-2 text-dark-text/60">
              <li className="flex gap-2"><span>•</span> Memberikan pelayanan profesional dan berstandar tinggi</li>
              <li className="flex gap-2"><span>•</span> Menyediakan harga transparan dan kompetitif</li>
              <li className="flex gap-2"><span>•</span> Mengutamakan keselamatan dan kenyamanan pelanggan</li>
              <li className="flex gap-2"><span>•</span> Berinovasi dalam produk dan layanan perjalanan</li>
              <li className="flex gap-2"><span>•</span> Membangun kemitraan yang saling menguntungkan</li>
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
