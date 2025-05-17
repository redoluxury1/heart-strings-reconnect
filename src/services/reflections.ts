
import { supabase } from '../integrations/supabase/client';
import { Reflection } from '../types/couple';

/**
 * Creates a new reflection for a couple
 */
export const createReflection = async (
  coupleId: string, 
  promptType: string, 
  isUser1: boolean, 
  response: Record<string, any>
): Promise<Reflection | null> => {
  // Determine which partner field to update based on whether the user is user1 or user2
  const responseField = isUser1 ? 'partner1_response' : 'partner2_response';
  
  const { data, error } = await supabase
    .from('reflections')
    .insert({
      couple_id: coupleId,
      prompt_type: promptType,
      [responseField]: response
    })
    .select('*')
    .single();
  
  if (error) {
    console.error('Error creating reflection:', error);
    return null;
  }
  
  return {
    id: data.id,
    couple_id: data.couple_id,
    prompt_type: data.prompt_type,
    partner1_response: data.partner1_response,
    partner2_response: data.partner2_response,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  };
};

/**
 * Updates an existing reflection with a partner's response
 */
export const updateReflection = async (
  reflectionId: string,
  isUser1: boolean,
  response: Record<string, any>
): Promise<Reflection | null> => {
  // Determine which partner field to update
  const responseField = isUser1 ? 'partner1_response' : 'partner2_response';
  
  const { data, error } = await supabase
    .from('reflections')
    .update({
      [responseField]: response,
      updated_at: new Date().toISOString()
    })
    .eq('id', reflectionId)
    .select('*')
    .single();
  
  if (error) {
    console.error('Error updating reflection:', error);
    return null;
  }
  
  return {
    id: data.id,
    couple_id: data.couple_id,
    prompt_type: data.prompt_type,
    partner1_response: data.partner1_response,
    partner2_response: data.partner2_response,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  };
};

/**
 * Gets all reflections for a couple
 */
export const getCoupleReflections = async (
  coupleId: string,
  promptType?: string
): Promise<Reflection[]> => {
  let query = supabase
    .from('reflections')
    .select('*')
    .eq('couple_id', coupleId);
  
  // Add prompt type filter if provided
  if (promptType) {
    query = query.eq('prompt_type', promptType);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching couple reflections:', error);
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    couple_id: item.couple_id,
    prompt_type: item.prompt_type,
    partner1_response: item.partner1_response,
    partner2_response: item.partner2_response,
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at)
  }));
};

/**
 * Gets a single reflection by ID
 */
export const getReflection = async (reflectionId: string): Promise<Reflection | null> => {
  const { data, error } = await supabase
    .from('reflections')
    .select('*')
    .eq('id', reflectionId)
    .single();
  
  if (error) {
    console.error('Error fetching reflection:', error);
    return null;
  }
  
  return {
    id: data.id,
    couple_id: data.couple_id,
    prompt_type: data.prompt_type,
    partner1_response: data.partner1_response,
    partner2_response: data.partner2_response,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  };
};

/**
 * Sets up a real-time subscription for reflection updates
 * Returns an unsubscribe function that should be called when component unmounts
 */
export const subscribeToReflectionUpdates = (
  reflectionId: string,
  onUpdate: (reflection: Reflection) => void
) => {
  const channel = supabase
    .channel(`reflection:${reflectionId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'reflections',
        filter: `id=eq.${reflectionId}`
      },
      (payload) => {
        const updatedReflection: Reflection = {
          id: payload.new.id,
          couple_id: payload.new.couple_id,
          prompt_type: payload.new.prompt_type,
          partner1_response: payload.new.partner1_response,
          partner2_response: payload.new.partner2_response,
          created_at: new Date(payload.new.created_at),
          updated_at: new Date(payload.new.updated_at)
        };
        onUpdate(updatedReflection);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
