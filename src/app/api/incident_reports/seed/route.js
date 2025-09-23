import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Ambil field dari form
    const asset_id = formData.get('asset_id');
    const reported_by = formData.get('reported_by');
    const description = formData.get('description');
    const location = formData.get('location');
    const status = formData.get('status') || 'reported';

    // Ambil file foto
    const file = formData.get('photo');
    let photo_url = null;

    if (file && file.name) {
      // Convert file ke buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = `incident_reports/${Date.now()}-${file.name}`;

      // Upload ke Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('simm')
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error(uploadError);
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }

      // Generate public URL
      const { data: publicUrlData } = supabase.storage
        .from('simm')
        .getPublicUrl(filePath);

      photo_url = publicUrlData.publicUrl;
    }

    // Insert ke tabel incident_reports
    const { data, error } = await supabase
      .from('incident_reports')
      .insert([
        {
          asset_id,
          reported_by,
          description,
          location,
          status,
          photo_url,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Incident report berhasil ditambahkan', data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
