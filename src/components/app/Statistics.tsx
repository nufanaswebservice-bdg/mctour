"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Pelanggan", icon: "😊" },
  { value: 250, suffix: "+", label: "Gathering", icon: "🏢" },
  { value: 150, suffix: "+", label: "Paket Tour", icon: "🗺️" },
  { value: 4.9, suffix: "/5", label: "Rating", icon: "⭐" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const ctrl = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(value < 10 ? Math.round(v * 10) / 10 : Math.round(v)),
      });
      return () => ctrl.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-xl font-bold text-primary font-[family-name:var(--font-heading)]">
      {value < 10 ? display.toFixed(1) : display.toLocaleString()}{suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="px-4 py-5"
    >
      <div className="glass-card p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-xl">{stat.icon}</span>
              <div className="mt-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[11px] text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
