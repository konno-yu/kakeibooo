import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
console.log(supabaseUrl);
console.log(supabaseAnonKey);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
