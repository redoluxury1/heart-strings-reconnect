import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, UserMinus, Mail, Copy, Check } from 'lucide-react';

const PartnerSettings: React.FC = () => {
  const { user, relationship } = useAuth();
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSendInvite = async () => {
    if (!user || !inviteEmail) return;
    
    setLoading(true);
    try {
      const inviteToken = crypto.randomUUID();
      
      const { error } = await supabase
        .from('relationships')
        .insert({
          user_id: user.id,
          invite_email: inviteEmail,
          invite_name: inviteName,
          invite_token: inviteToken,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Invitation Sent",
        description: `Partner invitation sent to ${inviteEmail}`,
      });

      setInviteEmail('');
      setInviteName('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!relationship) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('relationships')
        .update({ status: 'disconnected', partner_id: null })
        .eq('id', relationship.id);

      if (error) throw error;

      toast({
        title: "Partner Disconnected",
        description: "You have been disconnected from your partner.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect from partner.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = () => {
    if (!relationship?.invite_token) return;
    
    const inviteUrl = `${window.location.origin}/partner-invite/${relationship.invite_token}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    
    toast({
      title: "Link Copied",
      description: "Invite link copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    switch (relationship?.status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'disconnected':
        return <Badge className="bg-red-100 text-red-800">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">No Partner</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Partner Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium">Connection Status</h4>
            <p className="text-sm text-gray-600">
              {relationship?.status === 'connected' 
                ? `Connected with ${relationship?.invite_name || 'your partner'}`
                : relationship?.status === 'pending'
                ? `Invitation pending for ${relationship?.invite_email}`
                : 'No partner connected'
              }
            </p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Invite Partner */}
        {(!relationship || relationship.status === 'disconnected') && (
          <div className="space-y-4">
            <h4 className="font-medium flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Your Partner
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="partnerName">Partner's Name</Label>
                <Input
                  id="partnerName"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Enter your partner's name"
                />
              </div>
              <div>
                <Label htmlFor="partnerEmail">Partner's Email</Label>
                <Input
                  id="partnerEmail"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter your partner's email"
                />
              </div>
              <Button 
                onClick={handleSendInvite} 
                disabled={loading || !inviteEmail}
                className="w-full"
              >
                <Mail className="h-4 w-4 mr-2" />
                {loading ? 'Sending...' : 'Send Invitation'}
              </Button>
            </div>
          </div>
        )}

        {/* Pending Invitation */}
        {relationship?.status === 'pending' && (
          <div className="space-y-4">
            <h4 className="font-medium">Share Invite Link</h4>
            <div className="flex items-center gap-2">
              <Input
                value={`${window.location.origin}/partner-invite/${relationship.invite_token}`}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={copyInviteLink}
                variant="outline"
                size="sm"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Share this link with your partner or wait for them to accept the email invitation.
            </p>
          </div>
        )}

        {/* Disconnect Partner */}
        {relationship?.status === 'connected' && (
          <div className="pt-4 border-t">
            <h4 className="font-medium text-red-700 mb-2 flex items-center">
              <UserMinus className="h-4 w-4 mr-2" />
              Disconnect Partner
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              This will disconnect you from your partner. You can reconnect later by sending a new invitation.
            </p>
            <Button
              onClick={handleDisconnect}
              variant="destructive"
              disabled={loading}
            >
              {loading ? 'Disconnecting...' : 'Disconnect Partner'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PartnerSettings;