
import { supabase } from '../integrations/supabase/client';
import { UserMeta } from '../types/couple';

/**
 * Gets user metadata
 */
export const getUserMeta = async (userId: string): Promise<UserMeta | null> => {
  const { data, error } = await supabase
    .from('user_meta')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No user meta found, not an error case
      return null;
    }
    console.error('Error fetching user metadata:', error);
    return null;
  }
  
  return {
    user_id: data.user_id,
    communication_style: data.communication_style,
    most_common_trigger: data.most_common_trigger,
    default_tone: data.default_tone,
    updated_at: new Date(data.updated_at)
  };
};

/**
 * Creates or updates user metadata
 */
export const upsertUserMeta = async (
  userId: string,
  meta: Partial<Omit<UserMeta, 'user_id' | 'updated_at'>>
): Promise<UserMeta | null> => {
  const { data, error } = await supabase
    .from('user_meta')
    .upsert({
      user_id: userId,
      ...meta,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error upserting user metadata:', error);
    return null;
  }
  
  return {
    user_id: data.user_id,
    communication_style: data.communication_style,
    most_common_trigger: data.most_common_trigger,
    default_tone: data.default_tone,
    updated_at: new Date(data.updated_at)
  };
};
