// app/api/work_orders/route.ts
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('work_orders')
      .select(`
        id,
        asset_id,
        reported_by,
        assigned_to,
        description,
        status,
        priority,
        created_at,
        maintenance_type
      `);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500 });
  }
}
