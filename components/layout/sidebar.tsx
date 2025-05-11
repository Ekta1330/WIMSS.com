"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart4, 
  FileText, 
  Home, 
  Package, 
  PieChart, 
  Settings,
  ShoppingCart, 
  UserCheck
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
}

interface SidebarItemProps {
  path: string;
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
}

const SidebarItem = ({ path, label, icon, collapsed }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
              collapsed ? "justify-center px-2" : "",
              isActive 
                ? "bg-white/20 text-white font-medium" 
                : "text-white/80 hover:bg-white/10 hover:text-white"
            )}
          >
            <div>{icon}</div>
            {!collapsed && <span>{label}</span>}
          </Link>
        </TooltipTrigger>
        {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export function Sidebar({ collapsed }: SidebarProps) {
  return (
    <div
      className={cn(
        "h-screen fixed top-0 left-0 z-40 bg-gradient-to-b from-purple-600 to-pink-600 flex flex-col justify-between transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div>
        <div className="p-4 flex items-center justify-center h-16">
          {!collapsed ? (
            <h1 className="text-white font-bold text-2xl">BizDash</h1>
          ) : (
            <h1 className="text-white font-bold text-2xl">BD</h1>
          )}
        </div>
        <div className="px-2 mt-8 space-y-2">
          <SidebarItem
            path="/"
            label="Dashboard"
            icon={<Home size={20} />}
            collapsed={collapsed}
          />
          <SidebarItem
            path="/orders"
            label="Orders"
            icon={<ShoppingCart size={20} />}
            collapsed={collapsed}
          />
          <SidebarItem
            path="/sales"
            label="Sales"
            icon={<BarChart4 size={20} />}
            collapsed={collapsed}
          />
          <SidebarItem
            path="/salesman"
            label="Salesman Login"
            icon={<UserCheck size={20} />}
            collapsed={collapsed}
          />
          <SidebarItem
            path="/stocks"
            label="Stocks"
            icon={<Package size={20} />}
            collapsed={collapsed}
          />
          <SidebarItem
            path="/invoices"
            label="Invoice Bills"
            icon={<FileText size={20} />}
            collapsed={collapsed}
          />
          <SidebarItem
            path="/reports"
            label="Reports"
            icon={<PieChart size={20} />}
            collapsed={collapsed}
          />
        </div>
      </div>
      <div className="px-2 mb-8">
        <SidebarItem
          path="/settings"
          label="Settings"
          icon={<Settings size={20} />}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}