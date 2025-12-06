import { logout } from "./services/authService";

// lib/fetchWithAuth.ts
export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const stored = sessionStorage.getItem("asfales-admin");
  const token = stored ? JSON.parse(stored).token : null;

  if (!token) throw new Error("Token no disponible");

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };

  const res = await fetch(input, { ...init, headers });

  let data: any = {};
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    console.warn("No JSON recibido, body vacío?");
    data = {};
  }

  if (!res.ok && data.errorInfo?.code === "auth/id-token-expired") {
    // llamar logout si quieres
    throw new Error("Sesión expirada");
  }

  if (!res.ok) throw new Error(data.message || "Error en la petición");

  return data;
}

