
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContentContainer from '../components/common/ContentContainer';
import { Heart, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { acceptPartnerInvite } from '@/services/supabase';

const PartnerInvite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signUp } = useAuth();
  const [inviterName, setInviterName] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  
  // Extract invite token from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      setInviteToken(token);
      // In a real app, we would fetch the inviter's name using the token
      setInviterName("Your partner"); // Placeholder
    }
  }, [location.search]);
  
  // If already logged in, handle the connection process
  useEffect(() => {
    const handleExistingUserConnection = async () => {
      if (user && inviteToken) {
        setIsLoading(true);
        try {
          const relationship = await acceptPartnerInvite(inviteToken, user.id);
          if (relationship) {
            toast({
              title: "Connection successful!",
              description: "You've been connected with your partner."
            });
            navigate('/love-code-quiz');
          } else {
            throw new Error("Failed to connect with your partner");
          }
        } catch (error) {
          console.error("Error accepting invitation:", error);
          toast({
            title: "Connection failed",
            description: "There was a problem connecting with your partner. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    handleExistingUserConnection();
  }, [user, inviteToken, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    if (!email || !password || !name) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create the user account
      const { error, data } = await signUp(email, password);
      if (error) throw error;
      
      // The user is now created. The auth state change will trigger our
      // useEffect above, which will handle the connection process
      
      toast({
        title: "Account created!",
        description: "Connecting you with your partner..."
      });
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast({
        title: "Account creation failed",
        description: error.message || "There was a problem creating your account.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };
  
  if (!inviteToken) {
    return (
      <div className="min-h-screen flex flex-col bg-soft-blush">
        <Navbar />
        <main className="flex-grow py-8 md:py-12">
          <ContentContainer>
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-mauve-rose mb-4">
                <Heart className="h-16 w-16 mx-auto" />
              </div>
              <h1 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-4">
                Invalid Invitation
              </h1>
              <p className="text-midnight-indigo/80 mb-6">
                This invitation link appears to be invalid or has expired.
              </p>
              <Button
                onClick={() => navigate('/')}
                className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
              >
                Go to Homepage
              </Button>
            </div>
          </ContentContainer>
        </main>
        <Footer showCTA={false} />
      </div>
    );
  }
  
  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-soft-blush">
        <Navbar />
        <main className="flex-grow py-8 md:py-12">
          <ContentContainer>
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-mauve-rose mb-4">
                <UserCheck className="h-16 w-16 mx-auto" />
              </div>
              <h1 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-4">
                Connecting with Partner
              </h1>
              <p className="text-midnight-indigo/80 mb-6">
                {isLoading ? "Connecting you with your partner..." : "You'll be redirected in a moment..."}
              </p>
              <div className="animate-pulse bg-lavender-blue/20 h-2 rounded-full w-full"></div>
            </div>
          </ContentContainer>
        </main>
        <Footer showCTA={false} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-soft-blush">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-12">
        <ContentContainer>
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
            <div className="text-center mb-8">
              <UserCheck className="h-16 w-16 text-mauve-rose mx-auto mb-4" />
              <h1 className="text-2xl font-cormorant font-medium text-midnight-indigo">
                {inviterName} invited you to Bridge
              </h1>
              <p className="text-midnight-indigo/80 mt-2">
                Create an account to connect and discover your Love Code™
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-midnight-indigo mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border-lavender-blue/30"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-midnight-indigo mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-lavender-blue/30"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-midnight-indigo mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-lavender-blue/30"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-midnight-indigo mb-1">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border-lavender-blue/30"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-mauve-rose hover:bg-mauve-rose/90 text-white mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account & Connect"}
              </Button>
            </form>
            
            <p className="text-xs text-midnight-indigo/60 text-center mt-6">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default PartnerInvite;
