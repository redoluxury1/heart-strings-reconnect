
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';
import WhiteFlagModal from './WhiteFlagModal';

const WhiteFlagButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-white border-2 border-[#D3876A] text-[#D3876A] hover:bg-[#D3876A]/5 rounded-full flex items-center gap-2 px-6 py-3"
      >
        <Flag className="h-4 w-4" />
        Send a White Flag
      </Button>
      
      <WhiteFlagModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default WhiteFlagButton;
