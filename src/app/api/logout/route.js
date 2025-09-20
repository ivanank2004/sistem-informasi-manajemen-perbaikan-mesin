export async function POST() {
  const response = new Response(JSON.stringify({ success: true }), { status: 200 });
  response.headers.append(
    'Set-Cookie',
    `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
  );
  return response;
}
