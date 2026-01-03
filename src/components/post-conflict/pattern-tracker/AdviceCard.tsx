import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, MessageSquare, Brain, Copy, Check, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAdviceForStyles, getStyleById } from './data/styles';

interface AdviceCardProps {
  userStyle: string;
  partnerStyle: string;
  onBack: () => void;
  onComplete: () => void;
  onTryAnother: () => void;
}

const AdviceCard: React.FC<AdviceCardProps> = ({
  userStyle,
  partnerStyle,
  onBack,
  onComplete,
  onTryAnother
}) => {
  const [copied, setCopied] = useState(false);
  const advice = getAdviceForStyles(userStyle, partnerStyle);
  const userStyleData = getStyleById(userStyle);
  const partnerStyleData = getStyleById(partnerStyle);

  const handleCopy = async () => {
    if (advice) {
      await navigator.clipboard.writeText(advice.examplePhrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!advice || !userStyleData || !partnerStyleData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Advice not found for this combination.</p>
        <button onClick={onBack} className="mt-4 text-midnight-indigo hover:underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Dynamic header */}
      <div className="text-center">
        <h2 className="font-cormorant text-2xl font-semibold text-midnight-indigo mb-4">
          Your Dynamic
        </h2>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="bg-midnight-indigo/10 px-4 py-2 rounded-full">
            <span className="text-midnight-indigo font-medium">You: {userStyleData.label}</span>
          </div>
          <span className="text-muted-foreground">+</span>
          <div className="bg-midnight-indigo/10 px-4 py-2 rounded-full">
            <span className="text-midnight-indigo font-medium">Partner: {partnerStyleData.label}</span>
          </div>
        </div>
      </div>

      {/* Advice sections */}
      <div className="space-y-4">
        {/* Insight */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-xl">
              <Lightbulb className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="font-medium text-midnight-indigo">The Insight</h3>
          </div>
          <p className="text-foreground leading-relaxed">{advice.insight}</p>
        </div>

        {/* Try This */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Target className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="font-medium text-midnight-indigo">Try This Next Time</h3>
          </div>
          <p className="text-foreground leading-relaxed">{advice.tryThis}</p>
        </div>

        {/* Example Phrase */}
        <div className="bg-midnight-indigo/5 border border-midnight-indigo/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-midnight-indigo/20 rounded-xl">
                <MessageSquare className="h-5 w-5 text-midnight-indigo" />
              </div>
              <h3 className="font-medium text-midnight-indigo">Example Phrase</h3>
            </div>
            <motion.button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-indigo/10 hover:bg-midnight-indigo/20 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-midnight-indigo" />
                  <span className="text-sm text-midnight-indigo">Copy</span>
                </>
              )}
            </motion.button>
          </div>
          <p className="text-foreground italic leading-relaxed">"{advice.examplePhrase}"</p>
        </div>

        {/* Why It Works */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-midnight-indigo">Why This Works</h3>
          </div>
          <p className="text-foreground leading-relaxed">{advice.whyItWorks}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <motion.button
          onClick={onTryAnother}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/5 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="h-4 w-4" />
          Try Another Combination
        </motion.button>
        <motion.button
          onClick={onComplete}
          className="flex-1 px-6 py-3 rounded-full bg-midnight-indigo text-white hover:bg-midnight-indigo/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Done
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AdviceCard;
