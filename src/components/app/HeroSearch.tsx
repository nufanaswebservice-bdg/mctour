"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, ChevronDown, Minus, Plus } from "lucide-react";

export default function HeroSearch() {
  const { data: session } = useSession();
  const [destination, setDestination] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  const firstName = session?.user?.name?.split(" ")[0] || "";
  const guestDisplay = `${guests.adults} dewasa, ${guests.children} anak, ${guests.rooms} kamar`;

  const updateGuest = (field: keyof typeof guests, delta: number) => {
    setGuests((prev) => ({
      ...prev,
      [field]: Math.max(field === "adults" ? 1 : field === "rooms" ? 1 : 0, prev[field] + delta),
    }));
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  };

  const handleSearch = () => {
    const dateText = checkIn && checkOut
      ? `${formatDateDisplay(checkIn)} - ${formatDateDisplay(checkOut)}`
      : "Fleksibel";
    const msg = `Halo mcTour, saya ingin cari paket:\n- Destinasi: ${destination || "Belum ditentukan"}\n- Tanggal: ${dateText}\n- Tamu: ${guestDisplay}`;
    window.open(`https://wa.me/62818548833?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="relative px-4 pt-2 pb-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-secondary/10 rounded-full blur-3xl" />

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative mb-4"
      >
        <p className="text-muted text-sm font-medium">
          {firstName ? `Hai ${firstName} 👋` : "Hai, Selamat Datang 👋"}
        </p>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-dark-text mt-1">
          Mau Liburan <span className="gradient-text">Kemana?</span>
        </h1>
      </motion.div>

      {/* Search Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="relative glass-card p-4"
      >
        {/* Destination Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-background/80 border border-primary/10 mb-3 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/5 transition-all">
          <MapPin size={16} className="text-primary shrink-0" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Kota, hotel, tempat wisata"
            className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
          />
        </div>

        {/* Expandable Panel Toggle */}
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-background/80 border border-primary/10 mb-3 active:bg-primary/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-primary shrink-0" />
            <span className="text-sm text-dark-text/70">
              {checkIn && checkOut
                ? `${formatDateDisplay(checkIn)} - ${formatDateDisplay(checkOut)}`
                : "Tanggal & Jumlah Tamu"
              }
            </span>
          </div>
          <motion.div animate={{ rotate: showPanel ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-muted" />
          </motion.div>
        </button>

        {/* Expandable Panel */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pb-3">
                {/* Date Selection */}
                <div className="rounded-2xl bg-background/60 border border-primary/5 p-3">
                  <p className="text-[10px] text-muted font-medium mb-2 uppercase tracking-wide">Tanggal Perjalanan</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-muted block mb-1">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-primary/10 text-xs text-dark-text outline-none focus:border-primary/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted block mb-1">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-primary/10 text-xs text-dark-text outline-none focus:border-primary/30 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Selection */}
                <div className="rounded-2xl bg-background/60 border border-primary/5 p-3">
                  <p className="text-[10px] text-muted font-medium mb-3 uppercase tracking-wide">Tamu & Kamar</p>
                  <div className="space-y-3">
                    {[
                      { label: "Dewasa", field: "adults" as const, min: 1, note: "12+ tahun" },
                      { label: "Anak", field: "children" as const, min: 0, note: "2-11 tahun" },
                      { label: "Kamar", field: "rooms" as const, min: 1, note: "" },
                    ].map((item) => (
                      <div key={item.field} className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-medium text-dark-text">{item.label}</span>
                          {item.note && <span className="text-[9px] text-muted ml-1.5">({item.note})</span>}
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateGuest(item.field, -1)}
                            disabled={guests[item.field] <= item.min}
                            className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary active:scale-90 transition-transform disabled:opacity-30 disabled:active:scale-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold text-dark-text w-5 text-center">
                            {guests[item.field]}
                          </span>
                          <button
                            onClick={() => updateGuest(item.field, 1)}
                            className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary active:scale-90 transition-transform"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5">
                  <Users size={12} className="text-primary" />
                  <span className="text-[11px] text-primary font-medium">{guestDisplay}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Button - Animated gradient blue */}
        <motion.button
          onClick={handleSearch}
          whileTap={{ scale: 0.97 }}
          className="relative w-full h-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/25"
        >
          {/* Animated gradient */}
          <div className="absolute inset-0 animate-gradient-shift bg-[length:200%_100%] bg-gradient-to-r from-[#0A2E7A] via-[#1565FF] to-[#4D8AFF]" />
          <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-sm">
            <Search size={16} />
            Cari Paket Tour
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
