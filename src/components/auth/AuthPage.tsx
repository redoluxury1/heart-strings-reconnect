
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from './AuthLayout';
import AuthForm from './AuthForm';

const AuthPage = () => {
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Check for invite token in query params
    const params = new URLSearchParams(location.search);
    const token = params.get('invite');
    if (token) {
      setInviteToken(token);
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
      <AuthForm inviteToken={inviteToken} />
    </AuthLayout>
  );
};

export default AuthPage;
