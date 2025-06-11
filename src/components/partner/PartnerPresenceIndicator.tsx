
import React, { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface PartnerPresenceIndicatorProps {
  partnerId?: string;
  showText?: boolean;
}

const PartnerPresenceIndicator: React.FC<PartnerPresenceIndicatorProps> = ({ 
  partnerId, 
  showText = false 
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);
  const { relationship } = useAuth();
  
  const targetPartnerId = partnerId || relationship?.partner_id;
  
  useEffect(() => {
    if (!targetPartnerId) return;
    
    const channel = supabase.channel(`presence:${targetPartnerId}`);
    
    // Subscribe to partner's presence
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const presences = Object.values(state).flat();
        setIsOnline(presences.length > 0);
        
        if (presences.length > 0) {
          setLastSeen(new Date());
        }
      })
      .on('presence', { event: 'join' }, () => {
        setIsOnline(true);
        setLastSeen(new Date());
      })
      .on('presence', { event: 'leave' }, () => {
        setIsOnline(false);
        setLastSeen(new Date());
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [targetPartnerId]);
  
  if (!targetPartnerId) return null;
  
  const getStatusText = () => {
    if (isOnline) return 'Online';
    if (lastSeen) {
      const now = new Date();
      const diffMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));
      
      if (diffMinutes < 5) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
      return 'Offline';
    }
    return 'Offline';
  };
  
  return (
    <div className="flex items-center gap-2">
      <Circle 
        className={`h-3 w-3 ${
          isOnline ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'
        }`} 
      />
      {showText && (
        <span className={`text-sm ${
          isOnline ? 'text-green-600' : 'text-gray-500'
        }`}>
          {getStatusText()}
        </span>
      )}
    </div>
  );
};

export default PartnerPresenceIndicator;
