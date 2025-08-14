
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { EmailField, PasswordField, NameField } from './FormFields';
import { User, Users, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SignupFormProps {
  inviteToken?: string | null;
  signupMode?: 'solo' | 'partner' | null;
}

export const SignupForm: React.FC<SignupFormProps> = ({ inviteToken, signupMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [partnerStatus, setPartnerStatus] = useState<'solo' | 'couple'>(signupMode === 'partner' ? 'couple' : 'solo');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields including password.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("=== STARTING SIGNUP PROCESS ===");
      console.log("Email:", email);
      console.log("Name:", name);
      console.log("Partner Status:", partnerStatus);
      console.log("Password provided:", !!password);

      // Create the account without email verification
      const { error: signupError, data: signupData } = await signUp(email, password, name);

      if (signupError) {
        console.error("Signup error:", signupError);
        if (
          signupError.message.includes("User already registered") ||
          signupError.message.includes("A user with this email already exists")
        ) {
          toast({
            title: "Account already exists",
            description: "This email is already registered. Please try logging in instead.",
            variant: "destructive"
          });
          return;
        }

        // Handle other signup errors
        toast({
          title: "Signup failed",
          description: signupError.message || "There was a problem creating your account. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log("Account created successfully:", {
        userId: signupData?.user?.id,
        email: signupData?.user?.email,
        hasSession: !!signupData?.session
      });

      // Success - user should be automatically signed in
      if (signupData?.session) {
        toast({
          title: "Account created successfully!",
          description: "Welcome! You're now signed in and ready to get started.",
          variant: "default"
        });
        
        // Store partner status for onboarding
        localStorage.setItem('signupMode', partnerStatus);
        
        // Navigate to onboarding
        navigate('/onboarding');
      } else {
        // Fallback if no session (shouldn't happen with email confirmation disabled)
        toast({
          title: "Account created",
          description: "Your account was created. Please try logging in.",
        });
        navigate('/auth');
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
        placeholder="Enter a secure password"
      />

      {/* Partner Status Selection */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setPartnerStatus('solo')}
            className={cn(
              "flex-1 h-16 transition-all hover:scale-[1.02] hover:shadow-md", 
              partnerStatus === 'solo' 
                ? "bg-[#D36B4B] text-white border-[#D36B4B]" 
                : "bg-[#E9DED9] text-[#1E2A38] border-[#E9DED9]"
            )}
          >
            <div className="flex flex-col items-center">
              <User className="h-4 w-4 mb-1" />
              <span className="text-sm">Individual</span>
            </div>
            {partnerStatus === 'solo' && <Check className="ml-2 h-3 w-3" />}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => setPartnerStatus('couple')}
            className={cn(
              "flex-1 h-16 transition-all hover:scale-[1.02] hover:shadow-md",
              partnerStatus === 'couple' 
                ? "bg-[#1E2A38] text-white border-[#1E2A38]" 
                : "bg-[#E9DED9] text-[#1E2A38] border-[#E9DED9]"
            )}
          >
            <div className="flex flex-col items-center">
              <Users className="h-4 w-4 mb-1" />
              <span className="text-sm">Couple</span>
            </div>
            {partnerStatus === 'couple' && <Check className="ml-2 h-3 w-3" />}
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !email || !password || !name}
        className="w-full rounded-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  );
};
