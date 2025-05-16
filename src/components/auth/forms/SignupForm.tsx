
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { EmailField, PasswordField, NameField } from './FormFields';
import { useDevModeLogin } from '../hooks/useDevModeLogin';

interface SignupFormProps {
  inviteToken?: string | null;
}

export const SignupForm: React.FC<SignupFormProps> = ({ inviteToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [devMode, setDevMode] = useState(true); // Default to true for easier testing
  
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const { isLoading, setIsLoading, attemptDevModeLogin } = useDevModeLogin();
  
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
      
      if (devMode) {
        // In dev mode, wait before attempting to sign in
        toast({
          title: "Account created",
          description: "Dev mode active: Attempting automatic login after a brief delay..."
        });
        
        // Give Supabase time to process the new account
        setTimeout(async () => {
          console.log("Starting dev mode login sequence after signup");
          const loginSuccess = await attemptDevModeLogin(email, password, signIn);
          
          if (loginSuccess) {
            toast({
              title: "Dev mode login successful",
              description: "You're now logged in!"
            });
            
            if (inviteToken) {
              navigate(`/onboarding?invite=${inviteToken}`);
            } else {
              navigate('/onboarding');
            }
          } else {
            setIsLoading(false);
            toast({
              title: "Automatic login failed",
              description: "Account created successfully, but automatic login failed. Please try logging in manually.",
              variant: "destructive"
            });
          }
        }, 2500); // Wait 2.5 seconds before first login attempt
      } else {
        setIsLoading(false);
        toast({
          title: "Account created",
          description: "Welcome to Bridge For Couples! Check your email for confirmation.",
        });
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
        className="w-full rounded-full bg-[#C7747F] hover:bg-[#B56470] text-white"
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  );
};
