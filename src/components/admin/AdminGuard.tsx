"use client";

import { useState, useEffect, ReactNode } from "react";
import { Shield, LogIn, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const ADMIN_SESSION_KEY = "mctour_admin_session";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check existing session
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    if (session) {
      try {
        const data = JSON.parse(session);
        // Check if session is still valid (24 hours)
        if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
          setAuthenticated(true);
        } else {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoginLoading(true);

    try {
      // Check admin credentials from Supabase
      const { data, error: dbError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email.toLowerCase())
        .single();

      if (dbError || !data) {
        setError("Email tidak ditemukan");
        setLoginLoading(false);
        return;
      }

      // Simple password check (in production use bcrypt)
      if (data.password_hash !== password) {
        setError("Password salah");
        setLoginLoading(false);
        return;
      }

      // Save session
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
        email: data.email,
        name: data.name,
        role: data.role,
        timestamp: Date.now(),
      }));

      setAuthenticated(true);
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    }
    setLoginLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 rounded-full border-3 border-blue-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mctour.png" alt="mcTour" className="h-12 w-auto mx-auto mb-4 brightness-0 invert" />
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Masukkan kredensial admin</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Email Admin</label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus-within:border-blue-500/50">
                <Mail size={16} className="text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mctourtravel.com"
                  className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Password</label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus-within:border-blue-500/50">
                <Lock size={16} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 px-1">⚠️ {error}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={16} />
                  Masuk
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">
            © mcTour & Travel Admin Panel
          </p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
