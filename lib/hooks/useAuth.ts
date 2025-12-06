import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUser } from "@/types/User";
import { auth } from "../firebase";

/**
 * Lo que guardamos en sessionStorage
 */
interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

type LoginPayload =
  | { token: string | null; user: AuthUser } // nuevo flujo
  | AuthUser;                                 // legacy

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const STORAGE_KEY = "asfales-admin";

  // Utility: detecta si es el formato nuevo
function isNewPayload(obj: any): obj is { token: string | null; user: AuthUser } {
  return (
    obj &&
    typeof obj === "object" &&
    Object.prototype.hasOwnProperty.call(obj, "token") &&
    Object.prototype.hasOwnProperty.call(obj, "user")
  );
}


  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setUser(null);
        setToken(null);
        return;
      }

      const parsed = JSON.parse(stored);

      if (isNewPayload(parsed)) {
        // Nuevo formato
        setToken(parsed.token);
        setUser(parsed.user);
        
      } else {
        // Formato legacy: era solo el user
        setToken(null);
        setUser(parsed as AuthUser);
      }
    } catch (err) {
      console.error("useAuth error parsing storage", err);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Permite:
   * - login({ token, user })
   * - login(user)
   */
function login(payload: LoginPayload) {
  // console.log("PAYLOAD RECIBIDO:", payload);

  let state: AuthState;

  if (isNewPayload(payload)) {
    state = { token: payload.token ?? null, user: payload.user ?? null };
    // ⬅️ NUEVO: Guardar token en cookie para middleware
      if (state.token) {
        document.cookie = `asfales-admin=${state.token}; path=/; secure; sameSite=strict`;
      }
  } else {
    state = { token: null, user: payload ?? null };
    // ⬅️ Limpia cookie si no hay token
      document.cookie = "asfales-admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  }

  // Guardar en sessionStorage
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
  }
  setToken(state.token);
  setUser(state.user);
  router.refresh();
}

  async function logout() {
   try {
    // 1️⃣ Cerrar sesión en Firebase
    await auth.signOut();

    // 2️⃣ Limpiar sessionStorage
    sessionStorage.removeItem("asfales-admin");

    // 3️⃣ Limpiar cookie
    document.cookie = "asfales-admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 4️⃣ Redirigir al login
    window.location.href = "/login";
  } catch (error: any) {
    console.error("Error al cerrar sesión:", error);
    alert("No se pudo cerrar sesión correctamente.");
  }
  }

  return { user, token, login, logout, loading };
}
