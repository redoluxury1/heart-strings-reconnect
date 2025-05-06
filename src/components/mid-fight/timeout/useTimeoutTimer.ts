
import { useState, useEffect, useRef } from 'react';
import { toast } from '@/components/ui/sonner';

export const useTimeoutTimer = (animationsEnabled = true) => {
  // Timer states
  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(15);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [customTimeUnit, setCustomTimeUnit] = useState<'minutes' | 'hours'>('minutes');
  
  // Audio reference for timer completion sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio("/notification-sound.mp3");
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Play sound effect
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.warn("Could not play sound effect:", err);
      });
    }
  };
  
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
            // Play sound effect on timer completion
            playSound();
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
  
  // Handle custom timer with slider
  const handleCustomTimerStart = () => {
    let mins = customMinutes;
    
    // Convert hours to minutes if the unit is hours
    if (customTimeUnit === 'hours') {
      mins = mins * 60;
    }
    
    startTimer(mins);
  };

  return {
    timerActive,
    setTimerActive,
    customMinutes,
    setCustomMinutes,
    customTimeUnit,
    setCustomTimeUnit,
    sliderConfig,
    formatTime,
    startTimer,
    handleCustomTimerStart
  };
};
