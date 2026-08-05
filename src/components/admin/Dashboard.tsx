"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, Users, DollarSign, BarChart3, Package,
  Settings, Bell, Search, Moon, Sun, Menu, X, TrendingUp, TrendingDown,
  Eye, UserPlus, CreditCard, Star, Plane, Building, Bus, FileText, Globe
} from "lucide-react";

// Stats Data
const stats = [
  { label: "Visitor Hari Ini", value: "1,247", change: "+12%", up: true, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Total Booking", value: "89", change: "+8%", up: true, icon: ShoppingBag, color: "text-green-600", bg: "bg-green-50" },
  { label: "Revenue Bulan Ini", value: "Rp 245jt", change: "+23%", up: true, icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Customer Baru", value: "156", change: "+5%", up: true, icon: UserPlus, color: "text-orange-600", bg: "bg-orange-50" },
];

const bookingStats = [
  { label: "Pending", value: 12, color: "text-yellow-600 bg-yellow-50" },
  { label: "Success", value: 67, color: "text-green-600 bg-green-50" },
  { label: "Failed", value: 3, color: "text-red-600 bg-red-50" },
  { label: "Refund", value: 7, color: "text-purple-600 bg-purple-50" },
];

const recentBookings = [
  { id: "MCT-20260805-001", customer: "Budi Santoso", product: "Tour Bali Paradise", amount: "Rp 5.000.000", status: "success", date: "5 Agt 2026" },
  { id: "MCT-20260805-002", customer: "Siti Nurhaliza", product: "Hotel Tentrem Jogja", amount: "Rp 3.300.000", status: "pending", date: "5 Agt 2026" },
  { id: "MCT-20260804-003", customer: "Ahmad Rizki", product: "Gathering 50 pax", amount: "Rp 37.500.000", status: "success", date: "4 Agt 2026" },
  { id: "MCT-20260804-004", customer: "Diana Putri", product: "Tiket CGK-DPS", amount: "Rp 1.300.000", status: "success", date: "4 Agt 2026" },
  { id: "MCT-20260803-005", customer: "Hendra W.", product: "Umroh Plus", amount: "Rp 35.000.000", status: "pending", date: "3 Agt 2026" },
];

const topProducts = [
  { name: "Tour Bali Paradise", category: "Domestik", bookings: 34, revenue: "Rp 85jt", icon: "🏝️" },
  { name: "Gathering Gold Package", category: "Gathering", bookings: 28, revenue: "Rp 210jt", icon: "🏢" },
  { name: "Umroh Plus", category: "Umroh", bookings: 15, revenue: "Rp 525jt", icon: "🕋" },
  { name: "Rental Innova Reborn", category: "Rental", bookings: 45, revenue: "Rp 31.5jt", icon: "🚗" },
  { name: "Tour Korea Autumn", category: "International", bookings: 12, revenue: "Rp 180jt", icon: "🇰🇷" },
];

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ShoppingBag, label: "Booking" },
  { icon: Package, label: "Products" },
  { icon: Users, label: "Customers" },
  { icon: DollarSign, label: "Revenue" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Globe, label: "SEO" },
  { icon: Bell, label: "Marketing" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const statusColor: Record<string, string> = {
    success: "text-green-700 bg-green-100",
    pending: "text-yellow-700 bg-yellow-100",
    failed: "text-red-700 bg-red-100",
    refund: "text-purple-700 bg-purple-100",
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-r`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-inherit">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mctour.png" alt="mcTour" className="h-8 w-auto" />
            <span className="text-sm font-bold">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1"><X size={18} /></button>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                item.active
                  ? "bg-primary/10 text-primary font-semibold"
                  : `${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"}`
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Bar */}
        <header className={`sticky top-0 z-30 h-16 flex items-center justify-between px-4 border-b ${darkMode ? "bg-gray-800/90 border-gray-700" : "bg-white/90 border-gray-200"} backdrop-blur-xl`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-gray-100"><Menu size={20} /></button>
            <div className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-100"} w-64`}>
              <Search size={16} className="text-gray-400" />
              <input placeholder="Search..." className="bg-transparent outline-none text-sm w-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl hover:bg-gray-100">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="relative p-2 rounded-xl hover:bg-gray-100">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Dashboard</h1>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Selamat datang kembali, Admin 👋</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-2xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} shadow-sm`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon size={16} className={stat.color} />
                  </div>
                  <span className={`text-[10px] font-bold flex items-center gap-0.5 ${stat.up ? "text-green-600" : "text-red-600"}`}>
                    {stat.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className={`text-[11px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Booking Status */}
          <div className={`p-4 rounded-2xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} shadow-sm`}>
            <h3 className="text-sm font-bold mb-3">Status Booking</h3>
            <div className="grid grid-cols-4 gap-2">
              {bookingStats.map((b) => (
                <div key={b.label} className={`p-3 rounded-xl text-center ${b.color}`}>
                  <p className="text-xl font-bold">{b.value}</p>
                  <p className="text-[10px] font-medium">{b.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Recent Bookings */}
            <div className={`p-4 rounded-2xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} shadow-sm`}>
              <h3 className="text-sm font-bold mb-3">Booking Terbaru</h3>
              <div className="space-y-2">
                {recentBookings.map((b) => (
                  <div key={b.id} className={`flex items-center justify-between p-2.5 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{b.customer}</p>
                      <p className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"} truncate`}>{b.product}</p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xs font-bold">{b.amount}</p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${statusColor[b.status]}`}>{b.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className={`p-4 rounded-2xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} shadow-sm`}>
              <h3 className="text-sm font-bold mb-3">Produk Terlaris</h3>
              <div className="space-y-2">
                {topProducts.map((p, i) => (
                  <div key={p.name} className={`flex items-center gap-3 p-2.5 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <span className="text-lg">{p.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{p.name}</p>
                      <p className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{p.category} · {p.bookings} booking</p>
                    </div>
                    <p className="text-xs font-bold text-primary shrink-0">{p.revenue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Summary */}
          <div className={`p-4 rounded-2xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} shadow-sm`}>
            <h3 className="text-sm font-bold mb-3">Revenue Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Omset Bulanan", value: "Rp 1.2M", icon: DollarSign },
                { label: "Profit", value: "Rp 380jt", icon: TrendingUp },
                { label: "Komisi Affiliate", value: "Rp 12.5jt", icon: Star },
                { label: "Saldo", value: "Rp 245jt", icon: CreditCard },
              ].map((item) => (
                <div key={item.label} className={`p-3 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                  <item.icon size={16} className="text-primary mb-1" />
                  <p className="text-base font-bold">{item.value}</p>
                  <p className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
