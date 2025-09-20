import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { data: user } = await supabase
      .from('users')
      .select('id, username, role')
      .eq('id', decoded.id)
      .single();

    if (!user) return new Response(JSON.stringify({ error: 'User tidak ditemukan' }), { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }
}
