require('dotenv').config();
const { createServerClient } = require('@supabase/ssr');

try {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
  console.log('Success! Supabase client initialized.');
} catch (e) {
  console.error('Error:', e.message);
}
