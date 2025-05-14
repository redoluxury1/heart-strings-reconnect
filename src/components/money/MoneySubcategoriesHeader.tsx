
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ContentContainer from '@/components/common/ContentContainer';

const MoneySubcategoriesHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <ContentContainer maxWidth="lg">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-midnight-indigo"
        onClick={() => navigate('/bridge-the-gap/categories')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to categories
      </Button>
      
      <div className="text-center mb-10">
        <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
          Money
        </h1>
        <h2 className="font-inter text-base md:text-lg text-midnight-indigo/70">
          Pick the area where things feel hardest right now.
        </h2>
      </div>
    </ContentContainer>
  );
};

export default MoneySubcategoriesHeader;
