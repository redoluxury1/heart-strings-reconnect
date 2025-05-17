
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { acceptPartnerInvite } from '@/services/supabase';

export function usePartnerInvite() {
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
      const { error, data } = await signUp(email, password, name);
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
  
  return {
    inviteToken,
    user,
    isLoading,
    inviterName,
    email,
    setEmail,
    name, 
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit
  };
}
