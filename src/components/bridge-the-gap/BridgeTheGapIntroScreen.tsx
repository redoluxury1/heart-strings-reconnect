
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BridgeTheGapIntroScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNavigateToCategories = () => {
    navigate('/bridge-the-gap/categories');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 bg-[#1A2641] text-[#FAF7F3]">
      <div className="max-w-lg mx-auto flex flex-col items-center space-y-12">
        <h1 className="text-5xl md:text-6xl font-cormorant font-medium text-[#E7D9C9]">
          Bridge<br />the Gap
        </h1>
        
        <p className="text-xl md:text-2xl text-[#E7D9C9] leading-relaxed">
          Guided prompts to help you understand each other better—even when things feel stuck.
        </p>
        
        <Button 
          onClick={handleNavigateToCategories}
          className="w-full mt-8 bg-[#C96559] hover:bg-[#C96559]/90 text-white text-lg py-6 rounded-full"
        >
          Try 'Bridge the Gap' <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BridgeTheGapIntroScreen;
