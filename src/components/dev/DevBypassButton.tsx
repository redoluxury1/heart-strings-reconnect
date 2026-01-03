import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Unlock } from 'lucide-react';

const DevBypassButton = () => {
  const navigate = useNavigate();
  const isDev = import.meta.env.DEV;

  if (!isDev) return null;

  const handleBypass = () => {
    // Set bypass flags
    localStorage.setItem('bypassSubscription', 'true');
    localStorage.setItem('bypassOnboarding', 'true');
    
    // Navigate to Mid-Fight tools for review
    navigate('/during-conflict');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleBypass}
        variant="destructive"
        size="sm"
        className="shadow-lg"
      >
        <Unlock className="w-4 h-4 mr-2" />
        DEV: Bypass Paywall
      </Button>
    </div>
  );
};

export default DevBypassButton;
