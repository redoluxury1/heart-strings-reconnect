import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Heart } from 'lucide-react';

interface FlipIntroScreenProps {
  onStart: () => void;
}

const FlipIntroScreen: React.FC<FlipIntroScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 text-center"
    >
      <div className="flex justify-center">
        <div className="p-4 rounded-full bg-accent/20">
          <RefreshCw className="h-10 w-10 text-accent" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-cormorant text-3xl font-semibold text-foreground">
          See It From Their Side
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          One of the most powerful things you can do after a conflict is to genuinely try to understand your partner's experience.
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground text-left">
            This exercise will guide you through a few prompts to help you step into your partner's shoes. At the end, you'll get conversation starters to help you reconnect.
          </p>
        </div>
      </div>

      <motion.button
        onClick={onStart}
        className="px-8 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        I'm ready to try this
      </motion.button>
    </motion.div>
  );
};

export default FlipIntroScreen;
