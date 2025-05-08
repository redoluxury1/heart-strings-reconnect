import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import CodeWordSetup from './CodeWordSetup';
import CodeWordUsage from './CodeWordUsage';
import CodeWordSync from './CodeWordSync';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CodeWordInfo } from '@/types/relationship';

// Mock data for demonstration purposes (would be replaced with real data)
const mockRelationship = {
  id: 'rel-123',
  codeWord: null
};

export type CodeWordStatus = 'setup' | 'sync' | 'usage' | 'cool-down';

const CodeWordTool = () => {
  const [codeWord, setCodeWord] = useState<CodeWordInfo | null>(mockRelationship.codeWord);
  const [currentView, setCurrentView] = useState<CodeWordStatus>(codeWord ? 'usage' : 'setup');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [partnerWord, setPartnerWord] = useState<string | null>(null);
  const { toast } = useToast();
  
  // This would be based on authentication in a real implementation
  const currentUserId = "user-123";
  
  const handleSetCodeWord = (word: string) => {
    // In a real app, this would send to backend and update relationship
    const newCodeWord: CodeWordInfo = {
      word,
      updatedAt: new Date(),
      updatedBy: currentUserId,
      status: 'pending', // Needs partner confirmation
    };
    
    setCodeWord(newCodeWord);
    setCurrentView('usage');
    
    toast({
      title: "Code word set",
      description: `'${word}' is now your code word. We've notified your partner.`,
    });
    
    // Close dialog if open
    setIsDialogOpen(false);
  };
  
  const handlePartnerSuggestion = (suggestedWord: string) => {
    setPartnerWord(suggestedWord);
    setCurrentView('sync');
  };
  
  const handleConfirmPartnerWord = () => {
    if (partnerWord && codeWord) {
      // Update the code word to the partner's suggestion
      const updatedCodeWord: CodeWordInfo = {
        ...codeWord,
        word: partnerWord,
        status: 'confirmed',
        updatedAt: new Date()
      };
      
      setCodeWord(updatedCodeWord);
      setCurrentView('usage');
      setPartnerWord(null);
      
      toast({
        title: "Code word confirmed",
        description: `'${partnerWord}' is now your shared code word.`,
      });
    }
  };
  
  const handleRejectPartnerWord = () => {
    // Keep current code word but suggest a negotiation
    setCurrentView('setup');
    setPartnerWord(null);
    
    toast({
      title: "New word suggested",
      description: "You've suggested a new code word for you and your partner.",
    });
  };
  
  const handleCodeWordUsed = () => {
    setIsDialogOpen(true);
  };
  
  const handleChangeCodeWord = () => {
    setCurrentView('setup');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/10 mt-6 mb-10">
      <CodeWordHeader />
      
      {currentView === 'setup' && (
        <CodeWordSetup onSetCodeWord={handleSetCodeWord} />
      )}
      
      {currentView === 'sync' && partnerWord && (
        <CodeWordSync 
          partnerWord={partnerWord}
          onConfirm={handleConfirmPartnerWord}
          onReject={handleRejectPartnerWord}
        />
      )}
      
      {currentView === 'usage' && codeWord && (
        <CodeWordUsage 
          codeWord={codeWord.word} 
          onCodeWordUsed={handleCodeWordUsed}
          onChangeCodeWord={handleChangeCodeWord}
        />
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white p-6 rounded-lg max-w-md">
          <CodeWordCoolDown onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeWordTool;

const CodeWordHeader = () => {
  return (
    <div className="text-center my-6">
      <h2 className="text-5xl md:text-6xl font-cormorant text-[#5d4357] font-medium">
        Code Word
      </h2>
      <p className="text-lg md:text-xl text-[#5d4357] mt-3 mb-8">
        One word to pause conflict instantly.
      </p>
    </div>
  );
};

const CodeWordCoolDown = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-cormorant text-[#5d4357] mb-4">
        Let's pause here
      </h3>
      <p className="text-[#5d4357] mb-6">
        You both agreed to stop when this word is used. Take a moment—restart later with care.
      </p>
      <div className="space-y-3">
        <button 
          onClick={onClose}
          className="w-full bg-[#f7e0dc] text-[#5d4357] py-2 px-4 rounded-full hover:bg-[#e7c6c0] transition-colors"
        >
          Set a Timer
        </button>
        <button 
          onClick={onClose}
          className="w-full bg-transparent border border-[#5d4357]/30 text-[#5d4357] py-2 px-4 rounded-full hover:bg-[#5d4357]/10 transition-colors"
        >
          I'll revisit this later
        </button>
        <button 
          onClick={onClose}
          className="w-full bg-transparent border border-[#5d4357]/30 text-[#5d4357] py-2 px-4 rounded-full hover:bg-[#5d4357]/10 transition-colors"
        >
          View Restart Phrases
        </button>
      </div>
    </div>
  );
};
