
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ConversationSession {
  id: string;
  relationship_id: string;
  initiator_id: string;
  type: 'mid-fight' | 'post-fight';
  status: 'active' | 'completed' | 'paused';
  metadata: any;
  created_at: string;
  updated_at: string;
}

// Create a new conversation session
export const createConversationSession = async (
  relationshipId: string, 
  initiatorId: string,
  type: 'mid-fight' | 'post-fight',
  metadata: any = {}
): Promise<ConversationSession | null> => {
  const { data, error } = await supabase
    .from('conversation_sessions')
    .insert({
      relationship_id: relationshipId,
      initiator_id: initiatorId,
      type,
      metadata
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating conversation session:', error);
    return null;
  }
  
  return data as ConversationSession;
};

// Get the active conversation session for a relationship
export const getActiveConversationSession = async (
  relationshipId: string,
  type?: 'mid-fight' | 'post-fight'
): Promise<ConversationSession | null> => {
  let query = supabase
    .from('conversation_sessions')
    .select('*')
    .eq('relationship_id', relationshipId)
    .eq('status', 'active');
  
  if (type) {
    query = query.eq('type', type);
  }
  
  const { data, error } = await query.maybeSingle();
  
  if (error) {
    console.error('Error fetching active conversation session:', error);
    return null;
  }
  
  return data as ConversationSession;
};

// Update a conversation session
export const updateConversationSession = async (
  sessionId: string,
  updates: Partial<ConversationSession>
): Promise<ConversationSession | null> => {
  const { data, error } = await supabase
    .from('conversation_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating conversation session:', error);
    return null;
  }
  
  return data as ConversationSession;
};

// Complete a conversation session
export const completeConversationSession = async (sessionId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('conversation_sessions')
    .update({ status: 'completed' })
    .eq('id', sessionId);
  
  if (error) {
    console.error('Error completing conversation session:', error);
    return false;
  }
  
  return true;
};

// Subscribe to changes in a conversation session
export const subscribeToConversationSession = (
  sessionId: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(`public:conversation_sessions:id=eq.${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'conversation_sessions',
        filter: `id=eq.${sessionId}`
      },
      callback
    )
    .subscribe();
};

// Subscribe to all active conversation sessions for a relationship
export const subscribeToActiveConversations = (
  relationshipId: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(`public:conversation_sessions:relationship_id=eq.${relationshipId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen for all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'conversation_sessions',
        filter: `relationship_id=eq.${relationshipId}`
      },
      callback
    )
    .subscribe();
};

// Handle notifications for conversation events
export const sendConversationNotification = (title: string, message: string) => {
  // Play notification sound
  const audio = new Audio('/notification-sound.mp3');
  audio.play().catch(err => console.error('Error playing notification sound:', err));
  
  // Show toast notification
  toast({
    title,
    description: message,
  });
};
