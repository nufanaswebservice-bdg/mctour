"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Search,
  Users,
  Filter,
  Mail,
  Phone,
  Plus,
  X,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_bookings: number;
  total_spent: number;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  active: "bg-blue-100 text-blue-700",
  vip: "bg-amber-100 text-amber-700",
  new: "bg-green-100 text-green-700",
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "new",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setCustomers(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    const { error } = await supabase.from("customers").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        total_bookings: 0,
        total_spent: 0,
      },
    ]);
    if (!error) {
      setShowForm(false);
      setFormData({ name: "", email: "", phone: "", status: "new" });
      fetchCustomers();
    }
  };

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-64 bg-gray-200 rounded-xl" />
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
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-[#1565FF]" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manajemen Customer</h1>
                <p className="text-gray-500 text-sm mt-1">Daftar pelanggan terdaftar</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-[#1565FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Customer
            </button>
          </div>
        </div>

        {/* Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Tambah Customer Baru</h2>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Nama" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <input type="text" placeholder="No. Telepon" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]">
                  <option value="new">New</option>
                  <option value="active">Active</option>
                  <option value="vip">VIP</option>
                </select>
                <button onClick={handleAdd} className="w-full bg-[#1565FF] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors">
                  Simpan Customer
                </button>
              </div>
            </div>
          </div>
        )}

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
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{customer.total_bookings}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      Rp {customer.total_spent.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(customer.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium uppercase ${statusColors[customer.status] || "bg-gray-100 text-gray-700"}`}>
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
              <p>Belum ada data</p>
            </div>
          )}
          <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
            Menampilkan {filtered.length} dari {customers.length} customer
          </div>
        </div>
      </div>
    </div>
  );
}
