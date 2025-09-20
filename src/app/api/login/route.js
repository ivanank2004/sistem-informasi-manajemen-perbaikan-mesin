import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { username, password } = await req.json();

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !user) {
    return new Response(JSON.stringify({ error: 'User tidak ditemukan' }), { status: 401 });
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    return new Response(JSON.stringify({ error: 'Password salah' }), { status: 401 });
  }

  // Buat JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Kembalikan cookie
  const response = new Response(JSON.stringify({ success: true }), { status: 200 });
  response.headers.append(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`
  );

  return response;
}
