
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../use-toast';
import { useAuth } from '../../contexts/AuthContext';
import { acceptPartnerInvite } from '../../services/supabase';
import { PartnerStatus } from '../../contexts/InterfaceContext';

interface UseOnboardingEffectsProps {
  setIsPartnerFlow: (value: boolean) => void;
  setPartnerStatus: (status: PartnerStatus) => void;
  setInviteToken: (token: string | null) => void;
  inviteToken: string | null;
}

export const useOnboardingEffects = ({
  setIsPartnerFlow,
  setPartnerStatus,
  setInviteToken,
  inviteToken
}: UseOnboardingEffectsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, relationship, loading } = useAuth();
  
  // Check if this is a partner flow (coming from invite)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('invite');
    
    if (token) {
      setIsPartnerFlow(true);
      setPartnerStatus('couple');
      setInviteToken(token);
    }
  }, [location.search, setIsPartnerFlow, setPartnerStatus, setInviteToken]);

  // Check if the user already has an active relationship
  useEffect(() => {
    if (relationship) {
      if (relationship.status === 'connected' || relationship.status === 'invited') {
        setPartnerStatus('couple');
      }
    }
  }, [relationship, setPartnerStatus]);
  
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
  }, [user, inviteToken, loading, toast, setIsPartnerFlow, setPartnerStatus]);
  
  return { loading };
};
