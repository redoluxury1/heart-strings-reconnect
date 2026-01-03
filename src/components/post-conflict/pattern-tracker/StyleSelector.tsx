import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface StyleOption {
  id: string;
  label: string;
  description: string;
  partnerDescription: string;
  icon: string;
}

interface StyleSelectorProps {
  question: string;
  selectedStyle: string | null;
  onSelect: (styleId: string) => void;
  onContinue: () => void;
  styles: StyleOption[];
  isPartnerQuestion?: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  question,
  selectedStyle,
  onSelect,
  onContinue,
  styles,
  isPartnerQuestion = false
}) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-cormorant text-2xl font-semibold text-midnight-indigo mb-2">
          {question}
        </h2>
        <p className="text-muted-foreground text-sm">
          Select the one that feels most true
        </p>
      </div>

      <div className="space-y-3">
        {styles.map((style) => {
          const isSelected = selectedStyle === style.id;
          const displayDescription = isPartnerQuestion ? style.partnerDescription : style.description;
          
          return (
            <motion.button
              key={style.id}
              onClick={() => onSelect(style.id)}
              className={cn(
                "w-full p-4 rounded-2xl border text-left transition-all duration-200",
                isSelected 
                  ? "bg-midnight-indigo text-white border-midnight-indigo" 
                  : "bg-card text-foreground border-border hover:border-midnight-indigo/50"
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-xl",
                  isSelected ? "bg-white/20" : "bg-midnight-indigo/10"
                )}>
                  <span className={isSelected ? "text-white" : "text-midnight-indigo"}>
                    {getIcon(style.icon)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className={cn(
                    "font-medium mb-1",
                    isSelected ? "text-white" : "text-midnight-indigo"
                  )}>
                    {style.label}
                  </h3>
                  <p className={cn(
                    "text-sm",
                    isSelected ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {displayDescription}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <motion.button
          onClick={onContinue}
          disabled={!selectedStyle}
          className={cn(
            "px-8 py-3 rounded-full font-medium transition-all duration-200",
            selectedStyle
              ? "bg-midnight-indigo text-white hover:bg-midnight-indigo/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          whileHover={selectedStyle ? { scale: 1.02 } : {}}
          whileTap={selectedStyle ? { scale: 0.98 } : {}}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StyleSelector;
