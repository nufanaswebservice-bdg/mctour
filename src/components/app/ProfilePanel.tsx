"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, LogOut, ShoppingBag, Settings, ChevronRight } from "lucide-react";
import { User as UserType, logout, updateProfile, getStoredAuth } from "@/lib/auth";
import { getBookings, BookingItem } from "@/lib/store";

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function ProfilePanel({ isOpen, onClose, user, onLogout, onLoginClick }: ProfilePanelProps) {
  const [editing, setEditing] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  const handleSave = () => {
    if (name.trim()) {
      updateProfile({ name: name.trim(), phone: phone.trim() });
      setEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    onLogout();
    onClose();
  };

  const loadBookings = () => {
    setBookings(getBookings());
    setShowBookings(true);
  };

  const statusColors = {
    pending: "text-yellow-600 bg-yellow-50",
    paid: "text-blue-600 bg-blue-50",
    confirmed: "text-green-600 bg-green-50",
    completed: "text-muted bg-gray-50",
  };

  const statusLabels = {
    pending: "Menunggu Bayar",
    paid: "Dibayar",
    confirmed: "Dikonfirmasi",
    completed: "Selesai",
  };

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
              {!user ? (
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
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-bold text-dark-text">{b.packageName}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${statusColors[b.status]}`}>
                            {statusLabels[b.status]}
                          </span>
                        </div>
                        <div className="text-xs text-muted space-y-0.5">
                          <p>Harga: {b.price}</p>
                          <p>Tanggal: {b.date}</p>
                          <p>Peserta: {b.guests} orang</p>
                        </div>
                        {b.status === "pending" && (
                          <a
                            href={`/pembayaran?id=${b.id}`}
                            className="btn-ghost w-full text-xs mt-3"
                          >
                            Bayar Sekarang
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* Profile */
                <div>
                  {/* Avatar */}
                  <div className="text-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl font-bold text-white">
                        {user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    {!editing ? (
                      <>
                        <p className="text-base font-bold text-dark-text">{user.name}</p>
                        <p className="text-xs text-muted">{user.email}</p>
                        {user.phone && <p className="text-xs text-muted">{user.phone}</p>}
                      </>
                    ) : (
                      <div className="space-y-2 mt-3 text-left">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nama"
                          className="w-full p-3 rounded-2xl bg-background border border-primary/10 text-sm outline-none focus:border-primary"
                        />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="No. HP"
                          className="w-full p-3 rounded-2xl bg-background border border-primary/10 text-sm outline-none focus:border-primary"
                        />
                        <button onClick={handleSave} className="btn-primary w-full text-sm">Simpan</button>
                        <button onClick={() => setEditing(false)} className="btn-ghost w-full text-sm">Batal</button>
                      </div>
                    )}
                  </div>

                  {/* Menu items */}
                  {!editing && (
                    <div className="space-y-1">
                      <button
                        onClick={() => { setName(user.name); setPhone(user.phone); setEditing(true); }}
                        className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-primary/5 active:scale-[0.98] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Settings size={18} className="text-muted" />
                          <span className="text-sm text-dark-text">Edit Profil</span>
                        </div>
                        <ChevronRight size={16} className="text-muted" />
                      </button>

                      <button
                        onClick={loadBookings}
                        className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-primary/5 active:scale-[0.98] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <ShoppingBag size={18} className="text-muted" />
                          <span className="text-sm text-dark-text">Riwayat Booking</span>
                        </div>
                        <ChevronRight size={16} className="text-muted" />
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-50 active:scale-[0.98] transition-all mt-4"
                      >
                        <LogOut size={18} className="text-red-500" />
                        <span className="text-sm text-red-500 font-medium">Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
