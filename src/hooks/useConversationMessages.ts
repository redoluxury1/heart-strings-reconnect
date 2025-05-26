
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getConversationMessages,
  subscribeToConversationMessages,
  sendConversationMessage,
  type ConversationMessage 
} from '@/services/conversationMessages';

export const useConversationMessages = (sessionId: string | null) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Load messages when session changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!sessionId) {
        setMessages([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const sessionMessages = await getConversationMessages(sessionId);
      setMessages(sessionMessages);
      setLoading(false);
    };

    loadMessages();
  }, [sessionId]);

  // Subscribe to real-time messages
  useEffect(() => {
    if (!sessionId) return;

    const channel = subscribeToConversationMessages(sessionId, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [sessionId]);

  const sendMessage = async (
    messageText: string, 
    messageType: ConversationMessage['message_type'] = 'text',
    metadata?: any
  ) => {
    if (!sessionId || !user) return null;

    const message: ConversationMessage = {
      session_id: sessionId,
      sender_id: user.id,
      message_text: messageText,
      message_type: messageType,
      metadata
    };

    const sentMessage = await sendConversationMessage(message);
    
    // Optimistically add to local state (will be confirmed by real-time subscription)
    if (sentMessage) {
      setMessages(prev => [...prev, sentMessage]);
    }
    
    return sentMessage;
  };

  return {
    messages,
    loading,
    sendMessage
  };
};
