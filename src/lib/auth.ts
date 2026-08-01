// Simple client-side auth using localStorage
// In production, replace with proper backend auth (NextAuth, Supabase, etc.)

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const AUTH_KEY = "mctour_auth";
const USERS_KEY = "mctour_users";

export function getStoredAuth(): AuthState {
  if (typeof window === "undefined") return { user: null, isAuthenticated: false };
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return { user: null, isAuthenticated: false };
  try {
    const user = JSON.parse(stored) as User;
    return { user, isAuthenticated: true };
  } catch {
    return { user: null, isAuthenticated: false };
  }
}

export function getStoredUsers(): User[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as User[];
  } catch {
    return [];
  }
}

export function register(name: string, email: string, phone: string, password: string): { success: boolean; message: string } {
  const users = getStoredUsers();
  const existing = users.find((u) => u.email === email);
  if (existing) return { success: false, message: "Email sudah terdaftar" };

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    createdAt: new Date().toISOString(),
  };

  // Store user in users list (with password hash simulation)
  const allUsers = [...users, newUser];
  localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));

  // Store password separately (simplified - in production use proper hashing)
  localStorage.setItem(`mctour_pwd_${email}`, password);

  // Auto login
  localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));

  return { success: true, message: "Registrasi berhasil" };
}

export function login(email: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return { success: false, message: "Email tidak ditemukan" };

  const storedPwd = localStorage.getItem(`mctour_pwd_${email}`);
  if (storedPwd !== password) return { success: false, message: "Password salah" };

  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return { success: true, message: "Login berhasil", user };
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function updateProfile(updates: Partial<User>): User | null {
  const { user } = getStoredAuth();
  if (!user) return null;

  const updatedUser = { ...user, ...updates };
  localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));

  // Update in users list too
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    users[idx] = updatedUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  return updatedUser;
}
