"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nama: "", perusahaan: "", email: "", whatsapp: "",
    peserta: "", tanggal: "", lokasi: "", budget: "", catatan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message with form data
    const msg = `Halo mcTour, saya ingin request penawaran gathering:\n\nNama: ${form.nama}\nPerusahaan: ${form.perusahaan}\nEmail: ${form.email}\nWA: ${form.whatsapp}\nPeserta: ${form.peserta} orang\nTanggal: ${form.tanggal}\nLokasi: ${form.lokasi}\nBudget: ${form.budget}\nCatatan: ${form.catatan}`;
    window.open(`https://wa.me/62818548833?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="px-4 py-8">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card p-8 text-center">
          <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-dark-text mb-1">Request Terkirim!</h3>
          <p className="text-xs text-muted">Tim kami akan menghubungi Anda dalam 1x24 jam.</p>
          <button onClick={() => setSubmitted(false)} className="mt-4 text-xs text-[#0057B8] font-semibold">
            Kirim Request Lain
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Request Penawaran
      </h2>
      <p className="text-xs text-muted mb-4">Isi form di bawah, kami akan menghubungi Anda</p>

      <form onSubmit={handleSubmit} className="glass-card p-5 space-y-3">
        {[
          { key: "nama", label: "Nama Lengkap", type: "text", placeholder: "John Doe" },
          { key: "perusahaan", label: "Perusahaan", type: "text", placeholder: "PT Contoh" },
          { key: "email", label: "Email", type: "email", placeholder: "email@company.com" },
          { key: "whatsapp", label: "No. WhatsApp", type: "tel", placeholder: "0812xxxxxxx" },
          { key: "peserta", label: "Jumlah Peserta", type: "number", placeholder: "50" },
          { key: "tanggal", label: "Tanggal Event", type: "date", placeholder: "" },
          { key: "lokasi", label: "Lokasi Preferensi", type: "text", placeholder: "Bandung / Bali / dll" },
          { key: "budget", label: "Budget per Orang", type: "text", placeholder: "Rp 500.000 - 1.000.000" },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-[11px] text-muted block mb-1">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              required={field.key !== "budget"}
              className="w-full p-3 rounded-2xl bg-background border border-[#0057B8]/10 text-sm outline-none focus:border-[#0057B8] transition-colors"
            />
          </div>
        ))}

        <div>
          <label className="text-[11px] text-muted block mb-1">Catatan Tambahan</label>
          <textarea
            placeholder="Konsep gathering yang diinginkan..."
            value={form.catatan}
            onChange={(e) => setForm({ ...form, catatan: e.target.value })}
            rows={3}
            className="w-full p-3 rounded-2xl bg-background border border-[#0057B8]/10 text-sm outline-none focus:border-[#0057B8] resize-none transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0057B8] to-[#00B4D8] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0057B8]/20 active:scale-95 transition-transform"
        >
          <Send size={16} />
          Kirim Request
        </button>
      </form>
    </section>
  );
}
