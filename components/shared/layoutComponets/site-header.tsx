"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { usePathname } from "next/navigation";
import { BellIcon } from "lucide-react";

type SiteHeaderProps = {
  children?: React.ReactNode;
};

export function SiteHeader({ children }: SiteHeaderProps) {
  const pathname = usePathname();

  // Obtener el último segmento de la ruta y capitalizar
  const routeName = pathname
    ? pathname.split("/").filter(Boolean).slice(-1)[0]
    : "";
  const title = routeName ? routeName.charAt(0).toUpperCase() + routeName.slice(1) : "Home";

  return (
    <div>
      <header className="h-16 items-center shrink-0 gap-2 w-full flex">
        <div className="flex w-full h-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="shadow-secondary/20 shadow-xl" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className=" text-primary text-2xl font-bold">{title}</h1>
          <div className="ml-auto flex items-center gap-2">
        

          </div>
        </div>
      </header>

      {/* Render children debajo del header */}
      {children}
    </div>
  );
}
