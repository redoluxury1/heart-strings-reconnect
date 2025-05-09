
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PhraseCard from './PhraseCard';
import CustomPhraseInput from './CustomPhraseInput';
import { RestartPhrase, restartPhrases } from '@/data/restart-phrases-data';

interface RestartPhrasesProps {
  onClose: () => void;
  onNotReady?: () => void;
}

const RestartPhrases: React.FC<RestartPhrasesProps> = ({ onClose, onNotReady }) => {
  const [selectedPhrase, setSelectedPhrase] = useState<RestartPhrase | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const { toast } = useToast();
  
  const handlePhraseSelect = (phrase: RestartPhrase) => {
    setSelectedPhrase(phrase === selectedPhrase ? null : phrase);
  };
  
  const handleCopyPhrase = () => {
    if (selectedPhrase) {
      navigator.clipboard.writeText(selectedPhrase.text);
      toast({
        title: "Copied to clipboard",
        description: "You can now paste this message to restart the conversation."
      });
    }
  };
  
  const handleCustomPhraseSave = (text: string) => {
    const customPhrase: RestartPhrase = {
      id: `custom-${Date.now()}`,
      text,
      category: 'honest'
    };
    setSelectedPhrase(customPhrase);
    setShowCustomInput(false);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 rounded-lg p-6">
      <h2 className="text-2xl font-medium text-center text-[#1A1F2C] mb-2">
        Ready to come back to the conversation?
      </h2>
      
      <p className="text-center text-gray-600 mx-auto w-[85%] mb-6">
        Choose a softer way to restart. No defensiveness. No heat. Just honesty and care.
      </p>
      
      {showCustomInput ? (
        <CustomPhraseInput 
          onSave={handleCustomPhraseSave} 
          onCancel={() => setShowCustomInput(false)} 
        />
      ) : (
        <>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {restartPhrases.map((phrase) => (
              <PhraseCard 
                key={phrase.id}
                phrase={phrase}
                isSelected={selectedPhrase?.id === phrase.id}
                onClick={() => handlePhraseSelect(phrase)}
              />
            ))}
          </div>
          
          <div className="mt-6 space-y-3">
            {selectedPhrase && (
              <Button 
                className="w-full flex items-center justify-center gap-2 bg-[#5d4357] hover:bg-[#5d4357]/90"
                onClick={handleCopyPhrase}
              >
                <Copy size={16} /> 
                Copy to send
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="w-full border-[#5d4357]/30 text-[#5d4357] hover:bg-[#5d4357]/10"
              onClick={() => setShowCustomInput(true)}
            >
              Write my own restart
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-[#5d4357]/30 text-[#5d4357] hover:bg-[#5d4357]/10"
              onClick={onNotReady || onClose}
            >
              Not ready yet
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RestartPhrases;
