"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

const contacts = [
  { icon: MessageCircle, label: "WhatsApp", value: "0818-548-833", href: "https://wa.me/62818548833", color: "text-green-600", bg: "bg-green-50" },
  { icon: Phone, label: "Telepon", value: "0818-548-833", href: "tel:+62818548833", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Mail, label: "Email", value: "info@mctourtravel.com", href: "mailto:info@mctourtravel.com", color: "text-red-600", bg: "bg-red-50" },
  { icon: Clock, label: "Jam Operasional", value: "Senin - Sabtu, 08:00 - 20:00", href: null, color: "text-orange-600", bg: "bg-orange-50" },
];

export default function ContactPage() {
  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Hubungi <span className="gradient-text">Kami</span>
      </h1>
      <p className="text-sm text-muted mb-6">Tim kami siap membantu Anda</p>

      {/* Contact cards */}
      <div className="space-y-3 mb-6">
        {contacts.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform block"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <div>
                  <p className="text-[10px] text-muted">{item.label}</p>
                  <p className="text-sm font-semibold text-dark-text">{item.value}</p>
                </div>
              </a>
            ) : (
              <div className="glass-card p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <div>
                  <p className="text-[10px] text-muted">{item.label}</p>
                  <p className="text-sm font-semibold text-dark-text">{item.value}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Address */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
            <MapPin size={20} className="text-purple-600" />
          </div>
          <div>
            <p className="text-[10px] text-muted">Alamat</p>
            <p className="text-xs font-medium text-dark-text leading-relaxed">
              Mall Ambasador, Jl. Prof. DR. Satrio Lantai LG Blok A69, RT.11/RW.4, Kuningan, Karet Kuningan, Kec. Setiabudi, Jakarta Selatan, DKI Jakarta 12940
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-3xl overflow-hidden border border-primary/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8265!3d-6.2244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e14c91a765%3A0x2a6e7e1e6b5b7f2b!2sMall%20Ambassador!5e0!3m2!1sid!2sid!4v1690000000000"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi mcTour & Travel"
        />
      </div>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20bertanya."
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary w-full text-sm mt-5 gap-2"
      >
        <MessageCircle size={18} />
        Chat via WhatsApp Sekarang
      </a>
    </div>
  );
}
