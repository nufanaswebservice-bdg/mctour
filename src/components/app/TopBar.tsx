"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Heart, User } from "lucide-react";
import { getStoredAuth, User as UserType } from "@/lib/auth";
import { getNotifications, getUnreadCount, getWishlist, Notification } from "@/lib/store";
import AuthModal from "./AuthModal";
import NotificationPanel from "./NotificationPanel";
import ProfilePanel from "./ProfilePanel";

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [unread, setUnread] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Panels
  const [showAuth, setShowAuth] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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
          scrolled ? "glass-strong shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo-mctour.png"
              alt="mcTour & Travel"
              width={100}
              height={36}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>

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
              onClick={() => user ? setShowProfile(true) : setShowAuth(true)}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center active:scale-95 transition-all"
              aria-label="Profile"
            >
              {user ? (
                <span className="text-xs font-bold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
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
      <ProfilePanel isOpen={showProfile} onClose={() => setShowProfile(false)} user={user} onLogout={refresh} onLoginClick={() => { setShowProfile(false); setShowAuth(true); }} />
    </>
  );
}
