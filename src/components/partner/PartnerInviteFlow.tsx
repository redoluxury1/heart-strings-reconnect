
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, CheckCircle, Clock, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { invitePartner } from '@/services/supabase';

const PartnerInviteFlow: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<'idle' | 'sent' | 'pending'>('idle');
  const { user, relationship } = useAuth();
  const { toast } = useToast();
  
  const handleSendInvite = async () => {
    if (!email || !user || !relationship) return;
    
    setIsLoading(true);
    
    try {
      const success = await invitePartner(relationship.id, {
        partnerEmail: email,
        partnerName: name || undefined
      });
      
      if (success) {
        setInviteStatus('sent');
        toast({
          title: "Invitation sent!",
          description: "Your partner will receive an email to join Bridge For Couples.",
        });
        setEmail('');
        setName('');
      } else {
        throw new Error("Failed to send invitation");
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Failed to send invitation",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Show connection status if already connected
  if (relationship?.status === 'connected') {
    return (
      <Card className="p-6 bg-green-50 border-green-200">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <h3 className="font-medium text-green-800">Partner Connected</h3>
            <p className="text-sm text-green-600">You're all set to use Bridge together!</p>
          </div>
        </div>
      </Card>
    );
  }
  
  // Show pending status if invite was sent
  if (relationship?.status === 'invited' || inviteStatus === 'sent') {
    return (
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-blue-600" />
          <div className="flex-1">
            <h3 className="font-medium text-blue-800">Invitation Pending</h3>
            <p className="text-sm text-blue-600">
              {relationship?.invite_email ? 
                `Waiting for ${relationship.invite_email} to accept your invitation.` :
                'Your invitation has been sent. Waiting for your partner to join.'
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInviteStatus('idle')}
            className="text-blue-600 hover:text-blue-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-midnight-indigo mb-2">Invite Your Partner</h3>
          <p className="text-sm text-gray-600">
            Connect with your partner to unlock shared activities and conversations.
          </p>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Partner's Name (Optional)
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter their name"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Partner's Email *
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter their email address"
              className="w-full"
            />
          </div>
          
          <Button
            onClick={handleSendInvite}
            disabled={!email || isLoading}
            className="w-full bg-terracotta hover:bg-terracotta/90 text-white"
          >
            {isLoading ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Invitation
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PartnerInviteFlow;
