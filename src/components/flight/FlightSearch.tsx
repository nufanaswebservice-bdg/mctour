"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlaneTakeoff, PlaneLanding, Calendar, Users, ArrowLeftRight, ChevronDown } from "lucide-react";

const airports = [
  { code: "CGK", city: "Jakarta", name: "Soekarno-Hatta" },
  { code: "DPS", city: "Bali", name: "Ngurah Rai" },
  { code: "SUB", city: "Surabaya", name: "Juanda" },
  { code: "JOG", city: "Yogyakarta", name: "Adisucipto" },
  { code: "BDO", city: "Bandung", name: "Husein Sastranegara" },
  { code: "UPG", city: "Makassar", name: "Sultan Hasanuddin" },
  { code: "KNO", city: "Medan", name: "Kualanamu" },
  { code: "SOC", city: "Solo", name: "Adi Soemarmo" },
  { code: "SRG", city: "Semarang", name: "Ahmad Yani" },
  { code: "MLG", city: "Malang", name: "Abdul Rachman Saleh" },
  { code: "LOP", city: "Lombok", name: "Zainuddin Abdul Madjid" },
  { code: "PKU", city: "Pekanbaru", name: "Sultan Syarif Kasim II" },
  { code: "BPN", city: "Balikpapan", name: "Sultan Aji Muhammad" },
  { code: "PLM", city: "Palembang", name: "Sultan Mahmud Badaruddin" },
  { code: "SIN", city: "Singapore", name: "Changi" },
  { code: "KUL", city: "Kuala Lumpur", name: "KLIA" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi" },
  { code: "NRT", city: "Tokyo", name: "Narita" },
  { code: "ICN", city: "Seoul", name: "Incheon" },
  { code: "HKG", city: "Hong Kong", name: "Chek Lap Kok" },
];

const AFFILIATE_ID = "760307";

export default function FlightSearch() {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [from, setFrom] = useState("CGK");
  const [to, setTo] = useState("DPS");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");
  const [showMore, setShowMore] = useState(false);

  const swap = () => { const tmp = from; setFrom(to); setTo(tmp); };

  const handleSearch = () => {
    // Redirect to Aviasales/Travelpayouts flight search
    const url = `https://www.aviasales.com/search/${from}${departDate.replace(/-/g, "").slice(2)}${to}${returnDate ? returnDate.replace(/-/g, "").slice(2) : ""}${passengers}?marker=${AFFILIATE_ID}&locale=id&currency=idr`;
    window.open(url, "_blank");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="px-4 -mt-6 relative z-10"
    >
      <div className="glass-strong p-4 rounded-3xl shadow-xl">
        {/* Trip Type */}
        <div className="flex gap-2 mb-3">
          {[
            { value: "roundtrip", label: "Pulang-Pergi" },
            { value: "oneway", label: "Sekali Jalan" },
          ].map((t) => (
            <button
              key={t.value}
              onClick={() => setTripType(t.value as typeof tripType)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                tripType === t.value ? "bg-primary text-white" : "bg-primary/5 text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* From - To */}
        <div className="relative flex items-center gap-2 mb-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
            <PlaneTakeoff size={14} className="text-primary shrink-0" />
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full bg-transparent outline-none text-xs text-dark-text font-medium">
              {airports.map((a) => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
            </select>
          </div>

          <button onClick={swap} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 active:scale-90 active:rotate-180 transition-all">
            <ArrowLeftRight size={12} className="text-primary" />
          </button>

          <div className="flex-1 flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
            <PlaneLanding size={14} className="text-primary shrink-0" />
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full bg-transparent outline-none text-xs text-dark-text font-medium">
              {airports.map((a) => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
            <Calendar size={13} className="text-primary shrink-0" />
            <div className="w-full">
              <p className="text-[8px] text-muted">Berangkat</p>
              <input type="date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} className="w-full bg-transparent outline-none text-[11px] text-dark-text font-medium" />
            </div>
          </div>
          {tripType === "roundtrip" && (
            <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
              <Calendar size={13} className="text-primary shrink-0" />
              <div className="w-full">
                <p className="text-[8px] text-muted">Pulang</p>
                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} min={departDate} className="w-full bg-transparent outline-none text-[11px] text-dark-text font-medium" />
              </div>
            </div>
          )}
          {tripType === "oneway" && (
            <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
              <Users size={13} className="text-primary shrink-0" />
              <div className="w-full">
                <p className="text-[8px] text-muted">Penumpang</p>
                <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className="w-full bg-transparent outline-none text-[11px] text-dark-text font-medium">
                  {[1,2,3,4,5,6,7,8,9].map((n) => <option key={n} value={n}>{n} orang</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* More options */}
        <button onClick={() => setShowMore(!showMore)} className="flex items-center gap-1 text-[10px] text-primary font-semibold mb-2 active:opacity-70">
          Opsi Lanjutan <ChevronDown size={11} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {showMore && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-2">
              <div className="grid grid-cols-2 gap-2">
                {tripType === "roundtrip" && (
                  <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
                    <Users size={13} className="text-primary shrink-0" />
                    <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className="w-full bg-transparent outline-none text-[11px] text-dark-text">
                      {[1,2,3,4,5,6,7,8,9].map((n) => <option key={n} value={n}>{n} penumpang</option>)}
                    </select>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10">
                  <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)} className="w-full bg-transparent outline-none text-[11px] text-dark-text">
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Button */}
        <motion.button onClick={handleSearch} whileTap={{ scale: 0.97 }} className="relative w-full h-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/25">
          <div className="absolute inset-0 animate-gradient-shift bg-[length:200%_100%] bg-gradient-to-r from-[#0A2E7A] via-[#1565FF] to-[#4D8AFF]" />
          <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-sm">
            <Search size={16} /> Cari Penerbangan
          </span>
        </motion.button>
      </div>
    </motion.section>
  );
}
