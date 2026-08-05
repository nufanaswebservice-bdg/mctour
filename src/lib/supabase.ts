import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cpzdycdrzyioyeuvnvqj.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwemR5Y2Ryenlpb3lldXZudnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MTMzMTUsImV4cCI6MjEwMTQ4OTMxNX0.4VTBMJj-bbmfwSTT645tnHkJ0FzTINh3IjLBMXNV2Vw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
