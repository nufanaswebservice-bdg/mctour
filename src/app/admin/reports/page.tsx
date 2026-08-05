"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  FileSpreadsheet,
  FileText,
  File,
  Download,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";

interface SummaryData {
  totalBookings: number;
  totalProducts: number;
  totalCustomers: number;
  totalRevenue: number;
}

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryData>({
    totalBookings: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [period, setPeriod] = useState("month");

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    setLoading(true);
    const [bookingsRes, productsRes, customersRes, transactionsRes] = await Promise.all([
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("transactions").select("amount, type"),
    ]);

    const totalRevenue = (transactionsRes.data || [])
      .filter((t: { type: string }) => t.type === "income")
      .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);

    setSummary({
      totalBookings: bookingsRes.count || 0,
      totalProducts: productsRes.count || 0,
      totalCustomers: customersRes.count || 0,
      totalRevenue,
    });
    setLoading(false);
  };

  const handleExport = (format: string) => {
    alert(`Export laporan dalam format ${format.toUpperCase()} (periode: ${period})`);
  };

  const summaryCards = [
    { label: "Total Booking", value: summary.totalBookings.toString(), icon: ShoppingCart, color: "bg-blue-500" },
    { label: "Produk Aktif", value: summary.totalProducts.toString(), icon: Package, color: "bg-green-500" },
    { label: "Revenue", value: `Rp ${summary.totalRevenue.toLocaleString("id-ID")}`, icon: DollarSign, color: "bg-amber-500" },
    { label: "Customers", value: summary.totalCustomers.toString(), icon: Users, color: "bg-pink-500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1565FF] mb-4">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Laporan & Report</h1>
              <p className="text-gray-500 text-sm mt-1">Ringkasan dan export data bisnis</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="quarter">Kuartal Ini</option>
                <option value="year">Tahun Ini</option>
              </select>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Export Laporan</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleExport("excel")}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export Excel
            </button>
            <button
              onClick={() => handleExport("csv")}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => handleExport("pdf")}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              <File className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryCards.map((item) => (
            <div key={item.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Laporan Tersedia</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { name: "Laporan Penjualan", desc: "Detail semua transaksi penjualan", type: "sales" },
              { name: "Laporan Produk Terlaris", desc: "Ranking produk berdasarkan booking", type: "products" },
              { name: "Laporan Customer", desc: "Data pelanggan dan segmentasi", type: "customers" },
              { name: "Laporan Keuangan", desc: "Income, expense, dan profit", type: "finance" },
              { name: "Laporan Marketing", desc: "Performa kampanye iklan", type: "marketing" },
              { name: "Laporan SEO & Traffic", desc: "Data traffic website dan SEO", type: "seo" },
            ].map((report) => (
              <div key={report.type} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{report.desc}</p>
                </div>
                <button className="inline-flex items-center gap-1 text-xs text-[#1565FF] hover:underline font-medium">
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
