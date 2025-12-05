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
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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

import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/useAuth";
import { redirect } from "next/dist/server/api-utils";

export function BackofficeSidebar() {
  const { state, setOpen } = useSidebar();
  const { logout } = useAuth();


  return (
    <Sidebar collapsible="icon" variant="floating" noBorder noShadow>
      <SidebarContent className="bg-secondary text-primary rounded-xl gap-1">

        {/* HEADER */}
        <SidebarHeader className="font-semibold text-lg">
          <div className="flex flex-row items-center">
            <img
              src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Logo%20asfales%20con%20circulo%20blanco%20fondo.png"
              alt="Asfales Logo"
              className="w-auto max-h-10"
            />
            {state !== "collapsed" && (
              <span className="text-sm font-extrabold ml-2 text-primary">
                ASFALES BACKOFFICE
              </span>
            )}
          </div>
        </SidebarHeader>

        {/* CONTENT */}
        <SidebarContent className={state==="expanded"?"px-4" :""}>

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

          {/* ADMINISTRA */}
          {state !== "collapsed" && (
            <div className="flex items-center mt-4 mb-0">
              <span className="text-xs font-extrabold text-primary">
                ADMINISTRA:
              </span>
            </div>
          )}

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

          {/* PROVEEDORES */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>

                    {/* Botón principal con link */}
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton onClick={()=> {setOpen(true)}}>
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

          {/* OPCIONES DE VIAJE */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>

                    {/* Botón principal */}
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton onClick={()=> {setOpen(true)}} >
                          <Workflow className="size-4" />
                          <span>Opciones de Viaje</span>
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

          {/* GESTIONA */}
          {state !== "collapsed" && (
            <div className="flex items-center mt-4 mb-0">
              <span className="text-xs font-extrabold text-primary">
                GESTIONA:
              </span>
            </div>
          )}

          {/* Predicciones */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
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

          {/* AUDITA */}
          {state !== "collapsed" && (
            <div className="flex items-center mt-4 mb-0">
              <span className="text-xs font-extrabold text-primary">
                AUDITA:
              </span>
            </div>
          )}

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

        {/* FOOTER */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuItem>
  <SidebarMenuButton onClick={logout}>
    <LogOut className="size-4" />
    Cerrar Sesión
  </SidebarMenuButton>
</SidebarMenuItem>

            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

      </SidebarContent>
    </Sidebar>
  );
}
