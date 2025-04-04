import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Bell,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  MessageSquare,
} from "lucide-react";

interface HeaderProps {
  businessName?: string;
  userAvatar?: string;
  userName?: string;
  unreadNotifications?: number;
  onSearch?: (query: string) => void;
  onToggleSidebar?: () => void;
}

const Header = ({
  businessName = "WhatsApp Order Manager",
  userAvatar = "",
  userName = "Business Owner",
  unreadNotifications = 3,
  onSearch = () => {},
  onToggleSidebar = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b bg-background px-4 lg:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 md:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Business name - visible on mobile */}
      <div className="md:hidden font-semibold text-lg">{businessName}</div>

      {/* Search bar */}
      <div className="hidden md:flex md:w-1/3 lg:w-1/2">
        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders, products, customers..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">New order received</p>
                  <p className="text-xs text-muted-foreground">
                    Order #1234 from John Doe
                  </p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Payment successful</p>
                  <p className="text-xs text-muted-foreground">
                    ₹499 received for Order #1233
                  </p>
                  <p className="text-xs text-muted-foreground">
                    15 minutes ago
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Low inventory alert</p>
                  <p className="text-xs text-muted-foreground">
                    Veg Pizza is running low (2 left)
                  </p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center">
              <Button variant="ghost" className="w-full">
                View all notifications
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Messages */}
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>

        {/* Help */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* User profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback>
                    {userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
