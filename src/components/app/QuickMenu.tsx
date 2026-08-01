"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Palmtree,
  Globe,
  Users,
  GraduationCap,
  Bus,
  Building,
  Plane,
  FileText,
} from "lucide-react";

const menus = [
  { icon: Palmtree, label: "Domestik", color: "text-green-600", bg: "bg-green-50", href: "/paket-tour-domestik" },
  { icon: Globe, label: "Luar Negeri", color: "text-blue-600", bg: "bg-blue-50", href: "/paket-tour-luar-negeri" },
  { icon: Users, label: "Gathering", color: "text-orange-600", bg: "bg-orange-50", href: "/event-organizer" },
  { icon: GraduationCap, label: "Study Tour", color: "text-purple-600", bg: "bg-purple-50", href: "/study-tour" },
  { icon: Bus, label: "Rental Bus", color: "text-red-600", bg: "bg-red-50", href: "/rental-bus" },
  { icon: Building, label: "Hotel", color: "text-cyan-600", bg: "bg-cyan-50", href: "/hotel" },
  { icon: Plane, label: "Pesawat", color: "text-indigo-600", bg: "bg-indigo-50", href: "/tiket-pesawat" },
  { icon: FileText, label: "Visa", color: "text-pink-600", bg: "bg-pink-50", href: "/visa" },
];

export default function QuickMenu() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="px-4 py-5"
    >
      <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
        {menus.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
          >
            <Link
              href={item.href}
              className="flex flex-col items-center gap-2 group active:scale-90 transition-transform"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center transition-all group-active:scale-95`}
              >
                <item.icon size={24} className={item.color} />
              </div>
              <span className="text-[11px] font-medium text-dark-text/70 text-center leading-tight">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
