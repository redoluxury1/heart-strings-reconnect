import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Calendar } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
}

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          name: data.name || '',
          email: data.email || user?.email || '',
        });
      } else {
        // If no profile exists, use user data
        setProfile({
          name: user?.user_metadata?.name || '',
          email: user?.email || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Fallback to user data
      setProfile({
        name: user?.user_metadata?.name || '',
        email: user?.email || '',
      });
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: profile.name,
          email: profile.email,
        });

      if (profileError) throw profileError;

      // Update user metadata if name changed
      if (profile.name !== user.user_metadata?.name) {
        const { error: userError } = await supabase.auth.updateUser({
          data: { name: profile.name }
        });

        if (userError) throw userError;
      }

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your display name"
            />
            <p className="text-sm text-gray-600 mt-1">
              This is how your name will appear to your partner
            </p>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                className="pl-10"
                placeholder="Enter your email"
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Used for notifications and account recovery
            </p>
          </div>

          <Button 
            onClick={handleUpdateProfile} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </div>

        {/* Account Info */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Account Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Member since:</span>
              <span>{user?.created_at ? formatDate(user.created_at) : 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last sign in:</span>
              <span>{user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">User ID:</span>
              <span className="font-mono text-xs">{user?.id?.slice(0, 8)}...</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;