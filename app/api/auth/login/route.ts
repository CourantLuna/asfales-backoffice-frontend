import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { message: "Token no enviado" },
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.BACKEND_URL}/users/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${idToken}` },
    });

    // Convertir a JSON sin volver a leer el body
    const data = await res.json();

    // Devolverlo tal cual al frontend
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("API /api/auth/login Error:", error);
    return NextResponse.json(
      { message: error.message || "Error interno en login" },
      { status: 500 }
    );
  }
}
