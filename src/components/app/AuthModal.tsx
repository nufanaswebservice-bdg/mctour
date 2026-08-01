"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import { register, login } from "@/lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500));

    if (mode === "register") {
      if (!name || !email || !phone || !password) {
        setError("Semua field wajib diisi");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password minimal 6 karakter");
        setLoading(false);
        return;
      }
      const result = register(name, email, phone, password);
      if (result.success) {
        setSuccess("Registrasi berhasil! Selamat datang 🎉");
        setTimeout(() => { onSuccess(); onClose(); resetForm(); }, 1000);
      } else {
        setError(result.message);
      }
    } else {
      if (!email || !password) {
        setError("Email dan password wajib diisi");
        setLoading(false);
        return;
      }
      const result = login(email, password);
      if (result.success) {
        setSuccess("Login berhasil! 👋");
        setTimeout(() => { onSuccess(); onClose(); resetForm(); }, 800);
      } else {
        setError(result.message);
      }
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md glass-strong p-6 rounded-t-3xl sm:rounded-3xl max-h-[90dvh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text">
                {mode === "login" ? "Masuk" : "Daftar"}
              </h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-dark-text/5 flex items-center justify-center active:scale-90 transition-transform"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "register" && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-background border border-primary/5">
                  <User size={18} className="text-muted shrink-0" />
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-background border border-primary/5">
                <Mail size={18} className="text-muted shrink-0" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
                />
              </div>

              {mode === "register" && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-background border border-primary/5">
                  <Phone size={18} className="text-muted shrink-0" />
                  <input
                    type="tel"
                    placeholder="Nomor WhatsApp"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-background border border-primary/5">
                <Lock size={18} className="text-muted shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Error / Success */}
              {error && <p className="text-xs text-red-500 font-medium px-1">{error}</p>}
              {success && <p className="text-xs text-green-600 font-medium px-1">{success}</p>}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-sm mt-2 disabled:opacity-60"
              >
                {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar Sekarang"}
              </button>
            </form>

            {/* Toggle */}
            <p className="text-center text-xs text-muted mt-4">
              {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
              <button
                onClick={() => { setMode(mode === "login" ? "register" : "login"); resetForm(); }}
                className="text-primary font-semibold"
              >
                {mode === "login" ? "Daftar" : "Masuk"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
