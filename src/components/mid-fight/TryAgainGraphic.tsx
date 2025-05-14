
import React from 'react';
import OptimizedImage from '@/components/common/OptimizedImage';

interface TryAgainGraphicProps {
  className?: string;
}

const TryAgainGraphic: React.FC<TryAgainGraphicProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <OptimizedImage 
        src="/lovable-uploads/27295ce7-ea9f-48d5-b8cc-11ced227583b.png" 
        alt="Let's Try That Again" 
        className="h-auto w-full max-w-[260px]"
        priority={true}
      />
    </div>
  );
};

export default TryAgainGraphic;
