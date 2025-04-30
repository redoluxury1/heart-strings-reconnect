
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AccessibilityToggleProps {
  animationsEnabled: boolean;
  onChange: (enabled: boolean) => void;
}

const AccessibilityToggle: React.FC<AccessibilityToggleProps> = ({
  animationsEnabled,
  onChange
}) => {
  return (
    <div className="inline-flex items-center bg-white/80 px-4 py-2 rounded-full shadow-sm">
      <div className="flex items-center space-x-2">
        <Switch
          id="animation-toggle"
          checked={animationsEnabled}
          onCheckedChange={onChange}
        />
        <Label htmlFor="animation-toggle" className="text-sm text-midnight-indigo cursor-pointer">
          {animationsEnabled ? 'Animations On' : 'Animations Off'}
        </Label>
      </div>
    </div>
  );
};

export default AccessibilityToggle;

