import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Event Organizer - Gathering Perusahaan & Family Day",
  description: "Jasa event organizer profesional untuk company gathering, family gathering, team building, school trip, dan study tour.",
};

export default function EventOrganizerPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="pt-4 px-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Event <span className="gradient-text">Organizer</span>
        </h1>
        <p className="text-sm text-muted mb-6">Partner terbaik untuk setiap event Anda</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { emoji: "🏢", title: "Company Gathering" },
            { emoji: "👨‍👩‍👧‍👦", title: "Family Gathering" },
            { emoji: "🏕️", title: "Outbound" },
            { emoji: "🤝", title: "Team Building" },
            { emoji: "🎯", title: "Employee Gathering" },
            { emoji: "🎒", title: "School Trip" },
            { emoji: "📚", title: "Study Tour" },
            { emoji: "🎉", title: "Event Khusus" },
          ].map((item) => (
            <div key={item.title} className="glass-card p-4 text-center active:scale-[0.97] transition-transform">
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-xs font-semibold text-dark-text mt-2">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <CTABanner />
    </AppShell>
  );
}
