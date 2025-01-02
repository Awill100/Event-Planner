import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading state until we check if the user is authenticated
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if the user is not logged in
  }

  return children; // Allow access to protected route if the user is logged in
};

export default ProtectedRoute;
