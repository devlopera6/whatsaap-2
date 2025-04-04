import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would trigger a search across relevant data
    console.log("Searching for:", query);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          onSearch={handleSearch}
          onToggleSidebar={toggleSidebar}
          unreadNotifications={5}
          userName="Rahul Sharma"
          businessName="Spice Junction"
          userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">{children || <Outlet />}</main>
      </div>

      {/* Mobile Sidebar - shown when menu button is clicked */}
      {!sidebarCollapsed && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs">
            <Sidebar onToggleCollapse={toggleSidebar} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
