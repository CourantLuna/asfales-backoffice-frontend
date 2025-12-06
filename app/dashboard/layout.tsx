import type React from "react"; 
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { BackofficeSidebar } from "@/components/shared/layoutComponets/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/shared/layoutComponets/site-header";

export default function JustAppbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <div className="flex h-full w-full">
             <div
  className="absolute inset-0 -z-10 bg-cover bg-center pointer-events-none"
  style={{
    backgroundImage: `url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly%20la%20vista%20es%20desde%20encima%20de%20las%20nubes%2C%20vista%20desde%20un%20avion%2C%20en%20la%20toma%20hay%20nubes%20por%20arriba%20%281%29-OhzihO4aGu38K4tHjMwiVAhWXOLcPP.jpg')`,
  }}
>
  <div className="absolute inset-0 bg-slate-400/85 backdrop-blur-sm" />
</div>
            {/* Sidebar fijo */}
            <BackofficeSidebar />

            {/* Contenedor principal */}
            <div className="flex-1 flex flex-col h-full">
              <SiteHeader>
                <main className="flex-1 flex justify-center items-start p-0 md:p-6 lg:p-6 min-h-0">
                  {/* Card que ocupa todo el width/height disponible con scroll solo en Y */}
                  <div className="flex-1 max-w-[90vw]  max-h-[calc(100vh-90px)] bg-gray-700/50 backdrop-blur-2xl rounded-xl shadow-2xl shadow-secondary/20 p-0 md:p-6 lg:p-6 overflow-y-auto min-h-0">
                    {children}
                  </div>
                </main>
              </SiteHeader>
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
