
import React from 'react';
import { Button } from '@/components/ui/button';
import { CodeWordInfo } from '@/types/relationship';
import CodeWordDisplay from '../code-word/components/CodeWordDisplay';
import { useToast } from '@/hooks/use-toast';

interface CodeWordActivationViewProps {
  codeWord: CodeWordInfo;
  onActivate: () => void;
  onChangeCodeWord: () => void;
}

const CodeWordActivationView: React.FC<CodeWordActivationViewProps> = ({
  codeWord,
  onActivate,
  onChangeCodeWord
}) => {
  const { toast } = useToast();
  
  const handleActivateClick = () => {
    onActivate();
    toast({
      title: "Code word activated",
      description: "Let's take a pause."
    });
  };
  
  return (
    <div className="max-w-md mx-auto text-center">
      <h3 className="text-2xl text-[#5d4357] mb-6 font-medium text-center">
        Your code word is set
      </h3>
      
      <CodeWordDisplay 
        codeWord={codeWord.word} 
        className="bg-[#f7e0dc]/50 p-8 rounded-lg mb-8 text-center cursor-pointer hover:bg-[#f7e0dc]/70 transition-colors"
        textSize="text-4xl"
        onClick={handleActivateClick}
      />
      
      <p className="text-[#5d4357]/80 mb-8">
        Click your code word above to activate a pause when needed.
      </p>
      
      <Button
        variant="outline" 
        onClick={onChangeCodeWord}
        className="text-[#5d4357] border-[#5d4357]/30 hover:bg-[#f7e0dc]/20 hover:text-[#5d4357]"
      >
        Change code word
      </Button>
      
      <div className="mt-8 text-[#5d4357]/70 text-sm">
        When you use your code word in real life, come here to activate a cooldown timer.
      </div>
    </div>
  );
};

export default CodeWordActivationView;
