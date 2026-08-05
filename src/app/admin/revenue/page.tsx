"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Percent,
  Receipt,
  Filter,
} from "lucide-react";

const mockTransactions = [
  { id: 1, date: "2024-12-20", description: "Booking Tour Bali - Ahmad Fauzi", amount: 4500000, type: "income" },
  { id: 2, date: "2024-12-20", description: "Komisi Agen - Tour Bali", amount: 450000, type: "expense" },
  { id: 3, date: "2024-12-19", description: "Booking Umroh - Siti Rahayu", amount: 32000000, type: "income" },
  { id: 4, date: "2024-12-19", description: "Biaya Operasional Umroh", amount: 28000000, type: "expense" },
  { id: 5, date: "2024-12-18", description: "Booking Tour Korea - Budi S", amount: 15000000, type: "income" },
  { id: 6, date: "2024-12-18", description: "Refund - Dewi Lestari", amount: 850000, type: "expense" },
  { id: 7, date: "2024-12-17", description: "Booking Rental Alphard - Rizki", amount: 2500000, type: "income" },
  { id: 8, date: "2024-12-16", description: "Google Ads Campaign", amount: 5000000, type: "expense" },
  { id: 9, date: "2024-12-16", description: "Booking Hotel Bali - Eko", amount: 3200000, type: "income" },
  { id: 10, date: "2024-12-15", description: "Gaji Karyawan Desember", amount: 25000000, type: "expense" },
  { id: 11, date: "2024-12-15", description: "Booking Tour Japan - Multiple", amount: 66000000, type: "income" },
  { id: 12, date: "2024-12-14", description: "Pajak PPN Desember", amount: 8500000, type: "expense" },
];

const summaryCards = [
  { label: "Total Revenue", value: "Rp 523.400.000", icon: DollarSign, color: "bg-blue-500" },
  { label: "Profit Bersih", value: "Rp 156.200.000", icon: TrendingUp, color: "bg-green-500" },
  { label: "Komisi", value: "Rp 42.800.000", icon: Percent, color: "bg-amber-500" },
  { label: "Pajak", value: "Rp 52.340.000", icon: Receipt, color: "bg-red-500" },
];

export default function RevenuePage() {
  const [period, setPeriod] = useState("month");

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
              <h1 className="text-2xl font-bold text-gray-900">Revenue & Keuangan</h1>
              <p className="text-gray-500 text-sm mt-1">Laporan keuangan dan transaksi</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="year">Tahun Ini</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{card.label}</p>
                  <p className="text-lg font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Riwayat Transaksi</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Deskripsi</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tipe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">{tx.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{tx.description}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "income" ? "+" : "-"} Rp {tx.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        tx.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {tx.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
