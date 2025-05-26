
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface NotificationSettings {
  id?: string;
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  love_note_notifications: boolean;
  conversation_notifications: boolean;
  code_word_notifications: boolean;
  notification_sound: boolean;
  quiet_hours_start?: string;
  quiet_hours_end?: string;
}

export interface NotificationHistory {
  id?: string;
  recipient_id: string;
  sender_id?: string;
  notification_type: string;
  title: string;
  message: string;
  delivery_status: 'pending' | 'delivered' | 'failed';
  delivered_at?: string;
  read_at?: string;
  metadata?: any;
}

// Get user's notification settings
export const getNotificationSettings = async (userId: string): Promise<NotificationSettings | null> => {
  const { data, error } = await supabase
    .from('notification_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching notification settings:', error);
    return null;
  }
  
  return data;
};

// Create or update notification settings
export const upsertNotificationSettings = async (settings: NotificationSettings): Promise<boolean> => {
  const { error } = await supabase
    .from('notification_settings')
    .upsert(settings, { onConflict: 'user_id' });
  
  if (error) {
    console.error('Error upserting notification settings:', error);
    return false;
  }
  
  return true;
};

// Create notification history entry
export const createNotification = async (notification: NotificationHistory): Promise<boolean> => {
  const { error } = await supabase
    .from('notification_history')
    .insert(notification);
  
  if (error) {
    console.error('Error creating notification:', error);
    return false;
  }
  
  return true;
};

// Get notification history for a user
export const getNotificationHistory = async (userId: string, limit = 50): Promise<NotificationHistory[]> => {
  const { data, error } = await supabase
    .from('notification_history')
    .select('*')
    .eq('recipient_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching notification history:', error);
    return [];
  }
  
  return data || [];
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('notification_history')
    .update({ read_at: new Date().toISOString() })
    .eq('id', notificationId);
  
  if (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
  
  return true;
};

// Send in-app notification with toast
export const sendInAppNotification = async (
  recipientId: string,
  senderId: string | null,
  type: string,
  title: string,
  message: string,
  metadata?: any
): Promise<void> => {
  // Create notification history entry
  await createNotification({
    recipient_id: recipientId,
    sender_id: senderId,
    notification_type: type,
    title,
    message,
    delivery_status: 'delivered',
    delivered_at: new Date().toISOString(),
    metadata
  });
  
  // Show toast notification
  toast({
    title,
    description: message,
  });
  
  // Play notification sound if enabled
  const settings = await getNotificationSettings(recipientId);
  if (settings?.notification_sound) {
    try {
      const audio = new Audio('/notification-sound.mp3');
      audio.play().catch(err => console.log('Could not play notification sound:', err));
    } catch (err) {
      console.log('Error playing notification sound:', err);
    }
  }
};

// Subscribe to real-time notifications
export const subscribeToNotifications = (
  userId: string,
  callback: (notification: NotificationHistory) => void
) => {
  return supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notification_history',
        filter: `recipient_id=eq.${userId}`
      },
      (payload) => {
        callback(payload.new as NotificationHistory);
      }
    )
    .subscribe();
};
