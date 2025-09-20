import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { username, password, role } = await req.json();

  const password_hash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password_hash, role }])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data[0]), { status: 200 });
}
