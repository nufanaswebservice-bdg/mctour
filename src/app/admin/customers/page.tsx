"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Users,
  Filter,
  Mail,
  Phone,
} from "lucide-react";

const mockCustomers = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad.fauzi@gmail.com", phone: "081234567890", totalBookings: 5, totalSpent: 75000000, memberSince: "2023-03-15", status: "vip" },
  { id: 2, name: "Siti Rahayu", email: "siti.rahayu@yahoo.com", phone: "085678901234", totalBookings: 3, totalSpent: 48000000, memberSince: "2023-06-20", status: "active" },
  { id: 3, name: "Budi Santoso", email: "budi.s@outlook.com", phone: "087890123456", totalBookings: 8, totalSpent: 120000000, memberSince: "2022-11-10", status: "vip" },
  { id: 4, name: "Dewi Lestari", email: "dewi.lestari@gmail.com", phone: "082345678901", totalBookings: 1, totalSpent: 850000, memberSince: "2024-12-01", status: "new" },
  { id: 5, name: "Rizki Pratama", email: "rizki.p@gmail.com", phone: "089012345678", totalBookings: 4, totalSpent: 35000000, memberSince: "2023-09-05", status: "active" },
  { id: 6, name: "Nur Hidayah", email: "nur.hidayah@gmail.com", phone: "081456789012", totalBookings: 2, totalSpent: 54000000, memberSince: "2024-01-22", status: "active" },
  { id: 7, name: "Eko Prasetyo", email: "eko.prasetyo@company.co.id", phone: "083567890123", totalBookings: 6, totalSpent: 92000000, memberSince: "2023-01-08", status: "vip" },
  { id: 8, name: "Fitri Handayani", email: "fitri.h@gmail.com", phone: "086789012345", totalBookings: 1, totalSpent: 1200000, memberSince: "2024-11-15", status: "new" },
  { id: 9, name: "Dian Permata", email: "dian.permata@mail.com", phone: "084678901234", totalBookings: 3, totalSpent: 28000000, memberSince: "2024-04-10", status: "active" },
  { id: 10, name: "Hendra Wijaya", email: "hendra.w@corp.id", phone: "088901234567", totalBookings: 10, totalSpent: 250000000, memberSince: "2022-05-18", status: "vip" },
];

const statusColors: Record<string, string> = {
  active: "bg-blue-100 text-blue-700",
  vip: "bg-amber-100 text-amber-700",
  new: "bg-green-100 text-green-700",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockCustomers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
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
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-[#1565FF]" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Customer</h1>
              <p className="text-gray-500 text-sm mt-1">Daftar pelanggan terdaftar</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, email, atau nomor telepon..."
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
                <option value="active">Active</option>
                <option value="vip">VIP</option>
                <option value="new">New</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kontak</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Total Booking</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Total Spent</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Member Since</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1565FF]/10 flex items-center justify-center text-[#1565FF] font-semibold text-xs">
                          {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {customer.email}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {customer.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{customer.totalBookings}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      Rp {customer.totalSpent.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{customer.memberSince}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium uppercase ${statusColors[customer.status]}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>Tidak ada customer ditemukan</p>
            </div>
          )}
          <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
            Menampilkan {filtered.length} dari {mockCustomers.length} customer
          </div>
        </div>
      </div>
    </div>
  );
}
