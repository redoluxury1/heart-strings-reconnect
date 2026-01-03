import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { empathyPrompts } from './data/prompts';

interface InsightSummaryProps {
  responses: Record<string, string>;
  onContinue: () => void;
  onBack: () => void;
}

const InsightSummary: React.FC<InsightSummaryProps> = ({
  responses,
  onContinue,
  onBack
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h2 className="font-cormorant text-2xl font-semibold text-foreground">
          Your Perspective Shift
        </h2>
        <p className="text-muted-foreground text-sm">
          Here's what you discovered by seeing things from their side
        </p>
      </div>

      <div className="space-y-4">
        {empathyPrompts.map((prompt, index) => {
          const response = responses[prompt.id];
          if (!response) return null;
          
          return (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-5"
            >
              <p className="text-sm text-muted-foreground mb-2">
                {prompt.prompt.replace('...', '')}
              </p>
              <p className="text-foreground font-medium">
                {response}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-accent/10 rounded-xl border border-accent/20 p-5 text-center">
        <p className="text-foreground">
          Taking the time to see their perspective is already a step toward healing. Ready to see some ways to start a conversation?
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <motion.button
          onClick={onBack}
          className="px-6 py-3 rounded-full font-medium border border-border text-foreground hover:bg-muted transition-all duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="h-4 w-4" />
          Edit Responses
        </motion.button>
        <motion.button
          onClick={onContinue}
          className="px-8 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Conversation Starters
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default InsightSummary;
