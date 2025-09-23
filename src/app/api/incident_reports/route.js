import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('incident_reports')
      .select(`
        id,
        description,
        location,
        status,
        photo_url,
        created_at,
        assets!incident_reports_asset_id_fkey (
          id,
          name
        ),
        users!incident_reports_reported_by_fkey (
          id,
          username
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map hasil biar lebih rapi: asset_name & reported_by_name langsung keluar
    const mapped = data.map((row) => ({
      id: row.id,
      description: row.description,
      location: row.location,
      status: row.status,
      photo_url: row.photo_url,
      created_at: row.created_at,
      asset_id: row.assets?.id || null,
      asset_name: row.assets?.name || null,
      reported_by_id: row.users?.id || null,
      reported_by_name: row.users?.username || null,
    }));

    return NextResponse.json({ data: mapped });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('incident_reports')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}