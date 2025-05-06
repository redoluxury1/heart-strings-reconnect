
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from '@/components/ui/button';

interface CustomTimerControlsProps {
  customMinutes: number;
  customTimeUnit: 'minutes' | 'hours';
  sliderMin: number;
  sliderMax: number;
  onMinutesChange: (value: number) => void;
  onTimeUnitChange: (value: 'minutes' | 'hours') => void;
  onStartTimer: () => void;
}

const CustomTimerControls: React.FC<CustomTimerControlsProps> = ({
  customMinutes,
  customTimeUnit,
  sliderMin,
  sliderMax,
  onMinutesChange,
  onTimeUnitChange,
  onStartTimer
}) => {
  const formatSliderValue = () => {
    if (customTimeUnit === 'minutes') {
      return `${customMinutes} min`;
    } else {
      return customMinutes === 1 ? '1 hour' : `${customMinutes} hours`;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="mb-2 flex justify-between items-center">
        <span className="text-[#5d4357]">
          {customTimeUnit === 'minutes' ? '5 min' : '1 hour'}
        </span>
        <span className="text-lg font-medium text-[#5d4357]">
          {formatSliderValue()}
        </span>
        <span className="text-[#5d4357]">
          {customTimeUnit === 'minutes' ? '59 min' : '6 hours'}
        </span>
      </div>
      
      <div className="mb-6">
        <Slider
          min={sliderMin}
          max={sliderMax}
          step={1}
          value={[customMinutes]}
          onValueChange={(value) => onMinutesChange(value[0])}
          className="py-4"
        />
      </div>
      
      <ToggleGroup 
        type="single" 
        value={customTimeUnit} 
        onValueChange={(value) => value && onTimeUnitChange(value as 'minutes' | 'hours')} 
        className="justify-center rounded-full overflow-hidden mb-6 border border-[#5d4357]/20"
      >
        <ToggleGroupItem 
          value="minutes" 
          className="data-[state=on]:bg-[#5d4357] data-[state=on]:text-white px-10 py-3 rounded-l-full"
        >
          Minutes
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="hours" 
          className="data-[state=on]:bg-[#5d4357] data-[state=on]:text-white px-10 py-3 rounded-r-full"
        >
          Hours
        </ToggleGroupItem>
      </ToggleGroup>
      
      <Button 
        className="w-full bg-[#5d4357] hover:bg-[#5d4357]/90 text-white py-6 rounded-full text-lg"
        onClick={onStartTimer}
      >
        Pause Now & Notify Partner
      </Button>
      
      <p className="text-[#5d4357] mt-6 text-center italic font-cormorant text-lg">
        We're choosing peace — even mid-fight.
      </p>
    </div>
  );
};

export default CustomTimerControls;
