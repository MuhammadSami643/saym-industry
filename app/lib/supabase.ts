import { createClient } from '@supabase/supabase-js';

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If placeholder string is present, fallback gracefully to the configured database
const isPlaceholder = (val?: string) =>
  !val ||
  val.includes('your_') ||
  val.includes('your-') ||
  val.includes('placeholder') ||
  val.includes('example');

const supabaseUrl = isPlaceholder(envUrl)
  ? 'https://usgibssilkfhjbqycnfj.supabase.co'
  : envUrl!;

const supabaseKey = isPlaceholder(envKey)
  ? 'sb_publishable_zvE12ZsBNfuFPumKKGfF8w_onRup94b'
  : envKey!;

export const supabase = createClient(supabaseUrl, supabaseKey);
