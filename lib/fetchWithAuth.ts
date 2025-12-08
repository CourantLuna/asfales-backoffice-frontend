import { logout } from "./services/authService";

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  // 1. Obtener token
  const stored = sessionStorage.getItem("asfales-admin");
  const token = stored ? JSON.parse(stored).token : null;

  if (!token) {
    console.warn("Token no disponible, cerrando sesión...");
    logout?.();
    throw new Error("No autenticado");
  }

  const headers: any = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };

  // 2. Ejecutar fetch
  const res = await fetch(input, { ...init, headers });

  // 3. Intentar parsear JSON de forma segura
  let data: any = {};
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    console.warn("Respuesta no es JSON válido.");
    data = {};
  }

  // 4. Detectar errores de autenticación
  const unauthorized =
    res.status === 401 ||
    res.status === 403 ||
    data?.errorInfo?.code === "auth/id-token-expired" ||
    data?.errorInfo?.code === "auth/invalid-id-token" ||
    data?.message?.toLowerCase?.().includes("token") ||
    data?.message?.toLowerCase?.().includes("auth");

  if (unauthorized) {
    console.error("Token inválido o expirado. Cerrando sesión...");
    logout?.();
    throw new Error("Sesión expirada o inválida");
  }

  // 5. Otros errores del backend
  if (!res.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  console.log("Respuesta OK", res, data);
  return data;
}
