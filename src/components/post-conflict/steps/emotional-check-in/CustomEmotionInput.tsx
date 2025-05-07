
import React, { useState } from 'react';

interface CustomEmotionInputProps {
  onAddEmotion: (emotion: string) => void;
}

const CustomEmotionInput: React.FC<CustomEmotionInputProps> = ({ onAddEmotion }) => {
  const [customEmotion, setCustomEmotion] = useState('');

  const handleAddCustom = () => {
    if (customEmotion.trim()) {
      onAddEmotion(customEmotion.trim());
      setCustomEmotion('');
    }
  };

  return (
    <div className="flex items-center max-w-xl mx-auto bg-white border border-[#22254a] rounded-full px-4 py-2 mb-8">
      <input
        type="text"
        placeholder="Didn't see yours? Add your own emotion here:"
        value={customEmotion}
        onChange={(e) => setCustomEmotion(e.target.value)}
        className="w-full bg-transparent border-none outline-none px-2 py-1 text-[#22254a]"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustom();
          }
        }}
      />
    </div>
  );
};

export default CustomEmotionInput;
