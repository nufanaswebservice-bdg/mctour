"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, Users, ChevronDown, Search, Car } from "lucide-react";

const cities = ["Jakarta", "Bandung", "Surabaya", "Semarang", "Yogyakarta", "Solo", "Malang", "Bali", "Lombok", "Batam", "Medan", "Makassar", "Palembang", "Balikpapan"];
const durations = ["6 Jam", "12 Jam", "1 Hari", "2 Hari", "3 Hari", "4 Hari", "5 Hari", "7 Hari", "14 Hari", "30 Hari"];
const purposes = ["Dalam Kota", "Luar Kota", "Antar Kota", "Wisata", "Bandara", "Hotel"];

export default function SearchBox() {
  const [city, setCity] = useState("");
  const [showCityList, setShowCityList] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("1 Hari");
  const [withDriver, setWithDriver] = useState(true);
  const [purpose, setPurpose] = useState("Wisata");
  const [passengers, setPassengers] = useState("4-7");
  const [showMore, setShowMore] = useState(false);

  const filteredCities = cities.filter((c) => c.toLowerCase().includes(city.toLowerCase()));

  const handleSearch = () => {
    const msg = `Halo mcTour, saya ingin rental kendaraan:\n- Kota: ${city || "Belum dipilih"}\n- Tanggal: ${date || "Fleksibel"}\n- Jam: ${time || "Fleksibel"}\n- Durasi: ${duration}\n- Driver: ${withDriver ? "Ya" : "Lepas Kunci"}\n- Tujuan: ${purpose}\n- Penumpang: ${passengers} orang`;
    window.open(`https://wa.me/62818548833?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="px-4 -mt-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-strong p-4 rounded-3xl shadow-lg"
      >
        <p className="text-xs font-bold text-dark-text mb-3 font-[family-name:var(--font-heading)]">Cari Kendaraan</p>

        {/* City */}
        <div className="relative mb-2">
          <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 focus-within:border-primary/30 transition-all">
            <MapPin size={15} className="text-primary shrink-0" />
            <input
              type="text"
              value={city}
              onChange={(e) => { setCity(e.target.value); setShowCityList(true); }}
              onFocus={() => setShowCityList(true)}
              placeholder="Kota pickup"
              className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
            />
          </div>
          <AnimatePresence>
            {showCityList && city.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-lg border border-primary/10 z-50 max-h-40 overflow-y-auto"
              >
                {filteredCities.map((c) => (
                  <button key={c} onClick={() => { setCity(c); setShowCityList(false); }} className="w-full text-left px-4 py-2.5 text-sm text-dark-text hover:bg-primary/5 active:bg-primary/10 first:rounded-t-2xl last:rounded-b-2xl">
                    {c}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
            <Calendar size={14} className="text-primary shrink-0" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent outline-none text-xs text-dark-text" />
          </div>
          <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
            <Clock size={14} className="text-primary shrink-0" />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-transparent outline-none text-xs text-dark-text" />
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 mb-2">
          <Car size={15} className="text-primary shrink-0" />
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-transparent outline-none text-sm text-dark-text">
            {durations.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Expandable options */}
        <button onClick={() => setShowMore(!showMore)} className="flex items-center gap-1 text-[11px] text-primary font-semibold mb-2 active:opacity-70">
          Opsi Lanjutan <ChevronDown size={12} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {showMore && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-2 mb-2">
              {/* Driver toggle */}
              <div className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10">
                <span className="text-xs text-dark-text flex-1">Dengan Sopir</span>
                <button onClick={() => setWithDriver(!withDriver)} className={`w-10 h-6 rounded-full transition-colors ${withDriver ? "bg-primary" : "bg-muted/20"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ml-1 ${withDriver ? "translate-x-4" : ""}`} />
                </button>
              </div>
              {/* Purpose */}
              <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10">
                <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full bg-transparent outline-none text-sm text-dark-text">
                  {purposes.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              {/* Passengers */}
              <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10">
                <Users size={14} className="text-primary shrink-0" />
                <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full bg-transparent outline-none text-sm text-dark-text">
                  <option value="1-4">1-4 orang (Sedan/City Car)</option>
                  <option value="4-7">4-7 orang (MPV)</option>
                  <option value="7-15">7-15 orang (Hiace)</option>
                  <option value="15-30">15-30 orang (Elf/Medium Bus)</option>
                  <option value="30-50">30-50 orang (Big Bus)</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Button */}
        <motion.button onClick={handleSearch} whileTap={{ scale: 0.97 }} className="relative w-full h-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/25 mt-1">
          <div className="absolute inset-0 animate-gradient-shift bg-[length:200%_100%] bg-gradient-to-r from-[#0A2E7A] via-[#1565FF] to-[#4D8AFF]" />
          <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-sm">
            <Search size={16} /> Cari Kendaraan
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
