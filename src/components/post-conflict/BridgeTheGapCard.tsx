
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BridgeTheGapCard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/bridge-the-gap/categories');
  };

  return (
    <div className="bg-[#F9F5EF] rounded-xl shadow-md p-6 md:p-8 text-center border-2 border-[#162137] h-full flex flex-col justify-between">
      <div className="max-w-md mx-auto py-4">
        <h2 className="text-4xl md:text-5xl font-cormorant font-medium text-[#162137] mb-6">
          Bridge the Gap
        </h2>
        
        <p className="text-[#162137] text-lg mb-10">
          Guided prompts to help you understand each other better—even when things feel stuck.
        </p>
        
        <Button 
          className="bg-[#D3876A] hover:bg-[#D3876A]/90 text-white font-medium px-6 py-5 text-lg rounded-md shadow-sm flex items-center gap-2 w-full md:w-auto"
          onClick={handleNavigate}
        >
          Try Bridge the Gap <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default BridgeTheGapCard;
