
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Heart } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  inviteToken?: string | null;
}

const AuthForm = ({ inviteToken }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">(inviteToken ? "signup" : "login");
  const [devMode, setDevMode] = useState(true); // Default to true for easier testing
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

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
      const { error } = await signIn(email, password);
      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in."
      });
      
      navigate('/onboarding');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
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
      const { error, data } = await signUp(email, password);
      
      if (error) {
        console.error("Signup error:", error);
        throw error;
      }
      
      console.log("Signup successful, data:", data);
      
      if (devMode) {
        console.log("Dev mode enabled, attempting immediate login");
        // In dev mode, automatically sign in after sign up
        try {
          const { error: signInError } = await signIn(email, password);
          if (signInError) {
            console.error("Dev mode login error:", signInError);
            throw signInError;
          }
          
          console.log("Dev mode login successful");
          toast({
            title: "Dev mode activated",
            description: "Bypassing email verification. You're now logged in!",
          });
          
          // With invite token we'll redirect to onboarding with the token
          if (inviteToken) {
            navigate(`/onboarding?invite=${inviteToken}`);
          } else {
            navigate('/onboarding');
          }
        } catch (signInError: any) {
          console.error("Failed during dev mode login:", signInError);
          toast({
            title: "Dev mode login failed",
            description: "Created account, but couldn't log in automatically. Please try logging in manually.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Account created",
          description: "Welcome to Bridge For Couples! Check your email for confirmation.",
        });
      }
    } catch (error: any) {
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
    } finally {
      setIsLoading(false);
    }
  };

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
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#1E2A38]">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 placeholder-gray-400 text-[#1E2A38]"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#1E2A38]">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 text-[#1E2A38]"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full rounded-full bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-[#1E2A38]">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 placeholder-gray-400 text-[#1E2A38]"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="signupEmail" className="block text-sm font-medium text-[#1E2A38]">
                  Email
                </label>
                <Input
                  id="signupEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 placeholder-gray-400 text-[#1E2A38]"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="signupPassword" className="block text-sm font-medium text-[#1E2A38]">
                  Password
                </label>
                <Input
                  id="signupPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 text-[#1E2A38]"
                />
              </div>
              
              <div className="flex items-center space-x-2 my-4">
                <Switch id="dev-mode" checked={devMode} onCheckedChange={setDevMode} />
                <Label htmlFor="dev-mode" className="text-sm text-[#1E2A38]/70">
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
          </TabsContent>
        </Tabs>
      )}
      
      {inviteToken && (
        <form onSubmit={handleSignup} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-[#1E2A38]">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 placeholder-gray-400 text-[#1E2A38]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="signupEmail" className="block text-sm font-medium text-[#1E2A38]">
              Email
            </label>
            <Input
              id="signupEmail"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 placeholder-gray-400 text-[#1E2A38]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="signupPassword" className="block text-sm font-medium text-[#1E2A38]">
              Password
            </label>
            <Input
              id="signupPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-[#C7747F]/30 focus:border-[#C7747F] focus:ring-[#C7747F]/20 text-[#1E2A38]"
            />
          </div>
          
          <div className="flex items-center space-x-2 my-4">
            <Switch id="dev-mode-partner" checked={devMode} onCheckedChange={setDevMode} />
            <Label htmlFor="dev-mode-partner" className="text-sm text-[#1E2A38]/70">
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
      )}
    </>
  );
};

export default AuthForm;
