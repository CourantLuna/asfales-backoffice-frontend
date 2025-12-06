import { logout } from "./services/authService";

// lib/fetchWithAuth.ts
export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {

  // Leer token desde sessionStorage
  const stored = sessionStorage.getItem("asfales-admin");
  if (!stored) {
    logout?.(); // opcional: llamar logout
    throw new Error("No hay token disponible. Redirigiendo al login...");
  }

  const parsed = JSON.parse(stored);
  const token: string | null = parsed?.token ?? null;

  if (!token) {
    logout?.();
    throw new Error("Token inválido. Redirigiendo al login...");
  }

  // Construir headers con token
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };

  const res = await fetch(input, { ...init, headers });
  const data = await res.json();

  // Detectar expiración de token
  if (!res.ok && data.errorInfo?.code === "auth/id-token-expired") {
    logout?.();
    throw new Error("Sesión expirada. Por favor inicia sesión nuevamente.");
  }

  if (!res.ok) throw new Error(data.message || "Error en la petición");

  return data;
}
