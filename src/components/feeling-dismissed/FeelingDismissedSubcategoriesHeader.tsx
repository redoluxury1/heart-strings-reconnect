
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContentContainer from '@/components/common/ContentContainer';

const FeelingDismissedSubcategoriesHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-soft-cream py-8">
      <ContentContainer maxWidth="lg">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center text-midnight-indigo"
          onClick={() => navigate('/bridge-the-gap/categories')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to categories
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="font-cormorant text-3xl md:text-5xl font-semibold text-[#162137] mb-4">
            Feeling Dismissed
          </h1>
          <p className="text-midnight-indigo/70 text-lg max-w-2xl mx-auto">
            Pick the area where things feel hardest right now.
          </p>
        </div>
      </ContentContainer>
    </div>
  );
};

export default FeelingDismissedSubcategoriesHeader;
