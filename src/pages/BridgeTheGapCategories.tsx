
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Baby, Heart, MessageSquare, Trash2, DollarSign, 
  Hand, Users, Octagon, Eye, ArrowLeft
} from 'lucide-react';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

// Category type definition
interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  isWide?: boolean;
}

const BridgeTheGapCategories: React.FC = () => {
  const navigate = useNavigate();

  // Define categories with their icons and colors using brand colors
  // Navy: #162137 (midnight-indigo)
  // Terracotta: #D3876A (peachy-terracotta)
  // Mauve: #9b87f5 (lavender-blue/primary purple)
  // Deep Plum: #5D3A5A (deep plum)
  
  const categories: Category[] = [
    {
      id: 'parenting',
      name: 'Parenting',
      icon: <Baby className="h-12 w-12" />, 
      color: 'text-[#D3876A]', // Terracotta
    },
    {
      id: 'intimacy',
      name: 'Intimacy',
      icon: <Heart className="h-12 w-12" />,
      color: 'text-[#5D3A5A]', // Deep Plum
    },
    {
      id: 'household-duties',
      name: 'Household Duties',
      icon: <Trash2 className="h-12 w-12" />,
      color: 'text-[#9b87f5]', // Mauve
    },
    {
      id: 'money',
      name: 'Money',
      icon: <DollarSign className="h-12 w-12" />,
      color: 'text-[#D3876A]', // Terracotta
    },
    {
      id: 'feeling-dismissed',
      name: 'Feeling Dismissed',
      icon: <Hand className="h-12 w-12" />,
      color: 'text-[#162137]', // Navy/Midnight Indigo
    },
    {
      id: 'in-laws',
      name: 'In-Laws',
      icon: <Users className="h-12 w-12" />,
      color: 'text-[#9b87f5]', // Mauve
    },
    {
      id: 'feeling-unseen',
      name: 'Feeling Unseen',
      icon: <Eye className="h-12 w-12" />,
      color: 'text-[#5D3A5A]', // Deep Plum
    },
    {
      id: 'boundaries',
      name: 'Boundaries',
      icon: <Octagon className="h-12 w-12" />,
      color: 'text-[#D3876A]', // Terracotta
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: <MessageSquare className="h-12 w-12" />,
      color: 'text-[#9b87f5]', // Mauve
      isWide: true // This item will be wider on mobile
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/bridge-the-gap/categories/${categoryId}`);
  };
  
  const handleBackClick = () => {
    navigate('/post-conflict');
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <ContentContainer maxWidth="xl">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center text-midnight-indigo"
              onClick={handleBackClick}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Post-Conflict
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
                What are you stuck on?
              </h1>
              <h2 className="font-inter text-base md:text-lg text-midnight-indigo/70">
                Pick a category that fits your current challenge.
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 ${
                    category.isWide ? 'col-span-2 md:col-span-1' : ''
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className={`${category.color} mb-3`}>
                    {category.icon}
                  </div>
                  <span className="font-cormorant font-medium text-lg text-midnight-indigo">
                    {category.name}
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

export default BridgeTheGapCategories;
