"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const contactInfo = [
  { icon: "📱", label: "WhatsApp", value: "0818-548-833", href: "https://wa.me/62818548833" },
  { icon: "📞", label: "Telepon", value: "0818-548-833", href: "tel:+62818548833" },
  { icon: "✉️", label: "Email", value: "info@mctourtravel.com", href: "mailto:info@mctourtravel.com" },
  { icon: "📍", label: "Alamat", value: "Mall Ambasador, Jl. Prof. DR. Satrio Lantai LG Blok A69, Karet Kuningan, Kec. Setiabudi, Jakarta Selatan, DKI Jakarta 12940", href: "#map" },
  { icon: "🕐", label: "Jam Operasional", value: "Senin - Sabtu, 08:00 - 20:00", href: null },
];

export default function ContactContent() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4"
          >
            Hubungi <span className="gradient-text">Kami</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-text/60"
          >
            Tim kami siap membantu Anda merencanakan perjalanan impian
          </motion.p>
        </div>
      </section>

      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-6">
              Informasi Kontak
            </h2>
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                whileHover={{ x: 4 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="text-xs text-dark-text/50">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-dark-text">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20bertanya."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center block mt-6"
            >
              💬 Chat via WhatsApp Sekarang
            </a>
          </div>

          {/* Map */}
          <div id="map" className="glass-card overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi mcTour & Travel"
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
