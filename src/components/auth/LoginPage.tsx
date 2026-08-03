"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { register, login } from "@/lib/auth";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 400));

    if (mode === "register") {
      if (!name || !email || !phone || !password || !confirmPassword) {
        setError("Semua kolom wajib diisi");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password minimal 6 karakter");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Konfirmasi password tidak cocok");
        setLoading(false);
        return;
      }
      const result = register(name, email, phone, password);
      if (result.success) {
        setSuccess("Registrasi berhasil! Mengalihkan...");
        setTimeout(() => (window.location.href = "/"), 1000);
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
        setSuccess("Login berhasil! Mengalihkan...");
        setTimeout(() => (window.location.href = "/"), 800);
      } else {
        setError(result.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="px-4 pt-6 pb-20 min-h-[70vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mctour.png"
            alt="mcTour & Travel"
            className="h-14 w-auto mx-auto mb-3"
          />
          <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text">
            {mode === "login" ? "Masuk ke Akun" : "Buat Akun Baru"}
          </h1>
          <p className="text-xs text-muted mt-1">
            {mode === "login"
              ? "Masuk untuk menikmati fitur lengkap"
              : "Daftar gratis dan mulai perjalanan Anda"}
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-strong p-5 rounded-3xl">
          {/* Google Login */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md active:scale-[0.98] transition-all mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-sm font-semibold text-dark-text">
              {mode === "login" ? "Masuk" : "Daftar"} dengan Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] text-muted">atau {mode === "login" ? "masuk" : "daftar"} dengan email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name - Register only */}
            {mode === "register" && (
              <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/5 transition-all">
                <User size={16} className="text-muted shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/5 transition-all">
              <Mail size={16} className="text-muted shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
              />
            </div>

            {/* Phone - Register only */}
            {mode === "register" && (
              <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/5 transition-all">
                <Phone size={16} className="text-muted shrink-0" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nomor WhatsApp"
                  className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
                />
              </div>
            )}

            {/* Password */}
            <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/5 transition-all">
              <Lock size={16} className="text-muted shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted shrink-0">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Confirm Password - Register only */}
            {mode === "register" && (
              <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-background/80 border border-primary/10 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/5 transition-all">
                <Lock size={16} className="text-muted shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Konfirmasi Password"
                  className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/50"
                />
              </div>
            )}

            {/* Error / Success */}
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 font-medium px-1">
                ⚠️ {error}
              </motion.p>
            )}
            {success && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-green-600 font-medium px-1">
                ✅ {success}
              </motion.p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="relative w-full h-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/20 disabled:opacity-60"
            >
              <div className="absolute inset-0 animate-gradient-shift bg-[length:200%_100%] bg-gradient-to-r from-[#0A2E7A] via-[#1565FF] to-[#4D8AFF]" />
              <span className="relative z-10 text-white font-bold text-sm">
                {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar Sekarang"}
              </span>
            </motion.button>
          </form>

          {/* Forgot Password - Login only */}
          {mode === "login" && (
            <p className="text-center mt-3">
              <button className="text-[11px] text-primary font-medium">Lupa Password?</button>
            </p>
          )}
        </div>

        {/* Toggle Mode */}
        <p className="text-center text-xs text-muted mt-5">
          {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); resetForm(); }}
            className="text-primary font-bold"
          >
            {mode === "login" ? "Daftar Gratis" : "Masuk"}
          </button>
        </p>

        {/* Terms */}
        <p className="text-[9px] text-muted text-center mt-3 leading-relaxed px-4">
          Dengan masuk atau mendaftar, Anda menyetujui{" "}
          <span className="text-primary">Syarat & Ketentuan</span> dan{" "}
          <span className="text-primary">Kebijakan Privasi</span> mcTour & Travel.
        </p>
      </motion.div>
    </div>
  );
}
