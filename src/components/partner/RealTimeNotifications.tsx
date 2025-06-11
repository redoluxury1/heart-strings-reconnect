
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { subscribeToNotifications } from '@/services/notifications';

const RealTimeNotifications: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!user) return;
    
    const channel = subscribeToNotifications(user.id, (notification) => {
      // Show toast for new notifications
      toast({
        title: notification.title,
        description: notification.message,
      });
    });
    
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [user, toast]);
  
  return null; // This is a background component
};

export default RealTimeNotifications;
