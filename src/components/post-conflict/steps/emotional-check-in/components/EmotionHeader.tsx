
import React from 'react';
import { Heart } from 'lucide-react';

const EmotionHeader: React.FC = () => {
  return (
    <>
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
        <Heart className="h-7 w-7 text-[#D3876A] animate-gentle-pulse" />
      </div>

      {/* Header */}
      <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-3 text-center">
        Where's Your Head At?
      </h2>

      {/* Subheading */}
      <p className="text-center text-[#3A3A3A] mb-8">
        Emotions run deep—let's name what came up for you.
      </p>
    </>
  );
};

export default EmotionHeader;
