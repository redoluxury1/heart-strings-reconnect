
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface BreathingGuideScreenProps {
  selectedColor: string;
  onContinue: () => void;
  onBack: () => void;
}

const BreathingGuideScreen: React.FC<BreathingGuideScreenProps> = ({ 
  selectedColor,
  onContinue,
  onBack
}) => {
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [counter, setCounter] = useState(0);
  const [breathCycles, setBreathCycles] = useState(0);
  
  // Size transformations based on phase and counter
  const getCircleSize = () => {
    if (breathPhase === 'inhale') {
      // Start small (80px), grow to large (200px) over 4 seconds
      return `${80 + ((counter / 3) * 120)}px`;
    } else if (breathPhase === 'hold') {
      // Stay at maximum size
      return '200px';
    } else if (breathPhase === 'exhale') {
      // Start large (200px), shrink to small (80px) over 4 seconds
      return `${200 - ((counter - 4) / 3 * 120)}px`;
    }
    return '80px'; // Default size
  };

  // Breathing circle animation
  useEffect(() => {
    const breathingCycle = () => {
      // Inhale for 4 seconds, hold for 1, exhale for 4
      if (counter < 4) {
        setBreathPhase('inhale');
      } else if (counter < 5) {
        setBreathPhase('hold');
      } else if (counter < 9) {
        setBreathPhase('exhale');
      } else {
        // Reset counter and start a new breathing cycle
        // This ensures a smooth transition from exhale back to inhale
        setCounter(0);
        setBreathCycles(prev => prev + 1);
        setBreathPhase('inhale');
        return;
      }
      
      setCounter(prev => prev + 1);
    };
    
    const timer = setInterval(breathingCycle, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo">
        Breathing Guide
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg max-w-md mx-auto">
        As you breathe in slowly… imagine that glowing ball expanding. Let it fill your chest. Let it spread to your arms… your legs… your whole body.
      </p>

      <div className="relative h-60 w-60 mb-8 flex items-center justify-center">
        <div 
          className="rounded-full transition-all duration-[1000ms] flex items-center justify-center text-white font-medium"
          style={{ 
            backgroundColor: selectedColor,
            height: getCircleSize(),
            width: getCircleSize(),
            boxShadow: `0 0 40px 10px ${selectedColor}`,
            opacity: 0.8,
            transition: 'all 1s ease-in-out'
          }}
        >
          <span className="text-xl">
            {breathPhase === 'inhale' ? 'Inhale' : breathPhase === 'exhale' ? 'Exhale' : 'Hold'}
          </span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onBack}
          variant="outline" 
          className="border-gray-300 text-gray-600 hover:text-[#7d6272] mr-4"
        >
          Back
        </Button>
        <Button 
          onClick={onContinue}
          className="text-white"
          style={{
            backgroundColor: selectedColor,
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BreathingGuideScreen;
