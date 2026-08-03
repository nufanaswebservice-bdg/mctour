"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, ChevronDown, Minus, Plus, Building, Star } from "lucide-react";

const popularCities = ["Bali", "Jakarta", "Bandung", "Yogyakarta", "Malang", "Surabaya", "Lombok", "Singapore", "Bangkok", "Tokyo", "Seoul", "Paris", "Dubai", "Maldives"];

export default function HeroSearch() {
  const [city, setCity] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showGuests, setShowGuests] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [starFilter, setStarFilter] = useState(0);

  const filtered = popularCities.filter((c) => c.toLowerCase().includes(city.toLowerCase()));
  const guestText = `${rooms} Kamar, ${adults} Dewasa${children > 0 ? `, ${children} Anak` : ""}`;

  const handleSearch = () => {
    const msg = `Halo mcTour, saya ingin booking hotel:\n- Kota: ${city || "Belum dipilih"}\n- Check-in: ${checkIn || "Fleksibel"}\n- Check-out: ${checkOut || "Fleksibel"}\n- Kamar: ${rooms}\n- Dewasa: ${adults}\n- Anak: ${children}${starFilter ? `\n- Bintang: ${starFilter}` : ""}`;
    window.open(`https://wa.me/62818548833?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="relative h-[50vh] min-h-[300px] max-h-[400px] rounded-b-[32px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0057B8] via-[#1565C0] to-[#0D47A1]" />
        <div className="absolute inset-0 opacity-10 bg-[url('/gallery-2.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0057B8] via-[#0057B8]/30 to-transparent" />

        {/* Decorative */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-[#FF7A00]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

        <div className="relative h-full flex flex-col justify-end px-5 pb-16 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 mb-2">
              <Building size={16} className="text-white/70" />
              <span className="text-[11px] text-white/60 font-medium">Hotel Booking</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight mb-1">
              Temukan Hotel <span className="text-[#FF7A00]">Terbaik</span>
            </h1>
            <p className="text-white/60 text-xs max-w-md">
              Ribuan hotel di seluruh dunia dengan harga terbaik. Free cancellation & pay later.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-4 -mt-12 relative z-10"
      >
        <div className="glass-strong p-4 rounded-3xl shadow-xl space-y-2.5">
          {/* City */}
          <div className="relative">
            <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 focus-within:border-primary/30 transition-all">
              <MapPin size={15} className="text-primary shrink-0" />
              <input
                type="text"
                value={city}
                onChange={(e) => { setCity(e.target.value); setShowCities(true); }}
                onFocus={() => setShowCities(true)}
                placeholder="Kota, nama hotel, atau destinasi"
                className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
              />
            </div>
            <AnimatePresence>
              {showCities && city.length > 0 && filtered.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-primary/10 z-50 max-h-36 overflow-y-auto">
                  {filtered.map((c) => (
                    <button key={c} onClick={() => { setCity(c); setShowCities(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-primary/5 active:bg-primary/10">
                      <span className="flex items-center gap-2"><MapPin size={12} className="text-muted" />{c}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
              <Calendar size={14} className="text-primary shrink-0" />
              <div className="w-full">
                <p className="text-[9px] text-muted">Check-in</p>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-transparent outline-none text-xs text-dark-text font-medium" />
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
              <Calendar size={14} className="text-primary shrink-0" />
              <div className="w-full">
                <p className="text-[9px] text-muted">Check-out</p>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkIn} className="w-full bg-transparent outline-none text-xs text-dark-text font-medium" />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div className="relative">
            <button onClick={() => setShowGuests(!showGuests)} className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 active:bg-primary/5 transition-colors">
              <div className="flex items-center gap-2.5">
                <Users size={15} className="text-primary shrink-0" />
                <span className="text-sm text-dark-text">{guestText}</span>
              </div>
              <ChevronDown size={14} className={`text-muted transition-transform ${showGuests ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showGuests && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-3 mt-2 rounded-2xl bg-background/60 border border-primary/5 space-y-3">
                    {[
                      { label: "Kamar", value: rooms, set: setRooms, min: 1 },
                      { label: "Dewasa", value: adults, set: setAdults, min: 1 },
                      { label: "Anak", value: children, set: setChildren, min: 0 },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-xs font-medium text-dark-text">{item.label}</span>
                        <div className="flex items-center gap-3">
                          <button onClick={() => item.set(Math.max(item.min, item.value - 1))} disabled={item.value <= item.min} className="w-7 h-7 rounded-full border border-primary/20 flex items-center justify-center active:scale-90 disabled:opacity-30">
                            <Minus size={12} className="text-primary" />
                          </button>
                          <span className="text-sm font-bold text-dark-text w-4 text-center">{item.value}</span>
                          <button onClick={() => item.set(item.value + 1)} className="w-7 h-7 rounded-full border border-primary/20 flex items-center justify-center active:scale-90">
                            <Plus size={12} className="text-primary" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Star filter */}
                    <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                      <span className="text-xs font-medium text-dark-text">Bintang Hotel</span>
                      <div className="flex gap-1">
                        {[0, 3, 4, 5].map((s) => (
                          <button key={s} onClick={() => setStarFilter(s)} className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${starFilter === s ? "bg-primary text-white" : "bg-primary/5 text-primary"}`}>
                            {s === 0 ? "Semua" : `${s}★`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Button */}
          <motion.button onClick={handleSearch} whileTap={{ scale: 0.97 }} className="relative w-full h-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/25">
            <div className="absolute inset-0 animate-gradient-shift bg-[length:200%_100%] bg-gradient-to-r from-[#0A2E7A] via-[#1565FF] to-[#4D8AFF]" />
            <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-sm">
              <Search size={16} /> Cari Hotel
            </span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
