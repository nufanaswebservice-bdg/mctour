"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const galleryItems = [
  { title: "Bali Sunset", height: "h-64" },
  { title: "Bromo Sunrise", height: "h-48" },
  { title: "Gathering Fun", height: "h-56" },
  { title: "Jogja Culture", height: "h-52" },
  { title: "Korea Tour", height: "h-64" },
  { title: "Outbound Team", height: "h-48" },
  { title: "Umroh Group", height: "h-56" },
  { title: "Japan Trip", height: "h-60" },
];

export default function GallerySection() {
  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Galeri Perjalanan"
        subtitle="Momen-momen indah bersama pelanggan kami"
      />

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className={`${item.height} rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center cursor-pointer group relative break-inside-avoid`}
          >
            <span className="text-4xl opacity-40 group-hover:scale-110 transition-transform duration-300">
              📸
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-sm font-medium">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
