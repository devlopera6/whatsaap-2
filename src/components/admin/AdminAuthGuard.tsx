import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken'); // Replace with your auth logic
  const isAdmin = localStorage.getItem('userRole') === 'admin'; // Replace with your role check
  const location = useLocation();

  if (!isAuthenticated || !isAdmin) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
