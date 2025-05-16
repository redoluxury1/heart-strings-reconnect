
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
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
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const navigate = useNavigate();
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
      console.log("Attempting to sign in with:", email);
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
  
  // Helper function to attempt login with exponential backoff
  const attemptDevModeLogin = async (email: string, password: string, attempt: number = 0): Promise<boolean> => {
    try {
      const maxAttempts = 3;
      const delay = Math.min(2000 * Math.pow(2, attempt), 10000); // Exponential backoff capped at 10 seconds
      
      console.log(`Dev mode login attempt ${attempt + 1} of ${maxAttempts}`);
      
      const { error } = await signIn(email, password);
      
      if (!error) {
        console.log("Dev mode login successful!");
        return true;
      } else {
        console.log(`Dev mode login attempt ${attempt + 1} failed:`, error.message);
        
        if (attempt < maxAttempts - 1) {
          toast({
            title: `Login attempt ${attempt + 1} failed`,
            description: `Retrying in ${delay / 1000} seconds...`,
          });
          
          // Wait and try again
          await new Promise(resolve => setTimeout(resolve, delay));
          return attemptDevModeLogin(email, password, attempt + 1);
        } else {
          throw new Error("Maximum login attempts reached");
        }
      }
    } catch (error: any) {
      console.error("Dev mode login failed after multiple attempts:", error);
      return false;
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
          const loginSuccess = await attemptDevModeLogin(email, password);
          
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
        setActiveTab("login");
      }
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive"
      });
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
                  required
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
                  required
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
                  required
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
              required
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
              required
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
              required
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
