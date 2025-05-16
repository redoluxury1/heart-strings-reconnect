
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContentContainer from '../components/common/ContentContainer';
import { Heart } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();
  
  useEffect(() => {
    // Check for invite token in query params
    const params = new URLSearchParams(location.search);
    const token = params.get('invite');
    if (token) {
      setInviteToken(token);
      setActiveTab("signup");
    }
  }, [location]);
  
  useEffect(() => {
    // If user is already logged in, redirect to home or onboarding
    if (user) {
      navigate('/onboarding');
    }
  }, [user, navigate]);
  
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
      const { error, data } = await signUp(email, password);
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Welcome to Bridge For Couples! Check your email for confirmation.",
      });
      
      // With invite token we'll redirect to onboarding with the token
      if (inviteToken) {
        navigate(`/onboarding?invite=${inviteToken}`);
      } else {
        navigate('/onboarding');
      }
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "There was a problem creating your account.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-16">
        <ContentContainer>
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-[#D36B4B]/20 shadow-lg">
              <CardHeader className="text-center space-y-4">
                {/* Heart icon with glow effect */}
                <div className="mx-auto">
                  <Heart className="h-16 w-16 text-[#D36B4B] drop-shadow-md" />
                </div>
                
                <CardTitle className="font-cormorant text-3xl text-[#1E2A38]">
                  Let's build better conversations—together.
                </CardTitle>
                
                <CardDescription className="text-[#1E2A38]/80 text-base">
                  Create an account or sign in to get started.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
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
                        
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full rounded-full bg-[#D36B4B] hover:bg-[#D36B4B]/90 text-white"
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
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full rounded-full bg-[#D36B4B] hover:bg-[#D36B4B]/90 text-white"
                    >
                      {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                  </form>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-center text-xs text-center text-[#1E2A38]/60 px-6">
                By continuing, you agree to our <Link to="/terms" className="underline hover:text-[#D36B4B]">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-[#D36B4B]">Privacy Policy</Link>
              </CardFooter>
            </Card>
          </div>
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default Auth;
