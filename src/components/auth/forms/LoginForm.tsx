
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { EmailField, PasswordField } from './FormFields';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter your email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Increment login attempts
      setLoginAttempts(prev => prev + 1);
      
      console.log("Attempting to sign in with:", email);
      const { error } = await signIn(email, password);
      
      if (error) {
        // If this is a newly created account, the error might be because the account is not yet ready
        if (loginAttempts < 2 && error.message.includes("Invalid login credentials")) {
          // Wait and try again automatically if this appears to be a timing issue
          toast({
            title: "Please wait...",
            description: "Your account is being processed. Trying again in a moment..."
          });
          
          // Try again after a delay
          setTimeout(() => handleLogin(e), 2000);
          return;
        }
        
        throw error;
      }
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in."
      });
      
      // Navigate to onboarding page after successful login
      navigate('/onboarding');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 mt-4">
      <EmailField 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <PasswordField 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full rounded-full bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white"
      >
        {isLoading ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
};
