
import React, { useState, useEffect } from 'react';
import { Hourglass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

// Preset timer options in minutes
const timeoutPresets = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
];

interface TimeoutTimerProps {
  animationsEnabled?: boolean;
}

const TimeoutTimer: React.FC<TimeoutTimerProps> = ({ animationsEnabled = true }) => {
  // Timer states
  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [customMinutes, setCustomMinutes] = useState('');
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
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle custom timer input
  const handleCustomTimerStart = () => {
    if (customMinutes && !isNaN(Number(customMinutes))) {
      let mins = Number(customMinutes);
      
      // Convert hours to minutes if the unit is hours
      if (customTimeUnit === 'hours') {
        mins = mins * 60;
      }
      
      // Limit between 1-120 minutes
      mins = Math.min(Math.max(1, mins), 120);
      
      startTimer(mins);
      setCustomMinutes('');
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/20 mt-6 mb-10">
      <div className="flex flex-col items-center">
        <div className="flex justify-center mb-4 relative">
          {/* Hourglass with simplified animation */}
          <div className="relative">
            <Hourglass className="h-24 w-24 text-mauve-rose" />
            {timerActive && animationsEnabled && (
              <>
                {/* Only keep the bottom collecting sand animation */}
                <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-mauve-rose/40 rounded-t-full animate-pulse" style={{ animationDuration: '3s' }} />
              </>
            )}
          </div>
        </div>
        
        <h3 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-6">Take a Breather</h3>
        
        {!timerActive ? (
          <>
            <p className="text-midnight-indigo/80 mb-6 text-center max-w-md">
              Select a preset time or enter your own. Your partner will be notified that you need some space.
            </p>
            
            <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-6">
              {timeoutPresets.map((preset) => (
                <Button 
                  key={preset.value}
                  variant="outline"
                  className="border-lavender-blue text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose"
                  onClick={() => startTimer(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            
            <div className="w-full max-w-md mb-6">
              <Label className="block text-midnight-indigo mb-2">Set your own time:</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  type="number"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(e.target.value)}
                  placeholder="Enter time"
                  min="1"
                  max="120"
                  className="flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lavender-blue text-sm"
                />
                <div className="flex gap-2">
                  <Button 
                    type="button"
                    variant="outline"
                    className={customTimeUnit === 'minutes' 
                      ? "border-lavender-blue bg-lavender-blue text-white hover:bg-mauve-rose hover:border-mauve-rose" 
                      : "border-lavender-blue text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose"}
                    onClick={() => setCustomTimeUnit('minutes')}
                  >
                    Minutes
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    className={customTimeUnit === 'hours' 
                      ? "border-lavender-blue bg-lavender-blue text-white hover:bg-mauve-rose hover:border-mauve-rose" 
                      : "border-lavender-blue text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose"}
                    onClick={() => setCustomTimeUnit('hours')}
                  >
                    Hours
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full bg-lavender-blue hover:bg-lavender-blue/90 text-white"
                onClick={handleCustomTimerStart}
              >
                Breathe
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-midnight-indigo mb-2">
              Your partner has been notified that you need some time.
            </p>
            <div className="text-4xl font-bold text-mauve-rose my-6">
              {formatTime()}
            </div>
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
    </div>
  );
};

export default TimeoutTimer;
