
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, MessageCircle, Pause, Heart, Brain, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { registerDeviceToken } from '@/services/deviceTokens';
import { useAuth } from '@/contexts/AuthContext';

interface NotificationPermissionScreenProps {
  onContinue: () => void;
  onSkip: () => void;
  partnerStatus?: 'solo' | 'couple';
}

const NotificationPermissionScreen: React.FC<NotificationPermissionScreenProps> = ({
  onContinue,
  onSkip,
  partnerStatus = 'couple'
}) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const isSolo = partnerStatus === 'solo';

  const handleEnableNotifications = async () => {
    setIsRequesting(true);
    
    try {
      // Check if the browser supports notifications
      if (!("Notification" in window)) {
        toast({
          title: "Notifications not supported",
          description: "Your browser doesn't support notifications.",
          variant: "destructive"
        });
        setIsRequesting(false);
        return;
      }

      // Request permission
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        // Generate a device token (in production, this would be from FCM)
        const deviceToken = `web_${user?.id}_${Date.now()}`;
        
        if (user) {
          await registerDeviceToken({
            user_id: user.id,
            token: deviceToken,
            device_type: 'web',
            device_name: navigator.userAgent,
            is_active: true
          });
        }
        
        toast({
          title: "Notifications enabled!",
          description: isSolo 
            ? "You'll receive gentle reminders to help you stay on track."
            : "You'll be notified when your partner reaches out."
        });
        
        onContinue();
      } else if (permission === "denied") {
        toast({
          title: "Notifications blocked",
          description: "You can enable them later in your browser settings.",
          variant: "destructive"
        });
        onSkip();
      } else {
        // Permission dismissed
        onSkip();
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast({
        title: "Something went wrong",
        description: "Unable to enable notifications right now.",
        variant: "destructive"
      });
      onSkip();
    } finally {
      setIsRequesting(false);
    }
  };

  const coupleContent = {
    header: "Want us to nudge you when it matters?",
    body: "Bridge for Couples works best when both partners stay connected. We'll send thoughtful notifications when your partner starts a conversation or needs a moment to pause.",
    notifications: [
      {
        icon: <MessageCircle className="w-5 h-5 text-[#2e4059] flex-shrink-0" />,
        text: "When your partner starts a conversation tool"
      },
      {
        icon: <Pause className="w-5 h-5 text-[#2e4059] flex-shrink-0" />,
        text: "When a pause timer ends and you're ready to reconnect"
      },
      {
        icon: <Heart className="w-5 h-5 text-[#2e4059] flex-shrink-0" />,
        text: "Gentle daily encouragement (optional)"
      }
    ]
  };

  const soloContent = {
    header: "Want gentle nudges to help you stay on track?",
    body: "Bridge can send kind reminders to help you reflect, reconnect, and make progress—even if you're using it solo.",
    notifications: [
      {
        icon: <Brain className="w-5 h-5 text-[#2e4059] flex-shrink-0" />,
        text: "Nudges to pause and check in with yourself"
      },
      {
        icon: <Sparkles className="w-5 h-5 text-[#2e4059] flex-shrink-0" />,
        text: "Reminders to revisit your progress or journal entries"
      },
      {
        icon: <Heart className="w-5 h-5 text-[#2e4059] flex-shrink-0" />,
        text: "Gentle daily encouragement (optional)"
      }
    ]
  };

  const content = isSolo ? soloContent : coupleContent;

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-8">
        <div className="w-20 h-20 bg-[#2e4059]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Bell className="w-10 h-10 text-[#2e4059]" />
        </div>
        
        <h2 className="font-cormorant text-3xl font-medium text-[#2e4059] mb-4">
          {content.header}
        </h2>
        
        <p className="text-lg text-[#2e4059]/80 mb-8 leading-relaxed">
          {content.body}
        </p>
      </div>

      {/* Notification Examples */}
      <div className="space-y-4 mb-8">
        {content.notifications.map((notification, index) => (
          <div key={index} className="bg-[#f5f1e8] p-4 rounded-lg flex items-center gap-3">
            {notification.icon}
            <p className="text-sm text-[#2e4059] text-left">
              {notification.text}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Button 
          onClick={handleEnableNotifications}
          disabled={isRequesting}
          size="lg"
          className="w-full bg-[#2e4059] hover:bg-[#2e4059]/90 text-white font-medium px-8 py-4 text-lg rounded-lg"
        >
          {isRequesting ? "Requesting..." : "Turn On Notifications"}
        </Button>
        
        <Button 
          onClick={onSkip}
          variant="ghost"
          size="lg"
          className="w-full text-[#2e4059]/70 hover:text-[#2e4059] font-medium"
        >
          Maybe later
        </Button>
      </div>
      
      <p className="text-xs text-[#2e4059]/60 mt-6">
        You can change notification settings anytime in your account preferences
      </p>
    </div>
  );
};

export default NotificationPermissionScreen;
