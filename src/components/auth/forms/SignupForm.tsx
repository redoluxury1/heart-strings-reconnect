
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
      console.log("Starting signup process - Dev Mode:", devMode);
      
      // Create the account first
      const { error: signupError, data: signupData } = await signUp(email, password, name);
      
      if (signupError) {
        console.error("Signup error:", signupError);
        
        if (signupError.message.includes("User already registered")) {
          if (devMode) {
            // In dev mode, try to log them in directly
            console.log("User exists, attempting dev mode login...");
            const { error: signinError } = await signIn(email, password);
            
            if (!signinError) {
              toast({
                title: "Welcome back!",
                description: "You were already registered. Logged you in successfully."
              });
              
              if (signupMode) {
                localStorage.setItem('signupMode', signupMode);
              }
              
              navigate('/onboarding');
              return;
            }
          }
          
          toast({
            title: "Account already exists",
            description: "This email is already registered. Please try logging in instead.",
            variant: "destructive"
          });
          return;
        }
        
        throw signupError;
      }

      console.log("Account created successfully:", signupData?.user?.id);

      if (devMode) {
        // In dev mode, try immediate login
        console.log("Dev mode: attempting immediate login...");
        const { error: loginError } = await signIn(email, password);
        
        if (!loginError) {
          toast({
            title: "Account created successfully!",
            description: "Development mode: You're now logged in!"
          });
          
          if (signupMode) {
            localStorage.setItem('signupMode', signupMode);
          }
          
          navigate('/onboarding');
          return;
        } else {
          console.log("Immediate login failed, proceeding with email verification");
        }
      }

      // Send verification email
      if (signupData?.user?.id) {
        console.log("Sending verification email for user:", signupData.user.id);
        const emailSent = await sendVerificationEmail(email, name, signupData.user.id);
        
        if (emailSent) {
          toast({
            title: "Account created successfully!",
            description: "Please check your email for a verification link to complete your registration."
          });
          navigate('/auth?message=check-email');
        } else {
          toast({
            title: "Account created",
            description: "Your account was created but we couldn't send the verification email. Please try logging in or contact support.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Account created",
          description: "Please check your email for a verification link.",
        });
        navigate('/auth?message=check-email');
      }
      
    } catch (error: any) {
      console.error("Signup process failed:", error);
      
      toast({
        title: "Signup failed",
        description: error.message || "There was a problem creating your account. Please try again.",
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
