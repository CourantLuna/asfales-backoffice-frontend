"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type User = {
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
};

type Props = {
  user: User;
  onUserDeleted: () => void;
};

export default function UserActions({ user, onUserDeleted }: Props) {
  async function handleDelete() {
    if (!confirm(`¿Eliminar usuario ${user.email}?`)) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid }),
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      onUserDeleted();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar usuario");
    }
  }

  async function handleAssignRole() {
    const newRole = prompt("Nuevo rol (user/admin):", user.role || "user");
    if (!newRole) return;

    try {
      const res = await fetch("/api/admin/users/assign-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, role: newRole }),
      });
      if (!res.ok) throw new Error("Error al asignar rol");
      onUserDeleted(); // refresca la lista
    } catch (err) {
      console.error(err);
      alert("No se pudo asignar el rol");
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleAssignRole}>Asignar rol</Button>
      <Button variant="destructive" size="sm" onClick={handleDelete}>Eliminar</Button>
    </div>
  );
}
