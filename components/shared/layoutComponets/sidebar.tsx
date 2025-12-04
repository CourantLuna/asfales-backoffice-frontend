"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
  SidebarMenuBadge,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";


import {
  Home,
  Users,
  Building2,
  Plane,
  Hotel,
  Wand2,
  Workflow,
  ScrollText,
  Map,
  Share2,
  Bell,
  LineChart,
  CreditCard,
  History,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar"


import Link from "next/link";

export function BackofficeSidebar() {

    const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating"   noBorder noShadow 
>
    <SidebarContent className="bg-secondary text-primary rounded-xl gap-1">
          {/* Header */}
      <SidebarHeader className="font-semibold text-lg">
        <div className="text-center mb-0 justify-start flex flex-row items-center">
            <img
              src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Logo%20asfales%20con%20circulo%20blanco%20fondo.png"
              alt="Asfales Logo"
             className="w-auto max-h-10  "
            />
            {!(state==="collapsed") && <span className="text-sm font-extrabold ml-2 text-nowrap text-primary ">ASFALES BACKOFFICE</span>}

          </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>

        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <Home className="size-4" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
<div className="text-center mb-0 justify-start flex flex-row items-center mt-4">
            
            {!(state==="collapsed") && <span className="text-xs font-extrabold ml-2 text-nowrap text-primary ">ADMINISTRA: </span>}

          </div>
        {/* Usuarios */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/usuarios">
                    <Users className="size-4" />
                     Usuarios
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

       {/* Proveedores colapsable */}
  <SidebarGroup>

  <SidebarGroupContent>
    <SidebarMenu>
      
      <Collapsible defaultOpen className="group/collapsible">

        {/* Botón principal */}
        <SidebarMenuItem>
          <CollapsibleTrigger asChild >
            <SidebarMenuButton>
              <Building2 className="size-4" />
              <span>Proveedores</span>
              <SidebarMenuBadge>
<ChevronDown className="ml-auto h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />

              </SidebarMenuBadge>
            </SidebarMenuButton>
          </CollapsibleTrigger>

          {/* Submenú */}
          <CollapsibleContent>
            <SidebarMenuSub>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/proveedores/transporte">
                    <Plane className="size-4" />
                    Transporte
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/proveedores/alojamientos">
                    <Hotel className="size-4" />
                    Alojamientos
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/proveedores/experiencias">
                    <Wand2 className="size-4" />
                    Experiencias
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>

      </Collapsible>
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>

    <SidebarSeparator className="bg-gray-400 h-[1px]" />

{/* Opciones de Viaje */}
<SidebarGroup>

  <SidebarGroupContent>
    <SidebarMenu>
      <Collapsible defaultOpen className="group/collapsible">

        {/* Trigger principal */}
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Workflow className="size-4" />
              <span>Opciones de Viaje</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
 <SidebarMenuBadge>
<ChevronDown className="ml-auto h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />

              </SidebarMenuBadge>
          {/* Submenú */}
          <CollapsibleContent>
            <SidebarMenuSub>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/reservas">
                    <ScrollText className="size-4" />
                    Reservas
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/itinerarios">
                    <Map className="size-4" />
                    Itinerarios
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/viajes-compartidos">
                    <Share2 className="size-4" />
                    Viajes Compartidos
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>

      </Collapsible>
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
    <SidebarSeparator className="bg-gray-400 h-[1px]" />

<div className="text-center mb-0 justify-start flex flex-row items-center mt-4">
            
            {!(state==="collapsed") && <span className="text-xs font-extrabold ml-2 text-nowrap text-primary ">GESTIONA: </span>}

          </div>
        {/* Predicciones */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem >
                <SidebarMenuButton asChild >
                  <Link href="/predicciones">
                    <LineChart className="size-4" />
                    Predicciones
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Notificaciones */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/notificaciones">
                    <Bell className="size-4" />
                    Notificaciones
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Pagos */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/pagos">
                    <CreditCard className="size-4" />
                    Pagos & Reembolsos
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
<div className="text-center mb-0 justify-start flex flex-row items-center mt-4">
            
            {!(state==="collapsed") && <span className="text-xs font-extrabold ml-2 text-nowrap text-primary ">AUDITA: </span>}

          </div>
        {/* Logs */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/logs">
                    <History className="size-4" />
                    Logs del Sistema
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="w-full flex gap-2 items-center">
                <LogOut className="size-4" />
                Cerrar Sesión
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarContent>
    </Sidebar>
  );
}
