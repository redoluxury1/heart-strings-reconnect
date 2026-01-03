import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';
import { triggerOptions, TriggerOption } from './data/triggers';

interface TriggerSelectorProps {
  selectedTriggers: string[];
  onSelect: (triggerId: string) => void;
  onContinue: () => void;
}

const TriggerSelector: React.FC<TriggerSelectorProps> = ({
  selectedTriggers,
  onSelect,
  onContinue
}) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  const canContinue = selectedTriggers.length >= 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-cormorant text-2xl font-semibold text-midnight-indigo mb-2">
          What set you off?
        </h2>
        <p className="text-muted-foreground text-sm">
          Select 1-3 things that triggered your reaction
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {triggerOptions.map((trigger) => {
          const isSelected = selectedTriggers.includes(trigger.id);
          const isDisabled = !isSelected && selectedTriggers.length >= 3;
          
          return (
            <motion.button
              key={trigger.id}
              onClick={() => !isDisabled && onSelect(trigger.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200",
                isSelected 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card text-foreground border-border hover:border-primary/50",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
            >
              {getIcon(trigger.icon)}
              <span className="text-sm font-medium">{trigger.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <motion.button
          onClick={onContinue}
          disabled={!canContinue}
          className={cn(
            "px-8 py-3 rounded-full font-medium transition-all duration-200",
            canContinue
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TriggerSelector;
