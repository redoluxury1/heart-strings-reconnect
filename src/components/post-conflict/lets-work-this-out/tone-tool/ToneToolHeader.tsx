
import React from 'react';
import { Heart } from 'lucide-react';

interface ToneToolHeaderProps {
  title: string;
  subtitle: string;
}

const ToneToolHeader: React.FC<ToneToolHeaderProps> = ({ title, subtitle }) => {
  return (
    <>
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
        <Heart className="h-8 w-8 text-[#D3876A]" />
      </div>
      
      {/* Header */}
      <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-4 text-center">
        {title}
      </h2>
      
      {/* Subheading */}
      <p className="text-center text-[#3A3A3A] leading-[1.6] mb-8">
        {subtitle}
      </p>
    </>
  );
};

export default ToneToolHeader;
