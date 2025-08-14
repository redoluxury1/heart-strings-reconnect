import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Heart, Zap } from 'lucide-react';

interface CommunicationData {
  communication_style: string;
  love_code: string;
  default_tone: string;
  most_common_trigger: string;
}

const CommunicationPreferences: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<CommunicationData>({
    communication_style: '',
    love_code: '',
    default_tone: '',
    most_common_trigger: '',
  });

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_meta')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setPreferences({
          communication_style: data.communication_style || '',
          love_code: data.love_code || '',
          default_tone: data.default_tone || '',
          most_common_trigger: data.most_common_trigger || '',
        });
      }
    } catch (error) {
      console.error('Error loading communication preferences:', error);
    }
  };

  const handleUpdatePreferences = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_meta')
        .upsert({
          user_id: user.id,
          ...preferences,
        });

      if (error) throw error;

      toast({
        title: "Preferences Updated",
        description: "Your communication preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Communication Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="communicationStyle">Communication Style</Label>
            <Select
              value={preferences.communication_style}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, communication_style: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your communication style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Direct & Straightforward</SelectItem>
                <SelectItem value="gentle">Gentle & Empathetic</SelectItem>
                <SelectItem value="analytical">Analytical & Logical</SelectItem>
                <SelectItem value="emotional">Emotional & Expressive</SelectItem>
                <SelectItem value="diplomatic">Diplomatic & Considerate</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-1">
              How you prefer to communicate during discussions
            </p>
          </div>

          <div>
            <Label htmlFor="loveCode" className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              Love Code
            </Label>
            <Select
              value={preferences.love_code}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, love_code: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your primary love code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="affirming_words">Affirming Words</SelectItem>
                <SelectItem value="physical_connection">Physical Connection</SelectItem>
                <SelectItem value="focused_attention">Focused Attention</SelectItem>
                <SelectItem value="supportive_acts">Supportive Acts</SelectItem>
                <SelectItem value="thoughtful_gestures">Thoughtful Gestures</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-1">
              How you prefer to express and receive love
            </p>
          </div>

          <div>
            <Label htmlFor="defaultTone">Preferred Tone for Tools</Label>
            <Select
              value={preferences.default_tone}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, default_tone: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supportive">Supportive & Encouraging</SelectItem>
                <SelectItem value="neutral">Neutral & Balanced</SelectItem>
                <SelectItem value="gentle">Gentle & Soft</SelectItem>
                <SelectItem value="direct">Direct & Clear</SelectItem>
                <SelectItem value="warm">Warm & Caring</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-1">
              How you'd like the app to communicate with you
            </p>
          </div>

          <div>
            <Label htmlFor="commonTrigger" className="flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              Most Common Conflict Trigger
            </Label>
            <Select
              value={preferences.most_common_trigger}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, most_common_trigger: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your most common trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="communication_breakdown">Communication Breakdown</SelectItem>
                <SelectItem value="feeling_unheard">Feeling Unheard</SelectItem>
                <SelectItem value="different_expectations">Different Expectations</SelectItem>
                <SelectItem value="time_management">Time Management</SelectItem>
                <SelectItem value="financial_stress">Financial Stress</SelectItem>
                <SelectItem value="family_dynamics">Family Dynamics</SelectItem>
                <SelectItem value="intimacy_issues">Intimacy Issues</SelectItem>
                <SelectItem value="household_responsibilities">Household Responsibilities</SelectItem>
                <SelectItem value="career_pressures">Career Pressures</SelectItem>
                <SelectItem value="social_differences">Social Differences</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-1">
              Helps us provide more targeted guidance
            </p>
          </div>

          <Button 
            onClick={handleUpdatePreferences} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Updating...' : 'Update Preferences'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationPreferences;