"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserActions from "./UserActions";
import AddUserModal from "./AddUserModal";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/useAuth";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

type User = {
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
};

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    
    async function fetchUsers() {
    try {
      const data = await fetchWithAuth("/api/admin/users", { method: "GET" });
      setUsers(data || []);
    } catch (err: any) {
      console.error(err.message);
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Usuarios</h2>
        <AddUserModal onUserAdded={fetchUsers} />
      </div>

        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>UID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>{user.uid}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.displayName || "-"}</TableCell>
                <TableCell>{user.role || "user"}</TableCell>
                <TableCell>
                  <UserActions user={user} onUserDeleted={fetchUsers} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
 
    </div>
  );
}
