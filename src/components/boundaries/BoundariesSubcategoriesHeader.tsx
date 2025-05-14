
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BoundariesSubcategoriesHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-midnight-indigo"
        onClick={() => navigate('/bridge-the-gap/categories')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to categories
      </Button>
      
      <div className="text-center">
        <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
          Boundaries
        </h1>
        <p className="text-midnight-indigo/70 text-lg">
          Pick the area where things feel hardest right now.
        </p>
      </div>
    </div>
  );
};

export default BoundariesSubcategoriesHeader;
