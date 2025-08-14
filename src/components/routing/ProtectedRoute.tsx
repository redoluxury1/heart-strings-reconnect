
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/common/LoadingScreen";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  console.log("ProtectedRoute - Current state:", { 
    loading, 
    hasUser: !!user, 
    location: location.pathname,
    timestamp: new Date().toISOString()
  });
  
  if (loading) {
    console.log("ProtectedRoute - Showing loading screen because loading=true");
    return <LoadingScreen message="Loading Bridge For Couples…" />;
  }
  
  if (!user) {
    console.log("ProtectedRoute - No user found, redirecting to auth");
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  
  console.log("ProtectedRoute - User authenticated, rendering content");
  return <>{children}</>;
};

export default ProtectedRoute;
