import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const users = await req.json(); // array user dari Postman

    if (!Array.isArray(users) || !users.length) {
      return new Response(JSON.stringify({ error: 'No users provided' }), { status: 400 });
    }

    // Hash password
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        username: user.username,
        password_hash: await bcrypt.hash(user.password, 10),
        role: user.role
      }))
    );

    // Insert ke DB
    const { data, error } = await supabase.from('users').insert(hashedUsers);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    // Pastikan data tidak null sebelum .length
    const insertedCount = data ? data.length : 0;

    return new Response(JSON.stringify({ success: true, inserted: insertedCount }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
