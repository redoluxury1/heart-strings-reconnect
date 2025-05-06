
import React from 'react';
import { Button } from '@/components/ui/button';

export interface TimerPreset {
  label: string;
  value: number;
  description: string;
}

interface TimerPresetsProps {
  presets: TimerPreset[];
  onSelectPreset: (minutes: number) => void;
}

const TimerPresets: React.FC<TimerPresetsProps> = ({ presets, onSelectPreset }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
      {presets.map((preset) => (
        <div key={preset.value} className="flex flex-col items-center">
          <Button 
            variant="outline"
            className="w-full py-6 rounded-full bg-[#f7e0dc] border-none text-[#5d4357] hover:bg-[#e7c6c0] text-lg font-medium mb-2"
            onClick={() => onSelectPreset(preset.value)}
          >
            {preset.label}
          </Button>
          <span className="text-sm text-[#5d4357]">{preset.description}</span>
        </div>
      ))}
    </div>
  );
};

export default TimerPresets;
