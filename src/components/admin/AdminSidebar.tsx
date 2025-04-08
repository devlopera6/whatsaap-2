import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  HelpCircle,
  BarChart
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin'
  },
  {
    title: 'Businesses',
    icon: Users,
    path: '/admin/businesses'
  },
  {
    title: 'Revenue',
    icon: CreditCard,
    path: '/admin/revenue'
  },
  {
    title: 'Analytics',
    icon: BarChart,
    path: '/admin/analytics'
  },
  {
    title: 'Support',
    icon: MessageSquare,
    path: '/admin/support'
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/admin/settings'
  },
  {
    title: 'Help',
    icon: HelpCircle,
    path: '/admin/help'
  }
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
