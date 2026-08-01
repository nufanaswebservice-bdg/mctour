"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const events = [
  { icon: "🏢", title: "Company Gathering", desc: "Acara gathering perusahaan dengan konsep terbaik" },
  { icon: "👨‍👩‍👧‍👦", title: "Family Gathering", desc: "Quality time keluarga besar yang berkesan" },
  { icon: "🏕️", title: "Outbound", desc: "Aktivitas outdoor seru untuk team bonding" },
  { icon: "🤝", title: "Team Building", desc: "Program khusus membangun kekompakan tim" },
  { icon: "🎯", title: "Employee Gathering", desc: "Apresiasi karyawan dengan event memorable" },
  { icon: "🎒", title: "School Trip", desc: "Wisata edukasi yang aman untuk pelajar" },
  { icon: "📚", title: "Study Tour", desc: "Perjalanan belajar ke destinasi edukasi" },
];

export default function EventOrganizerSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background" />

      <AnimatedSection className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          title="Event Organizer"
          subtitle="Kami siap menjadi partner terbaik untuk setiap event dan gathering Anda"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-5 text-center group cursor-pointer"
            >
              <motion.div
                className="text-4xl mb-3"
                whileHover={{ scale: 1.2 }}
              >
                {event.icon}
              </motion.div>
              <h3 className="text-sm font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
                {event.title}
              </h3>
              <p className="text-xs text-dark-text/50">{event.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20konsultasi%20event%20organizer."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Konsultasi Gratis
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
