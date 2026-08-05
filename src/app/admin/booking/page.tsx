"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";

const mockBookings = [
  { id: "BK-001", customer: "Ahmad Fauzi", product: "Tour Bali Paradise 4D3N", amount: 4500000, status: "pending", date: "2024-12-20" },
  { id: "BK-002", customer: "Siti Rahayu", product: "Umroh Reguler 9 Hari", amount: 32000000, status: "success", date: "2024-12-19" },
  { id: "BK-003", customer: "Budi Santoso", product: "Tour Korea Autumn 5D4N", amount: 15000000, status: "success", date: "2024-12-18" },
  { id: "BK-004", customer: "Dewi Lestari", product: "Gathering Puncak 2D1N", amount: 850000, status: "failed", date: "2024-12-18" },
  { id: "BK-005", customer: "Rizki Pratama", product: "Rental Alphard Jakarta", amount: 2500000, status: "pending", date: "2024-12-17" },
  { id: "BK-006", customer: "Nur Hidayah", product: "Tour Japan Sakura 6D5N", amount: 22000000, status: "refund", date: "2024-12-16" },
  { id: "BK-007", customer: "Eko Prasetyo", product: "Hotel Bali 3 Malam", amount: 3200000, status: "success", date: "2024-12-15" },
  { id: "BK-008", customer: "Fitri Handayani", product: "Visa Jepang", amount: 1200000, status: "pending", date: "2024-12-15" },
  { id: "BK-009", customer: "Dian Permata", product: "Tiket Pesawat CGK-DPS", amount: 1800000, status: "success", date: "2024-12-14" },
  { id: "BK-010", customer: "Hendra Wijaya", product: "Tour Europe Wonder 10D", amount: 45000000, status: "pending", date: "2024-12-14" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  success: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  refund: "bg-purple-100 text-purple-700",
};

export default function BookingPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockBookings.filter((b) => {
    const matchSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.product.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1565FF] mb-4">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Booking</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola semua pesanan dan transaksi</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari booking ID, customer, atau produk..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="refund">Refund</option>
                </select>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 bg-[#1565FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Produk</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-[#1565FF]">{booking.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{booking.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">{booking.product}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      Rp {booking.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{booking.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#1565FF]" title="Lihat Detail">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-500 hover:text-green-600" title="Approve">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600" title="Reject">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>Tidak ada booking ditemukan</p>
            </div>
          )}
          <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
            Menampilkan {filtered.length} dari {mockBookings.length} booking
          </div>
        </div>
      </div>
    </div>
  );
}
