"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Building, Smartphone, CheckCircle, Copy, Clock } from "lucide-react";
import { getBookings, updateBookingStatus, BookingItem } from "@/lib/store";
import { getStoredAuth } from "@/lib/auth";

const paymentMethods = [
  { id: "bca", name: "BCA Transfer", icon: Building, number: "8790-1234-5678", color: "bg-blue-50 text-blue-700" },
  { id: "mandiri", name: "Mandiri Transfer", icon: Building, number: "1300-0567-8910", color: "bg-yellow-50 text-yellow-700" },
  { id: "bni", name: "BNI Transfer", icon: Building, number: "0987-6543-2100", color: "bg-orange-50 text-orange-700" },
  { id: "ewallet", name: "E-Wallet (OVO/DANA/GoPay)", icon: Smartphone, number: "0818-548-833", color: "bg-green-50 text-green-700" },
  { id: "cc", name: "Kartu Kredit/Debit", icon: CreditCard, number: "Via payment gateway", color: "bg-purple-50 text-purple-700" },
];

export default function PaymentPage() {
  const [pendingBookings, setPendingBookings] = useState<BookingItem[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getStoredAuth();
    setIsLoggedIn(auth.isAuthenticated);
    const allBookings = getBookings();
    const pending = allBookings.filter((b) => b.status === "pending");
    setPendingBookings(pending);
    if (pending.length > 0) setSelectedBooking(pending[0]);
  }, []);

  const handleConfirmPayment = () => {
    if (selectedBooking) {
      updateBookingStatus(selectedBooking.id, "paid");
      setConfirmed(true);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/-/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (confirmed) {
    return (
      <div className="px-4 pt-4 pb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle size={40} className="text-green-600" />
          </motion.div>
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-2">
            Pembayaran Dikonfirmasi!
          </h2>
          <p className="text-sm text-muted mb-1">
            Terima kasih telah melakukan pembayaran.
          </p>
          <p className="text-xs text-muted mb-6">
            Tim kami akan memverifikasi dan menghubungi Anda via WhatsApp dalam 1x24 jam.
          </p>
          <a href="/" className="btn-primary text-sm">
            Kembali ke Beranda
          </a>
        </motion.div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="px-4 pt-4 pb-6 text-center py-16">
        <CreditCard size={40} className="text-muted/20 mx-auto mb-3" />
        <p className="text-sm font-semibold text-dark-text mb-1">Login Diperlukan</p>
        <p className="text-xs text-muted mb-5">Silakan login terlebih dahulu untuk melakukan pembayaran</p>
        <a href="/akun" className="btn-primary text-sm">
          Masuk / Daftar
        </a>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Pembayaran
      </h1>
      <p className="text-xs text-muted mb-5">Pilih metode pembayaran Anda</p>

      {/* Pending booking info */}
      {selectedBooking && (
        <div className="glass-card p-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-yellow-600" />
            <span className="text-[10px] font-bold text-yellow-600">MENUNGGU PEMBAYARAN</span>
          </div>
          <h3 className="text-sm font-bold text-dark-text">{selectedBooking.packageName}</h3>
          <p className="text-xs text-muted mt-1">{selectedBooking.guests} orang · {selectedBooking.date}</p>
          <p className="text-lg font-bold text-primary font-[family-name:var(--font-heading)] mt-2">
            {selectedBooking.price}
          </p>
        </div>
      )}

      {/* Payment methods */}
      <h2 className="text-sm font-bold text-dark-text mb-3">Metode Pembayaran</h2>
      <div className="space-y-2 mb-5">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`w-full glass-card p-4 flex items-center gap-3 text-left transition-all active:scale-[0.98] ${
              selectedMethod === method.id ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method.color}`}>
              <method.icon size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-dark-text">{method.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted">{method.number}</p>
                {selectedMethod === method.id && method.id !== "cc" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); copyToClipboard(method.number); }}
                    className="p-1 rounded-md hover:bg-primary/10"
                  >
                    <Copy size={12} className="text-primary" />
                  </button>
                )}
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === method.id ? "border-primary bg-primary" : "border-muted/30"
            }`}>
              {selectedMethod === method.id && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </button>
        ))}
      </div>

      {copied && (
        <p className="text-xs text-green-600 font-medium text-center mb-3">✓ Nomor rekening disalin!</p>
      )}

      {/* Info */}
      <div className="glass-card p-4 mb-5">
        <p className="text-xs text-muted leading-relaxed">
          💡 Setelah melakukan transfer, klik &quot;Konfirmasi Pembayaran&quot;. Tim kami akan memverifikasi dalam 1x24 jam dan menghubungi Anda via WhatsApp.
        </p>
      </div>

      {/* Confirm button */}
      <button
        onClick={handleConfirmPayment}
        disabled={!selectedMethod || !selectedBooking}
        className="btn-primary w-full text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Konfirmasi Pembayaran
      </button>

      {/* No pending bookings */}
      {!selectedBooking && (
        <div className="text-center py-8 mt-4">
          <p className="text-sm text-muted">Belum ada booking yang perlu dibayar.</p>
          <a href="/paket-tour-domestik" className="text-sm text-primary font-semibold mt-2 inline-block">
            Lihat Paket Tour →
          </a>
        </div>
      )}
    </div>
  );
}
