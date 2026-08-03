"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, LogOut, ShoppingBag, Settings, ChevronRight, Heart, HelpCircle, Phone } from "lucide-react";
import { User as UserType, logout } from "@/lib/auth";
import { getBookings, BookingItem } from "@/lib/store";

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  googleUser: { name?: string | null; email?: string | null; image?: string | null } | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function ProfilePanel({ isOpen, onClose, user, googleUser, onLogout, onLoginClick }: ProfilePanelProps) {
  const [showBookings, setShowBookings] = useState(false);
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  // Determine active user (Google or local)
  const activeUser = googleUser || user;
  const userName = googleUser?.name || user?.name || "";
  const userEmail = googleUser?.email || user?.email || "";
  const userImage = googleUser?.image || null;
  const userInitial = userName ? userName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "";

  const handleLogout = async () => {
    if (googleUser) {
      await signOut({ callbackUrl: "/" });
    } else {
      logout();
      onLogout();
    }
    onClose();
  };

  const loadBookings = () => {
    setBookings(getBookings());
    setShowBookings(true);
  };

  const statusColors: Record<string, string> = { pending: "text-yellow-600 bg-yellow-50", paid: "text-blue-600 bg-blue-50", confirmed: "text-green-600 bg-green-50", completed: "text-muted bg-gray-50" };
  const statusLabels: Record<string, string> = { pending: "Menunggu Bayar", paid: "Dibayar", confirmed: "Dikonfirmasi", completed: "Selesai" };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 glass-strong px-4 py-4 flex items-center justify-between border-b border-primary/5">
              <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-dark-text">
                {showBookings ? "Riwayat Booking" : "Profile"}
              </h2>
              <button
                onClick={() => { if (showBookings) setShowBookings(false); else onClose(); }}
                className="w-8 h-8 rounded-full bg-dark-text/5 flex items-center justify-center active:scale-90 transition-transform"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4">
              {!activeUser ? (
                /* Not logged in */
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <User size={28} className="text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-dark-text mb-1">Belum Masuk</p>
                  <p className="text-xs text-muted mb-5">Masuk untuk menikmati fitur lengkap</p>
                  <button onClick={() => { onClose(); onLoginClick(); }} className="btn-primary text-sm w-full">
                    Masuk / Daftar
                  </button>
                </div>
              ) : showBookings ? (
                /* Bookings */
                <div className="space-y-3">
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag size={32} className="text-muted/30 mx-auto mb-2" />
                      <p className="text-sm text-muted">Belum ada booking</p>
                    </div>
                  ) : (
                    bookings.map((b) => (
                      <div key={b.id} className="glass-card p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-bold text-dark-text">{b.packageName}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${statusColors[b.status]}`}>{statusLabels[b.status]}</span>
                        </div>
                        <p className="text-xs text-muted">{b.price} · {b.guests} orang · {b.date}</p>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* Profile */
                <div>
                  {/* Avatar & Info */}
                  <div className="text-center mb-6">
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
                    {googleUser && (
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-lg bg-green-50 text-green-700 text-[9px] font-medium">
                        <svg className="w-3 h-3" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        Google Connected
                      </span>
                    )}
                  </div>

                  {/* Menu */}
                  <div className="space-y-1">
                    <button onClick={loadBookings} className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-primary/5 active:scale-[0.98] transition-all">
                      <div className="flex items-center gap-3"><ShoppingBag size={18} className="text-muted" /><span className="text-sm text-dark-text">Riwayat Booking</span></div>
                      <ChevronRight size={16} className="text-muted" />
                    </button>
                    <a href="/wishlist" className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-primary/5 active:scale-[0.98] transition-all">
                      <div className="flex items-center gap-3"><Heart size={18} className="text-muted" /><span className="text-sm text-dark-text">Wishlist</span></div>
                      <ChevronRight size={16} className="text-muted" />
                    </a>
                    <a href="/faq" className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-primary/5 active:scale-[0.98] transition-all">
                      <div className="flex items-center gap-3"><HelpCircle size={18} className="text-muted" /><span className="text-sm text-dark-text">FAQ & Bantuan</span></div>
                      <ChevronRight size={16} className="text-muted" />
                    </a>
                    <a href="https://wa.me/62818548833" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-primary/5 active:scale-[0.98] transition-all">
                      <div className="flex items-center gap-3"><Phone size={18} className="text-muted" /><span className="text-sm text-dark-text">Hubungi Support</span></div>
                      <ChevronRight size={16} className="text-muted" />
                    </a>

                    {/* Logout */}
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3.5 rounded-2xl hover:bg-red-50 active:scale-[0.98] transition-all mt-4">
                      <LogOut size={18} className="text-red-500" />
                      <span className="text-sm text-red-500 font-medium">Keluar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
