
import React from 'react';

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Phone frame */}
      <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-soft-cream rounded-[2rem] overflow-hidden w-[280px] h-[560px] sm:w-[320px] sm:h-[640px]">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-soft-cream/80 backdrop-blur-sm z-10 flex items-center justify-between px-6 text-xs text-navy-800/60">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-navy-800/40 rounded-sm">
                <div className="w-3/4 h-full bg-navy-800/40 rounded-sm" />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="pt-8 h-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      
      {/* Reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 rounded-[2.5rem] pointer-events-none" />
    </div>
  );
};

export default PhoneMockup;
