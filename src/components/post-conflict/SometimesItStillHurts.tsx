
import React from 'react';
import { Card } from '@/components/ui/card';
import OptimizedImage from '@/components/common/OptimizedImage';

const SometimesItStillHurts = () => {
  return (
    <Card className="border-none overflow-hidden rounded-xl shadow-md">
      <div 
        className="p-8 lg:p-12 flex flex-col items-center bg-[#F8EFE0]" 
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* Title using the serif font and warm brown color */}
          <h2 className="font-cormorant text-5xl md:text-6xl lg:text-7xl mb-4 text-[#7D5248] leading-tight">
            Sometimes,<br />it still hurts.
          </h2>
          
          {/* Subtitle text */}
          <p className="text-[#7D5248] text-xl md:text-2xl mb-8 max-w-lg mx-auto">
            Find calm when forgiveness doesn't erase the pain.
          </p>
          
          {/* New illustration of the couple */}
          <div className="mb-8 flex justify-center">
            <OptimizedImage 
              src="/lovable-uploads/c8f75296-51f7-4d50-84f0-68f55b65e7bc.png" 
              alt="Person crying with partner comforting them"
              className="w-full max-w-md h-auto" 
              priority={true}
            />
          </div>
          
          {/* Descriptive text about healing */}
          <p className="text-[#7D5248] mt-4 text-lg max-w-xl mx-auto">
            It's normal for emotions to linger even after you've worked through a conflict. 
            True healing takes time, and that's okay.
          </p>
          
          {/* Additional supportive text */}
          <p className="text-[#7D5248] opacity-80 mt-6 text-base max-w-sm mx-auto">
            Remember that healing isn't linear. Some days will be easier than others, and that's part of the process.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SometimesItStillHurts;
