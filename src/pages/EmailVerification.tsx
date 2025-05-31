
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
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
        console.log('=== VERIFYING EMAIL ===');
        console.log('Token:', token.substring(0, 8) + '...');
        
        const { data, error } = await supabase.functions.invoke('verify-email', {
          body: { token }
        });

        console.log('Verification result:', { data, error });

        if (error) {
          console.error('Verification error:', error);
          setStatus('error');
          setMessage('Verification failed. Please try again or contact support.');
          return;
        }

        if (data?.success) {
          console.log('=== EMAIL VERIFICATION SUCCESSFUL ===');
          
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
          setStatus('error');
          setMessage(data?.error || 'Verification failed. Please try again.');
        }

      } catch (error: any) {
        console.error('=== VERIFICATION EXCEPTION ===', error);
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
