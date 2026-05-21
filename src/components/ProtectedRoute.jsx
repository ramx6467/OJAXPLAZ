import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protect routes that require authentication
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If auth is still loading, we can show a simple loading spinner or nothing
  // since the context already handles loading, this is a fallback
  if (loading) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-spotify-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to auth page if not logged in
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// Redirect logged-in users away from auth pages (e.g. login/signup) to home
export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-spotify-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    // Redirect to home page if already logged in
    return <Navigate to="/" replace />;
  }

  return children;
};
