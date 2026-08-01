"use client";

import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-background">
      {/* Main content */}
      <main className="pb-24 md:pb-0 md:max-w-7xl md:mx-auto">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation - mobile only */}
      <BottomNav />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
