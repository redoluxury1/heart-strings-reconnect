
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import FloatingTextBubbles from "@/components/post-conflict/FloatingTextBubbles";
import ContentContainer from "@/components/common/ContentContainer";

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
    return (
      <div className="min-h-screen bg-slate-50 relative">
        <FloatingTextBubbles />
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <ContentContainer className="max-w-xl">
            <div className="rounded-xl p-8 bg-white/90 backdrop-blur-sm shadow-lg text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e2a63] mx-auto mb-6"></div>
              <p className="text-[#2e2a63] text-lg font-medium">
                Loading Bridge For Couples…
              </p>
            </div>
          </ContentContainer>
        </div>
      </div>
    );
  }
  
  if (!user) {
    console.log("ProtectedRoute - No user found, redirecting to auth");
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  
  console.log("ProtectedRoute - User authenticated, rendering content");
  return <>{children}</>;
};

export default ProtectedRoute;
