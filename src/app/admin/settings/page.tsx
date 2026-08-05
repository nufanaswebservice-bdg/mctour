"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Settings,
  Globe,
  CreditCard,
  MessageCircle,
  Share2,
  Save,
  Loader2,
} from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [websiteInfo, setWebsiteInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    whatsapp: "",
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
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    twitter: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("settings")
      .select("*");
    if (data) {
      const settingsMap: Record<string, string> = {};
      data.forEach((s: { key: string; value: string }) => {
        settingsMap[s.key] = s.value;
      });
      setWebsiteInfo({
        name: settingsMap["website_name"] || "",
        email: settingsMap["website_email"] || "",
        phone: settingsMap["website_phone"] || "",
        address: settingsMap["website_address"] || "",
        whatsapp: settingsMap["website_whatsapp"] || "",
      });
      setPayment({
        midtransServerKey: settingsMap["midtrans_server_key"] || "",
        midtransClientKey: settingsMap["midtrans_client_key"] || "",
        isProduction: settingsMap["midtrans_production"] === "true",
      });
      setWhatsappApi({
        apiKey: settingsMap["wa_api_key"] || "",
        phoneNumberId: settingsMap["wa_phone_number_id"] || "",
        autoReply: settingsMap["wa_auto_reply"] !== "false",
      });
      setSocial({
        instagram: settingsMap["social_instagram"] || "",
        facebook: settingsMap["social_facebook"] || "",
        tiktok: settingsMap["social_tiktok"] || "",
        youtube: settingsMap["social_youtube"] || "",
        twitter: settingsMap["social_twitter"] || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const settingsToSave: Record<string, string> = {
      website_name: websiteInfo.name,
      website_email: websiteInfo.email,
      website_phone: websiteInfo.phone,
      website_address: websiteInfo.address,
      website_whatsapp: websiteInfo.whatsapp,
      midtrans_server_key: payment.midtransServerKey,
      midtrans_client_key: payment.midtransClientKey,
      midtrans_production: payment.isProduction.toString(),
      wa_api_key: whatsappApi.apiKey,
      wa_phone_number_id: whatsappApi.phoneNumberId,
      wa_auto_reply: whatsappApi.autoReply.toString(),
      social_instagram: social.instagram,
      social_facebook: social.facebook,
      social_tiktok: social.tiktok,
      social_youtube: social.youtube,
      social_twitter: social.twitter,
    };

    for (const [key, value] of Object.entries(settingsToSave)) {
      await supabase
        .from("settings")
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
    }
    setSaving(false);
    alert("Pengaturan berhasil disimpan!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-48 bg-gray-200 rounded-xl" />
            <div className="h-48 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

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
              <input type="text" value={websiteInfo.name} onChange={(e) => setWebsiteInfo({ ...websiteInfo, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <input type="email" value={websiteInfo.email} onChange={(e) => setWebsiteInfo({ ...websiteInfo, email: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Telepon</label>
              <input type="text" value={websiteInfo.phone} onChange={(e) => setWebsiteInfo({ ...websiteInfo, phone: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">WhatsApp</label>
              <input type="text" value={websiteInfo.whatsapp} onChange={(e) => setWebsiteInfo({ ...websiteInfo, whatsapp: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-600 mb-1 block">Alamat</label>
              <textarea value={websiteInfo.address} onChange={(e) => setWebsiteInfo({ ...websiteInfo, address: e.target.value })} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
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
              <input type="password" value={payment.midtransServerKey} onChange={(e) => setPayment({ ...payment, midtransServerKey: e.target.value })} placeholder="SB-Mid-server-xxxxx" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Client Key</label>
              <input type="password" value={payment.midtransClientKey} onChange={(e) => setPayment({ ...payment, midtransClientKey: e.target.value })} placeholder="SB-Mid-client-xxxxx" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isProduction" checked={payment.isProduction} onChange={(e) => setPayment({ ...payment, isProduction: e.target.checked })} className="rounded border-gray-300" />
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
              <input type="password" value={whatsappApi.apiKey} onChange={(e) => setWhatsappApi({ ...whatsappApi, apiKey: e.target.value })} placeholder="Masukkan API key" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Phone Number ID</label>
              <input type="text" value={whatsappApi.phoneNumberId} onChange={(e) => setWhatsappApi({ ...whatsappApi, phoneNumberId: e.target.value })} placeholder="Masukkan Phone Number ID" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="autoReply" checked={whatsappApi.autoReply} onChange={(e) => setWhatsappApi({ ...whatsappApi, autoReply: e.target.checked })} className="rounded border-gray-300" />
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
                <input type="url" value={value} onChange={(e) => setSocial({ ...social, [key]: e.target.value })} placeholder={`https://${key}.com/username`} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565FF]/20 focus:border-[#1565FF]" />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#1565FF] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1253d4] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      </div>
    </div>
  );
}
