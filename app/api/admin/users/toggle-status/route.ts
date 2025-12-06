// app/api/admin/users/route.ts
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

async function getAuthToken(req: Request) {
  const idToken = req.headers.get("Authorization");

  if (!idToken) {
    throw new Error("Token no enviado");
  }

  return idToken;
}
// POST /api/admin/users/toggle-status
export async function POST(req: Request) {
  try {
    const idToken = await getAuthToken(req);
    const { uid, disabled } = await req.json();

    const res = await fetch(`${BACKEND_URL}/admin/users/toggle-status`, {
      method: "POST",
      headers: { "Authorization": idToken, "Content-Type": "application/json" },
      body: JSON.stringify({ uid, disabled }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Error toggle status" }, { status: 500 });
  }
}
