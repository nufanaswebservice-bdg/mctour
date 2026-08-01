"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Settings, ShoppingBag, Heart, LogOut, ChevronRight, CreditCard, HelpCircle, Phone } from "lucide-react";
import { getStoredAuth, User as UserType, logout, updateProfile } from "@/lib/auth";
import { getBookings, BookingItem } from "@/lib/store";
import AuthModal from "./AuthModal";

export default function AccountPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [view, setView] = useState<"main" | "edit" | "bookings">("main");
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const auth = getStoredAuth();
    setUser(auth.user);
  }, []);

  const refresh = () => {
    const auth = getStoredAuth();
    setUser(auth.user);
    setShowAuth(false);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleSave = () => {
    const updated = updateProfile({ name, phone });
    if (updated) setUser(updated);
    setView("main");
  };

  const statusLabels: Record<string, string> = { pending: "Menunggu Bayar", paid: "Dibayar", confirmed: "Dikonfirmasi", completed: "Selesai" };
  const statusColors: Record<string, string> = { pending: "text-yellow-600 bg-yellow-50", paid: "text-blue-600 bg-blue-50", confirmed: "text-green-600 bg-green-50", completed: "text-muted bg-gray-50" };

  if (!user) {
    return (
      <div className="px-4 pt-4 pb-6">
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <User size={28} className="text-primary" />
          </div>
          <p className="text-base font-bold text-dark-text mb-1">Masuk ke Akun Anda</p>
          <p className="text-xs text-muted mb-6">Login atau daftar untuk menikmati fitur lengkap</p>
          <button onClick={() => setShowAuth(true)} className="btn-primary text-sm w-full max-w-xs mx-auto">
            Masuk / Daftar
          </button>
        </div>
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={refresh} />
      </div>
    );
  }

  if (view === "edit") {
    return (
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-5">Edit Profil</h1>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted block mb-1">Nama Lengkap</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-2xl bg-white border border-primary/10 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs text-muted block mb-1">Email</label>
            <input type="email" value={user.email} disabled className="w-full p-3 rounded-2xl bg-gray-50 border border-primary/5 text-sm text-muted" />
          </div>
          <div>
            <label className="text-xs text-muted block mb-1">No. WhatsApp</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 rounded-2xl bg-white border border-primary/10 text-sm outline-none focus:border-primary" />
          </div>
          <button onClick={handleSave} className="btn-primary w-full text-sm mt-2">Simpan Perubahan</button>
          <button onClick={() => setView("main")} className="btn-ghost w-full text-sm">Batal</button>
        </div>
      </div>
    );
  }

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
                  <a href={`/pembayaran?id=${b.id}`} className="btn-ghost w-full text-xs mt-2">Bayar Sekarang</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-6">
      {/* Profile Card */}
      <div className="glass-card p-5 text-center mb-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto mb-2">
          <span className="text-xl font-bold text-white">
            {user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
          </span>
        </div>
        <p className="text-base font-bold text-dark-text">{user.name}</p>
        <p className="text-xs text-muted">{user.email}</p>
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {[
          { icon: Settings, label: "Edit Profil", action: () => { setName(user.name); setPhone(user.phone); setView("edit"); } },
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
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3.5 rounded-2xl hover:bg-red-50 transition-colors mt-4"
        >
          <LogOut size={18} className="text-red-500" />
          <span className="text-sm text-red-500 font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
}
