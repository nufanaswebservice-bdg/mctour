"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Plus,
  X,
} from "lucide-react";

interface Booking {
  id: string;
  booking_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_name: string;
  product_category: string;
  amount: number;
  status: string;
  notes: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  success: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  refund: "bg-purple-100 text-purple-700",
};

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    booking_code: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    product_name: "",
    product_category: "",
    amount: "",
    status: "pending",
    notes: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setBookings(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    const { error } = await supabase.from("bookings").insert([
      {
        booking_code: formData.booking_code,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        product_name: formData.product_name,
        product_category: formData.product_category,
        amount: Number(formData.amount),
        status: formData.status,
        notes: formData.notes,
      },
    ]);
    if (!error) {
      setShowForm(false);
      setFormData({ booking_code: "", customer_name: "", customer_email: "", customer_phone: "", product_name: "", product_category: "", amount: "", status: "pending", notes: "" });
      fetchBookings();
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);
    if (!error) fetchBookings();
  };

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      b.product_name.toLowerCase().includes(search.toLowerCase()) ||
      b.booking_code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Booking</h1>
              <p className="text-gray-500 text-sm mt-1">Kelola semua pesanan dan transaksi</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-[#1565FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Booking
            </button>
          </div>
        </div>

        {/* Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Tambah Booking Baru</h2>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Booking Code (e.g. BK-001)" value={formData.booking_code} onChange={(e) => setFormData({ ...formData, booking_code: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <input type="text" placeholder="Nama Customer" value={formData.customer_name} onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <input type="email" placeholder="Email Customer" value={formData.customer_email} onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <input type="text" placeholder="Phone Customer" value={formData.customer_phone} onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <input type="text" placeholder="Nama Produk" value={formData.product_name} onChange={(e) => setFormData({ ...formData, product_name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <input type="text" placeholder="Kategori Produk" value={formData.product_category} onChange={(e) => setFormData({ ...formData, product_category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <input type="number" placeholder="Amount (Rp)" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <textarea placeholder="Catatan (opsional)" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" rows={2} />
                <button onClick={handleAdd} className="w-full bg-[#1565FF] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors">
                  Simpan Booking
                </button>
              </div>
            </div>
          </div>
        )}

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
                    <td className="px-4 py-3 text-sm font-medium text-[#1565FF]">{booking.booking_code}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{booking.customer_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">{booking.product_name}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      Rp {booking.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[booking.status] || "bg-gray-100 text-gray-700"}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(booking.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#1565FF]" title="Lihat Detail">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, "success")}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-gray-500 hover:text-green-600"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, "failed")}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600"
                          title="Reject"
                        >
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
              <p>Belum ada data</p>
            </div>
          )}
          <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
            Menampilkan {filtered.length} dari {bookings.length} booking
          </div>
        </div>
      </div>
    </div>
  );
}
