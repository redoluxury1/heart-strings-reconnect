
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ReminderToggleProps {
  initialValue?: boolean;
  notificationText?: string;
}

const ReminderToggle: React.FC<ReminderToggleProps> = ({ 
  initialValue = false,
  notificationText = "Remind us about our code word during a fight" 
}) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const { toast } = useToast();
  
  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    
    // In a real app, this would save the preference to the user's settings
    localStorage.setItem('remind-code-word', checked.toString());
    
    toast({
      title: checked ? "Reminders enabled" : "Reminders disabled",
      description: checked 
        ? "We'll send notifications about your code word during heated moments." 
        : "Code word notifications have been turned off.",
    });
  };
  
  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="inline-flex items-center gap-2 p-3 bg-[#f7e0dc]/30 rounded-lg">
        <Switch 
          id="remind" 
          checked={isEnabled}
          onCheckedChange={handleToggle}
        />
        <Label htmlFor="remind" className="text-sm text-[#5d4357] cursor-pointer">
          {notificationText}
        </Label>
      </div>
    </div>
  );
};

export default ReminderToggle;
