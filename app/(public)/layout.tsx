"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { AppNavbar } from "@/components/shared/layoutComponets/AppNavbar";
import Footer from "@/components/shared/Footer";
import ChatWidget from "@/components/shared/layoutComponets/ChatWidget";
import LandingSkeleton from "@/components/landing/LandingSkeleton";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { TopBarTabs } from "@/components/shared/layoutComponets/TopBarTabs";
import FooterMobile from "@/components/shared/FooterMobile";
import { ScrollToTopFAB } from "@/components/shared/ScrollToTopFAB";

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // router.prefetch("/global-transport-search");
    // router.prefetch("/global-lodging-search");
    // router.prefetch("/global-experiences-search");
    // router.prefetch("/global-itineraries-search");
  }, [router]);

  return (
    <div className={inter.className + " flex flex-col max-h-screen w-full"}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
       
      </ThemeProvider>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}
