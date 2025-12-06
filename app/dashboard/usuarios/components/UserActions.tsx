"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { User } from "@/models/user.model";

type Props = {
  user: User;
  handleRefresh: () => void;
};

export default function UserActions({ user, handleRefresh }: Props) {

const [loading, setLoading] = useState(false);

  async function handleToggleStatus() {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/admin/users/toggle-status", {
  method: "POST",
  body: JSON.stringify({ uid: user.uid, disabled: !user.disabled }),
});


      console.log(res.message);
      handleRefresh(); // refresca lista
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error al actualizar estado de usuario");
    } finally {
      setLoading(false);
    }
  }
  
    async function handleDelete() {
    if (!confirm(`¿Eliminar usuario ${user.email}?`)) return;

    try {
      await fetchWithAuth("/api/admin/users", {
        method: "DELETE",
        body: JSON.stringify({ uid: user.uid }),
      });

      handleRefresh(); // refresca la lista
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

      handleRefresh(); // refresca la lista
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
      <Button variant={user.disabled ? "outline" : "default"} size="sm" className="min-w-32" onClick={handleToggleStatus} disabled={loading}>
        {user.disabled ? "Habilitar" : "Deshabilitar"}
      </Button>
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Eliminar
      </Button>
    </div>
  );
}
