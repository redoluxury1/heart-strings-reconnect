
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getNotificationSettings, 
  getNotificationHistory, 
  subscribeToNotifications,
  type NotificationSettings,
  type NotificationHistory 
} from '@/services/notifications';

export const useNotifications = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [history, setHistory] = useState<NotificationHistory[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load notification settings and history
  useEffect(() => {
    const loadNotificationData = async () => {
      if (!user) return;
      
      setLoading(true);
      
      // Load settings
      const userSettings = await getNotificationSettings(user.id);
      setSettings(userSettings);
      
      // Load history
      const notificationHistory = await getNotificationHistory(user.id);
      setHistory(notificationHistory);
      
      // Calculate unread count
      const unread = notificationHistory.filter(n => !n.read_at).length;
      setUnreadCount(unread);
      
      setLoading(false);
    };

    loadNotificationData();
  }, [user]);

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user) return;

    const channel = subscribeToNotifications(user.id, (newNotification) => {
      setHistory(prev => [newNotification, ...prev]);
      if (!newNotification.read_at) {
        setUnreadCount(prev => prev + 1);
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  return {
    settings,
    history,
    unreadCount,
    loading,
    refreshHistory: async () => {
      if (user) {
        const notificationHistory = await getNotificationHistory(user.id);
        setHistory(notificationHistory);
      }
    }
  };
};
