
import { supabase } from '@/integrations/supabase/client';

export interface ConversationMessage {
  id?: string;
  session_id: string;
  sender_id: string;
  message_text: string;
  message_type: 'text' | 'code_word' | 'pause_request' | 'system';
  created_at?: string;
  read_at?: string;
  metadata?: any;
}

// Send a message in a conversation
export const sendConversationMessage = async (message: ConversationMessage): Promise<ConversationMessage | null> => {
  const { data, error } = await supabase
    .from('conversation_messages')
    .insert(message)
    .select()
    .single();
  
  if (error) {
    console.error('Error sending message:', error);
    return null;
  }
  
  return data as ConversationMessage;
};

// Get messages for a conversation session
export const getConversationMessages = async (sessionId: string): Promise<ConversationMessage[]> => {
  const { data, error } = await supabase
    .from('conversation_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  
  return (data || []) as ConversationMessage[];
};

// Mark message as read
export const markMessageAsRead = async (messageId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('conversation_messages')
    .update({ read_at: new Date().toISOString() })
    .eq('id', messageId);
  
  if (error) {
    console.error('Error marking message as read:', error);
    return false;
  }
  
  return true;
};

// Subscribe to real-time messages for a session
export const subscribeToConversationMessages = (
  sessionId: string,
  callback: (message: ConversationMessage) => void
) => {
  return supabase
    .channel(`conversation:${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'conversation_messages',
        filter: `session_id=eq.${sessionId}`
      },
      (payload) => {
        callback(payload.new as ConversationMessage);
      }
    )
    .subscribe();
};

// Get unread message count for a user - simplified approach
export const getUnreadMessageCount = async (userId: string): Promise<number> => {
  // First get all relationships where user is involved
  const { data: relationships, error: relationshipsError } = await supabase
    .from('relationships')
    .select('id')
    .or(`user_id.eq.${userId},partner_id.eq.${userId}`);
  
  if (relationshipsError || !relationships) {
    console.error('Error getting relationships:', relationshipsError);
    return 0;
  }
  
  // Get all session IDs for these relationships
  const { data: sessions, error: sessionsError } = await supabase
    .from('conversation_sessions')
    .select('id')
    .in('relationship_id', relationships.map(r => r.id));
  
  if (sessionsError || !sessions) {
    console.error('Error getting sessions:', sessionsError);
    return 0;
  }
  
  // Count unread messages in these sessions
  const { count, error } = await supabase
    .from('conversation_messages')
    .select('*', { count: 'exact', head: true })
    .neq('sender_id', userId)
    .is('read_at', null)
    .in('session_id', sessions.map(s => s.id));
  
  if (error) {
    console.error('Error getting unread message count:', error);
    return 0;
  }
  
  return count || 0;
};
