
import React from 'react';
import { PauseCircle } from 'lucide-react';
import CodeWordDisplay from './components/CodeWordDisplay';
import StatusIndicator from './components/StatusIndicator';
import ActionButtons from './components/ActionButtons';
import ReminderToggle from './components/ReminderToggle';

interface CodeWordUsageProps {
  codeWord: string;
  onCodeWordUsed: () => void;
  onChangeCodeWord: () => void;
  status?: 'pending' | 'confirmed' | 'negotiation';
}

const CodeWordUsage: React.FC<CodeWordUsageProps> = ({ 
  codeWord, 
  onCodeWordUsed, 
  onChangeCodeWord,
  status = 'confirmed' 
}) => {
  const isPending = status === 'pending';
  const isNegotiating = status === 'negotiation';
  const isDisabled = isPending || isNegotiating;
  
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-[#f7e0dc]/60 p-4 rounded-full">
          <PauseCircle className="w-12 h-12 text-[#5d4357]" />
        </div>
      </div>
      
      <h3 className="text-xl text-[#5d4357] mb-2">
        Your shared code word is:
      </h3>
      
      <CodeWordDisplay codeWord={codeWord} />
      
      <StatusIndicator status={status} />
      
      <p className="text-[#5d4357]/80 mb-8 italic">
        When either of you says this word, it means "let's pause this conversation" — no questions asked.
      </p>
      
      <ActionButtons 
        onCodeWordUsed={onCodeWordUsed}
        onChangeCodeWord={onChangeCodeWord}
        disabled={isDisabled}
      />
      
      <ReminderToggle />
    </div>
  );
};

export default CodeWordUsage;
