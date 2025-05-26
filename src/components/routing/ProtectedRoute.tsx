
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ConversationLoader from "@/components/common/ConversationLoader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isOnboardingRoute = location.pathname === "/onboarding";
  
  if (loading) {
    // Show branded conversation loading animation
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4EDE5' }}>
        <div className="text-center space-y-8">
          <ConversationLoader />
          <p className="text-midnight-indigo/70 text-sm font-medium">
            Getting your conversation ready…
          </p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to auth page if not authenticated
    console.log("User not authenticated, redirecting to auth page");
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  
  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
