
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from './forms/LoginForm';
import { SignupForm } from './forms/SignupForm';

interface AuthFormProps {
  inviteToken?: string | null;
}

const AuthForm = ({ inviteToken }: AuthFormProps) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  
  useEffect(() => {
    // Check URL parameters for tab preference
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    
    if (tabParam === 'signup') {
      setActiveTab('signup');
    } else if (inviteToken) {
      setActiveTab('signup');
    }
  }, [location, inviteToken]);
  
  return (
    <>
      {!inviteToken && (
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="text-[#1E2A38]">Log In</TabsTrigger>
            <TabsTrigger value="signup" className="text-[#1E2A38]">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm inviteToken={null} />
          </TabsContent>
        </Tabs>
      )}
      
      {inviteToken && (
        <SignupForm inviteToken={inviteToken} />
      )}
    </>
  );
};

export default AuthForm;
