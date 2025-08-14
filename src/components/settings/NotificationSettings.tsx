import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Bell, Volume2, Moon } from 'lucide-react';

interface NotificationSettingsData {
  push_notifications: boolean;
  email_notifications: boolean;
  conversation_notifications: boolean;
  love_note_notifications: boolean;
  code_word_notifications: boolean;
  notification_sound: boolean;
  quiet_hours_start: string | null;
  quiet_hours_end: string | null;
}

const NotificationSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSettingsData>({
    push_notifications: true,
    email_notifications: true,
    conversation_notifications: true,
    love_note_notifications: true,
    code_word_notifications: true,
    notification_sound: true,
    quiet_hours_start: null,
    quiet_hours_end: null,
  });

  useEffect(() => {
    if (user) {
      loadNotificationSettings();
    }
  }, [user]);

  const loadNotificationSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings({
          push_notifications: data.push_notifications ?? true,
          email_notifications: data.email_notifications ?? true,
          conversation_notifications: data.conversation_notifications ?? true,
          love_note_notifications: data.love_note_notifications ?? true,
          code_word_notifications: data.code_word_notifications ?? true,
          notification_sound: data.notification_sound ?? true,
          quiet_hours_start: data.quiet_hours_start,
          quiet_hours_end: data.quiet_hours_end,
        });
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const updateSettings = async (updates: Partial<NotificationSettingsData>) => {
    if (!user) return;

    setLoading(true);
    try {
      const newSettings = { ...settings, ...updates };
      
      const { error } = await supabase
        .from('notification_settings')
        .upsert({
          user_id: user.id,
          ...newSettings,
        });

      if (error) throw error;

      setSettings(newSettings);
      toast({
        title: "Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchChange = (key: keyof NotificationSettingsData, value: boolean) => {
    updateSettings({ [key]: value });
  };

  const handleTimeChange = (type: 'quiet_hours_start' | 'quiet_hours_end', value: string) => {
    updateSettings({ [type]: value || null });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* General Notifications */}
        <div className="space-y-4">
          <h4 className="font-medium">General Notifications</h4>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications on your device</p>
            </div>
            <Switch
              checked={settings.push_notifications}
              onCheckedChange={(checked) => handleSwitchChange('push_notifications', checked)}
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              checked={settings.email_notifications}
              onCheckedChange={(checked) => handleSwitchChange('email_notifications', checked)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Specific Notifications */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Specific Notifications</h4>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Conversation Updates</Label>
              <p className="text-sm text-gray-600">When your partner sends messages</p>
            </div>
            <Switch
              checked={settings.conversation_notifications}
              onCheckedChange={(checked) => handleSwitchChange('conversation_notifications', checked)}
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Love Notes</Label>
              <p className="text-sm text-gray-600">When you receive love notes</p>
            </div>
            <Switch
              checked={settings.love_note_notifications}
              onCheckedChange={(checked) => handleSwitchChange('love_note_notifications', checked)}
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Code Word Alerts</Label>
              <p className="text-sm text-gray-600">When your partner uses the code word</p>
            </div>
            <Switch
              checked={settings.code_word_notifications}
              onCheckedChange={(checked) => handleSwitchChange('code_word_notifications', checked)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Sound & Timing */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium flex items-center">
            <Volume2 className="h-4 w-4 mr-2" />
            Sound & Timing
          </h4>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notification Sound</Label>
              <p className="text-sm text-gray-600">Play sound for notifications</p>
            </div>
            <Switch
              checked={settings.notification_sound}
              onCheckedChange={(checked) => handleSwitchChange('notification_sound', checked)}
              disabled={loading}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Moon className="h-4 w-4 mr-2" />
              <Label>Quiet Hours</Label>
            </div>
            <p className="text-sm text-gray-600">Set times when you don't want to receive notifications</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quietStart" className="text-sm">Start Time</Label>
                <Input
                  id="quietStart"
                  type="time"
                  value={settings.quiet_hours_start || ''}
                  onChange={(e) => handleTimeChange('quiet_hours_start', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="quietEnd" className="text-sm">End Time</Label>
                <Input
                  id="quietEnd"
                  type="time"
                  value={settings.quiet_hours_end || ''}
                  onChange={(e) => handleTimeChange('quiet_hours_end', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;