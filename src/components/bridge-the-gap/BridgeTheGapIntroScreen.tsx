
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BridgeTheGapIntroScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNavigateToCategories = () => {
    navigate('/post-conflict/bridge-the-gap/categories');
  };
  
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12 bg-[#1A2641] text-[#FAF7F3] rounded-xl">
      <div className="max-w-lg mx-auto flex flex-col items-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-cormorant font-medium text-[#E7D9C9]">
          Bridge<br />the Gap
        </h1>
        
        <p className="text-xl text-[#E7D9C9] leading-relaxed">
          Guided prompts to help you understand each other better—even when things feel stuck.
        </p>
        
        <Button 
          onClick={handleNavigateToCategories}
          className="w-full mt-6 bg-[#C96559] hover:bg-[#C96559]/90 text-white text-lg py-6 rounded-full"
        >
          Try 'Bridge the Gap' <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BridgeTheGapIntroScreen;
