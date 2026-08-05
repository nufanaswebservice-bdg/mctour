"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  Globe,
  CreditCard,
  MessageCircle,
  Share2,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [websiteInfo, setWebsiteInfo] = useState({
    name: "MC Tour & Travel",
    email: "info@mctourtravel.com",
    phone: "081234567890",
    address: "Jl. Raya No. 123, Jakarta Selatan",
    whatsapp: "6281234567890",
  });

  const [payment, setPayment] = useState({
    midtransServerKey: "",
    midtransClientKey: "",
    isProduction: false,
  });

  const [whatsappApi, setWhatsappApi] = useState({
    apiKey: "",
    phoneNumberId: "",
    autoReply: true,
  });

  const [social, setSocial] = useState({
    instagram: "https://instagram.com/mctourtravel",
    facebook: "https://facebook.com/mctourtravel",
    tiktok: "https://tiktok.com/@mctourtravel",
    youtube: "",
    twitter: "",
  });

  const handleSave = () => {
    alert("Settings saved! (mock - data stored in state only)");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1565FF] mb-4">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-[#1565FF]" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
              <p className="text-gray-500 text-sm mt-1">Konfigurasi website dan integrasi</p>
            </div>
          </div>
        </div>

        {/* Website Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-[#1565FF]" />
            <h2 className="font-semibold text-gray-900">Informasi Website</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Nama Website</label>
              <input
                type="text"
                value={websiteInfo.name}
                onChange={(e) => setWebsiteInfo({ ...websiteInfo, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <input
                type="email"
                value={websiteInfo.email}
                onChange={(e) => setWebsiteInfo({ ...websiteInfo, email: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Telepon</label>
              <input
                type="text"
                value={websiteInfo.phone}
                onChange={(e) => setWebsiteInfo({ ...websiteInfo, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">WhatsApp</label>
              <input
                type="text"
                value={websiteInfo.whatsapp}
                onChange={(e) => setWebsiteInfo({ ...websiteInfo, whatsapp: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-600 mb-1 block">Alamat</label>
              <textarea
                value={websiteInfo.address}
                onChange={(e) => setWebsiteInfo({ ...websiteInfo, address: e.target.value })}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateway */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-[#1565FF]" />
            <h2 className="font-semibold text-gray-900">Payment Gateway (Midtrans)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Server Key</label>
              <input
                type="password"
                value={payment.midtransServerKey}
                onChange={(e) => setPayment({ ...payment, midtransServerKey: e.target.value })}
                placeholder="SB-Mid-server-xxxxx"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Client Key</label>
              <input
                type="password"
                value={payment.midtransClientKey}
                onChange={(e) => setPayment({ ...payment, midtransClientKey: e.target.value })}
                placeholder="SB-Mid-client-xxxxx"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isProduction"
                checked={payment.isProduction}
                onChange={(e) => setPayment({ ...payment, isProduction: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor="isProduction" className="text-sm text-gray-600">Mode Production</label>
            </div>
          </div>
        </div>

        {/* WhatsApp API */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-[#1565FF]" />
            <h2 className="font-semibold text-gray-900">WhatsApp API</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">API Key</label>
              <input
                type="password"
                value={whatsappApi.apiKey}
                onChange={(e) => setWhatsappApi({ ...whatsappApi, apiKey: e.target.value })}
                placeholder="Masukkan API key"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Phone Number ID</label>
              <input
                type="text"
                value={whatsappApi.phoneNumberId}
                onChange={(e) => setWhatsappApi({ ...whatsappApi, phoneNumberId: e.target.value })}
                placeholder="Masukkan Phone Number ID"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoReply"
                checked={whatsappApi.autoReply}
                onChange={(e) => setWhatsappApi({ ...whatsappApi, autoReply: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor="autoReply" className="text-sm text-gray-600">Auto Reply Aktif</label>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-[#1565FF]" />
            <h2 className="font-semibold text-gray-900">Social Media</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(social).map(([key, value]) => (
              <div key={key}>
                <label className="text-sm text-gray-600 mb-1 block capitalize">{key}</label>
                <input
                  type="url"
                  value={value}
                  onChange={(e) => setSocial({ ...social, [key]: e.target.value })}
                  placeholder={`https://${key}.com/username`}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-[#1565FF] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors"
          >
            <Save className="w-4 h-4" />
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
}
