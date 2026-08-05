import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin Dashboard - mcTour & Travel", template: "%s | Admin mcTour" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
