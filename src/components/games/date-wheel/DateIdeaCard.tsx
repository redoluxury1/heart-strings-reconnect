
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, RotateCw, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { DateIdea } from '@/types/date-wheel';
import { renderIcon } from './utils/iconRenderer';

interface DateIdeaCardProps {
  dateIdea: DateIdea;
  onSave: () => void;
  onTryAgain: () => void;
}

const DateIdeaCard: React.FC<DateIdeaCardProps> = ({ dateIdea, onSave, onTryAgain }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md p-6 border border-lavender-blue/30 w-full max-w-md my-8"
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-lavender-blue/20 mr-3">
          {renderIcon(dateIdea.icon)}
        </div>
        <h3 className="text-2xl font-cormorant font-medium text-midnight-indigo">
          {dateIdea.title}
        </h3>
      </div>
      
      <p className="text-gray-700 mb-5">
        {dateIdea.description}
      </p>
      
      {dateIdea.tip && (
        <div className="bg-soft-blush/30 p-3 rounded-md mb-5">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Why this helps: </span> 
            {dateIdea.tip}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-3">
        <Button 
          variant="outline" 
          className="border-lavender-blue/50 text-midnight-indigo hover:bg-lavender-blue/10"
          onClick={onSave}
        >
          <Save className="h-4 w-4 mr-1" />
          <span>Save</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="border-lavender-blue/50 text-midnight-indigo hover:bg-lavender-blue/10"
          onClick={onTryAgain}
        >
          <RotateCw className="h-4 w-4 mr-1" />
          <span>Again</span>
        </Button>
        
        <Button 
          className="bg-midnight-indigo hover:bg-midnight-indigo/90"
        >
          <Calendar className="h-4 w-4 mr-1" />
          <span>Tonight</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default DateIdeaCard;
