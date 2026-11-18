import { createClient } from '@supabase/supabase-js';

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if valid active Supabase configuration is present
const isPlaceholderOrDead = (val?: string) =>
  !val ||
  val.includes('your_') ||
  val.includes('your-') ||
  val.includes('placeholder') ||
  val.includes('example') ||
  val.includes('usgibssilkfhjbqycnfj'); // Legacy dead/expired project that causes ENOTFOUND

export const isSupabaseConfigured =
  !isPlaceholderOrDead(envUrl) && !isPlaceholderOrDead(envKey);

const supabaseUrl = isSupabaseConfigured
  ? envUrl!
  : 'https://placeholder.supabase.co';

const supabaseKey = isSupabaseConfigured
  ? envKey!
  : 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  global: {
    fetch: (url, options = {}) => {
      // 1.5s fast timeout to prevent pages hanging for 16+ seconds on dead connections
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 1500);
      return fetch(url, {
        ...options,
        signal: controller.signal,
      }).finally(() => clearTimeout(id));
    },
  },
});
