"use client";

import { Suspense } from "react";
import { redirect } from "next/navigation";


export default function Page() {
  // redirect("/login");
  return (
    <Suspense fallback={<div>cargando...</div>}>
      {/* <LandingSections /> */}
    </Suspense>
  );
}
