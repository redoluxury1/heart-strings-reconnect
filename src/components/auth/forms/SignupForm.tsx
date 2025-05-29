
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { EmailField, PasswordField, NameField } from './FormFields';
import { sendVerificationEmail } from '@/services/emailVerification';

interface SignupFormProps {
  inviteToken?: string | null;
  signupMode?: 'solo' | 'partner' | null;
}

export const SignupForm: React.FC<SignupFormProps> = ({ inviteToken, signupMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [devMode, setDevMode] = useState(true);
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
      console.log("Starting signup process for email:", email, "with devMode:", devMode);
      
      // Create the account (without auto-confirmation)
      const { error: signupError, data: signupData } = await signUp(email, password, name);
      
      if (signupError) {
        console.error("Signup error:", signupError);
        throw signupError;
      }
      
      console.log("Signup successful, data:", signupData);
      
      if (devMode) {
        console.log("Development mode enabled - attempting auto-confirmation and login");
        
        // In development mode, try to sign in immediately
        const { error: signinError } = await signIn(email, password);
        
        if (!signinError) {
          console.log("Auto-login successful in dev mode");
          
          toast({
            title: "Account created successfully!",
            description: "Development mode: Auto-logged in. Taking you to setup..."
          });
          
          if (signupMode) {
            localStorage.setItem('signupMode', signupMode);
          }
          
          navigate('/onboarding');
          return;
        } else {
          console.log("Auto-login failed, falling back to email verification:", signinError);
        }
      }
      
      // Production mode or dev mode fallback - send custom verification email
      console.log("Sending custom verification email...");
      const emailSent = await sendVerificationEmail(email, name);
      
      if (emailSent) {
        toast({
          title: "Account created successfully!",
          description: "Please check your email for a verification link to complete your registration."
        });
        
        // Show a message about checking email
        setTimeout(() => {
          navigate('/auth?message=check-email');
        }, 2000);
      } else {
        toast({
          title: "Account created but email failed",
          description: "Your account was created but we couldn't send the verification email. Please try logging in or contact support.",
          variant: "destructive"
        });
      }
      
    } catch (error: any) {
      console.error("Signup process failed:", error);
      let errorMessage = error.message || "There was a problem creating your account.";
      
      if (errorMessage.includes("User already registered")) {
        errorMessage = "This email is already registered. Please try logging in instead.";
      }
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
          Development Mode (Skip email verification)
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
