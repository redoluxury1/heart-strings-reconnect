
import React from 'react';
import OptimizedImage from '@/components/common/OptimizedImage';

interface PausePhraseGraphicProps {
  className?: string;
}

const PausePhraseGraphic: React.FC<PausePhraseGraphicProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <OptimizedImage 
        src="/lovable-uploads/b5890910-9dea-494b-b8b1-c4e2a38a9578.png" 
        alt="Pause + Phrase" 
        className="h-auto w-full max-w-[260px]"
        priority={true}
      />
    </div>
  );
};

export default PausePhraseGraphic;
