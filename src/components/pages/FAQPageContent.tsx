"use client";

import { motion } from "framer-motion";
import FAQSection from "@/components/sections/FAQSection";

export default function FAQPageContent() {
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
            Pertanyaan <span className="gradient-text">Umum</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-text/60"
          >
            Temukan jawaban cepat untuk pertanyaan Anda
          </motion.p>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}
