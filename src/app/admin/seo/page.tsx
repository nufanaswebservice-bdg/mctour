"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Globe,
  CheckCircle,
  AlertTriangle,
  Edit3,
  X,
  Save,
} from "lucide-react";

const initialPages = [
  { id: 1, path: "/", title: "MC Tour & Travel - Jasa Tour Terpercaya", metaDesc: "MC Tour Travel menyediakan paket tour domestik, internasional, umroh, haji, gathering, rental mobil dan tiket pesawat.", score: 92, status: "good" },
  { id: 2, path: "/tour-domestik", title: "Tour Domestik - Paket Wisata Indonesia", metaDesc: "Jelajahi keindahan Indonesia dengan paket tour domestik terbaik.", score: 85, status: "good" },
  { id: 3, path: "/tour-internasional", title: "Tour Internasional", metaDesc: "", score: 45, status: "needs_improvement" },
  { id: 4, path: "/umroh", title: "Paket Umroh 2025 - MC Tour Travel", metaDesc: "Paket umroh reguler dan plus dengan bimbingan ustadz berpengalaman.", score: 88, status: "good" },
  { id: 5, path: "/gathering", title: "Gathering", metaDesc: "Paket gathering perusahaan", score: 38, status: "needs_improvement" },
  { id: 6, path: "/rental", title: "Rental Mobil Jakarta - Sewa Mobil Murah", metaDesc: "Rental mobil Jakarta murah dan terpercaya. Alphard, Innova, HiAce tersedia.", score: 90, status: "good" },
  { id: 7, path: "/hotel", title: "Booking Hotel", metaDesc: "", score: 30, status: "needs_improvement" },
  { id: 8, path: "/blog", title: "Blog Travel Tips - MC Tour Travel", metaDesc: "Tips dan informasi seputar perjalanan, wisata, dan travel hacks.", score: 78, status: "good" },
];

export default function SeoPage() {
  const [pages, setPages] = useState(initialPages);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const startEdit = (page: typeof initialPages[0]) => {
    setEditingId(page.id);
    setEditTitle(page.title);
    setEditDesc(page.metaDesc);
  };

  const saveEdit = () => {
    setPages(pages.map(p => {
      if (p.id === editingId) {
        const newScore = editTitle.length > 30 && editDesc.length > 50 ? 85 : editTitle.length > 20 ? 60 : p.score;
        return { ...p, title: editTitle, metaDesc: editDesc, score: newScore, status: newScore >= 70 ? "good" : "needs_improvement" };
      }
      return p;
    }));
    setEditingId(null);
  };

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
            <Globe className="w-6 h-6 text-[#1565FF]" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
              <p className="text-gray-500 text-sm mt-1">Optimasi mesin pencari untuk semua halaman</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{pages.filter(p => p.status === "good").length}</p>
            <p className="text-xs text-gray-500 mt-1">Halaman Optimal</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{pages.filter(p => p.status === "needs_improvement").length}</p>
            <p className="text-xs text-gray-500 mt-1">Perlu Perbaikan</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-[#1565FF]">{Math.round(pages.reduce((s, p) => s + p.score, 0) / pages.length)}</p>
            <p className="text-xs text-gray-500 mt-1">Rata-rata Skor</p>
          </div>
        </div>

        {/* Pages List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <h2 className="font-semibold text-gray-900">Halaman Website</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {pages.map((page) => (
              <div key={page.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                {editingId === page.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#1565FF]">{page.path}</span>
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="inline-flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
                          <Save className="w-3 h-3" /> Simpan
                        </button>
                        <button onClick={() => setEditingId(null)} className="inline-flex items-center gap-1 text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300">
                          <X className="w-3 h-3" /> Batal
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Meta Title</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
                      />
                      <p className="text-xs text-gray-400 mt-1">{editTitle.length}/60 karakter</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Meta Description</label>
                      <textarea
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        rows={2}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
                      />
                      <p className="text-xs text-gray-400 mt-1">{editDesc.length}/160 karakter</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-[#1565FF]">{page.path}</span>
                        {page.status === "good" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-900 font-medium truncate">{page.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {page.metaDesc || <span className="italic text-amber-500">Meta description kosong</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-center">
                        <p className={`text-lg font-bold ${page.score >= 70 ? "text-green-600" : "text-amber-600"}`}>{page.score}</p>
                        <p className="text-xs text-gray-400">Score</p>
                      </div>
                      <button onClick={() => startEdit(page)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#1565FF]">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
