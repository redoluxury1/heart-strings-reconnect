
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
      className={`border rounded-xl p-5 mb-3 cursor-pointer transition-all ${
        isSelected ? 'border-[#c06b6b] bg-[#fce6d4]/30' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 rounded-lg bg-[#fce6d4] flex items-center justify-center ${
          isSelected ? 'text-[#c06b6b]' : 'text-[#e0a080]'
        }`}>
          <IconComponent size={28} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium text-[#1A1F2C] mb-1">{flagType.title}</h3>
          <p className="text-sm text-[#1A1F2C]/80">{flagType.description}</p>
        </div>
      </div>
    </div>
  );
};

const MessagesSelector = ({ 
  flagType, 
  onSelect,
  onCustomChange
}: { 
  flagType: FlagType; 
  onSelect: (message: string) => void;
  onCustomChange: (value: string) => void;
}) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const handleSelectMessage = (index: number) => {
    setSelectedMessageIndex(index);
    setIsCustom(false);
    onSelect(flagType.messages[index]);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomMessage(e.target.value);
    setIsCustom(true);
    setSelectedMessageIndex(null);
    onCustomChange(e.target.value);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-[#1A1F2C] mb-3">Choose a message to send:</h3>
      
      <RadioGroup value={selectedMessageIndex?.toString()} onValueChange={(value) => handleSelectMessage(parseInt(value))}>
        {flagType.messages.map((message, index) => (
          <div key={index} className="flex items-start space-x-2 mb-3 p-3 border rounded-lg">
            <RadioGroupItem value={index.toString()} id={`message-${index}`} />
            <label htmlFor={`message-${index}`} className="text-[#1A1F2C] cursor-pointer">{message}</label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-4">
        <h3 className="text-lg font-medium text-[#1A1F2C] mb-2">Or write your own:</h3>
        <Textarea 
          value={customMessage}
          onChange={handleCustomChange}
          placeholder="Write a custom message..."
          className="w-full min-h-[100px]"
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
  const { toast } = useToast();

  const handleSelectFlag = (flagType: FlagType) => {
    setSelectedFlagType(flagType);
    setSelectedMessage('');
  };

  const handleSaveAsFavorite = () => {
    if (!selectedMessage) {
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="bg-[#f8f5f0] inline-block p-4 rounded-xl mb-4">
          <FlagIcon className="h-10 w-10 text-[#2e2a63]" />
        </div>
        <h2 className="text-3xl font-cormorant font-medium text-[#2e2a63] mb-2">
          Wave the White Flag
        </h2>
        <p className="text-[#1A1F2C] mb-6">
          A way to pause, reset, or say "I'm not OK"—without making it worse.
        </p>
        <h3 className="text-xl font-medium text-[#2e2a63] mb-6">
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

      {selectedFlagType && (
        <div className="mt-6 border-t pt-6">
          <MessagesSelector 
            flagType={selectedFlagType}
            onSelect={setSelectedMessage}
            onCustomChange={setSelectedMessage}
          />
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <SendConfirmationDialog message={selectedMessage} />
            <Button 
              variant="outline" 
              className="border-[#c06b6b] text-[#c06b6b]"
              onClick={handleSaveAsFavorite}
            >
              Save as Favorite
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhiteFlagTool;
