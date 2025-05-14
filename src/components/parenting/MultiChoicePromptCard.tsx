
import React from 'react';
import Card from '@/components/common/Card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface MultiChoicePromptCardProps {
  text: string;
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const MultiChoicePromptCard: React.FC<MultiChoicePromptCardProps> = ({ 
  text, 
  selectedValue, 
  onSelect 
}) => {
  return (
    <Card className="p-5 bg-white hover:shadow-sm transition-shadow duration-200">
      <div>
        <p className="text-midnight-indigo text-lg font-medium mb-3">{text}</p>
        
        <RadioGroup 
          value={selectedValue} 
          onValueChange={onSelect}
          className="mt-3 space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id={`yes-${text.substring(0, 10)}`} />
            <Label htmlFor={`yes-${text.substring(0, 10)}`} className="text-gray-700">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id={`no-${text.substring(0, 10)}`} />
            <Label htmlFor={`no-${text.substring(0, 10)}`} className="text-gray-700">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sometimes" id={`sometimes-${text.substring(0, 10)}`} />
            <Label htmlFor={`sometimes-${text.substring(0, 10)}`} className="text-gray-700">Sometimes</Label>
          </div>
        </RadioGroup>
        
        <div className="flex justify-between items-center mt-3">
          <span className="inline-block rounded-full px-2.5 py-0.5 text-xs bg-slate-100 text-slate-600">
            Yes / No / Sometimes
          </span>
          
          {selectedValue && (
            <span className="text-xs text-green-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Response saved
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MultiChoicePromptCard;
