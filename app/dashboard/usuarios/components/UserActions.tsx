"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

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
      await fetchWithAuth("/api/admin/users", {
        method: "DELETE",
        body: JSON.stringify({ uid: user.uid }),
      });

      onUserDeleted(); // refresca la lista
    } catch (err: any) {
      console.error(err);
      alert(err.message || "No se pudo eliminar usuario");
    }
  }

  async function handleAssignRole() {
    const newRole = prompt("Nuevo rol (user/admin):", user.role || "user");
    if (!newRole) return;

    try {
      await fetchWithAuth("/api/admin/users", {
        method: "PUT",
        body: JSON.stringify({ uid: user.uid, role: newRole }),
      });

      onUserDeleted(); // refresca la lista
    } catch (err: any) {
      console.error(err);
      alert(err.message || "No se pudo asignar el rol");
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleAssignRole}>
        Asignar rol
      </Button>
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Eliminar
      </Button>
    </div>
  );
}
