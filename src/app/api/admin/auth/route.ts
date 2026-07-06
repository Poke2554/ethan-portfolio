import { NextResponse } from "next/server";

const adminPassword = process.env.ADMIN_PASSWORD ?? "ethan2026";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (body.password !== adminPassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
