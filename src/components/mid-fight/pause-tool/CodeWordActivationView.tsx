
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface CodeWordActivationViewProps {
  codeWord: string;
  onChangeCodeWord: (codeWord: string) => void;
  onActivate: () => void;
}

const CodeWordActivationView: React.FC<CodeWordActivationViewProps> = ({
  codeWord,
  onChangeCodeWord,
  onActivate
}) => {
  const [localCodeWord, setLocalCodeWord] = useState(codeWord);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeCodeWord(localCodeWord);
    onActivate();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-[#5d4357] mb-2">
          Set your pause code word
        </h3>
        <p className="text-sm text-[#5d4357]/70 mb-6">
          This is a word you'll use with your partner to signal that you need a pause in the conversation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="codeWord" className="block text-sm font-medium text-[#5d4357] mb-2">
            Your Code Word
          </label>
          <Input
            id="codeWord"
            placeholder="e.g., pause, timeout, breather"
            value={localCodeWord}
            onChange={(e) => setLocalCodeWord(e.target.value)}
            className="w-full border-[#5d4357]/20 focus:border-[#5d4357] focus:ring-1 focus:ring-[#5d4357]"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#5d4357] hover:bg-[#5d4357]/90 text-white"
        >
          Activate Code Word
        </Button>
      </form>
    </div>
  );
};

export default CodeWordActivationView;
