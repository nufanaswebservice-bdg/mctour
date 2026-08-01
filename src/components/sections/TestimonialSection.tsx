"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "HR Manager, PT Maju Jaya",
    rating: 5,
    review: "Gathering perusahaan kami berjalan sangat lancar berkat mcTour. Pelayanan profesional dari awal hingga akhir. Semua karyawan puas!",
    avatar: "BS",
  },
  {
    name: "Siti Nurhaliza",
    role: "Ibu Rumah Tangga",
    rating: 5,
    review: "Liburan keluarga ke Bali sangat menyenangkan. Tour guide ramah dan informatif. Pasti akan pakai mcTour lagi!",
    avatar: "SN",
  },
  {
    name: "Ahmad Rizki",
    role: "CEO, Startup Tech",
    rating: 5,
    review: "Team building outbound di Puncak sangat berkesan. Aktivitasnya seru dan tim jadi lebih kompak. Terima kasih mcTour!",
    avatar: "AR",
  },
  {
    name: "Diana Putri",
    role: "Travel Enthusiast",
    rating: 5,
    review: "Paket tour Korea sangat lengkap dan well-organized. Hotel bagus, itinerary padat tapi tidak melelahkan. Recommended!",
    avatar: "DP",
  },
  {
    name: "Hendra Wijaya",
    role: "Direktur, PT Sejahtera",
    rating: 5,
    review: "Sudah 3 kali pakai mcTour untuk gathering kantor. Selalu puas dengan pelayanannya. Harga juga sangat kompetitif.",
    avatar: "HW",
  },
  {
    name: "Rina Marlina",
    role: "Guru SMA",
    rating: 5,
    review: "Study tour siswa berjalan aman dan menyenangkan. Tim mcTour sangat care dengan keselamatan anak-anak. Luar biasa!",
    avatar: "RM",
  },
];

export default function TestimonialSection() {
  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Testimoni Pelanggan"
        subtitle="Cerita nyata dari pelanggan yang telah mempercayakan perjalanan mereka kepada kami"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-card p-6"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-yellow-500 text-sm">⭐</span>
              ))}
            </div>

            {/* Review */}
            <p className="text-sm text-dark-text/70 leading-relaxed mb-4 italic">
              &ldquo;{testimonial.review}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-primary/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {testimonial.avatar}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark-text">
                  {testimonial.name}
                </p>
                <p className="text-xs text-dark-text/50">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
