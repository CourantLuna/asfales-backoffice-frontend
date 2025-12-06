"use client";

import * as React from "react";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarMenuBadge, SidebarSeparator, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/lib/hooks/useAuth";

import {
  Home, Users, Building2, Plane, Hotel, Wand2, Workflow, ScrollText,
  Map, Share2, Bell, LineChart, CreditCard, History, LogOut, ChevronDown
} from "lucide-react";
import { NavUser } from "./nav-user";

type MenuItem = {
  title: string;
  icon: React.ComponentType<any>;
  url?: string;
  items?: MenuItem[];
  badge?: React.ReactNode;
};

const menuConfig: { groups: { label?: string; items: MenuItem[] }[] } = {
  groups: [
    {
      items: [
        { title: "Dashboard", icon: Home, url: "/dashboard" }
      ]
    },
    {
      label: "ADMINISTRA",
      items: [
        { title: "Usuarios", icon: Users, url: "/usuarios" },
        {
          title: "Proveedores", icon: Building2, items: [
            { title: "Transporte", icon: Plane, url: "/proveedores/transporte" },
            { title: "Alojamientos", icon: Hotel, url: "/proveedores/alojamientos" },
            { title: "Experiencias", icon: Wand2, url: "/proveedores/experiencias" }
          ]
        }
      ]
    },
    {
      label: "OPCIONES DE VIAJE",
      items: [
        {
          title: "Opciones de Viaje", icon: Workflow, items: [
            { title: "Reservas", icon: ScrollText, url: "/reservas" },
            { title: "Itinerarios", icon: Map, url: "/itinerarios" },
            { title: "Viajes Compartidos", icon: Share2, url: "/viajes-compartidos" }
          ]
        }
      ]
    },
    {
      label: "GESTIONA",
      items: [
        { title: "Predicciones", icon: LineChart, url: "/predicciones" },
        { title: "Notificaciones", icon: Bell, url: "/notificaciones" },
        { title: "Pagos & Reembolsos", icon: CreditCard, url: "/pagos" }
      ]
    },
    {
      label: "AUDITA",
      items: [
        { title: "Logs del Sistema", icon: History, url: "/logs" }
      ]
    }
  ]
};

export function BackofficeSidebar() {
  const { state, setOpen } = useSidebar();
  const { logout, user } = useAuth();

  const renderMenuItem = (item: MenuItem) => {


    if (item.items) {
      return (
        <Collapsible key={item.title} defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton onClick={() => setOpen(true)}>
                <item.icon className="size-4" />
                <span>{item.title}</span>
                <SidebarMenuBadge>
                  <ChevronDown className="ml-auto h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuBadge>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items.map(sub => (
                  <SidebarMenuSubItem key={sub.title}>
                    <SidebarMenuSubButton asChild>
                      <Link href={sub.url!}>
                        <sub.icon className="size-4" />
                        {sub.title}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    } else {
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url!}>
              <item.icon className="size-4" />
              {item.title}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }
  };

 if(user)
  {
     return (
    <Sidebar collapsible="icon" variant="floating" noBorder noShadow>
      <SidebarContent className="bg-secondary text-primary rounded-xl gap-1">
        <SidebarHeader className="font-semibold text-lg">
          <div className="flex flex-row items-center">
            <img src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Logo%20asfales%20con%20circulo%20blanco%20fondo.png" alt="Asfales Logo" className="w-auto max-h-10" />
            {state !== "collapsed" && (
              <span className="text-sm font-extrabold ml-2 text-primary">
                ASFALES BACKOFFICE
              </span>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className={state === "expanded" ? "px-4" : ""}>
          {menuConfig.groups.map((group, i) => (
            <div key={i} className="mb-2">
              {state !== "collapsed" && group.label && (
                <div className="flex items-center mt-4 mb-0">
                  <span className="text-xs font-extrabold text-primary">{group.label}:</span>
                </div>
              )}
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map(renderMenuItem)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="bg-gray-400 h-[1px]" />
            </div>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <NavUser user={user} onLogout={logout} />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
  }
}
