"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Megaphone,
  ExternalLink,
  Settings,
} from "lucide-react";

export default function MarketingPage() {
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
            <Megaphone className="w-6 h-6 text-[#1565FF]" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marketing & Ads</h1>
              <p className="text-gray-500 text-sm mt-1">Performa kampanye iklan digital</p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1565FF]/10 flex items-center justify-center mx-auto mb-4">
            <Megaphone className="w-8 h-8 text-[#1565FF]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Hubungkan Google Ads / Meta Ads untuk melihat data marketing
          </h2>
          <p className="text-gray-500 text-sm mb-6 max-w-lg mx-auto">
            Untuk menampilkan data performa kampanye iklan, Anda perlu menghubungkan akun Google Ads atau Meta Ads terlebih dahulu.
          </p>

          {/* Setup Instructions */}
          <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto text-left">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Cara Setup Integrasi
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1565FF] text-white text-xs flex items-center justify-center font-bold">1</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Google Ads</p>
                  <p className="text-xs text-gray-500 mt-0.5">Buat API credentials di Google Ads Developer Console, lalu masukkan Client ID dan Client Secret di halaman Settings.</p>
                  <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#1565FF] hover:underline mt-1">
                    Buka Google Ads <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1565FF] text-white text-xs flex items-center justify-center font-bold">2</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Meta Ads (Facebook & Instagram)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Buat App di Meta for Developers, aktifkan Marketing API, lalu masukkan Access Token di halaman Settings.</p>
                  <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#1565FF] hover:underline mt-1">
                    Buka Meta Developers <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1565FF] text-white text-xs flex items-center justify-center font-bold">3</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">TikTok Ads (Opsional)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Daftarkan app di TikTok for Business dan hubungkan via API token.</p>
                  <a href="https://ads.tiktok.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#1565FF] hover:underline mt-1">
                    Buka TikTok Ads <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
