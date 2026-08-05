"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  TrendingUp,
  CreditCard,
  Star,
  Globe,
  FileText,
  BarChart3,
} from "lucide-react";

interface Booking {
  id: string;
  booking_code: string;
  customer_name: string;
  product_name: string;
  amount: number;
  status: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  bookings_count: number;
  price: number;
}

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  successBookings: number;
  failedBookings: number;
  totalProducts: number;
  totalCustomers: number;
  totalRevenue: number;
  totalExpense: number;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: ShoppingBag, label: "Booking", href: "/admin/booking" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: DollarSign, label: "Revenue", href: "/admin/revenue" },
  { icon: BarChart3, label: "Marketing", href: "/admin/marketing" },
  { icon: Globe, label: "SEO", href: "/admin/seo" },
  { icon: FileText, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingBookings: 0,
    successBookings: 0,
    failedBookings: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    totalExpense: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    const [
      bookingsRes,
      productsRes,
      customersRes,
      transactionsRes,
      recentBookingsRes,
      topProductsRes,
    ] = await Promise.all([
      supabase.from("bookings").select("status"),
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("transactions").select("amount, type"),
      supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("products").select("*").order("bookings_count", { ascending: false }).limit(5),
    ]);

    const bookingsData = bookingsRes.data || [];
    const transactionsData = transactionsRes.data || [];

    const totalRevenue = transactionsData
      .filter((t: { type: string }) => t.type === "income")
      .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
    const totalExpense = transactionsData
      .filter((t: { type: string }) => t.type === "expense")
      .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);

    setStats({
      totalBookings: bookingsData.length,
      pendingBookings: bookingsData.filter((b: { status: string }) => b.status === "pending").length,
      successBookings: bookingsData.filter((b: { status: string }) => b.status === "success").length,
      failedBookings: bookingsData.filter((b: { status: string }) => b.status === "failed").length,
      totalProducts: productsRes.count || 0,
      totalCustomers: customersRes.count || 0,
      totalRevenue,
      totalExpense,
    });
    setRecentBookings(recentBookingsRes.data || []);
    setTopProducts(topProductsRes.data || []);
    setLoading(false);
  };

  const statusColor: Record<string, string> = {
    success: "text-green-700 bg-green-100",
    pending: "text-yellow-700 bg-yellow-100",
    failed: "text-red-700 bg-red-100",
    refund: "text-purple-700 bg-purple-100",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-64 bg-gray-200 rounded-2xl" />
              <div className="h-64 bg-gray-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 bg-white border-r border-gray-200`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mctour.png" alt="mcTour" className="h-8 w-auto" />
            <span className="text-sm font-bold">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1"><X size={18} /></button>
        </div>
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                item.active
                  ? "bg-[#1565FF]/10 text-[#1565FF] font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 border-b bg-white/90 border-gray-200 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-gray-100"><Menu size={20} /></button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 w-64">
              <Search size={16} className="text-gray-400" />
              <input placeholder="Search..." className="bg-transparent outline-none text-sm w-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-gray-100">
              <Bell size={18} />
            </button>
            <button
              onClick={() => { localStorage.removeItem("mctour_admin_session"); window.location.href = "/admin"; }}
              className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
            <div className="w-8 h-8 rounded-full bg-[#1565FF] flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">Selamat datang kembali, Admin 👋</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="p-4 rounded-2xl border bg-white border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                  <ShoppingBag size={16} className="text-green-600" />
                </div>
              </div>
              <p className="text-lg font-bold">{stats.totalBookings}</p>
              <p className="text-[11px] text-gray-500">Total Booking</p>
            </div>
            <div className="p-4 rounded-2xl border bg-white border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                  <DollarSign size={16} className="text-purple-600" />
                </div>
              </div>
              <p className="text-lg font-bold">Rp {stats.totalRevenue.toLocaleString("id-ID")}</p>
              <p className="text-[11px] text-gray-500">Total Revenue</p>
            </div>
            <div className="p-4 rounded-2xl border bg-white border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Package size={16} className="text-blue-600" />
                </div>
              </div>
              <p className="text-lg font-bold">{stats.totalProducts}</p>
              <p className="text-[11px] text-gray-500">Total Produk</p>
            </div>
            <div className="p-4 rounded-2xl border bg-white border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Users size={16} className="text-orange-600" />
                </div>
              </div>
              <p className="text-lg font-bold">{stats.totalCustomers}</p>
              <p className="text-[11px] text-gray-500">Total Customer</p>
            </div>
          </div>

          {/* Booking Status */}
          <div className="p-4 rounded-2xl border bg-white border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold mb-3">Status Booking</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-3 rounded-xl text-center text-yellow-600 bg-yellow-50">
                <p className="text-xl font-bold">{stats.pendingBookings}</p>
                <p className="text-[10px] font-medium">Pending</p>
              </div>
              <div className="p-3 rounded-xl text-center text-green-600 bg-green-50">
                <p className="text-xl font-bold">{stats.successBookings}</p>
                <p className="text-[10px] font-medium">Success</p>
              </div>
              <div className="p-3 rounded-xl text-center text-red-600 bg-red-50">
                <p className="text-xl font-bold">{stats.failedBookings}</p>
                <p className="text-[10px] font-medium">Failed</p>
              </div>
              <div className="p-3 rounded-xl text-center text-purple-600 bg-purple-50">
                <p className="text-xl font-bold">{stats.totalBookings - stats.pendingBookings - stats.successBookings - stats.failedBookings}</p>
                <p className="text-[10px] font-medium">Lainnya</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Recent Bookings */}
            <div className="p-4 rounded-2xl border bg-white border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold mb-3">Booking Terbaru</h3>
              {recentBookings.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Belum ada data</p>
              ) : (
                <div className="space-y-2">
                  {recentBookings.map((b) => (
                    <div key={b.id} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{b.customer_name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{b.product_name}</p>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className="text-xs font-bold">Rp {b.amount.toLocaleString("id-ID")}</p>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${statusColor[b.status] || "text-gray-700 bg-gray-100"}`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Products */}
            <div className="p-4 rounded-2xl border bg-white border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold mb-3">Produk Terlaris</h3>
              {topProducts.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Belum ada data</p>
              ) : (
                <div className="space-y-2">
                  {topProducts.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50">
                      <div className="w-8 h-8 rounded-lg bg-[#1565FF]/10 flex items-center justify-center">
                        <Package size={14} className="text-[#1565FF]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[10px] text-gray-500">{p.category} · {p.bookings_count || 0} booking</p>
                      </div>
                      <p className="text-xs font-bold text-[#1565FF] shrink-0">
                        Rp {p.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Revenue Summary */}
          <div className="p-4 rounded-2xl border bg-white border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold mb-3">Revenue Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-gray-50">
                <DollarSign size={16} className="text-[#1565FF] mb-1" />
                <p className="text-base font-bold">Rp {stats.totalRevenue.toLocaleString("id-ID")}</p>
                <p className="text-[10px] text-gray-500">Total Income</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50">
                <TrendingUp size={16} className="text-[#1565FF] mb-1" />
                <p className="text-base font-bold">Rp {(stats.totalRevenue - stats.totalExpense).toLocaleString("id-ID")}</p>
                <p className="text-[10px] text-gray-500">Profit</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50">
                <Star size={16} className="text-[#1565FF] mb-1" />
                <p className="text-base font-bold">Rp {stats.totalExpense.toLocaleString("id-ID")}</p>
                <p className="text-[10px] text-gray-500">Total Expense</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50">
                <CreditCard size={16} className="text-[#1565FF] mb-1" />
                <p className="text-base font-bold">Rp {(stats.totalRevenue - stats.totalExpense).toLocaleString("id-ID")}</p>
                <p className="text-[10px] text-gray-500">Saldo</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
