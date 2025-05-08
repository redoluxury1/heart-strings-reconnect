
import React from 'react';
import CodeWordSetup from './CodeWordSetup';
import CodeWordUsage from './CodeWordUsage';
import CodeWordSync from './CodeWordSync';
import CodeWordConfirmation from './CodeWordConfirmation';
import CodeWordHeader from './components/CodeWordHeader';
import CodeWordCoolDown from './components/CodeWordCoolDown';
import { useCodeWordState } from './hooks/useCodeWordState';
import { 
  Dialog, 
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

const CodeWordTool = () => {
  const {
    codeWord,
    currentView,
    isDialogOpen,
    partnerWord,
    hasNotification,
    userSuggestion,
    setUserSuggestion,
    handleSetCodeWord,
    handleConfirmPartnerWord,
    handleRejectPartnerWord,
    handleCodeWordUsed,
    handleChangeCodeWord,
    handleConfirmationClose,
    setIsDialogOpen
  } = useCodeWordState();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/10 mt-6 mb-10">
      <CodeWordHeader hasNotification={hasNotification} />
      
      {currentView === 'setup' && (
        <CodeWordSetup 
          onSetCodeWord={handleSetCodeWord} 
          initialWord={userSuggestion || ''} 
          onWordChange={setUserSuggestion}
        />
      )}
      
      {currentView === 'sync' && partnerWord && (
        <CodeWordSync 
          partnerWord={partnerWord}
          onConfirm={handleConfirmPartnerWord}
          onReject={handleRejectPartnerWord}
        />
      )}
      
      {currentView === 'confirmation' && codeWord && (
        <CodeWordConfirmation 
          codeWord={codeWord.word} 
          onClose={handleConfirmationClose}
        />
      )}
      
      {currentView === 'usage' && codeWord && (
        <CodeWordUsage 
          codeWord={codeWord.word} 
          onCodeWordUsed={handleCodeWordUsed}
          onChangeCodeWord={handleChangeCodeWord}
          status={codeWord.status}
        />
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white p-6 rounded-lg max-w-md">
          <DialogTitle className="text-2xl font-cormorant text-[#5d4357] mb-4">
            Let's pause here
          </DialogTitle>
          <DialogDescription className="text-[#5d4357] mb-6">
            You both agreed to stop when this word is used. Take a moment—restart later with care.
          </DialogDescription>
          <CodeWordCoolDown onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeWordTool;
