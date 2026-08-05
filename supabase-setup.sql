-- ============================================
-- MC TOUR & TRAVEL - DATABASE SETUP
-- Run this in Supabase SQL Editor (SQL tab)
-- ============================================

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin (password: McTour@Admin2026)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@mctourtravel.com', '$2a$10$defaulthash_replace_later', 'Admin mcTour', 'superadmin')
ON CONFLICT (email) DO NOTHING;

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  product_name TEXT NOT NULL,
  product_category TEXT,
  amount BIGINT NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price BIGINT NOT NULL DEFAULT 0,
  description TEXT,
  status TEXT DEFAULT 'active',
  bookings_count INT DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  total_bookings INT DEFAULT 0,
  total_spent BIGINT DEFAULT 0,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Revenue/Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount BIGINT NOT NULL,
  type TEXT NOT NULL, -- 'income' or 'expense'
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
('website_name', 'MC Tour & Travel'),
('email', 'info@mctourtravel.com'),
('phone', '0818548833'),
('whatsapp', '62818548833'),
('address', 'Mall Ambasador, Jl. Prof. DR. Satrio Lantai LG Blok A69, Jakarta Selatan'),
('instagram', 'https://www.instagram.com/mctourtravel/'),
('youtube', 'https://www.youtube.com/@mctourtravel'),
('facebook', 'https://facebook.com/mctourtravel')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies: Allow all for authenticated (since admin uses service key)
CREATE POLICY "Allow all for anon" ON bookings FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON products FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON customers FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON transactions FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON settings FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON admin_users FOR ALL USING (true);
