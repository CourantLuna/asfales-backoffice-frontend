// app/api/admin/users/route.ts
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

async function getAuthToken(req: Request) {
  const idToken = req.headers.get("Authorization");
  console.log("Token recibido en proxy:", idToken);

  if (!idToken) {
    throw new Error("Token no enviado");
  }

  return idToken;
}

// GET /api/admin/users
export async function GET(req: Request) {
  try {
    const idToken = await getAuthToken(req);

    const res = await fetch(`${BACKEND_URL}/admin/users`, {
      method: "GET",
      headers: {
        "Authorization": idToken,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("API /api/admin/users GET Error:", error);
    return NextResponse.json(
      { message: error.message || "Error interno GET /admin/users" },
      { status: error.message === "Token no enviado" ? 401 : 500 }
    );
  }
}

// POST /api/admin/users
export async function POST(req: Request) {
  try {
    const idToken = await getAuthToken(req);
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/admin/users`, {
      method: "POST",
      headers: {
        "Authorization": idToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("API /api/admin/users POST Error:", error);
    return NextResponse.json(
      { message: error.message || "Error interno POST /admin/users" },
      { status: error.message === "Token no enviado" ? 401 : 500 }
    );
  }
}

// DELETE /api/admin/users
export async function DELETE(req: Request) {
  try {
    const idToken = await getAuthToken(req);
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/admin/users`, {
      method: "DELETE",
      headers: {
        "Authorization": idToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("API /api/admin/users DELETE Error:", error);
    return NextResponse.json(
      { message: error.message || "Error interno DELETE /admin/users" },
      { status: error.message === "Token no enviado" ? 401 : 500 }
    );
  }
}

// PUT /api/admin/users (asignar rol)
export async function PUT(req: Request) {
  try {
    const idToken = await getAuthToken(req);
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/admin/users/assign-role`, {
      method: "POST", // backend espera POST
      headers: {
        "Authorization": idToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("API /api/admin/users/assign-role Error:", error);
    return NextResponse.json(
      { message: error.message || "Error interno PUT /admin/users/assign-role" },
      { status: error.message === "Token no enviado" ? 401 : 500 }
    );
  }
}
