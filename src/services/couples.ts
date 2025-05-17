
import { supabase } from '../integrations/supabase/client';
import { Couple, Reflection, SharedNote, UserProfile } from '../types';

/**
 * Creates a couple relationship between two users
 */
export const createCouple = async (user1Id: string, user2Id: string): Promise<Couple | null> => {
  const { data, error } = await supabase
    .from('couples')
    .insert({
      user1_id: user1Id,
      user2_id: user2Id
    })
    .select('*')
    .single();
  
  if (error) {
    console.error('Error creating couple:', error);
    return null;
  }
  
  return {
    id: data.id,
    user1_id: data.user1_id,
    user2_id: data.user2_id,
    date_joined: new Date(data.date_joined),
    shared_progress: data.shared_progress
  };
};

/**
 * Gets a couple by the couple ID
 */
export const getCouple = async (coupleId: string): Promise<Couple | null> => {
  const { data, error } = await supabase
    .from('couples')
    .select('*')
    .eq('id', coupleId)
    .single();
  
  if (error) {
    console.error('Error fetching couple:', error);
    return null;
  }
  
  if (!data) return null;
  
  return {
    id: data.id,
    user1_id: data.user1_id,
    user2_id: data.user2_id,
    date_joined: new Date(data.date_joined),
    shared_progress: data.shared_progress
  };
};

/**
 * Gets a couple by user ID (finds couples where the user is either user1 or user2)
 */
export const getCoupleByUserId = async (userId: string): Promise<Couple | null> => {
  const { data, error } = await supabase
    .from('couples')
    .select('*')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .single();
  
  if (error) {
    console.error('Error fetching couple by user ID:', error);
    return null;
  }
  
  if (!data) return null;
  
  return {
    id: data.id,
    user1_id: data.user1_id,
    user2_id: data.user2_id,
    date_joined: new Date(data.date_joined),
    shared_progress: data.shared_progress
  };
};

/**
 * Updates a user's profile to link them to their couple
 */
export const updateUserWithCoupleId = async (userId: string, coupleId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      couple_id: coupleId,
      usage_mode: 'couple',
      role: 'partner'
    })
    .eq('id', userId)
    .select('*')
    .single();
  
  if (error) {
    console.error('Error updating user with couple ID:', error);
    return null;
  }
  
  return {
    id: data.id,
    name: data.name,
    email: data.email || '',
    role: data.role || 'individual',
    usage_mode: data.usage_mode || 'solo',
    couple_id: data.couple_id,
    partnerId: data.partner_id || null,
    relationshipId: null, // This would need to be fetched separately
    loveCode: null, // These would need to be fetched from user_meta
    secondaryLoveCode: null
  };
};
