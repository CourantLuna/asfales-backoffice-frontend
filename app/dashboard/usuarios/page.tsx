
import React from "react";
import UsersTable from "./components/UsersTable";

export default function UsuariosPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* UsersTable ya incluye AddUserModal y UserActions dentro */}
      <UsersTable />
    </div>
  );
}
