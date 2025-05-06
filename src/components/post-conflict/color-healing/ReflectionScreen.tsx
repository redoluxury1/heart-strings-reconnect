
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ReflectionScreenProps {
  selectedColor: string;
  onSelection: (feeling: string) => void;
  onFinish: () => void;
  onBack: () => void;
}

const ReflectionScreen: React.FC<ReflectionScreenProps> = ({ 
  selectedColor,
  onSelection,
  onFinish,
  onBack
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  
  const feelings = [
    "A little calmer",
    "More in control",
    "Still hurting, but trying",
    "Peaceful"
  ];
  
  const handleSelectionChange = (value: string) => {
    setSelected(value);
    onSelection(value);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-6 text-center text-midnight-indigo">
        Reflection
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg">
        How do you feel now?
      </p>

      <div className="w-full max-w-md mx-auto mb-8">
        <RadioGroup value={selected || ""} onValueChange={handleSelectionChange} className="flex flex-col space-y-3">
          {feelings.map((feeling) => (
            <div key={feeling} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-[#7d6272]">
              <RadioGroupItem value={feeling} id={feeling} />
              <Label htmlFor={feeling} className="cursor-pointer w-full text-left">
                {feeling}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="flex space-x-4 mt-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-gray-300 text-gray-600 hover:text-[#7d6272]"
        >
          Back
        </Button>
        <Button 
          onClick={onFinish}
          className="bg-[#7d6272] hover:bg-[#6d5262] text-white"
          disabled={!selected}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default ReflectionScreen;
