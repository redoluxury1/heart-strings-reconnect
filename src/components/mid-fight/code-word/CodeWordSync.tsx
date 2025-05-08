
import React from 'react';
import { Button } from '@/components/ui/button';

interface CodeWordSyncProps {
  partnerWord: string;
  onConfirm: () => void;
  onReject: () => void;
}

const CodeWordSync: React.FC<CodeWordSyncProps> = ({ 
  partnerWord, 
  onConfirm, 
  onReject 
}) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <h3 className="text-2xl text-[#5d4357] mb-4 font-medium">
        Sync Your Code Word
      </h3>
      
      <div className="bg-[#f7e0dc]/50 p-6 rounded-lg mb-6">
        <p className="text-[#5d4357] mb-4">
          Your partner already set your shared code word to:
        </p>
        <div className="text-3xl text-[#5d4357] font-medium mb-4">
          "{partnerWord}"
        </div>
        <p className="text-[#5d4357]/80 italic mb-2">
          Do you agree to use this as your pause word?
        </p>
      </div>
      
      <div className="space-y-3">
        <Button
          onClick={onConfirm}
          className="w-full bg-[#2e2a63] hover:bg-[#1e1a43] text-white py-4"
        >
          Yes, confirm it
        </Button>
        
        <Button
          onClick={onReject}
          variant="outline"
          className="w-full border-[#5d4357] text-[#5d4357] py-4 hover:bg-[#5d4357]/10"
        >
          No, suggest a new one
        </Button>
      </div>
    </div>
  );
};

export default CodeWordSync;
