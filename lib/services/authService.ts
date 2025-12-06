import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  
} from "firebase/auth";

import { auth } from "../firebase";
import { AuthUser } from "@/types/User";

export async function loginUser(
  email: string, 
  password: string
): Promise<{ token: string; user: AuthUser }> {

  // Iniciar sesión con Firebase
  const userCred = await signInWithEmailAndPassword(auth, email, password);

  // Obtener token
  const idToken = await userCred.user.getIdToken();

  // Llamar al backend a través de Next.js API Route
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

    const data = await res.json();


// Si el backend devuelve un error, lanzar con el mensaje que venga
  if (!res.ok) {
    throw new Error(data.message || "Error al obtener perfil de usuario");
  }

  const profile: AuthUser = data;

  return { token: idToken, user: profile };
}

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<void> {
  const photoURLGenerated = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`;

 const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      phoneNumber: "",
      photoURL: photoURLGenerated,
      disabled: false,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al registrarse");
  }

}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false, // true si quieres manejar el link dentro de la app
    });
    return { success: true, message: "Correo de restablecimiento enviado." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};  


export const logout = async () => {
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
};


