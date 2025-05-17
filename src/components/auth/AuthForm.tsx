
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from './forms/LoginForm';
import { SignupForm } from './forms/SignupForm';
import OptimizedImage from '@/components/common/OptimizedImage';

interface AuthFormProps {
  inviteToken?: string | null;
}

const AuthForm = ({ inviteToken }: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(inviteToken ? "signup" : "login");
  
  return (
    <>
      <div className="mx-auto mb-6">
        <OptimizedImage 
          src="/lovable-uploads/1630939c-5a23-4678-a75f-c4d384bbfce4.png"
          alt="Bridge For Couples Hearts Logo"
          className="h-24 w-auto"
          priority={true}
        />
      </div>

      {!inviteToken && (
        <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
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
