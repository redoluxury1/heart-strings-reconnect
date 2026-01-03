import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import TriggerSelector from './TriggerSelector';
import ReactionSelector from './ReactionSelector';
import SuggestionCards from './SuggestionCards';
import { getSuggestionsForSelection } from './data/suggestions';

interface TryNextTimeFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

type FlowStep = 'triggers' | 'reactions' | 'suggestions';

const TryNextTimeFlow: React.FC<TryNextTimeFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<FlowStep>('triggers');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [selectedReactions, setSelectedReactions] = useState<string[]>([]);
  const [savedTips, setSavedTips] = useState<string[]>([]);

  const handleTriggerSelect = (triggerId: string) => {
    setSelectedTriggers(prev => 
      prev.includes(triggerId)
        ? prev.filter(t => t !== triggerId)
        : [...prev, triggerId]
    );
  };

  const handleReactionSelect = (reactionId: string) => {
    setSelectedReactions(prev => 
      prev.includes(reactionId)
        ? prev.filter(r => r !== reactionId)
        : [...prev, reactionId]
    );
  };

  const handleSaveTip = (tipId: string) => {
    setSavedTips(prev => 
      prev.includes(tipId)
        ? prev.filter(t => t !== tipId)
        : [...prev, tipId]
    );
  };

  const suggestions = getSuggestionsForSelection(selectedTriggers, selectedReactions);

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
      <div className="flex justify-center gap-2">
        {['triggers', 'reactions', 'suggestions'].map((s, i) => (
          <div
            key={s}
            className={`h-1.5 w-12 rounded-full transition-colors ${
              step === s ? 'bg-primary' : 
              (['triggers', 'reactions', 'suggestions'].indexOf(step) > i ? 'bg-primary/50' : 'bg-muted')
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'triggers' && (
          <motion.div
            key="triggers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <TriggerSelector
              selectedTriggers={selectedTriggers}
              onSelect={handleTriggerSelect}
              onContinue={() => setStep('reactions')}
            />
          </motion.div>
        )}

        {step === 'reactions' && (
          <motion.div
            key="reactions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ReactionSelector
              selectedReactions={selectedReactions}
              onSelect={handleReactionSelect}
              onContinue={() => setStep('suggestions')}
              onBack={() => setStep('triggers')}
            />
          </motion.div>
        )}

        {step === 'suggestions' && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <SuggestionCards
              suggestions={suggestions}
              savedTips={savedTips}
              onSaveTip={handleSaveTip}
              onBack={() => setStep('reactions')}
              onComplete={onComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TryNextTimeFlow;
