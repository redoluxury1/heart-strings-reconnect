
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CustomTimerViewProps {
  onTimerSelect: (minutes: number) => void;
  onBack: () => void;
}

const CustomTimerView: React.FC<CustomTimerViewProps> = ({ 
  onTimerSelect,
  onBack
}) => {
  const [timeUnit, setTimeUnit] = useState<'minutes' | 'hours'>('minutes');
  const [value, setValue] = useState(15); // Default 15 minutes
  
  const minValue = timeUnit === 'minutes' ? 5 : 1;
  const maxValue = timeUnit === 'minutes' ? 59 : 12;
  
  const handleTimeUnitChange = (newUnit: 'minutes' | 'hours') => {
    setTimeUnit(newUnit);
    // Reset value to a sensible default when changing units
    setValue(newUnit === 'minutes' ? 15 : 2);
  };
  
  const handleStartTimer = () => {
    // Convert hours to minutes if needed
    const minutes = timeUnit === 'hours' ? value * 60 : value;
    onTimerSelect(minutes);
  };
  
  const formatValue = () => {
    if (timeUnit === 'minutes') {
      return `${value} minutes`;
    }
    return value === 1 ? `${value} hour` : `${value} hours`;
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <h3 className="text-2xl text-[#5d4357] font-medium mb-6">
        Custom Timer
      </h3>
      
      <ToggleGroup 
        type="single" 
        value={timeUnit} 
        onValueChange={(val) => val && handleTimeUnitChange(val as 'minutes' | 'hours')} 
        className="justify-center rounded-full overflow-hidden mb-8 border border-[#5d4357]/20"
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
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-[#5d4357]/70">{timeUnit === 'minutes' ? '5 min' : '1 hr'}</span>
          <span className="text-lg font-medium text-[#5d4357]">{formatValue()}</span>
          <span className="text-[#5d4357]/70">{timeUnit === 'minutes' ? '59 min' : '12 hrs'}</span>
        </div>
        <Slider
          value={[value]}
          min={minValue}
          max={maxValue}
          step={1}
          onValueChange={(vals) => setValue(vals[0])}
        />
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onBack}
          className="flex-1 bg-transparent border border-[#5d4357]/30 text-[#5d4357] hover:bg-[#f7e0dc]/20"
        >
          Back
        </Button>
        <Button 
          onClick={handleStartTimer}
          className="flex-1 bg-[#5d4357] text-white hover:bg-[#5d4357]/90"
        >
          Start Timer
        </Button>
      </div>
    </div>
  );
};

export default CustomTimerView;
