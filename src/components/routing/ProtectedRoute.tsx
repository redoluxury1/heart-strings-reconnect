
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isOnboardingRoute = location.pathname === "/onboarding";
  
  if (loading) {
    // Show loading state while checking auth
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C7747F] mx-auto mb-4"></div>
          <p className="text-[#1E2A38]">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to auth page if not authenticated
    console.log("User not authenticated, redirecting to auth page");
    return <Navigate to="/auth" replace />;
  }
  
  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
