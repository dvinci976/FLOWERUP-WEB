import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
let client = null;
if (url && key?.startsWith('sb_publishable_')) {
  try {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
  } catch {
    if (import.meta.env.DEV) console.warn('[Flowerup] Supabase configuration is invalid. Check the two VITE_SUPABASE variables.');
  }
} else if (import.meta.env.DEV) {
  console.warn('[Flowerup] First Bloom saving is unavailable. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY using a browser-safe publishable key.');
}
export const supabase = client;
