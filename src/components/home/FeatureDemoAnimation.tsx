
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Check } from 'lucide-react';

type DemoStep = 'categories' | 'phrases' | 'selected';

const FeatureDemoAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('categories');
  const [highlightedCategory, setHighlightedCategory] = useState(false);
  const [highlightedPhrase, setHighlightedPhrase] = useState(false);

  // Demo data
  const categories = [
    { id: 'vulnerability', label: 'Vulnerability', icon: Heart, color: 'bg-rose-100 text-rose-600' },
    { id: 'boundaries', label: 'Boundaries', icon: MessageCircle, color: 'bg-blue-100 text-blue-600' },
  ];

  const phrases = [
    "It really hurt when I felt dismissed in that moment.",
    "I need you to understand how that made me feel.",
    "Can we talk about what just happened?"
  ];

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Step 1: Show categories, then highlight vulnerability
      setCurrentStep('categories');
      setHighlightedCategory(false);
      setHighlightedPhrase(false);
      
      await new Promise(r => setTimeout(r, 1500));
      setHighlightedCategory(true);
      
      await new Promise(r => setTimeout(r, 1500));
      
      // Step 2: Show phrases
      setCurrentStep('phrases');
      setHighlightedPhrase(false);
      
      await new Promise(r => setTimeout(r, 1500));
      setHighlightedPhrase(true);
      
      await new Promise(r => setTimeout(r, 1500));
      
      // Step 3: Show selected
      setCurrentStep('selected');
      
      await new Promise(r => setTimeout(r, 3000));
      
      // Loop
    };

    sequence();
    const interval = setInterval(sequence, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col bg-soft-cream p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="font-cormorant text-lg font-semibold text-navy-800">
          Let's Try That Again
        </h3>
        <p className="text-xs text-navy-800/60 mt-1">
          Choose what you want to express
        </p>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 'categories' && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 space-y-3"
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  highlightedCategory && index === 0
                    ? 'border-terracotta bg-terracotta/10 scale-[1.02]'
                    : 'border-navy-800/10 bg-white'
                }`}
                animate={highlightedCategory && index === 0 ? {
                  boxShadow: ['0 0 0 0 rgba(200, 120, 100, 0)', '0 0 0 8px rgba(200, 120, 100, 0.2)', '0 0 0 0 rgba(200, 120, 100, 0)']
                } : {}}
                transition={{ duration: 1.5, repeat: highlightedCategory && index === 0 ? Infinity : 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${cat.color}`}>
                    <cat.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-navy-800 text-sm">{cat.label}</p>
                    <p className="text-xs text-navy-800/50">
                      {index === 0 ? 'Say what hurt me' : 'Set healthy limits'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Simulated cursor */}
            {highlightedCategory && (
              <motion.div
                initial={{ opacity: 0, x: 100, y: -80 }}
                animate={{ opacity: 1, x: 20, y: -100 }}
                className="absolute pointer-events-none"
              >
                <div className="w-4 h-4 bg-navy-800 rounded-full opacity-60" />
              </motion.div>
            )}
          </motion.div>
        )}

        {currentStep === 'phrases' && (
          <motion.div
            key="phrases"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 space-y-2"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-rose-100">
                <Heart className="w-3 h-3 text-rose-600" />
              </div>
              <span className="text-xs font-medium text-navy-800">Vulnerability</span>
            </div>
            
            {phrases.map((phrase, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  highlightedPhrase && index === 0
                    ? 'border-terracotta bg-terracotta/10'
                    : 'border-navy-800/10 bg-white'
                }`}
                animate={highlightedPhrase && index === 0 ? {
                  scale: [1, 1.02, 1]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs text-navy-800 leading-relaxed">{phrase}</p>
                {highlightedPhrase && index === 0 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block mt-2 text-[10px] text-terracotta font-medium"
                  >
                    ✨ Recommended
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {currentStep === 'selected' && (
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
              <Check className="w-6 h-6 text-green-600" />
            </motion.div>
            
            <p className="text-sm font-medium text-navy-800 mb-2">Ready to share</p>
            
            <div className="bg-white border border-navy-800/10 rounded-xl p-4 w-full">
              <p className="text-xs text-navy-800 italic leading-relaxed">
                "It really hurt when I felt dismissed in that moment."
              </p>
            </div>
            
            <p className="text-[10px] text-navy-800/50 mt-3">
              A calmer way to express your feelings
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeatureDemoAnimation;
