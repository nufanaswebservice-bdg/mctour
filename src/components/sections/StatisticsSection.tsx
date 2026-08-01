"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const stats = [
  { value: 10000, suffix: "+", label: "Pelanggan Puas", icon: "😊" },
  { value: 250, suffix: "+", label: "Company Gathering", icon: "🏢" },
  { value: 150, suffix: "+", label: "Paket Tour", icon: "🗺️" },
  { value: 15, suffix: "+", label: "Tahun Pengalaman", icon: "🏆" },
  { value: 4.9, suffix: "/5", label: "Rating", icon: "⭐" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(value < 10 ? Math.round(latest * 10) / 10 : Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-primary">
      {value < 10 ? displayValue.toFixed(1) : displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatisticsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />

      <AnimatedSection className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-dark-text/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
