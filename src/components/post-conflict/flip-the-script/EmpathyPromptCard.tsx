import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { EmpathyPrompt } from './data/prompts';

interface EmpathyPromptCardProps {
  prompt: EmpathyPrompt;
  value: string;
  onChange: (value: string) => void;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
}

const EmpathyPromptCard: React.FC<EmpathyPromptCardProps> = ({
  prompt,
  value,
  onChange,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isFirst
}) => {
  const canContinue = value.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Progress */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Prompt Card */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-cormorant text-xl font-semibold text-foreground leading-relaxed">
          {prompt.prompt}
        </h2>
        
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={prompt.placeholder}
          className="min-h-[120px] resize-none text-base"
        />

        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <HelpCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{prompt.helpText}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-3">
        <motion.button
          onClick={onBack}
          className="px-6 py-3 rounded-full font-medium border border-border text-foreground hover:bg-muted transition-all duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="h-4 w-4" />
          {isFirst ? 'Back' : 'Previous'}
        </motion.button>
        <motion.button
          onClick={onNext}
          disabled={!canContinue}
          className={cn(
            "px-8 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2",
            canContinue
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EmpathyPromptCard;
