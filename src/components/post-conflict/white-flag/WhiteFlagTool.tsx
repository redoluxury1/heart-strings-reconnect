
import React, { useState } from 'react';
import { Flag as FlagIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { flagTypes, FlagType } from '@/data/white-flag-data';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const FlagTypeCard = ({ 
  flagType, 
  isSelected, 
  onClick 
}: { 
  flagType: FlagType; 
  isSelected: boolean; 
  onClick: () => void; 
}) => {
  const IconComponent = flagType.icon;
  
  return (
    <div 
      className={`border rounded-xl p-3 mb-2 cursor-pointer transition-all ${
        isSelected ? 'border-[#c06b6b] bg-[#fce6d4]/30' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className={`h-8 w-8 flex items-center justify-center ${
          isSelected ? 'text-[#c06b6b]' : 'text-[#c06b6b]'
        }`}>
          {flagType.id === 'reconnect' ? (
            <IconComponent size={20} fill="#c06b6b" stroke="#c06b6b" />
          ) : (
            <IconComponent size={20} stroke="#c06b6b" />
          )}
        </div>
        
        <div>
          <h3 className="text-base font-medium text-[#1A1F2C] mb-0.5">{flagType.title}</h3>
          <p className="text-xs text-[#1A1F2C]/80">{flagType.description}</p>
        </div>
      </div>
    </div>
  );
};

const MessagesSelector = ({ 
  flagType, 
  onSelect,
  onCustomChange,
  customMessage
}: { 
  flagType: FlagType; 
  onSelect: (message: string) => void;
  onCustomChange: (value: string) => void;
  customMessage: string;
}) => {
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

const SendConfirmationDialog = ({ message }: { message: string }) => {
  const { toast } = useToast();
  
  const handleSend = () => {
    toast({
      title: "White flag sent",
      description: "Your message has been sent successfully.",
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#2e2a63] hover:bg-[#1e1a43] text-white px-8 py-2">
          Send Message
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send this message?</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-[#1A1F2C]">{message}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSend}>Confirm & Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const WhiteFlagTool = () => {
  const [selectedFlagType, setSelectedFlagType] = useState<FlagType | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [step, setStep] = useState<'select-flag' | 'select-message'>('select-flag');
  const { toast } = useToast();

  const handleSelectFlag = (flagType: FlagType) => {
    setSelectedFlagType(flagType);
    setSelectedMessage('');
    setCustomMessage('');
    setStep('select-message');
  };

  const handleSaveAsFavorite = () => {
    if (!customMessage) {
      toast({
        title: "No message selected",
        description: "Please select or write a message first.",
      });
      return;
    }
    
    toast({
      title: "Saved to favorites",
      description: "This message has been saved to your favorites.",
    });
  };

  const handleBack = () => {
    setStep('select-flag');
    setSelectedMessage('');
    setCustomMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step === 'select-flag' ? (
        <>
          <div className="text-center mb-6">
            <div className="bg-[#f8f5f0] inline-block p-4 rounded-xl mb-4">
              <FlagIcon className="h-10 w-10 text-[#2e2a63]" />
            </div>
            <h2 className="text-3xl font-cormorant font-medium text-[#2e2a63] mb-2">
              Wave the White Flag
            </h2>
            <p className="text-[#1A1F2C] mb-6">
              A way to pause, reset, or say "I'm not OK"—without making it worse.
            </p>
            <h3 className="text-xl font-medium text-[#2e2a63] mb-4">
              What kind of flag do you need to send right now?
            </h3>
          </div>
    
          <div className="space-y-2 mb-6">
            {flagTypes.map((flagType) => (
              <FlagTypeCard 
                key={flagType.id}
                flagType={flagType} 
                isSelected={selectedFlagType?.id === flagType.id}
                onClick={() => handleSelectFlag(flagType)}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <button 
            onClick={handleBack} 
            className="text-[#2e2a63] flex items-center mb-4 hover:underline"
          >
            &larr; Back to flag types
          </button>
          
          <div className="text-center mb-4">
            <h2 className="text-2xl font-cormorant font-medium text-[#2e2a63] mb-2">
              {selectedFlagType?.title}
            </h2>
          </div>
          
          {selectedFlagType && (
            <>
              <MessagesSelector 
                flagType={selectedFlagType}
                onSelect={setSelectedMessage}
                onCustomChange={setCustomMessage}
                customMessage={customMessage}
              />
              
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <SendConfirmationDialog message={customMessage || selectedMessage} />
                <Button 
                  variant="outline" 
                  className="border-[#c06b6b] text-[#c06b6b]"
                  onClick={handleSaveAsFavorite}
                >
                  Save as Favorite
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WhiteFlagTool;
