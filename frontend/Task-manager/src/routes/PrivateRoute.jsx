import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/Usercontext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useUser();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    // For 'user' or 'member' roles
    return <Navigate to="/user/userdashboard" replace />;
  }

  // User is authenticated and has required role
  return <Outlet />;
};

export default PrivateRoute;