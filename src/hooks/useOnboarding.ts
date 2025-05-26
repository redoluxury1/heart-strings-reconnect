
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { useInterface } from './useInterfaceContext';
import { useAuth } from '../contexts/AuthContext';
import { acceptPartnerInvite, createRelationship, invitePartner } from '../services/supabase';
import { supabase } from '../integrations/supabase/client';
import { PartnerStatus } from '../contexts/InterfaceContext';

export const useOnboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setPartnerStatus: updateGlobalPartnerStatus, setInterfaceStyle: updateGlobalInterfaceStyle } = useInterface();
  const { user, relationship, loading } = useAuth();
  
  const [step, setStep] = useState<number>(1);
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
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
    if (relationship) {
      if (relationship.status === 'connected' || relationship.status === 'invited') {
        setPartnerStatus('couple');
      }
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
  
  const completeOnboarding = async () => {
    console.log("Completing onboarding...");
    
    try {
      // Update user metadata with their partner status choice
      if (user) {
        await supabase.auth.updateUser({
          data: {
            usage_mode: partnerStatus,
            onboarding_complete: true
          }
        });
        
        // Also update the profile table
        await supabase.from('profiles')
          .update({ 
            usage_mode: partnerStatus, 
            role: partnerStatus === 'couple' ? 'partner' : 'individual',
            onboarding_complete: true
          })
          .eq('id', user.id);
        
        console.log(`Updated user metadata: usage_mode = ${partnerStatus}, onboarding_complete = true`);
      }

      // Save partner status to localStorage
      localStorage.setItem('bridge-partner-status', partnerStatus);
      
      // Set default interface style
      updateGlobalInterfaceStyle('emotionally-reflective');
      
      // Update global partner status
      updateGlobalPartnerStatus(partnerStatus);
      
      // Notify user of success
      toast({
        title: "You're all set!",
        description: "Your preferences have been saved.",
      });
      
      console.log("Onboarding completed successfully, navigating to home...");
      
      // Navigate to home page
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleNextStep = () => {
    console.log(`Current step: ${step}, moving to next step`);
    
    if (step === 1) {
      // Always go to step 2 (partner status selection)
      setStep(2);
    } else if (step === 2) {
      // From partner status step, check what the user selected
      if (partnerStatus === 'solo') {
        // Skip partner invite step and go directly to features intro
        setStep(4);
      } else {
        // Go to partner invite step for couple mode
        setStep(3);
      }
    } else if (step === 3) {
      // From partner invite step, go to features intro
      setStep(4);
    } else if (step === 4) {
      // From features intro, complete onboarding
      completeOnboarding();
    }
  };
  
  const handleAddPartner = () => {
    setStep(3); // Go to partner invite step
  };
  
  const handleBackFromPartnerInvite = () => {
    setStep(2); // Back to partner status step
  };
  
  const handlePartnerInviteComplete = async () => {
    // If the relationship doesn't exist yet, create it
    if (!relationship && user) {
      try {
        // Create a new relationship for this user
        await createRelationship(user.id);
      } catch (error) {
        console.error("Error creating relationship:", error);
      }
    }
    
    // Proceed to features intro step after inviting partner
    setStep(4);
  };
  
  return {
    loading,
    step,
    partnerStatus,
    setPartnerStatus,
    isPartnerFlow,
    handleNextStep,
    handleAddPartner,
    handleBackFromPartnerInvite,
    handlePartnerInviteComplete
  };
};
