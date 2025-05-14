
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Baby, Heart, MessageSquare, Trash2, DollarSign, 
  Hand, Users, Octagon, User 
} from 'lucide-react';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Category type definition
interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  isWide?: boolean;
}

const BridgeTheGapCategories: React.FC = () => {
  const navigate = useNavigate();

  // Define categories with their icons and colors
  const categories: Category[] = [
    {
      id: 'parenting',
      name: 'Parenting',
      icon: <Baby className="h-12 w-12" />, 
      color: 'text-sage',
      bgColor: 'bg-sage/10'
    },
    {
      id: 'intimacy',
      name: 'Intimacy',
      icon: <Heart className="h-12 w-12" />,
      color: 'text-mauve-rose',
      bgColor: 'bg-mauve-rose/10'
    },
    {
      id: 'household-duties',
      name: 'Household Duties',
      icon: <Trash2 className="h-12 w-12" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-600/10'
    },
    {
      id: 'money',
      name: 'Money',
      icon: <DollarSign className="h-12 w-12" />,
      color: 'text-sage',
      bgColor: 'bg-sage/10'
    },
    {
      id: 'feeling-dismissed',
      name: 'Feeling Dismissed',
      icon: <Hand className="h-12 w-12" />,
      color: 'text-peachy-terracotta',
      bgColor: 'bg-peachy-terracotta/10'
    },
    {
      id: 'in-laws',
      name: 'In-Laws',
      icon: <Users className="h-12 w-12" />,
      color: 'text-midnight-indigo',
      bgColor: 'bg-midnight-indigo/10'
    },
    {
      id: 'boundaries',
      name: 'Boundaries',
      icon: <Octagon className="h-12 w-12" />,
      color: 'text-golden-mustard',
      bgColor: 'bg-golden-mustard/10'
    },
    {
      id: 'feeling-unseen',
      name: 'Feeling Unseen',
      icon: <User className="h-12 w-12" />,
      color: 'text-lavender-blue',
      bgColor: 'bg-lavender-blue/10'
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: <MessageSquare className="h-12 w-12" />,
      color: 'text-midnight-indigo',
      bgColor: 'bg-midnight-indigo/10',
      isWide: true // This item will be wider on mobile
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/bridge-the-gap/categories/${categoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16" showLogo={false}>
          <ContentContainer maxWidth="xl">
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
                  <div className={`flex items-center justify-center rounded-full p-4 ${category.bgColor} ${category.color} mb-3`}>
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
