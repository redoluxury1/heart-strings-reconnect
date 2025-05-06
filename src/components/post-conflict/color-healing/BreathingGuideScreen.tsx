
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
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale' | 'hold'>('inhale');
  const [counter, setCounter] = useState(0);
  
  // Breathing circle animation
  useEffect(() => {
    if (!isBreathing) return;
    
    const breathingCycle = () => {
      // Inhale for 4 seconds, hold for 1, exhale for 4
      if (counter < 4) {
        setBreathPhase('inhale');
      } else if (counter < 5) {
        setBreathPhase('hold');
      } else if (counter < 9) {
        setBreathPhase('exhale');
      } else {
        setCounter(0);
        return;
      }
      
      setCounter(prev => prev + 1);
    };
    
    const timer = setInterval(breathingCycle, 1000);
    return () => clearInterval(timer);
  }, [isBreathing, counter]);

  const toggleBreathing = () => {
    if (!isBreathing) {
      setCounter(0);
      setBreathPhase('inhale');
    }
    setIsBreathing(!isBreathing);
  };

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
          className={`rounded-full transition-all duration-[4000ms] flex items-center justify-center text-white font-medium`}
          style={{ 
            backgroundColor: selectedColor,
            height: breathPhase === 'inhale' ? '200px' : breathPhase === 'hold' ? '200px' : '80px', 
            width: breathPhase === 'inhale' ? '200px' : breathPhase === 'hold' ? '200px' : '80px',
            boxShadow: `0 0 40px 10px ${selectedColor}`,
            opacity: isBreathing ? 0.8 : 0.5,
          }}
        >
          {isBreathing && (
            <span className="text-xl">
              {breathPhase === 'inhale' ? 'Inhale' : breathPhase === 'exhale' ? 'Exhale' : 'Hold'}
            </span>
          )}
        </div>
      </div>
      
      <Button 
        onClick={toggleBreathing}
        className={`mb-6 rounded-full px-6 ${
          isBreathing 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : `bg-[${selectedColor}] hover:opacity-90`
        }`}
        style={{ backgroundColor: isBreathing ? undefined : selectedColor }}
      >
        {isBreathing ? 'Pause' : 'Breathe with me'}
      </Button>
      
      <div className="flex space-x-4 mt-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-gray-300 text-gray-600 hover:text-[#7d6272]"
        >
          Back
        </Button>
        <Button 
          onClick={onContinue}
          className="bg-[#7d6272] hover:bg-[#6d5262] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BreathingGuideScreen;
