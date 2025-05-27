
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { EmailField, PasswordField } from './FormFields';
import { useDevModeLogin } from '../hooks/useDevModeLogin';
import { Link } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { attemptDevModeLogin } = useDevModeLogin();

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
    setLoginAttempts(prev => prev + 1);
    
    try {
      console.log("Attempting to sign in with:", email);
      
      // For debugging purposes - log the attempt number
      console.log(`Login attempt #${loginAttempts + 1} for user ${email}`);
      
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error("Login error:", error);
        
        // Provide more helpful error messages
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Login failed",
            description: "That email or password doesn't match our records. Please double-check and try again.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login failed",
            description: error.message || "Please check your credentials and try again.",
            variant: "destructive"
          });
        }
        
        setIsLoading(false);
        return;
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
        description: error.message || "An unexpected error occurred. Please try again.",
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
      
      <div className="flex justify-end">
        <Link to="/auth?tab=reset" className="text-sm text-[#C7747F] hover:text-[#B56470]">
          Forgot password?
        </Link>
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full rounded-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
      >
        {isLoading ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
};
