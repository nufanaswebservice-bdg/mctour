"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlaneTakeoff, PlaneLanding, Calendar, Users, ArrowLeftRight, ChevronDown } from "lucide-react";

const airports = [
  { code: "CGK", city: "Jakarta" },
  { code: "DPS", city: "Bali" },
  { code: "SUB", city: "Surabaya" },
  { code: "JOG", city: "Yogyakarta" },
  { code: "BDO", city: "Bandung" },
  { code: "UPG", city: "Makassar" },
  { code: "KNO", city: "Medan" },
  { code: "SOC", city: "Solo" },
  { code: "SRG", city: "Semarang" },
  { code: "MLG", city: "Malang" },
  { code: "LOP", city: "Lombok" },
  { code: "PKU", city: "Pekanbaru" },
  { code: "BPN", city: "Balikpapan" },
  { code: "PLM", city: "Palembang" },
  { code: "BTH", city: "Batam" },
  { code: "PDG", city: "Padang" },
  { code: "DJB", city: "Jambi" },
  { code: "PNK", city: "Pontianak" },
  { code: "BDJ", city: "Banjarmasin" },
  { code: "MDC", city: "Manado" },
  { code: "SIN", city: "Singapore" },
  { code: "KUL", city: "Kuala Lumpur" },
  { code: "BKK", city: "Bangkok" },
  { code: "NRT", city: "Tokyo" },
  { code: "ICN", city: "Seoul" },
  { code: "HKG", city: "Hong Kong" },
  { code: "PEK", city: "Beijing" },
  { code: "SYD", city: "Sydney" },
  { code: "DXB", city: "Dubai" },
  { code: "JED", city: "Jeddah" },
];

const AFFILIATE_ID = "760307";

function CityInput({ value, onChange, placeholder, icon: Icon }: { value: string; onChange: (val: string) => void; placeholder: string; icon: typeof PlaneTakeoff }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = airports.filter((a) =>
    a.city.toLowerCase().includes(value.toLowerCase()) || a.code.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="relative flex-1">
      <div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-background/80 border border-primary/10 focus-within:border-primary/30 transition-all">
        <Icon size={14} className="text-primary shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-xs text-dark-text font-medium placeholder:text-muted/50"
        />
      </div>
      <AnimatePresence>
        {showSuggestions && value.length > 0 && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-primary/10 z-50 max-h-48 overflow-y-auto"
          >
            {filtered.map((a) => (
              <button
                key={a.code}
                onMouseDown={() => { onChange(`${a.city} (${a.code})`); setShowSuggestions(false); }}
                className="w-full text-left px-3 py-2.5 text-xs hover:bg-primary/5 active:bg-primary/10 flex items-center justify-between"
              >
                <span className="font-medium text-dark-text">{a.city}</span>
                <span className="text-[10px] text-muted font-mono">{a.code}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FlightSearch() {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");
  const [showMore, setShowMore] = useState(false);

  const swap = () => { const tmp = from; setFrom(to); setTo(tmp); };

  // Extract IATA code from selection like "Jakarta (CGK)"
  const getCode = (input: string) => {
    const match = input.match(/\(([A-Z]{3})\)/);
    return match ? match[1] : "";
  };

  const handleSearch = () => {
    const fromCode = getCode(from);
    const toCode = getCode(to);

    if (!fromCode || !toCode) {
      alert("Pilih kota asal dan tujuan dari dropdown");
      return;
    }

    // Format: aviasales.com/search/CGKDPS0608 (code+code+DDMM)
    let datePart = "";
    if (departDate) {
      const d = new Date(departDate);
      datePart = String(d.getDate()).padStart(2, "0") + String(d.getMonth() + 1).padStart(2, "0");
    }

    let returnPart = "";
    if (returnDate && tripType === "roundtrip") {
      const r = new Date(returnDate);
      returnPart = String(r.getDate()).padStart(2, "0") + String(r.getMonth() + 1).padStart(2, "0");
    }

    const url = `https://www.aviasales.com/search/${fromCode}${datePart}${toCode}${returnPart}${passengers}?marker=${AFFILIATE_ID}&locale=id&currency=idr`;
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

        {/* From - To (now with manual text input) */}
        <div className="relative flex items-center gap-2 mb-2">
          <CityInput value={from} onChange={setFrom} placeholder="Dari mana? (ketik kota)" icon={PlaneTakeoff} />

          <button onClick={swap} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 active:scale-90 active:rotate-180 transition-all">
            <ArrowLeftRight size={12} className="text-primary" />
          </button>

          <CityInput value={to} onChange={setTo} placeholder="Mau ke mana? (ketik kota)" icon={PlaneLanding} />
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

        <p className="text-[9px] text-muted text-center mt-2">
          Pilih kota dari dropdown lalu klik Cari Penerbangan
        </p>
      </div>
    </motion.section>
  );
}
