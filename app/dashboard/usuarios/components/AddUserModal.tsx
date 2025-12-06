"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/useAuth";

type Props = {
  onUserAdded: () => void;
};

export default function AddUserModal({ onUserAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  // Obtiene token de Firebase usando tu hook useAuth
  const { token } = useAuth();

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      alert("No se pudo obtener el token de autenticación");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // <-- agrega token aquí
        },
        body: JSON.stringify({ email, displayName, password, role }),
      });

      if (!res.ok) throw new Error("Error creando usuario");

      onUserAdded();
      setOpen(false);
      setEmail("");
      setDisplayName("");
      setPassword("");
      setRole("user");
    } catch (err) {
      console.error(err);
      alert("No se pudo crear el usuario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Agregar Usuario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateUser} className="flex flex-col gap-4 mt-2">
          <Input
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Nombre"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Rol (user/admin)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear Usuario"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
