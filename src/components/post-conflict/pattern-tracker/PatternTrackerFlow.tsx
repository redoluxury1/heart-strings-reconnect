import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import StyleSelector from './StyleSelector';
import AdviceCard from './AdviceCard';

interface PatternTrackerFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

type FlowStep = 'your-style' | 'partner-style' | 'advice';

const PatternTrackerFlow: React.FC<PatternTrackerFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<FlowStep>('your-style');
  const [userStyle, setUserStyle] = useState<string | null>(null);
  const [partnerStyle, setPartnerStyle] = useState<string | null>(null);

  const handleTryAnother = () => {
    setUserStyle(null);
    setPartnerStyle(null);
    setStep('your-style');
  };

  const stepOrder: FlowStep[] = ['your-style', 'partner-style', 'advice'];
  const currentStepIndex = stepOrder.indexOf(step);

  return (
    <div className="space-y-6">
      {/* Back to hub button */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-midnight-indigo transition-colors text-sm"
        whileHover={{ x: -2 }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to tools
      </motion.button>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {stepOrder.map((s, i) => (
          <div
            key={s}
            className={`h-1.5 w-12 rounded-full transition-colors ${
              currentStepIndex === i ? 'bg-midnight-indigo' : 
              (currentStepIndex > i ? 'bg-midnight-indigo/50' : 'bg-muted')
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'your-style' && (
          <motion.div
            key="your-style"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <StyleSelector
              question="When an argument starts, what do you usually do?"
              selectedStyle={userStyle}
              onSelect={setUserStyle}
              onContinue={() => setStep('partner-style')}
            />
          </motion.div>
        )}

        {step === 'partner-style' && (
          <motion.div
            key="partner-style"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <StyleSelector
              question="What does your partner usually do?"
              selectedStyle={partnerStyle}
              onSelect={setPartnerStyle}
              onContinue={() => setStep('advice')}
            />
          </motion.div>
        )}

        {step === 'advice' && userStyle && partnerStyle && (
          <motion.div
            key="advice"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <AdviceCard
              userStyle={userStyle}
              partnerStyle={partnerStyle}
              onBack={() => setStep('partner-style')}
              onComplete={onComplete}
              onTryAnother={handleTryAnother}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatternTrackerFlow;
