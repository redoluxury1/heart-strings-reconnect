import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  accentColor?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
  accentColor = 'hsl(var(--mauve-rose))'
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="w-full text-left p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="p-3 rounded-full shrink-0"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <Icon 
            className="h-6 w-6" 
            style={{ color: accentColor }}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-cormorant text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <span className="text-sm font-medium text-primary group-hover:underline">
          Start →
        </span>
      </div>
    </motion.button>
  );
};

export default ToolCard;
