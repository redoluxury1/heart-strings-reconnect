import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Copy, Check } from 'lucide-react';
import { generateConversationStarters } from './data/prompts';
import { useToast } from '@/hooks/use-toast';

interface BridgeBuilderProps {
  responses: Record<string, string>;
  onComplete: () => void;
  onBack: () => void;
}

const BridgeBuilder: React.FC<BridgeBuilderProps> = ({
  responses,
  onComplete,
  onBack
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();
  
  const starters = generateConversationStarters(responses);

  const handleCopy = async (text: string, index: number) => {
    try {
      // Remove the quotes from the text when copying
      const cleanText = text.replace(/^"|"$/g, '');
      await navigator.clipboard.writeText(cleanText);
      setCopiedIndex(index);
      toast({
        title: "Copied!",
        description: "Conversation starter copied to clipboard",
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast({
        title: "Couldn't copy",
        description: "Please select and copy the text manually",
        variant: "destructive",
      });
    }
  };

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
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h2 className="font-cormorant text-2xl font-semibold text-foreground">
          Start the Conversation
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Here are some ways to open a dialogue based on what you reflected on. Use these as inspiration or copy them directly.
        </p>
      </div>

      <div className="space-y-4">
        {starters.map((starter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-5 group"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-foreground leading-relaxed flex-1">
                {starter}
              </p>
              <motion.button
                onClick={() => handleCopy(starter, index)}
                className="shrink-0 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {copiedIndex === index ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-5 text-center">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Choose a calm moment to start this conversation. Make sure you both have time and space to talk without distractions.
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
          Back
        </motion.button>
        <motion.button
          onClick={onComplete}
          className="px-8 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Done
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BridgeBuilder;
