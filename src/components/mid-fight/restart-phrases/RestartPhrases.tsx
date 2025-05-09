
import React, { useState } from 'react';
import { Copy, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PhraseCard from './PhraseCard';
import CustomPhraseInput from './CustomPhraseInput';
import { RestartPhrase, restartPhrases } from '@/data/restart-phrases-data';
import { Textarea } from '@/components/ui/textarea';

interface RestartPhrasesProps {
  onClose: () => void;
  onNotReady?: () => void;
}

const RestartPhrases: React.FC<RestartPhrasesProps> = ({ onClose, onNotReady }) => {
  const [selectedPhrase, setSelectedPhrase] = useState<RestartPhrase | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customizingPhrase, setCustomizingPhrase] = useState(false);
  const [customizedText, setCustomizedText] = useState('');
  const { toast } = useToast();
  
  const handlePhraseSelect = (phrase: RestartPhrase) => {
    setSelectedPhrase(phrase);
    setCustomizedText(phrase.text);
    setCustomizingPhrase(true);
  };
  
  const handleCopyPhrase = () => {
    if (selectedPhrase || customizedText) {
      navigator.clipboard.writeText(customizedText || selectedPhrase?.text || '');
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
    setCustomizedText(text);
    setShowCustomInput(false);
    setCustomizingPhrase(true);
  };

  const handleStartConversation = () => {
    toast({
      title: "Restart phrase prepared",
      description: "Your message will be sent to your partner when the timer ends."
    });
    onClose();
    // In a real implementation, this would store the message to be sent when the timer ends
    console.log("Prepared restart phrase:", customizedText || selectedPhrase?.text);
  };
  
  const handleBackToSelection = () => {
    setCustomizingPhrase(false);
    setSelectedPhrase(null);
    setCustomizedText('');
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
      ) : customizingPhrase ? (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Customize your restart phrase</h3>
            <Textarea
              value={customizedText}
              onChange={(e) => setCustomizedText(e.target.value)}
              className="w-full border-[#5d4357]/30 rounded-lg p-3 mb-3 min-h-24 focus:border-[#5d4357]/50 focus:ring-1 focus:ring-[#5d4357]/30"
              placeholder="Write your restart phrase..."
            />
            
            <div className="flex flex-col gap-3 mt-4">
              <Button 
                className="w-full flex items-center justify-center gap-2 bg-[#5d4357] hover:bg-[#5d4357]/90"
                onClick={handleStartConversation}
              >
                <Send size={16} /> 
                Start conversation
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-[#5d4357]/30 text-[#5d4357] hover:bg-[#5d4357]/10"
                onClick={handleCopyPhrase}
              >
                <Copy size={16} className="mr-2" /> 
                Copy to clipboard
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-[#5d4357]/30 text-[#5d4357] hover:bg-[#5d4357]/10"
                onClick={handleBackToSelection}
              >
                Back to phrases
              </Button>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-[#5d4357]/30 text-[#5d4357] hover:bg-[#5d4357]/10"
            onClick={onNotReady || onClose}
          >
            Not ready yet
          </Button>
        </div>
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
