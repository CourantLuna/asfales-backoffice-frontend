// asfales-web-frontend/app/(auth)/Login/page.tsx
"use client";

import { loginUser } from "@/lib/services/authService";
import { auth } from "@/lib/firebase";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SlidesShow from "@/components/ui/slides-show";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useAuth } from "@/lib/hooks/useAuth";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { ForgotPasswordDialog } from "@/components/ForgotPasswordDialog";
import { AuthUser } from "@/types/User";

const slides = [
  {
    image:
      "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/PlanificandoViajes1-VgJQXuxaQGpZ9zOLcuLR0TNSdBmwaX.jpg",
    title: "Panel Administrativo Asfales",
    description: "Gestiona usuarios, permisos y configuraciones internas.",
  },
  {
    image:
      "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/kenny-krosky-2xjk8WWLFC4-unsplash-byOEQMlZx8asiMNaN1oLGIqZt9siUQ.jpg",
    title: "Control de Contenido",
    description: "Administra destinos, actividades, itinerarios y reservas.",
  },
  {
    image:
      "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/ethan-hoover-mHmOArWg2wY-unsplash%20%281%29-AAPgPPt8eiuNglT19U9Rzm7JlhmZFn.jpg",
    title: "Herramientas de Operación",
    description: "Optimiza procesos internos y supervisa la plataforma.",
  },
];


export default function LoginPage() {
  const router = useRouter();
const { login: saveAuth, user, token } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

const onSubmit = async (values: any) => {
  try {
    const { token, user } = await loginUser(values.email, values.password);
    saveAuth({ token, user });
    router.push("/dashboard");
  } catch (error: any) {
    let message = error.message || error.code || "Ocurrió un error, intenta de nuevo.";
    console.log("Login error:", error);

    if (error.code === "auth/invalid-credential") {
      message = "Credenciales inválidas.";
    } else if (error.code.includes("auth/too-many-requests") ) {
      message = "Demasiados intentos fallidos. Intenta más tarde.";
    }
    else if (error.code.includes("auth/user-disabled")) {
      message = "Usuario deshabilitado";
    }

    form.setError("email", { message });
  }
};

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Background overlay */}
   <div
  className="absolute inset-0 -z-10 bg-cover bg-center pointer-events-none"
  style={{
    backgroundImage: `url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly%20la%20vista%20es%20desde%20encima%20de%20las%20nubes%2C%20vista%20desde%20un%20avion%2C%20en%20la%20toma%20hay%20nubes%20por%20arriba%20%281%29-OhzihO4aGu38K4tHjMwiVAhWXOLcPP.jpg')`,
  }}
>
  <div className="absolute inset-0 bg-white/75 backdrop-blur-sm" />
</div>


      {/* Slideshow */}
      <div className="hidden lg:flex w-1/2 p-2">
        <SlidesShow slides={slides} aspectRatio="filled" />
      </div>


      {/* Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 h-full" >
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="text-center mb-0 justify-center flex flex-col items-center mb-5">
            <img
              src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/20-vRibJMLzjhkcZHiTmRHZbI477Lks4r.png"
              alt="Asfales Logo"
             className="w-auto h-[10vh] mb-5"
            />
                            <h1 className="md:text-5xl text-4xl font-bold text-primary">Asfales Backoffice</h1>

          </div>
          <Card className="shadow-lg border-none rounded-lg lg:h-[auto] flex flex-col bg-secondary/70">
            <CardContent className="space-y-6 pt-6 overflow-y-auto">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">Bienvenido Administrador</h2>
                <p className="text-sm text-muted-foreground">
                      Acceso exclusivo para administradores del sistema
                </p>
              </div>
              {/* Form */}
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={control}
                    name="email"
                    rules={{
                      required: "El correo es requerido",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email inválido",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Correo electrónico
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ejemplo@asfales.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="password"
                    rules={{
                      required: "La contraseña es requerida",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Contraseña
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((o) => !o)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />



                  <Button
                    type="submit"
                    disabled={!isValid}
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed h-[48px]"
                  >
                    Iniciar sesión
                  </Button>
                </form>
              </Form>

              

              {/* Fuera del form de login */}
<div className="mt-2 text-right">
  <ForgotPasswordDialog />
</div>
            </CardContent>
            
          
          </Card>
        </div>
      </div>
    </div>
  );
}
