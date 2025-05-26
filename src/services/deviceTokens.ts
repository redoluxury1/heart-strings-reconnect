
import { supabase } from '@/integrations/supabase/client';

export interface DeviceToken {
  id?: string;
  user_id: string;
  token: string;
  device_type: 'web' | 'ios' | 'android';
  device_name?: string;
  is_active: boolean;
}

// Register a device token for push notifications
export const registerDeviceToken = async (deviceToken: DeviceToken): Promise<boolean> => {
  const { error } = await supabase
    .from('device_tokens')
    .upsert(deviceToken, { onConflict: 'token' });
  
  if (error) {
    console.error('Error registering device token:', error);
    return false;
  }
  
  return true;
};

// Get active device tokens for a user
export const getUserDeviceTokens = async (userId: string): Promise<DeviceToken[]> => {
  const { data, error } = await supabase
    .from('device_tokens')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true);
  
  if (error) {
    console.error('Error fetching device tokens:', error);
    return [];
  }
  
  return data || [];
};

// Deactivate a device token
export const deactivateDeviceToken = async (tokenId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('device_tokens')
    .update({ is_active: false })
    .eq('id', tokenId);
  
  if (error) {
    console.error('Error deactivating device token:', error);
    return false;
  }
  
  return true;
};
