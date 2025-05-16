
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from './forms/LoginForm';
import { SignupForm } from './forms/SignupForm';

interface AuthFormProps {
  inviteToken?: string | null;
}

const AuthForm = ({ inviteToken }: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(inviteToken ? "signup" : "login");
  
  return (
    <>
      <div className="mx-auto">
        <Heart className="h-16 w-16 text-[#C7747F] drop-shadow-md" />
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
