import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { EmailField, PasswordField, NameField } from './FormFields';

interface SignupFormProps {
  inviteToken?: string | null;
  signupMode?: 'solo' | 'partner' | null;
}

export const SignupForm: React.FC<SignupFormProps> = ({ inviteToken, signupMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [devMode, setDevMode] = useState(true); // Default to true for easier testing
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Starting signup process for email:", email);
      const { error, data } = await signUp(email, password, name);
      
      if (error) {
        console.error("Signup error:", error);
        throw error;
      }
      
      console.log("Signup successful, data:", data);
      
      toast({
        title: "Account created successfully!",
        description: devMode 
          ? "Your account has been created. Taking you to setup..." 
          : "Your account has been created. Please check your email for confirmation."
      });
      
      if (devMode) {
        // Store the signup mode in localStorage for onboarding
        if (signupMode) {
          localStorage.setItem('signupMode', signupMode);
        }
        
        // For testing purposes, proceed directly to onboarding
        // This allows you to test the partner invite flow
        console.log("Proceeding to onboarding for testing");
        navigate('/onboarding');
        return;
      } else {
        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate('/auth'); // Redirect back to auth page to login
        }, 2000);
      }
      
    } catch (error: any) {
      setIsLoading(false);
      console.error("Signup process failed:", error);
      let errorMessage = error.message || "There was a problem creating your account.";
      
      // Provide more helpful message for common errors
      if (errorMessage.includes("User already registered")) {
        errorMessage = "This email is already registered. Please try logging in instead.";
      }
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4 mt-4">
      <NameField 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <EmailField 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="signupEmail"
      />
      
      <PasswordField 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="signupPassword"
      />
      
      <div className="flex items-center space-x-2 my-4">
        <Switch 
          id={inviteToken ? "dev-mode-partner" : "dev-mode"} 
          checked={devMode} 
          onCheckedChange={setDevMode} 
        />
        <Label 
          htmlFor={inviteToken ? "dev-mode-partner" : "dev-mode"} 
          className="text-sm text-[#1E2A38]/70"
        >
          Development Mode (Skip Email Verification)
        </Label>
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full rounded-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>
      
      <p className="text-center text-xs text-[#1E2A38]/60 mt-4">
        We'll never share your email. Your story stays between you two.
      </p>
    </form>
  );
};
