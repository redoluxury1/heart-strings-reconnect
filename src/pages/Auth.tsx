
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContentContainer from '../components/common/ContentContainer';

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
    <div className="min-h-screen bg-soft-blush flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-16">
        <ContentContainer>
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-lavender-blue/20 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="font-cormorant text-3xl text-midnight-indigo">
                  {inviteToken ? "Join Your Partner" : "Welcome to Bridge"}
                </CardTitle>
                <CardDescription>
                  {inviteToken 
                    ? "Create an account to connect with your partner" 
                    : "Sign in or create an account to get started"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {!inviteToken && (
                  <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Log In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="password" className="block text-sm font-medium">
                            Password
                          </label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full bg-lavender-blue hover:bg-lavender-blue/90"
                        >
                          {isLoading ? "Logging in..." : "Log In"}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="signup">
                      <form onSubmit={handleSignup} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-medium">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="signupEmail" className="block text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="signupEmail"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="signupPassword" className="block text-sm font-medium">
                            Password
                          </label>
                          <Input
                            id="signupPassword"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full bg-mauve-rose hover:bg-mauve-rose/90 text-white"
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
                      <label htmlFor="name" className="block text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="signupEmail" className="block text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="signupPassword" className="block text-sm font-medium">
                        Password
                      </label>
                      <Input
                        id="signupPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-mauve-rose hover:bg-mauve-rose/90 text-white"
                    >
                      {isLoading ? "Creating Account..." : "Join Your Partner"}
                    </Button>
                  </form>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-center text-xs text-center text-muted-foreground">
                By creating an account, you agree to our Terms of Service and Privacy Policy
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
