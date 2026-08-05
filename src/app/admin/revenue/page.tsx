"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  Filter,
  Plus,
  X,
} from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: string;
  category: string;
  created_at: string;
}

export default function RevenuePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("month");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "income",
    category: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setTransactions(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    const { error } = await supabase.from("transactions").insert([
      {
        description: formData.description,
        amount: Number(formData.amount),
        type: formData.type,
        category: formData.category,
      },
    ]);
    if (!error) {
      setShowForm(false);
      setFormData({ description: "", amount: "", type: "income", category: "" });
      fetchTransactions();
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const profit = totalIncome - totalExpense;

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
              <h1 className="text-2xl font-bold text-gray-900">Revenue & Keuangan</h1>
              <p className="text-gray-500 text-sm mt-1">Laporan keuangan dan transaksi</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-[#1565FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Transaksi
              </button>
            </div>
          </div>
        </div>

        {/* Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Tambah Transaksi</h2>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Deskripsi" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <input type="number" placeholder="Amount (Rp)" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <input type="text" placeholder="Kategori (opsional)" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
                <button onClick={handleAdd} className="w-full bg-[#1565FF] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors">
                  Simpan Transaksi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Income</p>
                <p className="text-lg font-bold text-gray-900">Rp {totalIncome.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Expense</p>
                <p className="text-lg font-bold text-gray-900">Rp {totalExpense.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Profit</p>
                <p className="text-lg font-bold text-gray-900">Rp {profit.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Jumlah Transaksi</p>
                <p className="text-lg font-bold text-gray-900">{transactions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Riwayat Transaksi</h2>
          </div>
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>Belum ada data</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Deskripsi</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tipe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(tx.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{tx.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{tx.category || "-"}</td>
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
          )}
        </div>
      </div>
    </div>
  );
}
