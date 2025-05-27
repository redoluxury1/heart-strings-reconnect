
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from './AuthLayout';
import AuthForm from './AuthForm';

const AuthPage = () => {
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [signupMode, setSignupMode] = useState<'solo' | 'partner' | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Check for invite token and mode in query params
    const params = new URLSearchParams(location.search);
    const token = params.get('invite');
    const mode = params.get('mode') as 'solo' | 'partner';
    
    if (token) {
      setInviteToken(token);
    }
    
    if (mode) {
      setSignupMode(mode);
    }
  }, [location]);
  
  useEffect(() => {
    // If user is already logged in, redirect to onboarding
    if (user) {
      navigate('/onboarding');
    }
  }, [user, navigate]);

  return (
    <AuthLayout 
      title="Let's build better conversations—together."
      description="Create an account or sign in to get started."
    >
      <AuthForm inviteToken={inviteToken} signupMode={signupMode} />
    </AuthLayout>
  );
};

export default AuthPage;
