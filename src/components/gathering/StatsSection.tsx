"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Event Sukses", icon: "🎉" },
  { value: 30000, suffix: "+", label: "Peserta", icon: "👥" },
  { value: 150, suffix: "+", label: "Perusahaan", icon: "🏢" },
  { value: 4.9, suffix: "", label: "Rating", icon: "⭐" },
  { value: 95, suffix: "%", label: "Repeat Order", icon: "🔄" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const ctrl = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(value < 10 ? Math.round(v * 10) / 10 : Math.round(v)),
      });
      return () => ctrl.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-2xl font-bold text-[#0057B8] font-[family-name:var(--font-heading)]">
      {value < 10 ? display.toFixed(1) : display.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="px-4 py-8">
      <div className="rounded-3xl bg-gradient-to-br from-[#0057B8]/5 to-[#00B4D8]/5 p-6 border border-[#0057B8]/10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <span className="text-2xl">{stat.icon}</span>
              <div className="mt-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[10px] text-muted mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
