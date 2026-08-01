"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Tag, Info, ShoppingBag } from "lucide-react";
import { Notification, markNotificationRead, markAllNotificationsRead } from "@/lib/store";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onRefresh: () => void;
}

const typeIcons = {
  promo: Tag,
  info: Info,
  booking: ShoppingBag,
};

const typeColors = {
  promo: "text-orange-600 bg-orange-50",
  info: "text-blue-600 bg-blue-50",
  booking: "text-green-600 bg-green-50",
};

export default function NotificationPanel({ isOpen, onClose, notifications, onRefresh }: NotificationPanelProps) {
  const handleMarkAll = () => {
    markAllNotificationsRead();
    onRefresh();
  };

  const handleRead = (id: string) => {
    markNotificationRead(id);
    onRefresh();
  };

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} menit lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} jam lalu`;
    return `${Math.floor(hours / 24)} hari lalu`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 glass-strong px-4 py-4 flex items-center justify-between border-b border-primary/5">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-primary" />
                <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-dark-text">
                  Notifikasi
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkAll}
                  className="text-[11px] text-primary font-semibold active:opacity-70"
                >
                  Tandai Semua
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-dark-text/5 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="p-4 space-y-2">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell size={32} className="text-muted/30 mx-auto mb-2" />
                  <p className="text-sm text-muted">Belum ada notifikasi</p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const Icon = typeIcons[notif.type];
                  const colorClass = typeColors[notif.type];
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleRead(notif.id)}
                      className={`p-3 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer ${
                        notif.read
                          ? "bg-white/50 border-transparent"
                          : "bg-white border-primary/10 shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-dark-text truncate">{notif.title}</h3>
                            {!notif.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 ml-2" />}
                          </div>
                          <p className="text-[11px] text-muted mt-0.5 line-clamp-2">{notif.message}</p>
                          <p className="text-[10px] text-muted/60 mt-1">{formatTime(notif.createdAt)}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
