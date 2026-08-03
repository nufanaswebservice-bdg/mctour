"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";

const itinerary = [
  {
    day: "Hari 1",
    title: "Jakarta → Jeddah",
    activities: ["Berkumpul di Bandara Soekarno-Hatta", "Check-in & boarding", "Penerbangan Jakarta - Jeddah (±9 jam)", "Tiba di Jeddah, penjemputan", "Transfer ke Madinah (bus AC)"],
  },
  {
    day: "Hari 2",
    title: "Madinah - Ziarah",
    activities: ["Check-in Hotel Madinah", "Sholat di Masjid Nabawi", "Ziarah Raudhah", "Ziarah Makam Rasulullah ﷺ", "Makan malam di hotel"],
  },
  {
    day: "Hari 3",
    title: "Madinah - City Tour",
    activities: ["Sholat Subuh berjamaah di Masjid Nabawi", "Ziarah Uhud & Museum", "Masjid Quba", "Masjid Qiblatain", "Kebun Kurma", "Free time Masjid Nabawi malam"],
  },
  {
    day: "Hari 4",
    title: "Madinah → Mekkah",
    activities: ["Sholat Subuh di Masjid Nabawi", "Check-out hotel", "Perjalanan Madinah - Mekkah", "Miqat di Bir Ali (Ihram)", "Tiba di Mekkah, check-in hotel", "Umroh: Tawaf - Sa'i - Tahallul"],
  },
  {
    day: "Hari 5-7",
    title: "Mekkah - Ibadah",
    activities: ["Sholat 5 waktu di Masjidil Haram", "Tawaf Sunnah", "Berdoa di Multazam", "Minum Air Zamzam", "Kajian bersama Pembimbing", "Free time ibadah pribadi"],
  },
  {
    day: "Hari 8",
    title: "Mekkah - City Tour",
    activities: ["Jabal Rahmah", "Padang Arafah", "Muzdalifah", "Mina", "Jabal Tsur", "Abraj Al-Bait Mall (shopping)"],
  },
  {
    day: "Hari 9",
    title: "Mekkah → Jeddah → Jakarta",
    activities: ["Tawaf Wada'", "Check-out hotel", "Transfer ke Bandara Jeddah", "Penerbangan Jeddah - Jakarta", "Tiba di Jakarta (keesokan hari)"],
  },
];

export default function Itinerary() {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Itinerary Perjalanan
      </h2>
      <p className="text-xs text-muted mb-5">Jadwal perjalanan umroh 9 hari</p>

      <div className="space-y-2">
        {itinerary.map((day, i) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="rounded-2xl border border-[#1B5E20]/10 overflow-hidden bg-white/80"
          >
            <button
              onClick={() => setOpenDay(openDay === i ? null : i)}
              className="w-full flex items-center gap-3 p-4 text-left active:bg-[#1B5E20]/5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1B5E20]/10 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-[#1B5E20]">{day.day}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-dark-text">{day.title}</h3>
                <p className="text-[10px] text-muted">{day.activities.length} aktivitas</p>
              </div>
              <motion.div animate={{ rotate: openDay === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-[#1B5E20]" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openDay === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 pb-4 space-y-2">
                    {day.activities.map((act, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <MapPin size={10} className="text-[#2E7D32] shrink-0 mt-0.5" />
                        <span className="text-[11px] text-dark-text/70">{act}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
