import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const GatheringPage = dynamic(() => import("@/components/gathering/GatheringPage"));

export const metadata: Metadata = {
  title: "Corporate Gathering & Team Building - Event Organizer Profesional",
  description:
    "mcTour & Travel menyediakan layanan gathering perusahaan, team building, outbound, amazing race, gala dinner, outing kantor, family gathering, dan school trip terbaik di Indonesia.",
  openGraph: {
    title: "Corporate Gathering & Team Building - mcTour & Travel",
    description: "Ciptakan kebersamaan tim dengan pengalaman gathering terbaik.",
  },
};

export default function EventOrganizerPage() {
  return (
    <AppShell>
      <TopBar />
      <GatheringPage />
    </AppShell>
  );
}
