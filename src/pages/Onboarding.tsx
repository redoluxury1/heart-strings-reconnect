
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContentContainer from '../components/common/ContentContainer';
import OnboardingWelcome from '../components/onboarding/OnboardingWelcome';
import OnboardingPartnerStatus from '../components/onboarding/OnboardingPartnerStatus';
import OnboardingStyleSelector from '../components/onboarding/OnboardingStyleSelector';
import PartnerInvite from '../components/onboarding/PartnerInvite';
import { useToast } from '../hooks/use-toast';
import { useInterface } from '../hooks/useInterfaceContext';
import { PartnerStatus, InterfaceStyle } from '../contexts/InterfaceContext';
import { useAuth } from '../contexts/AuthContext';
import { acceptPartnerInvite } from '../services/supabase';

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setPartnerStatus: updateGlobalPartnerStatus, setInterfaceStyle: updateGlobalInterfaceStyle } = useInterface();
  const { user, relationship, loading } = useAuth();
  
  const [step, setStep] = useState<number>(1);
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [interfaceStyle, setInterfaceStyle] = useState<InterfaceStyle>('emotionally-reflective');
  const [isPartnerInvited, setIsPartnerInvited] = useState(false);
  const [isPartnerFlow, setIsPartnerFlow] = useState(false);
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);
  
  // Check if this is a partner flow (coming from invite)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('invite');
    
    if (token) {
      setIsPartnerFlow(true);
      setPartnerStatus('couple');
      setInviteToken(token);
    }
  }, [location.search]);

  // Check if the user already has an active relationship
  useEffect(() => {
    if (relationship && relationship.status === 'connected') {
      setIsPartnerInvited(true);
      setPartnerStatus('couple');
    } else if (relationship && relationship.status === 'invited') {
      setIsPartnerInvited(true);
      setPartnerStatus('couple');
    }
  }, [relationship]);
  
  // Handle invite token connection after user is loaded
  useEffect(() => {
    const connectWithInviteToken = async () => {
      if (user && inviteToken) {
        try {
          const updatedRelationship = await acceptPartnerInvite(inviteToken, user.id);
          
          if (updatedRelationship) {
            toast({
              title: "Connection successful!",
              description: "You've been connected with your partner."
            });
            setIsPartnerFlow(true);
            setPartnerStatus('couple');
            setIsPartnerInvited(true);
          }
        } catch (error) {
          console.error("Error connecting with invite token:", error);
          toast({
            title: "Connection error",
            description: "There was a problem connecting with your partner.",
            variant: "destructive"
          });
        }
      }
    };
    
    if (!loading) {
      connectWithInviteToken();
    }
  }, [user, inviteToken, loading, toast]);
  
  const handleNextStep = () => {
    if (step < 3) {  // Updated to include style selection step
      setStep(step + 1);
    } else {
      // Save preferences to localStorage
      localStorage.setItem('bridge-partner-status', partnerStatus);
      localStorage.setItem('bridge-interface-style', interfaceStyle);
      updateGlobalPartnerStatus(partnerStatus);
      updateGlobalInterfaceStyle(interfaceStyle);
      
      // Notify user of success
      toast({
        title: "You're all set!",
        description: "Your preferences have been saved.",
      });
      
      // Navigate to home page
      navigate('/');
    }
  };
  
  const handleAddPartner = () => {
    setStep(4); // Go to partner invite step
  };
  
  const handleBackFromPartnerInvite = () => {
    setStep(2); // Back to partner status step
  };
  
  const handlePartnerInviteComplete = () => {
    setIsPartnerInvited(true);
    setStep(2);
    toast({
      title: "Partner invited",
      description: "Your partner will receive an invitation to join Bridge For Couples.",
    });
  };

  // Don't render the component until we've checked auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-blush">
        <ContentContainer className="max-w-xl">
          <div className="rounded-xl p-8 bg-white shadow-lg text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-lavender-blue/20 rounded"></div>
              <div className="h-32 bg-lavender-blue/10 rounded"></div>
            </div>
          </div>
        </ContentContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-blush">
      <ContentContainer className="max-w-xl">
        <div className="rounded-xl p-8 bg-white shadow-lg">
          {step === 1 && (
            <OnboardingWelcome 
              onContinue={handleNextStep}
            />
          )}
          
          {step === 2 && (
            <OnboardingPartnerStatus
              partnerStatus={partnerStatus}
              setPartnerStatus={setPartnerStatus}
              onContinue={handleNextStep}
              onAddPartner={handleAddPartner}
              isPartnerInvited={isPartnerInvited || isPartnerFlow}
            />
          )}
          
          {step === 3 && (
            <OnboardingStyleSelector
              interfaceStyle={interfaceStyle}
              setInterfaceStyle={setInterfaceStyle}
              onContinue={handleNextStep}
            />
          )}
          
          {step === 4 && (
            <PartnerInvite
              onBack={handleBackFromPartnerInvite}
              onComplete={handlePartnerInviteComplete}
            />
          )}
        </div>
      </ContentContainer>
    </div>
  );
};

export default Onboarding;
