
import { supabase } from '@/integrations/supabase/client';
import { sendInAppNotification } from '@/services/notifications';
import { getUserDeviceTokens } from '@/services/deviceTokens';

export interface NotificationTrigger {
  type: 'conversation_started' | 'message_sent' | 'code_word_activated' | 'timer_ended' | 'daily_encouragement';
  sender_id?: string;
  recipient_id: string;
  relationship_id: string;
  metadata?: any;
}

// Trigger when partner starts a conversation tool
export const notifyConversationStarted = async (
  initiatorId: string,
  partnerId: string,
  relationshipId: string,
  toolType: string
): Promise<void> => {
  const messages = [
    "Your partner just started a conversation in Bridge for Couples. Tap to respond.",
    "There's a message waiting for you in Bridge for Couples.",
    "A conversation was started. You can join when you're ready."
  ];
  
  const message = messages[Math.floor(Math.random() * messages.length)];
  
  await sendInAppNotification(
    partnerId,
    initiatorId,
    'conversation_started',
    'Conversation Started',
    message,
    { toolType, relationshipId }
  );
  
  // Send push notification if available
  await sendPushNotification(partnerId, 'Conversation Started', message);
};

// Trigger when partner sends a message
export const notifyMessageSent = async (
  senderId: string,
  recipientId: string,
  conversationId: string,
  relationshipId: string
): Promise<void> => {
  const messages = [
    "You've got a message waiting in Bridge for Couples.",
    "Your partner reached out. Want to take the next step?"
  ];
  
  const message = messages[Math.floor(Math.random() * messages.length)];
  
  await sendInAppNotification(
    recipientId,
    senderId,
    'message_sent',
    'New Message',
    message,
    { conversationId, relationshipId }
  );
  
  await sendPushNotification(recipientId, 'New Message', message);
};

// Trigger when code word is activated (pause started)
export const notifyCodeWordActivated = async (
  initiatorId: string,
  partnerId: string,
  relationshipId: string,
  timerDuration: number
): Promise<void> => {
  const messages = [
    "Your partner initiated a pause using your shared code word. Take a breath—we'll let you know when it's time to check back in.",
    "A pause was requested. We'll notify you when the reset timer ends."
  ];
  
  const message = messages[Math.floor(Math.random() * messages.length)];
  
  await sendInAppNotification(
    partnerId,
    initiatorId,
    'code_word_activated',
    'Pause Initiated',
    message,
    { timerDuration, relationshipId }
  );
  
  await sendPushNotification(partnerId, 'Pause Initiated', message);
};

// Trigger when timer ends (both partners get notified)
export const notifyTimerEnded = async (
  partner1Id: string,
  partner2Id: string,
  relationshipId: string
): Promise<void> => {
  const messages = [
    "The pause is over. Ready to reconnect when you are.",
    "Time-out complete. You can return to your conversation now."
  ];
  
  const message = messages[Math.floor(Math.random() * messages.length)];
  
  // Notify both partners
  for (const partnerId of [partner1Id, partner2Id]) {
    await sendInAppNotification(
      partnerId,
      null,
      'timer_ended',
      'Pause Complete',
      message,
      { relationshipId }
    );
    
    await sendPushNotification(partnerId, 'Pause Complete', message);
  }
};

// Daily encouragement notification
export const notifyDailyEncouragement = async (
  userId: string,
  relationshipId: string
): Promise<void> => {
  const messages = [
    "One small step a day builds a stronger connection. What's something kind you could say today?",
    "Your relationship deserves a moment of kindness today. How will you show it?",
    "Small gestures make big differences. What will yours be today?"
  ];
  
  const message = messages[Math.floor(Math.random() * messages.length)];
  
  await sendInAppNotification(
    userId,
    null,
    'daily_encouragement',
    'Daily Connection',
    message,
    { relationshipId }
  );
  
  await sendPushNotification(userId, 'Daily Connection', message);
};

// Helper function to send push notifications
const sendPushNotification = async (
  userId: string,
  title: string,
  message: string
): Promise<void> => {
  try {
    // Get user's device tokens
    const deviceTokens = await getUserDeviceTokens(userId);
    
    if (deviceTokens.length === 0) {
      console.log(`No device tokens found for user ${userId}`);
      return;
    }
    
    // In a real implementation, you would send to FCM/OneSignal here
    // For now, we'll just log and show browser notification if available
    console.log(`Would send push notification to ${deviceTokens.length} devices:`, {
      title,
      message,
      userId
    });
    
    // Show browser notification if permission is granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/lovable-uploads/a76cbc57-66f5-47a4-9713-382f8a512e91.png',
        badge: '/lovable-uploads/a76cbc57-66f5-47a4-9713-382f8a512e91.png'
      });
    }
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

// Get notification preferences for a user
export const getNotificationPreferences = async (userId: string) => {
  const { data, error } = await supabase
    .from('notification_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching notification preferences:', error);
    return null;
  }
  
  return data;
};

// Update notification preferences
export const updateNotificationPreferences = async (
  userId: string,
  preferences: {
    conversation_notifications?: boolean;
    code_word_notifications?: boolean;
    daily_encouragement?: boolean;
    push_notifications?: boolean;
  }
) => {
  const { error } = await supabase
    .from('notification_settings')
    .upsert({
      user_id: userId,
      ...preferences
    }, { onConflict: 'user_id' });
  
  if (error) {
    console.error('Error updating notification preferences:', error);
    return false;
  }
  
  return true;
};
