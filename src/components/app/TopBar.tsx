"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Heart, User, LogOut } from "lucide-react";
import { getStoredAuth, User as UserType } from "@/lib/auth";
import { getNotifications, getUnreadCount, getWishlist, Notification } from "@/lib/store";
import AuthModal from "./AuthModal";
import NotificationPanel from "./NotificationPanel";
import ProfilePanel from "./ProfilePanel";

export default function TopBar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [unread, setUnread] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Panels
  const [showAuth, setShowAuth] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const isLoggedIn = !!session?.user || !!user;
  const displayName = session?.user?.name || user?.name || "";
  const displayInitial = displayName ? displayName.charAt(0).toUpperCase() : "";
  const avatarUrl = session?.user?.image || null;

  const refresh = () => {
    const auth = getStoredAuth();
    setUser(auth.user);
    setUnread(getUnreadCount());
    setWishlistCount(getWishlist().length);
    setNotifications(getNotifications());
  };

  useEffect(() => {
    refresh();
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-blue-100/70 backdrop-blur-xl border-b border-blue-200/30 shadow-sm"
            : "bg-blue-50/50 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-mctour.png"
              alt="mcTour"
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Brand Text - Center */}
          <div className="flex-1 text-center px-2">
            <span className="text-sm md:text-base font-bold font-[family-name:var(--font-heading)] text-primary tracking-tight">
              MCTOUR <span className="text-dark-text">&amp; TRAVEL</span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Notifications */}
            <button
              onClick={() => setShowNotifs(true)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/5 active:scale-95 transition-all"
              aria-label="Notifikasi"
            >
              <Bell size={19} className="text-dark-text/70" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/5 active:scale-95 transition-all"
              aria-label="Wishlist"
            >
              <Heart size={19} className="text-dark-text/70" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <button
              onClick={() => isLoggedIn ? setShowProfile(true) : (window.location.href = "/login")}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center active:scale-95 transition-all overflow-hidden"
              aria-label="Profile"
            >
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : displayInitial ? (
                <span className="text-xs font-bold text-primary">{displayInitial}</span>
              ) : (
                <User size={17} className="text-primary" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Modals */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={refresh} />
      <NotificationPanel isOpen={showNotifs} onClose={() => setShowNotifs(false)} notifications={notifications} onRefresh={refresh} />
      <ProfilePanel
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        user={user}
        googleUser={session?.user || null}
        onLogout={refresh}
        onLoginClick={() => { setShowProfile(false); window.location.href = "/login"; }}
      />
    </>
  );
}
