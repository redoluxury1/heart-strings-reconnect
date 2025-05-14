
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Gavel, Moon, UserRound, Scale, AlertCircle, Users
} from 'lucide-react';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Subcategory type definition
interface Subcategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const ParentingSubcategories: React.FC = () => {
  const navigate = useNavigate();

  // Define subcategories with their icons and colors
  const subcategories: Subcategory[] = [
    {
      id: 'discipline-styles',
      name: 'Discipline Styles',
      icon: <Gavel className="h-12 w-12" />,
      color: 'text-peachy-terracotta',
      bgColor: 'bg-peachy-terracotta/10'
    },
    {
      id: 'nighttime-duties',
      name: 'Nighttime Duties',
      icon: <Moon className="h-12 w-12" />,
      color: 'text-lavender-blue',
      bgColor: 'bg-lavender-blue/10'
    },
    {
      id: 'feeling-unsupported',
      name: 'Feeling Unsupported',
      icon: <UserRound className="h-12 w-12" />,
      color: 'text-mauve-rose',
      bgColor: 'bg-mauve-rose/10'
    },
    {
      id: 'division-of-labor',
      name: 'Division of Labor',
      icon: <Scale className="h-12 w-12" />,
      color: 'text-sage',
      bgColor: 'bg-sage/10'
    },
    {
      id: 'overwhelm',
      name: 'Overwhelm',
      icon: <AlertCircle className="h-12 w-12" />,
      color: 'text-golden-mustard',
      bgColor: 'bg-golden-mustard/10'
    },
    {
      id: 'different-parenting-approaches',
      name: 'Different Parenting Approaches',
      icon: <Users className="h-12 w-12" />,
      color: 'text-midnight-indigo',
      bgColor: 'bg-midnight-indigo/10'
    }
  ];

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/bridge-the-gap/categories/parenting/${subcategoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16">
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
                Parenting
              </h1>
              <h2 className="font-inter text-base md:text-lg text-midnight-indigo/70">
                Pick the area where things feel hardest right now.
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                >
                  <div className={`flex items-center justify-center rounded-full p-4 ${subcategory.bgColor} ${subcategory.color} mb-3`}>
                    {subcategory.icon}
                  </div>
                  <span className="font-cormorant font-medium text-lg text-midnight-indigo text-center">
                    {subcategory.name}
                  </span>
                </button>
              ))}
            </div>
          </ContentContainer>
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default ParentingSubcategories;
