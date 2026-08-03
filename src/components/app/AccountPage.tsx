"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Settings, ShoppingBag, Heart, LogOut, ChevronRight, CreditCard, HelpCircle, Phone } from "lucide-react";
import { getBookings, BookingItem } from "@/lib/store";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [view, setView] = useState<"main" | "bookings">("main");
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  const isLoggedIn = status === "authenticated" && !!session?.user;
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || null;
  const userInitial = userName ? userName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "";

  const statusLabels: Record<string, string> = { pending: "Menunggu Bayar", paid: "Dibayar", confirmed: "Dikonfirmasi", completed: "Selesai" };
  const statusColors: Record<string, string> = { pending: "text-yellow-600 bg-yellow-50", paid: "text-blue-600 bg-blue-50", confirmed: "text-green-600 bg-green-50", completed: "text-muted bg-gray-50" };

  // Loading state
  if (status === "loading") {
    return (
      <div className="px-4 pt-4 pb-6">
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full border-3 border-primary/20 border-t-primary animate-spin mx-auto" />
          <p className="text-xs text-muted mt-3">Memuat...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="px-4 pt-4 pb-6">
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <User size={28} className="text-primary" />
          </div>
          <p className="text-base font-bold text-dark-text mb-1">Masuk ke Akun Anda</p>
          <p className="text-xs text-muted mb-6">Login untuk menikmati fitur lengkap</p>
          <a href="/login" className="btn-primary text-sm w-full max-w-xs mx-auto block text-center">
            Masuk / Daftar
          </a>
        </div>
      </div>
    );
  }

  // Bookings view
  if (view === "bookings") {
    return (
      <div className="px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text">Riwayat Booking</h1>
          <button onClick={() => setView("main")} className="text-xs text-primary font-semibold">Kembali</button>
        </div>
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag size={32} className="text-muted/20 mx-auto mb-2" />
            <p className="text-sm text-muted">Belum ada booking</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="glass-card p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-dark-text">{b.packageName}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${statusColors[b.status]}`}>{statusLabels[b.status]}</span>
                </div>
                <p className="text-xs text-muted">{b.price} · {b.guests} orang · {b.date}</p>
                {b.status === "pending" && (
                  <a href="/pembayaran" className="btn-ghost w-full text-xs mt-2">Bayar Sekarang</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Main profile view
  return (
    <div className="px-4 pt-4 pb-6">
      {/* Profile Card */}
      <div className="glass-card p-5 text-center mb-5">
        {userImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={userImage} alt="" className="w-16 h-16 rounded-full mx-auto mb-2 object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto mb-2">
            <span className="text-xl font-bold text-white">{userInitial}</span>
          </div>
        )}
        <p className="text-base font-bold text-dark-text">{userName}</p>
        <p className="text-xs text-muted">{userEmail}</p>
        <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-lg bg-green-50 text-green-700 text-[9px] font-medium">
          <svg className="w-3 h-3" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google Connected
        </span>
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {[
          { icon: ShoppingBag, label: "Riwayat Booking", action: () => { setBookings(getBookings()); setView("bookings"); } },
          { icon: Heart, label: "Wishlist", href: "/wishlist" },
          { icon: CreditCard, label: "Pembayaran", href: "/pembayaran" },
          { icon: HelpCircle, label: "FAQ & Bantuan", href: "/faq" },
          { icon: Phone, label: "Hubungi Support", href: "https://wa.me/62818548833" },
        ].map((item) => (
          <motion.div key={item.label} whileTap={{ scale: 0.98 }}>
            {"href" in item && item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-muted" />
                  <span className="text-sm text-dark-text">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </a>
            ) : (
              <button
                onClick={"action" in item ? item.action : undefined}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-muted" />
                  <span className="text-sm text-dark-text">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </button>
            )}
          </motion.div>
        ))}

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 p-3.5 rounded-2xl hover:bg-red-50 transition-colors mt-4"
        >
          <LogOut size={18} className="text-red-500" />
          <span className="text-sm text-red-500 font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
}
