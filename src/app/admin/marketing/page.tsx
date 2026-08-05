"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Megaphone,
  TrendingUp,
  MousePointerClick,
  Target,
  DollarSign,
} from "lucide-react";

const mockCampaigns = [
  {
    id: 1,
    name: "Google Ads - Tour Bali",
    platform: "Google Ads",
    spend: 5000000,
    clicks: 3200,
    conversions: 48,
    roas: 4.2,
    status: "active",
  },
  {
    id: 2,
    name: "Meta Ads - Umroh Promo",
    platform: "Meta Ads",
    spend: 3500000,
    clicks: 2800,
    conversions: 35,
    roas: 5.8,
    status: "active",
  },
  {
    id: 3,
    name: "TikTok - Tour Korea",
    platform: "TikTok Ads",
    spend: 2000000,
    clicks: 5600,
    conversions: 22,
    roas: 3.1,
    status: "active",
  },
  {
    id: 4,
    name: "Google Ads - Gathering",
    platform: "Google Ads",
    spend: 1500000,
    clicks: 1200,
    conversions: 18,
    roas: 3.8,
    status: "paused",
  },
  {
    id: 5,
    name: "Meta Ads - Rental Mobil",
    platform: "Meta Ads",
    spend: 1000000,
    clicks: 980,
    conversions: 15,
    roas: 3.5,
    status: "active",
  },
  {
    id: 6,
    name: "TikTok - Tour Japan",
    platform: "TikTok Ads",
    spend: 2500000,
    clicks: 4200,
    conversions: 12,
    roas: 2.8,
    status: "paused",
  },
];

const platformColors: Record<string, string> = {
  "Google Ads": "bg-blue-500",
  "Meta Ads": "bg-indigo-500",
  "TikTok Ads": "bg-gray-900",
};

export default function MarketingPage() {
  const totalSpend = mockCampaigns.reduce((s, c) => s + c.spend, 0);
  const totalClicks = mockCampaigns.reduce((s, c) => s + c.clicks, 0);
  const totalConversions = mockCampaigns.reduce((s, c) => s + c.conversions, 0);
  const avgRoas = (mockCampaigns.reduce((s, c) => s + c.roas, 0) / mockCampaigns.length).toFixed(1);

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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Spend</p>
                <p className="text-lg font-bold text-gray-900">Rp {totalSpend.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <MousePointerClick className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Clicks</p>
                <p className="text-lg font-bold text-gray-900">{totalClicks.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Conversions</p>
                <p className="text-lg font-bold text-gray-900">{totalConversions}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg ROAS</p>
                <p className="text-lg font-bold text-gray-900">{avgRoas}x</p>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${platformColors[campaign.platform]}`} />
                  <span className="text-xs font-medium text-gray-500">{campaign.platform}</span>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  campaign.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {campaign.status === "active" ? "Active" : "Paused"}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-4">{campaign.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Spend</p>
                  <p className="text-sm font-bold text-gray-900">Rp {campaign.spend.toLocaleString("id-ID")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Clicks</p>
                  <p className="text-sm font-bold text-gray-900">{campaign.clicks.toLocaleString("id-ID")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conversions</p>
                  <p className="text-sm font-bold text-gray-900">{campaign.conversions}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ROAS</p>
                  <p className="text-sm font-bold text-green-600">{campaign.roas}x</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
