import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import StyleSelector from './StyleSelector';
import AdviceCard from './AdviceCard';
import { conflictStyles, recoveryStyles } from './data/styles';

interface PatternTrackerFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

type FlowStep = 'your-style' | 'partner-style' | 'advice-1' | 'your-recovery' | 'partner-recovery' | 'advice-2';

const PatternTrackerFlow: React.FC<PatternTrackerFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<FlowStep>('your-style');
  const [userStyle, setUserStyle] = useState<string | null>(null);
  const [partnerStyle, setPartnerStyle] = useState<string | null>(null);
  const [userRecovery, setUserRecovery] = useState<string | null>(null);
  const [partnerRecovery, setPartnerRecovery] = useState<string | null>(null);

  const handleTryAnotherConflict = () => {
    setUserStyle(null);
    setPartnerStyle(null);
    setStep('your-style');
  };

  const handleTryAnotherRecovery = () => {
    setUserRecovery(null);
    setPartnerRecovery(null);
    setStep('your-recovery');
  };

  const handleContinueToRecovery = () => {
    setStep('your-recovery');
  };

  const stepOrder: FlowStep[] = ['your-style', 'partner-style', 'advice-1', 'your-recovery', 'partner-recovery', 'advice-2'];
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
            className={`h-1.5 w-8 rounded-full transition-colors ${
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
              styles={conflictStyles}
              isPartnerQuestion={false}
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
              onContinue={() => setStep('advice-1')}
              styles={conflictStyles}
              isPartnerQuestion={true}
            />
          </motion.div>
        )}

        {step === 'advice-1' && userStyle && partnerStyle && (
          <motion.div
            key="advice-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <AdviceCard
              userStyle={userStyle}
              partnerStyle={partnerStyle}
              onBack={() => setStep('partner-style')}
              onComplete={onComplete}
              onTryAnother={handleTryAnotherConflict}
              patternType="conflict"
              onContinue={handleContinueToRecovery}
            />
          </motion.div>
        )}

        {step === 'your-recovery' && (
          <motion.div
            key="your-recovery"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="text-center mb-4">
              <span className="text-xs font-medium text-midnight-indigo/60 uppercase tracking-wide">
                Recovery Patterns
              </span>
            </div>
            <StyleSelector
              question="After a fight, how do you usually recover?"
              selectedStyle={userRecovery}
              onSelect={setUserRecovery}
              onContinue={() => setStep('partner-recovery')}
              styles={recoveryStyles}
              isPartnerQuestion={false}
            />
          </motion.div>
        )}

        {step === 'partner-recovery' && (
          <motion.div
            key="partner-recovery"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="text-center mb-4">
              <span className="text-xs font-medium text-midnight-indigo/60 uppercase tracking-wide">
                Recovery Patterns
              </span>
            </div>
            <StyleSelector
              question="How does your partner usually recover?"
              selectedStyle={partnerRecovery}
              onSelect={setPartnerRecovery}
              onContinue={() => setStep('advice-2')}
              styles={recoveryStyles}
              isPartnerQuestion={true}
            />
          </motion.div>
        )}

        {step === 'advice-2' && userRecovery && partnerRecovery && (
          <motion.div
            key="advice-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <AdviceCard
              userStyle={userRecovery}
              partnerStyle={partnerRecovery}
              onBack={() => setStep('partner-recovery')}
              onComplete={onComplete}
              onTryAnother={handleTryAnotherRecovery}
              patternType="recovery"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatternTrackerFlow;
