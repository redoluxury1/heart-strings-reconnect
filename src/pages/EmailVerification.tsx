
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'signup_again'>('verifying');
  const [message, setMessage] = useState('');
  const [action, setAction] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('No verification token found');
        return;
      }

      try {
        console.log('Attempting to verify email with token:', token.substring(0, 10) + '...');
        
        const { data, error } = await supabase.functions.invoke('verify-email', {
          body: { token }
        });

        console.log('Verification response:', { data, error });

        if (error) {
          console.error('Edge function error:', error);
          setStatus('error');
          setMessage('Verification service error. Please try again or contact support.');
          return;
        }

        if (data.success) {
          setStatus('success');
          setMessage(data.message || 'Your email has been verified successfully!');
          setAction(data.action);
          
          toast({
            title: "Email verified!",
            description: "Your account is now active. You can log in.",
          });

          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/auth');
          }, 3000);
        } else {
          console.error('Verification failed:', data);
          
          if (data.action === 'signup_again') {
            setStatus('signup_again');
            setMessage(data.error || 'Please sign up again');
          } else if (data.action === 'already_verified') {
            setStatus('success');
            setMessage(data.message || 'Email already verified');
            setTimeout(() => {
              navigate('/auth');
            }, 3000);
          } else {
            setStatus('error');
            setMessage(data.error || 'Verification failed');
          }
        }
      } catch (error: any) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred during verification. Please try again or contact support.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2e4059] to-[#1a2332] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-[#2e4059] mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Verifying your email...
            </h1>
            <p className="text-gray-600">
              Please wait while we confirm your email address.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Email Verified!
            </h1>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90"
            >
              Go to Login
            </Button>
          </>
        )}

        {status === 'signup_again' && (
          <>
            <AlertTriangle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Account Issue
            </h1>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/auth?tab=signup')}
                className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90"
              >
                Sign Up Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/auth')}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90"
              >
                Back to Login
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
