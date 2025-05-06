
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import TimeOutGraphic from './TimeOutGraphic';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Preset timer options in minutes with descriptions
const timeoutPresets = [
  { label: '15 min', value: 15, description: 'Quick breath' },
  { label: '30 min', value: 30, description: 'Cool-down' },
  { label: '1 hour', value: 60, description: 'Space to think' },
];

interface TimeoutTimerProps {
  animationsEnabled?: boolean;
}

const TimeoutTimer: React.FC<TimeoutTimerProps> = ({ animationsEnabled = true }) => {
  // Timer states
  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(15);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [customTimeUnit, setCustomTimeUnit] = useState<'minutes' | 'hours'>('minutes');
  
  // Timer countdown effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (timerActive && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            // Timer complete
            clearInterval(interval);
            setTimerActive(false);
            // Haptic feedback on timer completion
            if (navigator.vibrate) {
              navigator.vibrate([100, 50, 100, 50, 100]);
            }
            toast("Time's up!", {
              description: "Your timeout period has ended.",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, remainingSeconds]);
  
  // Start timer with selected minutes
  const startTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setRemainingSeconds(minutes * 60);
    setTimerActive(true);
    toast("Timeout Started", {
      description: "Your partner has been notified.",
    });
  };
  
  // Format remaining time for display
  const formatTime = () => {
    // For times greater than 60 minutes, show in hours:minutes format
    if (remainingSeconds >= 3600) {
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      return `${hours}:${minutes.toString().padStart(2, '0')}`;
    } else {
      // For shorter times, show minutes:seconds
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };
  
  // Get slider min, max, and default values based on time unit
  const getSliderConfig = () => {
    if (customTimeUnit === 'minutes') {
      return {
        min: 5,
        max: 59,
        defaultValue: 15
      };
    } else {
      return {
        min: 1,
        max: 6,
        defaultValue: 1
      };
    }
  };
  
  // Adjust customMinutes when toggling between units
  useEffect(() => {
    const config = getSliderConfig();
    setCustomMinutes(config.defaultValue);
  }, [customTimeUnit]);
  
  const sliderConfig = getSliderConfig();
  
  // Format display value for slider
  const formatSliderValue = () => {
    if (customTimeUnit === 'minutes') {
      return `${customMinutes} min`;
    } else {
      return customMinutes === 1 ? '1 hour' : `${customMinutes} hours`;
    }
  };
  
  // Handle custom timer with slider
  const handleCustomTimerStart = () => {
    let mins = customMinutes;
    
    // Convert hours to minutes if the unit is hours
    if (customTimeUnit === 'hours') {
      mins = mins * 60;
    }
    
    startTimer(mins);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/10 mt-6 mb-10">
      <TimeOutGraphic />
      
      {!timerActive ? (
        <>
          <h3 className="font-cormorant text-2xl text-[#5d4357] mb-6 text-center">
            Set your own time
          </h3>
          
          <div className="grid grid-cols-3 gap-4 mb-10">
            {timeoutPresets.map((preset) => (
              <div key={preset.value} className="flex flex-col items-center">
                <Button 
                  key={preset.value}
                  variant="outline"
                  className="w-full py-6 rounded-full bg-[#f7e0dc] border-none text-[#5d4357] hover:bg-[#e7c6c0] text-lg font-medium mb-2"
                  onClick={() => startTimer(preset.value)}
                >
                  {preset.label}
                </Button>
                <span className="text-sm text-[#5d4357]">{preset.description}</span>
              </div>
            ))}
          </div>
          
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
                min={sliderConfig.min}
                max={sliderConfig.max}
                step={1}
                value={[customMinutes]}
                onValueChange={(value) => setCustomMinutes(value[0])}
                className="py-4"
              />
            </div>
            
            <ToggleGroup type="single" value={customTimeUnit} onValueChange={(value) => value && setCustomTimeUnit(value as 'minutes' | 'hours')} className="justify-center rounded-full overflow-hidden mb-6 border border-[#5d4357]/20">
              <ToggleGroupItem value="minutes" className="data-[state=on]:bg-[#5d4357] data-[state=on]:text-white px-10 py-3 rounded-l-full">
                Minutes
              </ToggleGroupItem>
              <ToggleGroupItem value="hours" className="data-[state=on]:bg-[#5d4357] data-[state=on]:text-white px-10 py-3 rounded-r-full">
                Hours
              </ToggleGroupItem>
            </ToggleGroup>
            
            <Button 
              className="w-full bg-[#5d4357] hover:bg-[#5d4357]/90 text-white py-6 rounded-full text-lg"
              onClick={handleCustomTimerStart}
            >
              Pause Now & Notify Partner
            </Button>
            
            <p className="text-[#5d4357] mt-6 text-center italic font-cormorant text-lg">
              We're choosing peace — even mid-fight.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-[#5d4357] mb-2">
            Your partner has been notified that you need some time.
          </p>
          <div className="text-4xl font-bold text-golden-mustard my-6">
            {formatTime()}
          </div>
          <p className="text-[#5d4357]/80 mb-4 italic">
            You're doing something brave. Give yourself this time.
          </p>
          <Button 
            variant="outline"
            className="border-mauve-rose text-mauve-rose hover:bg-mauve-rose/10"
            onClick={() => setTimerActive(false)}
          >
            Cancel Timer
          </Button>
        </div>
      )}
    </div>
  );
};

export default TimeoutTimer;
