"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Package,
  Filter,
  MoreVertical,
} from "lucide-react";

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

const mockProducts = [
  { id: 1, name: "Tour Bali Paradise 4D3N", category: "Tour Domestik", price: 4500000, status: "active", bookings: 45 },
  { id: 2, name: "Tour Korea Autumn 5D4N", category: "Tour International", price: 15000000, status: "active", bookings: 32 },
  { id: 3, name: "Umroh Reguler 9 Hari", category: "Umroh", price: 32000000, status: "active", bookings: 28 },
  { id: 4, name: "Gathering Puncak 2D1N", category: "Gathering", price: 850000, status: "active", bookings: 67 },
  { id: 5, name: "Tour Japan Sakura 6D5N", category: "Tour International", price: 22000000, status: "active", bookings: 19 },
  { id: 6, name: "Rental Alphard Jakarta", category: "Rental", price: 2500000, status: "active", bookings: 54 },
  { id: 7, name: "Hotel Bali 3 Malam", category: "Hotel", price: 3200000, status: "inactive", bookings: 12 },
  { id: 8, name: "Tiket CGK - DPS PP", category: "Tiket Pesawat", price: 1800000, status: "active", bookings: 89 },
  { id: 9, name: "Visa Jepang", category: "Visa", price: 1200000, status: "active", bookings: 23 },
  { id: 10, name: "Haji Reguler 2025", category: "Haji", price: 150000000, status: "inactive", bookings: 5 },
  { id: 11, name: "Tour Europe Wonder 10D", category: "Tour International", price: 45000000, status: "active", bookings: 8 },
  { id: 12, name: "Tour Bromo Sunrise 2D1N", category: "Tour Domestik", price: 1500000, status: "active", bookings: 72 },
];

export default function ProductsPage() {
  const [categoryFilter, setCategoryFilter] = useState("Semua");

  const filtered = mockProducts.filter(
    (p) => categoryFilter === "Semua" || p.category === categoryFilter
  );

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
            <button className="inline-flex items-center gap-2 bg-[#1565FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors">
              <Plus className="w-4 h-4" />
              Tambah Produk
            </button>
          </div>
        </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#1565FF]/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#1565FF]" />
                </div>
                <button className="p-1 rounded hover:bg-gray-100">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
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
                <span className="text-xs text-gray-500">{product.bookings} booking</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Menampilkan {filtered.length} dari {mockProducts.length} produk
        </div>
      </div>
    </div>
  );
}
