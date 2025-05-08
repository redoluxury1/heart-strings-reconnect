
import React from 'react';
import { Clock } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'pending' | 'negotiation' | 'confirmed' | 'paused';
  customMessage?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  customMessage 
}) => {
  if (status === 'confirmed') {
    return null;
  }
  
  const statusMessages = {
    pending: 'Waiting for partner confirmation',
    negotiation: 'Negotiating word with partner',
    paused: 'Your partner has initiated a pause'
  };
  
  const message = customMessage || statusMessages[status];
  
  return (
    <div className="bg-[#f7e0dc]/30 p-3 rounded-lg mb-6 flex items-center justify-center gap-2">
      <Clock size={16} className="text-[#5d4357]" />
      <span className="text-sm text-[#5d4357]">
        {message}
      </span>
    </div>
  );
};

export default StatusIndicator;
