
import { createClient } from '@supabase/supabase-js';
import type { UserProfile, Relationship, InviteRequest, CodeWordInfo } from '@/types/relationship';
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
    id: data.id,
    user_id: data.user_id,
    partner_id: data.partner_id,
    invite_token: data.invite_token,
    invite_email: data.invite_email,
    invite_name: data.invite_name,
    status: data.status,
    codeWord: data.code_word ? parseCodeWordInfo(data.code_word) : null,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
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
    id: data.id,
    user_id: data.user_id,
    partner_id: data.partner_id,
    invite_token: data.invite_token,
    invite_email: data.invite_email,
    invite_name: data.invite_name,
    status: data.status,
    codeWord: data.code_word ? parseCodeWordInfo(data.code_word) : null,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
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
    id: data.id,
    user_id: data.user_id,
    partner_id: data.partner_id,
    invite_token: data.invite_token,
    invite_email: data.invite_email,
    invite_name: data.invite_name,
    status: data.status,
    codeWord: data.code_word ? parseCodeWordInfo(data.code_word) : null,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  } as Relationship;
};

// Helper function to parse the JSON codeWord data into our CodeWordInfo type
function parseCodeWordInfo(codeWordJson: any): CodeWordInfo | null {
  if (!codeWordJson) return null;

  try {
    // Ensure all required fields are present
    return {
      word: codeWordJson.word || '',
      updatedAt: codeWordJson.updatedAt ? new Date(codeWordJson.updatedAt) : new Date(),
      updatedBy: codeWordJson.updatedBy || '',
      status: codeWordJson.status || 'pending',
      partnerSuggestion: codeWordJson.partnerSuggestion,
      userSuggestion: codeWordJson.userSuggestion,
      lastUsed: codeWordJson.lastUsed ? new Date(codeWordJson.lastUsed) : undefined
    };
  } catch (error) {
    console.error('Error parsing code word data:', error);
    return null;
  }
}
