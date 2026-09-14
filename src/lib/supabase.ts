import { createClient } from '@supabase/supabase-js';

// The Supabase client requires the base project URL, so we trim the /rest/v1/ suffix
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bgisovunlvicsltvbnsu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fXEktlabAZArog0xPRUTqw_0giQpyVc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
