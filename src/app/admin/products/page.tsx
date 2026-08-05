"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Plus,
  Package,
  Filter,
  Trash2,
  X,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  status: string;
  bookings_count: number;
  created_at: string;
}

const categories = [
  "Semua",
  "Tour Domestik",
  "Tour International",
  "Gathering",
  "Umroh",
  "Haji",
  "Rental",
  "Hotel",
  "Tiket Pesawat",
  "Visa",
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Tour Domestik",
    price: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    const { error } = await supabase.from("products").insert([
      {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description,
        status: formData.status,
        bookings_count: 0,
      },
    ]);
    if (!error) {
      setShowForm(false);
      setFormData({ name: "", category: "Tour Domestik", price: "", description: "", status: "active" });
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchProducts();
  };

  const filtered = products.filter(
    (p) => categoryFilter === "Semua" || p.category === categoryFilter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl" />
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
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
              <p className="text-gray-500 text-sm mt-1">Kelola semua produk dan layanan</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-[#1565FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Produk
            </button>
          </div>
        </div>

        {/* Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Tambah Produk Baru</h2>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Nama Produk" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]">
                  {categories.filter(c => c !== "Semua").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input type="number" placeholder="Harga (Rp)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <textarea placeholder="Deskripsi (opsional)" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" rows={2} />
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]">
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
                <button onClick={handleAdd} className="w-full bg-[#1565FF] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors">
                  Simpan Produk
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? "bg-[#1565FF] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#1565FF] hover:text-[#1565FF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Belum ada data</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1565FF]/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#1565FF]" />
                  </div>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{product.category}</p>
                <p className="text-lg font-bold text-gray-900 mb-3">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.status === "active" ? "Aktif" : "Nonaktif"}
                  </span>
                  <span className="text-xs text-gray-500">{product.bookings_count || 0} booking</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          Menampilkan {filtered.length} dari {products.length} produk
        </div>
      </div>
    </div>
  );
}
