import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import FlipIntroScreen from './FlipIntroScreen';
import EmpathyPromptCard from './EmpathyPromptCard';
import InsightSummary from './InsightSummary';
import BridgeBuilder from './BridgeBuilder';
import { empathyPrompts } from './data/prompts';

interface FlipTheScriptFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

type FlowStep = 'intro' | 'prompt-0' | 'prompt-1' | 'prompt-2' | 'summary' | 'bridge';

const FlipTheScriptFlow: React.FC<FlipTheScriptFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<FlowStep>('intro');
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleResponseChange = (promptId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [promptId]: value
    }));
  };

  const getStepIndex = (s: FlowStep): number => {
    const steps: FlowStep[] = ['intro', 'prompt-0', 'prompt-1', 'prompt-2', 'summary', 'bridge'];
    return steps.indexOf(s);
  };

  const goToStep = (s: FlowStep) => setStep(s);

  // Calculate progress bar values
  const totalSteps = 6;
  const currentStepIndex = getStepIndex(step);

  return (
    <div className="space-y-6">
      {/* Back to hub button */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        whileHover={{ x: -2 }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to tools
      </motion.button>

      {/* Progress indicator */}
      <div className="flex justify-center gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-8 rounded-full transition-colors ${
              i === currentStepIndex ? 'bg-primary' : 
              i < currentStepIndex ? 'bg-primary/50' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FlipIntroScreen onStart={() => goToStep('prompt-0')} />
          </motion.div>
        )}

        {step === 'prompt-0' && (
          <motion.div
            key="prompt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <EmpathyPromptCard
              prompt={empathyPrompts[0]}
              value={responses[empathyPrompts[0].id] || ''}
              onChange={(value) => handleResponseChange(empathyPrompts[0].id, value)}
              currentStep={1}
              totalSteps={3}
              onNext={() => goToStep('prompt-1')}
              onBack={() => goToStep('intro')}
              isFirst={true}
            />
          </motion.div>
        )}

        {step === 'prompt-1' && (
          <motion.div
            key="prompt-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <EmpathyPromptCard
              prompt={empathyPrompts[1]}
              value={responses[empathyPrompts[1].id] || ''}
              onChange={(value) => handleResponseChange(empathyPrompts[1].id, value)}
              currentStep={2}
              totalSteps={3}
              onNext={() => goToStep('prompt-2')}
              onBack={() => goToStep('prompt-0')}
              isFirst={false}
            />
          </motion.div>
        )}

        {step === 'prompt-2' && (
          <motion.div
            key="prompt-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <EmpathyPromptCard
              prompt={empathyPrompts[2]}
              value={responses[empathyPrompts[2].id] || ''}
              onChange={(value) => handleResponseChange(empathyPrompts[2].id, value)}
              currentStep={3}
              totalSteps={3}
              onNext={() => goToStep('summary')}
              onBack={() => goToStep('prompt-1')}
              isFirst={false}
            />
          </motion.div>
        )}

        {step === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <InsightSummary
              responses={responses}
              onContinue={() => goToStep('bridge')}
              onBack={() => goToStep('prompt-2')}
            />
          </motion.div>
        )}

        {step === 'bridge' && (
          <motion.div
            key="bridge"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <BridgeBuilder
              responses={responses}
              onComplete={onComplete}
              onBack={() => goToStep('summary')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlipTheScriptFlow;
