
import { supabase } from '@/integrations/supabase/client';
import { sendInAppNotification } from '@/services/notifications';

interface WhiteFlagLog {
  user_id: string;
  relationship_id: string;
  message: string;
  timestamp: string;
}

export const sendWhiteFlagMessage = async (
  userId: string,
  relationshipId: string,
  message: string
): Promise<boolean> => {
  try {
    // Log the white flag activity
    const { error: logError } = await supabase
      .from('white_flag_logs')
      .insert({
        user_id: userId,
        relationship_id: relationshipId,
        message: message,
        timestamp: new Date().toISOString()
      });

    if (logError) {
      console.error("Error logging white flag:", logError);
      return false;
    }

    // Get relationship data to find partner
    const { data: relationshipData, error: relationshipError } = await supabase
      .from('relationships')
      .select('user_id, partner_id')
      .eq('id', relationshipId)
      .single();

    if (relationshipError || !relationshipData) {
      console.error("Error getting relationship:", relationshipError);
      return false;
    }

    // Determine partner ID
    const partnerId = relationshipData.user_id === userId 
      ? relationshipData.partner_id 
      : relationshipData.user_id;

    if (partnerId) {
      // Send notification to partner
      await sendInAppNotification(
        partnerId,
        userId,
        "white_flag",
        "White Flag from Your Partner",
        message,
        { relationshipId, timestamp: new Date().toISOString() }
      );
    }

    return true;
  } catch (error) {
    console.error("Error in sendWhiteFlagMessage:", error);
    return false;
  }
};

export const getWhiteFlagHistory = async (userId: string): Promise<WhiteFlagLog[]> => {
  try {
    const { data, error } = await supabase
      .from('white_flag_logs')
      .select('user_id, relationship_id, message, timestamp')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error("Error getting white flag history:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getWhiteFlagHistory:", error);
    return [];
  }
};
