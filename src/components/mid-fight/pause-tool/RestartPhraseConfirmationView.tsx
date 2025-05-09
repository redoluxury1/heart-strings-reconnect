
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Edit2, Clock } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface RestartPhraseConfirmationViewProps {
  restartPhrase: string;
  onSend: () => void;
  onEdit: (phrase: string) => void;
  onNotReady: () => void;
}

const RestartPhraseConfirmationView: React.FC<RestartPhraseConfirmationViewProps> = ({
  restartPhrase,
  onSend,
  onEdit,
  onNotReady
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhrase, setEditedPhrase] = useState(restartPhrase);
  
  const handleSaveEdit = () => {
    onEdit(editedPhrase);
    setIsEditing(false);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl text-[#5d4357] font-medium mb-4">
          Your restart message is ready
        </h3>
        
        <p className="text-[#5d4357] mb-8">
          Review your message before sending it to your partner.
        </p>
      </div>
      
      {isEditing ? (
        <div className="mb-8">
          <Textarea
            value={editedPhrase}
            onChange={(e) => setEditedPhrase(e.target.value)}
            className="w-full min-h-[120px] p-4 text-[#07183D] border-[#5d4357]/20 rounded-lg focus:border-[#5d4357]/40 focus:ring-[#5d4357]/20"
          />
          <div className="flex justify-end mt-3">
            <Button
              onClick={handleSaveEdit}
              className="bg-[#5d4357] hover:bg-[#5d4357]/90 text-white"
            >
              Save changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-teal-500/20 border border-teal-500/30 p-5 rounded-lg mb-8">
          <p className="text-[#07183D] italic">"{restartPhrase}"</p>
        </div>
      )}
      
      <div className="space-y-4">
        <Button 
          onClick={onSend}
          className="w-full bg-[#5d4357] text-white hover:bg-[#5d4357]/90 flex items-center justify-center py-5"
        >
          <Send size={18} className="mr-2" />
          Send Now
        </Button>
        
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="w-full border-[#5d4357]/20 text-[#5d4357] hover:bg-[#5d4357]/10 flex items-center justify-center py-5"
          >
            <Edit2 size={18} className="mr-2" />
            Edit Message
          </Button>
        )}
        
        <Button 
          onClick={onNotReady}
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] hover:bg-[#5d4357]/10 flex items-center justify-center py-5"
        >
          <Clock size={18} className="mr-2" />
          Not Ready Yet
        </Button>
      </div>
    </div>
  );
};

export default RestartPhraseConfirmationView;
