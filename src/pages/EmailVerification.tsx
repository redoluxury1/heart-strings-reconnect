
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

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('No verification token found in the URL');
        return;
      }

      try {
        console.log('=== VERIFYING EMAIL WITH SUPABASE OTP ===');
        console.log('Token:', token.substring(0, 10) + '...');
        
        // Use Supabase's native verifyOtp method with correct type
        const { data, error } = await supabase.auth.verifyOtp({
          type: 'email',
          token: token
        });

        console.log('Supabase verifyOtp result:', { 
          hasUser: !!data?.user,
          hasSession: !!data?.session,
          error 
        });

        if (error) {
          console.error('Verification error:', error);
          
          if (error.message.includes('expired') || error.message.includes('invalid')) {
            setStatus('signup_again');
            setMessage('Your verification link has expired or is invalid. Please sign up again to receive a new verification email.');
          } else {
            setStatus('error');
            setMessage(error.message || 'Verification failed. Please try again or contact support.');
          }
          return;
        }

        if (data?.user && data?.session) {
          console.log('=== EMAIL VERIFICATION SUCCESSFUL ===');
          console.log('User verified:', data.user.id);
          
          setStatus('success');
          setMessage('Your email has been verified successfully!');
          
          toast({
            title: "Email verified!",
            description: "Your account is now active. You can log in.",
          });

          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/auth');
          }, 3000);
        } else {
          console.error('Verification succeeded but no user/session returned');
          setStatus('error');
          setMessage('Verification completed but login failed. Please try logging in manually.');
        }

      } catch (error: any) {
        console.error('=== VERIFICATION EXCEPTION ===');
        console.error('Error:', error);
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
              Verification Link Expired
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
