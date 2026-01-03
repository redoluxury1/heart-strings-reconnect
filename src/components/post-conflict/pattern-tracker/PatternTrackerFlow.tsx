import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PatternSelector from './PatternSelector';
import PatternInsights from './PatternInsights';

interface PatternTrackerFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

type FlowStep = 'select' | 'insights';

const PatternTrackerFlow: React.FC<PatternTrackerFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<FlowStep>('select');
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [savedInsights, setSavedInsights] = useState<string[]>([]);

  const handlePatternSelect = (patternId: string) => {
    setSelectedPatterns(prev => 
      prev.includes(patternId)
        ? prev.filter(p => p !== patternId)
        : [...prev, patternId]
    );
  };

  const handleSaveInsight = (index: number) => {
    const indexStr = index.toString();
    setSavedInsights(prev => 
      prev.includes(indexStr)
        ? prev.filter(i => i !== indexStr)
        : [...prev, indexStr]
    );
  };

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
        {['select', 'insights'].map((s, i) => (
          <div
            key={s}
            className={`h-1.5 w-16 rounded-full transition-colors ${
              step === s ? 'bg-midnight-indigo' : 
              (['select', 'insights'].indexOf(step) > i ? 'bg-midnight-indigo/50' : 'bg-muted')
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <PatternSelector
              selectedPatterns={selectedPatterns}
              onSelect={handlePatternSelect}
              onContinue={() => setStep('insights')}
            />
          </motion.div>
        )}

        {step === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <PatternInsights
              selectedPatterns={selectedPatterns}
              savedInsights={savedInsights}
              onSaveInsight={handleSaveInsight}
              onBack={() => setStep('select')}
              onComplete={onComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatternTrackerFlow;