import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
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
      console.log("Password provided:", !!password);

      // Create the account with Supabase email confirmation DISABLED
      const { error: signupError, data: signupData } = await signUp(email, password, name, true);

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
        needsCustomVerification: !signupData?.session
      });

      // ALWAYS send our custom verification email (no dev mode bypass)
      if (signupData?.user?.id) {
        console.log("Sending custom verification email for user:", signupData.user.id);
        const emailSent = await sendVerificationEmail(email, name, signupData.user.id);

        if (emailSent) {
          toast({
            title: "Account created successfully!",
            description: "Please check your email for a verification link to complete your registration."
          });
          navigate('/auth?message=check-email');
        } else {
          console.error("Failed to send verification email");
          toast({
            title: "Account created but email failed",
            description: "Your account was created but we couldn't send the verification email. Please contact support.",
            variant: "destructive"
          });
          navigate('/auth?message=email-failed');
        }
      } else {
        console.error("No user ID returned from signup");
        toast({
          title: "Account creation unclear",
          description: "Please check your email for a verification link or contact support.",
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
        placeholder="Enter a secure password"
      />

      <Button
        type="submit"
        disabled={isLoading || !email || !password || !name}
        className="w-full rounded-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>

      <p className="text-center text-xs text-[#1E2A38]/60 mt-4">
        We'll send you a verification email to complete your registration.
      </p>
    </form>
  );
};
