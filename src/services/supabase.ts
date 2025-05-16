
import { createClient } from '@supabase/supabase-js';
import type { UserProfile, Relationship, InviteRequest } from '@/types/relationship';
import { supabase } from '@/integrations/supabase/client';

export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data as UserProfile;
};

export const updateProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select('id, name, email')
    .single();
  
  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }
  
  return data as UserProfile;
};

export const getRelationship = async (userId: string): Promise<Relationship | null> => {
  const { data, error } = await supabase
    .from('relationships')
    .select('*')
    .or(`user_id.eq.${userId},partner_id.eq.${userId}`)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching relationship:', error);
    return null;
  }
  
  if (!data) return null;
  
  return {
    ...data,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    codeWord: data.code_word
  } as Relationship;
};

export const createRelationship = async (userId: string): Promise<Relationship | null> => {
  // Generate a unique invite token
  const inviteToken = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
  
  const { data, error } = await supabase
    .from('relationships')
    .insert({
      user_id: userId,
      invite_token: inviteToken,
      status: null
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating relationship:', error);
    return null;
  }
  
  if (!data) return null;
  
  return {
    ...data,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    codeWord: data.code_word
  } as Relationship;
};

export const invitePartner = async (relationshipId: string, invite: InviteRequest): Promise<boolean> => {
  const { error } = await supabase
    .from('relationships')
    .update({
      invite_email: invite.partnerEmail,
      invite_name: invite.partnerName,
      status: 'invited'
    })
    .eq('id', relationshipId);
  
  if (error) {
    console.error('Error inviting partner:', error);
    return false;
  }
  
  return true;
};

export const acceptPartnerInvite = async (inviteToken: string, partnerId: string): Promise<Relationship | null> => {
  const { data, error } = await supabase
    .from('relationships')
    .update({
      partner_id: partnerId,
      status: 'connected'
    })
    .eq('invite_token', inviteToken)
    .select()
    .single();
  
  if (error) {
    console.error('Error accepting invitation:', error);
    return null;
  }
  
  if (!data) return null;
  
  return {
    ...data,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    codeWord: data.code_word
  } as Relationship;
};
