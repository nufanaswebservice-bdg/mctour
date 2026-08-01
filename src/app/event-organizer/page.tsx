import { Metadata } from "next";
import dynamic from "next/dynamic";

const EventOrganizerSection = dynamic(() => import("@/components/sections/EventOrganizerSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export const metadata: Metadata = {
  title: "Event Organizer - Gathering Perusahaan & Family Day",
  description:
    "Jasa event organizer profesional untuk company gathering, family gathering, team building, school trip, dan study tour.",
};

export default function EventOrganizerPage() {
  return (
    <div className="pt-24">
      <EventOrganizerSection />
      <CTASection />
    </div>
  );
}
