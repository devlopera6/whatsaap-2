import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  CreditCard,
  Users,
  Settings,
  Crown,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  LogOut,
  HelpCircle,
  Bot,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const location = useLocation();
  const [businessName, setBusinessName] = useState("Spice Junction");
  const [businessType, setBusinessType] = useState("Restaurant");
  const [planType, setPlanType] = useState("Pro");

  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      badge: null,
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/orders",
      badge: {
        content: "12",
        variant: "destructive" as const,
      },
    },
    {
      title: "Inventory",
      icon: <Package size={20} />,
      path: "/inventory",
      badge: null,
    },
    {
      title: "Payments",
      icon: <CreditCard size={20} />,
      path: "/payments",
      badge: null,
    },
    {
      title: "Customers",
      icon: <Users size={20} />,
      path: "/customers",
      badge: null,
    },
    {
      title: "Messages",
      icon: <MessageSquare size={20} />,
      path: "/messages",
      badge: {
        content: "3",
        variant: "default" as const,
      },
    },
    {
      title: "WhatsApp Bot",
      icon: <Bot size={20} />,
      path: "/whatsapp-bot",
      badge: null,
    },
    {
      title: "Subscription",
      icon: <Crown size={20} />,
      path: "/subscription",
      badge: null,
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
      badge: null,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-[80px]" : "w-[280px]",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=spicejunction"
                alt="Business Logo"
              />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm truncate">{businessName}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {businessType}
              </p>
            </div>
          </div>
        )}
        {collapsed && (
          <Avatar className="h-8 w-8 mx-auto">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=spicejunction"
              alt="Business Logo"
            />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggleCollapse}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <TooltipProvider key={index} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      location.pathname === item.path
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-grow truncate">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant={item.badge.variant}
                            className="ml-auto"
                          >
                            {item.badge.content}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <div className="flex items-center gap-2">
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant={item.badge.variant} className="ml-auto">
                          {item.badge.content}
                        </Badge>
                      )}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </ScrollArea>

      <div className="mt-auto border-t p-4">
        {!collapsed && (
          <div className="mb-4 bg-accent/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium">Current Plan</span>
              <Badge variant="outline" className="text-xs font-semibold">
                {planType}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Orders: 230/500
              </span>
              <Link
                to="/subscription"
                className="text-xs text-primary hover:underline"
              >
                Upgrade
              </Link>
            </div>
            <div className="w-full bg-secondary h-1.5 rounded-full mt-2">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: "46%" }}
              ></div>
            </div>
          </div>
        )}

        <div className="grid gap-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={collapsed ? "icon" : "sm"}
                  className="w-full justify-start"
                >
                  <HelpCircle size={18} className="mr-2" />
                  {!collapsed && <span>Help & Support</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">Help & Support</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={collapsed ? "icon" : "sm"}
                  className="w-full justify-start"
                >
                  <LogOut size={18} className="mr-2" />
                  {!collapsed && <span>Log Out</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">Log Out</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
