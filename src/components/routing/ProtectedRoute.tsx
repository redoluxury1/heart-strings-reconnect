
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ConversationLoader from "@/components/common/ConversationLoader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    // Only show loading while actually checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4EDE5' }}>
        <div className="text-center space-y-8">
          <ConversationLoader 
            isLoading={true}
            loadingText="Authenticating…"
          />
        </div>
      </div>
    );
  }
  
  if (!user) {
    console.log("User not authenticated, redirecting to auth page");
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  
  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
