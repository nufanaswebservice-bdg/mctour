"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import Link from "next/link";

export default function HeroSearch() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  };

  const dateDisplay = checkIn && checkOut
    ? `${formatDate(checkIn)} - ${formatDate(checkOut)}`
    : "Pilih tanggal";

  const guestDisplay = `${guests.adults} dewasa, ${guests.children} anak, ${guests.rooms} kamar`;

  const handleSearch = () => {
    const msg = `Halo mcTour, saya ingin cari paket:\n- Destinasi: ${destination || "Belum dipilih"}\n- Tanggal: ${dateDisplay}\n- Tamu: ${guestDisplay}`;
    window.open(`https://wa.me/62818548833?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const updateGuest = (field: keyof typeof guests, delta: number) => {
    setGuests((prev) => ({
      ...prev,
      [field]: Math.max(field === "adults" ? 1 : field === "rooms" ? 1 : 0, prev[field] + delta),
    }));
  };

  return (
    <section className="relative px-4 pt-2 pb-4 overflow-hidden">
      {/* Gradient background blobs */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-secondary/10 rounded-full blur-3xl" />

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative mb-4"
      >
        <p className="text-muted text-sm font-medium">Hai, Selamat Datang 👋</p>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-dark-text mt-1">
          Mau Liburan <span className="gradient-text">Kemana?</span>
        </h1>
      </motion.div>

      {/* Search Bar - Traveloka Style */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="relative glass-card p-3 space-y-2"
      >
        {/* Labels - Mobile stacked, Desktop row */}
        <div className="hidden md:grid md:grid-cols-3 gap-2 px-1 mb-1">
          <span className="text-[10px] text-muted font-medium">Kota, tujuan, atau nama hotel</span>
          <span className="text-[10px] text-muted font-medium">Tanggal Check-In &amp; Check-out</span>
          <span className="text-[10px] text-muted font-medium">Tamu dan Kamar</span>
        </div>

        {/* Search Fields */}
        <div className="flex flex-col md:flex-row gap-2">
          {/* Destination */}
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 transition-all focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/5">
            <MapPin size={16} className="text-primary shrink-0" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Kota, hotel, tempat wisata"
              className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
            />
          </div>

          {/* Dates */}
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 relative transition-all focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/5">
            <Calendar size={16} className="text-primary shrink-0" />
            <div className="flex gap-1 items-center w-full">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-dark-text [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <span className="text-muted text-xs shrink-0">-</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-dark-text [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
            {!checkIn && !checkOut && (
              <span className="absolute left-10 text-sm text-muted/50 pointer-events-none">Pilih tanggal</span>
            )}
          </div>

          {/* Guests */}
          <div className="flex-1 relative">
            <button
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 text-left transition-all active:border-primary/30"
            >
              <Users size={16} className="text-primary shrink-0" />
              <span className="text-sm text-dark-text truncate">{guestDisplay}</span>
            </button>

            {/* Guest Picker Dropdown */}
            {showGuestPicker && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-white shadow-xl border border-primary/10 z-50 space-y-3"
              >
                {[
                  { label: "Dewasa", field: "adults" as const, min: 1 },
                  { label: "Anak", field: "children" as const, min: 0 },
                  { label: "Kamar", field: "rooms" as const, min: 1 },
                ].map((item) => (
                  <div key={item.field} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-dark-text">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateGuest(item.field, -1)}
                        className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary text-sm font-bold active:scale-90 transition-transform disabled:opacity-30"
                        disabled={guests[item.field] <= item.min}
                      >
                        −
                      </button>
                      <span className="text-sm font-bold text-dark-text w-4 text-center">{guests[item.field]}</span>
                      <button
                        onClick={() => updateGuest(item.field, 1)}
                        className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary text-sm font-bold active:scale-90 transition-transform"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setShowGuestPicker(false)}
                  className="w-full py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold active:scale-95 transition-transform"
                >
                  Selesai
                </button>
              </motion.div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="md:w-12 md:h-auto h-12 rounded-2xl bg-gradient-to-r from-secondary to-secondary-light flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 active:scale-95 transition-transform"
          >
            <Search size={18} className="text-white" />
            <span className="text-white text-sm font-bold md:hidden">Cari</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
