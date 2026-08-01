import { Metadata } from "next";
import dynamic from "next/dynamic";

const EventOrganizerSection = dynamic(() => import("@/components/sections/EventOrganizerSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export const metadata: Metadata = {
  title: "Outbound & Team Building - Program Seru untuk Tim Anda",
  description:
    "Program outbound dan team building profesional untuk perusahaan, sekolah, dan komunitas. Aktivitas seru, aman, dan berkesan.",
};

export default function OutboundPage() {
  return (
    <div className="pt-24">
      <EventOrganizerSection />
      <CTASection />
    </div>
  );
}
