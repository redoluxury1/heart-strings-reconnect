
import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { FlagType } from '@/data/white-flag-data';

interface MessagesSelectorProps {
  flagType: FlagType;
  onSelect: (message: string) => void;
  onCustomChange: (value: string) => void;
  customMessage: string;
}

const MessagesSelector = ({ 
  flagType, 
  onSelect,
  onCustomChange,
  customMessage
}: MessagesSelectorProps) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [isCustom, setIsCustom] = useState(false);

  const handleSelectMessage = (index: number) => {
    setSelectedMessageIndex(index);
    setIsCustom(false);
    const selectedMessage = flagType.messages[index];
    onSelect(selectedMessage);
    onCustomChange(selectedMessage); // Preload the selected message to custom textarea
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCustomChange(e.target.value);
    setIsCustom(true);
    setSelectedMessageIndex(null);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-[#1A1F2C] mb-3">Choose a message to send:</h3>
      
      <RadioGroup value={selectedMessageIndex?.toString()} onValueChange={(value) => handleSelectMessage(parseInt(value))}>
        {flagType.messages.map((message, index) => (
          <div key={index} className="flex items-start space-x-2 mb-2 p-2 border rounded-lg">
            <RadioGroupItem value={index.toString()} id={`message-${index}`} />
            <label htmlFor={`message-${index}`} className="text-[#1A1F2C] text-sm cursor-pointer">{message}</label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-4">
        <h3 className="text-base font-medium text-[#1A1F2C] mb-2">Or write your own:</h3>
        <Textarea 
          value={customMessage}
          onChange={handleCustomChange}
          placeholder="Write a custom message..."
          className="w-full min-h-[80px]"
        />
      </div>
    </div>
  );
};

export default MessagesSelector;
