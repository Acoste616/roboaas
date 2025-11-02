// Supabase client setup
// For production, install: npm install @supabase/supabase-js

let createClientFn: any;

try {
  const supabaseModule = require('@supabase/supabase-js');
  createClientFn = supabaseModule.createClient;
} catch (error) {
  console.warn('[Supabase] Package not installed. Using mock mode.');
  createClientFn = null;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// For development/testing, create a mock client if env vars are not set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Environment variables not set. Using mock mode.');
}

export const supabase = (supabaseUrl && supabaseAnonKey && createClientFn)
  ? createClientFn(supabaseUrl, supabaseAnonKey)
  : {
      // Mock Supabase client for development
      from: (table: string) => ({
        insert: async (data: any) => {
          console.log('[MOCK Supabase] Insert to', table, ':', data);
          return { data, error: null };
        },
        select: async () => {
          console.log('[MOCK Supabase] Select from', table);
          return { data: [], error: null };
        },
        update: async (data: any) => {
          console.log('[MOCK Supabase] Update in', table, ':', data);
          return { data, error: null };
        },
        delete: async () => {
          console.log('[MOCK Supabase] Delete from', table);
          return { data: null, error: null };
        }
      })
    } as any;
