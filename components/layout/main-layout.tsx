"use client";

import { useState } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import { users } from "@/lib/auth";
import { ThemeProvider } from "../ui/theme-provider";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // For demo purposes, use the first user in our mock data
  const currentUser = users[0];
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar collapsed={sidebarCollapsed} />
        </div>
        
        {/* Main content */}
        <div
          className={cn(
            "min-h-screen transition-all duration-300",
            sidebarCollapsed ? "lg:pl-16" : "lg:pl-60"
          )}
        >
          <Navbar 
            user={currentUser}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            sidebarCollapsed={sidebarCollapsed} 
          />
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}