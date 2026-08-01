"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MapPin, Tag, Heart, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: MapPin, label: "Paket", href: "/paket-tour-domestik" },
  { icon: Tag, label: "Promo", href: "/event-organizer" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: User, label: "Akun", href: "/akun" },
];

export default function BottomNav() {
  const pathname = usePathname();

  const getActiveIndex = () => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/paket") || pathname.startsWith("/outbound")) return 1;
    if (pathname.startsWith("/event") || pathname.startsWith("/umroh")) return 2;
    if (pathname === "/wishlist") return 3;
    if (pathname === "/akun") return 4;
    return 0;
  };

  const active = getActiveIndex();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom">
      <div className="mx-3 mb-2 glass-strong rounded-[20px] shadow-lg shadow-black/5">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-90"
              aria-label={item.label}
            >
              {active === i && (
                <motion.div
                  layoutId="bottomNavActive"
                  className="absolute inset-1 bg-primary/10 rounded-2xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                size={21}
                className={`relative z-10 transition-colors ${
                  active === i ? "text-primary" : "text-dark-text/40"
                }`}
              />
              <span
                className={`relative z-10 text-[10px] mt-0.5 font-medium transition-colors ${
                  active === i ? "text-primary" : "text-dark-text/40"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
