"use client";

import { Bell, ChevronDown, Download, Menu, Moon, Search, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/types";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "next-themes";

interface NavbarProps {
  user: User;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export function Navbar({ user, onToggleSidebar, sidebarCollapsed }: NavbarProps) {
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter(n => !n.read).length
  );
  
  const [localNotifications, setLocalNotifications] = 
    useState(notifications);

  const { theme, setTheme } = useTheme();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const markAsRead = (id: string) => {
    setLocalNotifications(
      localNotifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    );
    
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setLocalNotifications(
      localNotifications.map(n => ({ ...n, read: true }))
    );
    
    setUnreadCount(0);
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-background border-b shadow-sm">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-transparent w-60">
              <Sidebar collapsed={false} />
            </SheetContent>
          </Sheet>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="hidden lg:flex"
          >
            {sidebarCollapsed ? (
              <Menu size={20} />
            ) : (
              <X size={20} />
            )}
          </Button>
          
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-secondary/50 border-0"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {deferredPrompt && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleInstallClick}
              className="hidden md:flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Try this as an App
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-8"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {localNotifications.length > 0 ? (
                  localNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={cn(
                        "p-3 border-b last:border-0 cursor-pointer hover:bg-muted transition-colors",
                        !notification.read && "bg-muted/50"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          {notification.title}
                          {!notification.read && (
                            <Badge 
                              variant="outline" 
                              className="h-1.5 w-1.5 p-0 rounded-full bg-blue-500"
                            />
                          )}
                        </h4>
                        <Badge 
                          variant={
                            notification.type === 'info' ? 'secondary' :
                            notification.type === 'warning' ? 'warning' :
                            notification.type === 'success' ? 'success' :
                            'destructive'
                          }
                          className="text-[10px] px-1 py-0"
                        >
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.role}</div>
                </div>
                <ChevronDown size={16} className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}