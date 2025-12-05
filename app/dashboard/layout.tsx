import type React from "react";
// import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { BackofficeSidebar } from "@/components/shared/layoutComponets/sidebar";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";
// import { ScrollToTopFAB } from "@/components/shared/ScrollToTopFAB";

// const inter = Inter({ subsets: ["latin"] });

export default function JustAppbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={ " flex flex-col min-h-screen w-full"}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        {/* <AppNavbar showShawdowBox={true} /> */}
             
                 <SidebarProvider>
 <BackofficeSidebar />

        {/* <TopBarTabs /> */}
        {/* <MobileHeader /> */}

        <main className="flex-1 flex flex-col w-full">
        <SidebarTrigger className="mt-3 ml-2" />

          {children}

        </main>
            </SidebarProvider>

        {/* <Footer /> */}
        {/* <ScrollToTopFAB /> */}
      </ThemeProvider>
    </div>
  );
}
