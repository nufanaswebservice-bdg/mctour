// Simple state management using localStorage for wishlist, notifications, cart

export interface WishlistItem {
  id: string;
  name: string;
  price: string;
  emoji: string;
  type: "domestic" | "international";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "promo" | "info" | "booking";
}

export interface BookingItem {
  id: string;
  packageName: string;
  price: string;
  date: string;
  guests: number;
  status: "pending" | "paid" | "confirmed" | "completed";
  createdAt: string;
}

const WISHLIST_KEY = "mctour_wishlist";
const NOTIFICATIONS_KEY = "mctour_notifications";
const BOOKINGS_KEY = "mctour_bookings";

// Wishlist
export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToWishlist(item: WishlistItem): void {
  const list = getWishlist();
  if (!list.find((w) => w.id === item.id)) {
    list.push(item);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  }
}

export function removeFromWishlist(id: string): void {
  const list = getWishlist().filter((w) => w.id !== id);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

export function isInWishlist(id: string): boolean {
  return getWishlist().some((w) => w.id === id);
}

// Notifications
export function getNotifications(): Notification[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  if (!stored) {
    // Seed default notifications
    const defaults: Notification[] = [
      { id: "1", title: "Selamat Datang! 🎉", message: "Selamat datang di mcTour & Travel. Dapatkan diskon 20% untuk pemesanan pertama Anda!", read: false, createdAt: new Date().toISOString(), type: "promo" },
      { id: "2", title: "Promo Bali Trip", message: "Paket Bali 4D3N mulai Rp 2.5jt. Slot terbatas, booking sekarang!", read: false, createdAt: new Date(Date.now() - 3600000).toISOString(), type: "promo" },
      { id: "3", title: "Info Jadwal Umroh", message: "Keberangkatan Umroh Desember 2026 sudah dibuka. Daftar sekarang!", read: false, createdAt: new Date(Date.now() - 7200000).toISOString(), type: "info" },
    ];
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(stored);
}

export function markNotificationRead(id: string): void {
  const list = getNotifications();
  const idx = list.findIndex((n) => n.id === id);
  if (idx >= 0) {
    list[idx].read = true;
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(list));
  }
}

export function markAllNotificationsRead(): void {
  const list = getNotifications().map((n) => ({ ...n, read: true }));
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(list));
}

export function getUnreadCount(): number {
  return getNotifications().filter((n) => !n.read).length;
}

// Bookings
export function getBookings(): BookingItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(BOOKINGS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function createBooking(packageName: string, price: string, date: string, guests: number): BookingItem {
  const booking: BookingItem = {
    id: crypto.randomUUID(),
    packageName,
    price,
    date,
    guests,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const list = getBookings();
  list.unshift(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));

  // Add notification
  const notifs = getNotifications();
  notifs.unshift({
    id: crypto.randomUUID(),
    title: "Booking Dibuat ✅",
    message: `Booking ${packageName} berhasil dibuat. Silakan lakukan pembayaran.`,
    read: false,
    createdAt: new Date().toISOString(),
    type: "booking",
  });
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));

  return booking;
}

export function updateBookingStatus(id: string, status: BookingItem["status"]): void {
  const list = getBookings();
  const idx = list.findIndex((b) => b.id === id);
  if (idx >= 0) {
    list[idx].status = status;
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
  }
}
