import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render the protected route if authenticated
};

export default ProtectedRoute;
