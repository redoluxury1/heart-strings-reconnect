import { createClient } from '@supabase/supabase-js';
import type { UserProfile, Relationship, InviteRequest, CodeWordInfo } from '@/types/relationship';
import { supabase } from '@/integrations/supabase/client';

export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, role, usage_mode, couple_id')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return {
    id: data.id,
    name: data.name,
    email: data.email || '',
    role: (data.role as 'individual' | 'partner') || 'individual',
    usage_mode: (data.usage_mode as 'solo' | 'couple') || 'solo',
    couple_id: data.couple_id,
    partnerId: null, // These would need to be populated from relationship data
    relationshipId: null,
    loveCode: null, // These would need to be populated from user_meta
    secondaryLoveCode: null
  };
};

export const updateProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      name: updates.name,
      email: updates.email,
      role: updates.role,
      usage_mode: updates.usage_mode,
      couple_id: updates.couple_id
    })
    .eq('id', userId)
    .select('id, name, email, role, usage_mode, couple_id')
    .single();
  
  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }
  
  return {
    id: data.id,
    name: data.name,
    email: data.email || '',
    role: (data.role as 'individual' | 'partner') || 'individual',
    usage_mode: (data.usage_mode as 'solo' | 'couple') || 'solo',
    couple_id: data.couple_id,
    partnerId: null,
    relationshipId: null,
    loveCode: null,
    secondaryLoveCode: null
  };
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

  // Get the current user and relationship data to send the email
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error('No authenticated user found');
      return false;
    }

    // Get the relationship with invite token
    const { data: relationshipData, error: relationshipError } = await supabase
      .from('relationships')
      .select('invite_token')
      .eq('id', relationshipId)
      .single();

    if (relationshipError || !relationshipData?.invite_token) {
      console.error('Error getting relationship data:', relationshipError);
      return false;
    }

    // Get the user's profile for the inviter name
    const { data: profileData } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .single();

    const inviterName = profileData?.name || user.email || 'Your partner';

    // Send the invitation email
    const { data: emailResponse, error: emailError } = await supabase.functions.invoke('send-partner-invite-email', {
      body: {
        partnerEmail: invite.partnerEmail,
        partnerName: invite.partnerName,
        inviterName: inviterName,
        inviteToken: relationshipData.invite_token
      }
    });

    if (emailError) {
      console.error('Error sending partner invite email:', emailError);
      // Don't return false here - the database update succeeded, email is secondary
      console.log('Partner invite was saved but email failed to send');
    } else if (!emailResponse?.success) {
      console.error('Email service returned error:', emailResponse?.error);
    } else {
      console.log('Partner invite email sent successfully');
    }

    return true;
  } catch (error) {
    console.error('Error in partner invite process:', error);
    // Database update succeeded, so return true even if email failed
    return true;
  }
};

// Helper function to establish a couple relationship after a partner accepts an invitation
export const establishCoupleRelationship = async (relationship: Relationship): Promise<boolean> => {
  if (!relationship.user_id || !relationship.partner_id) {
    console.error("Can't establish couple: missing user or partner ID");
    return false;
  }

  try {
    // Create the couple record
    const { data: coupleData, error: coupleError } = await supabase
      .from('couples')
      .insert({
        user1_id: relationship.user_id,
        user2_id: relationship.partner_id,
      })
      .select()
      .single();

    if (coupleError) {
      console.error('Error creating couple:', coupleError);
      return false;
    }
    
    const coupleId = coupleData.id;
    
    // Update both users' profiles with the couple_id and role/mode
    const updates = [
      supabase
        .from('profiles')
        .update({ 
          couple_id: coupleId, 
          role: 'partner',
          usage_mode: 'couple'
        })
        .eq('id', relationship.user_id),
      
      supabase
        .from('profiles')
        .update({ 
          couple_id: coupleId, 
          role: 'partner',
          usage_mode: 'couple'
        })
        .eq('id', relationship.partner_id)
    ];
    
    const results = await Promise.all(updates);
    
    if (results.some(result => result.error)) {
      console.error('Error updating profiles with couple ID:', results.filter(r => r.error).map(r => r.error));
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error establishing couple relationship:', error);
    return false;
  }
};

// Modify acceptPartnerInvite to use the new establishCoupleRelationship function
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
  
  const relationship = {
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
  
  // Establish the couple relationship in the database
  await establishCoupleRelationship(relationship);
  
  return relationship;
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
