
import React, { useState, useEffect } from 'react';
import { 
  CirclePlay, 
  Film, 
  Pizza, 
  Moon, 
  Paintbrush, 
  Heart, 
  Home, 
  MapPin, 
  Mountain, 
  Sun, 
  Music, 
  Eye, 
  Coffee, 
  Utensils, 
  Star, 
  MessageCircle, 
  Calendar,
  Book,
  ShoppingBag,
  Gift,
  Camera,
  Clock,
  HandHelping,
  Wine,
  PaintRoller
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { getDateIdeasByCategory } from './dateIdeasData';
import DateIdeaCard from './DateIdeaCard';
import CategoryFilter from './CategoryFilter';
import { DateIdea, Category } from '@/types/date-wheel';

const DateWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedIdea, setSelectedIdea] = useState<DateIdea | null>(null);
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>([]);
  
  // Get wheel segments based on current category filter
  useEffect(() => {
    setDateIdeas(getDateIdeasByCategory(selectedCategory));
  }, [selectedCategory]);
  
  const handleSpin = () => {
    if (isSpinning) return;
    
    // Hide any previously selected idea
    setSelectedIdea(null);
    
    // Set spinning state
    setIsSpinning(true);
    
    // Calculate a random rotation (between 2 and 5 full rotations + random segment)
    const spinRotations = Math.floor(Math.random() * 3) + 2; // 2-4 full rotations
    const extraAngle = Math.floor(Math.random() * 360); // Random angle
    const totalRotation = spinRotations * 360 + extraAngle;
    
    // Update rotation state to trigger animation
    setRotation(prevRotation => prevRotation + totalRotation);
    
    // Calculate which segment will be selected
    const segmentSize = 360 / dateIdeas.length;
    const normalizedExtraAngle = extraAngle % 360;
    const selectedIndex = Math.floor(normalizedExtraAngle / segmentSize);
    
    // After animation completes, show the selected idea
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedIdea(dateIdeas[dateIdeas.length - 1 - selectedIndex]);
    }, 3000); // Match duration of the animation
  };
  
  const handleFilterChange = (category: Category) => {
    setSelectedCategory(category);
    setSelectedIdea(null);
  };
  
  const handleSaveIdea = () => {
    if (selectedIdea) {
      toast({
        title: "Date idea saved!",
        description: "Check your saved ideas in your profile.",
        duration: 3000
      });
    }
  };

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':
        return <Film className="h-6 w-6 text-midnight-indigo" />;
      case 'Pizza':
        return <Pizza className="h-6 w-6 text-midnight-indigo" />;
      case 'Moon':
        return <Moon className="h-6 w-6 text-midnight-indigo" />;
      case 'Paintbrush':
        return <Paintbrush className="h-6 w-6 text-midnight-indigo" />;
      case 'MapPin':
        return <MapPin className="h-6 w-6 text-midnight-indigo" />;
      case 'Sun':
        return <Sun className="h-6 w-6 text-midnight-indigo" />;
      case 'Heart':
        return <Heart className="h-6 w-6 text-midnight-indigo" />;
      case 'Mountain':
        return <Mountain className="h-6 w-6 text-midnight-indigo" />;
      case 'Home':
        return <Home className="h-6 w-6 text-midnight-indigo" />;
      case 'Music':
        return <Music className="h-6 w-6 text-midnight-indigo" />;
      case 'Eye':
        return <Eye className="h-6 w-6 text-midnight-indigo" />;
      case 'Coffee':
        return <Coffee className="h-6 w-6 text-midnight-indigo" />;
      case 'Utensils':
        return <Utensils className="h-6 w-6 text-midnight-indigo" />;
      case 'Star':
        return <Star className="h-6 w-6 text-midnight-indigo" />;
      case 'MessageCircle':
        return <MessageCircle className="h-6 w-6 text-midnight-indigo" />;
      case 'Calendar':
        return <Calendar className="h-6 w-6 text-midnight-indigo" />;
      case 'Book':
        return <Book className="h-6 w-6 text-midnight-indigo" />;
      case 'ShoppingBag':
        return <ShoppingBag className="h-6 w-6 text-midnight-indigo" />;
      case 'Gift':
        return <Gift className="h-6 w-6 text-midnight-indigo" />;
      case 'Camera':
        return <Camera className="h-6 w-6 text-midnight-indigo" />;
      case 'Clock':
        return <Clock className="h-6 w-6 text-midnight-indigo" />;
      case 'HandHelping':
        return <HandHelping className="h-6 w-6 text-midnight-indigo" />;
      case 'Wine':
        return <Wine className="h-6 w-6 text-midnight-indigo" />;
      case 'PaintRoller':
        return <PaintRoller className="h-6 w-6 text-midnight-indigo" />;
      default:
        return <Heart className="h-6 w-6 text-midnight-indigo" />;
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-midnight-indigo text-center mb-3">
        Spin for a Surprise Date Night
      </h2>
      
      <p className="text-center text-gray-600 mb-6">
        No overthinking. No planning. Just spin and go.
      </p>
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleFilterChange}
      />
      
      {!selectedIdea ? (
        <div className="relative w-full max-w-md aspect-square my-8">
          {/* Wheel Background */}
          <div className="absolute inset-0 rounded-full bg-white shadow-md border-2 border-lavender-blue/20"></div>
          
          {/* Spinning Wheel */}
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            animate={{ rotate: rotation }}
            transition={{ duration: 3, type: "spring", damping: 30 }}
          >
            {dateIdeas.map((idea, index) => {
              const segmentSize = 360 / dateIdeas.length;
              const startAngle = index * segmentSize;
              const endAngle = (index + 1) * segmentSize;
              
              // Calculate segment background color based on pattern
              const segmentColors = [
                "from-[#FFDEE2] to-[#FFDEE2]/70", // Soft Pink
                "from-[#E5DEFF] to-[#E5DEFF]/70", // Soft Purple
                "from-[#FDE1D3] to-[#FDE1D3]/70", // Soft Peach
                "from-[#D3E4FD] to-[#D3E4FD]/70", // Soft Blue
                "from-[#F1F0FB] to-[#F1F0FB]/70", // Soft Gray
              ];
              const colorIndex = index % segmentColors.length;
              
              return (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 origin-bottom-left bg-gradient-to-br",
                    segmentColors[colorIndex]
                  )}
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(startAngle * Math.PI / 180)}% ${50 + 50 * Math.sin(startAngle * Math.PI / 180)}%, ${50 + 50 * Math.cos(endAngle * Math.PI / 180)}% ${50 + 50 * Math.sin(endAngle * Math.PI / 180)}%)`
                  }}
                >
                  <div 
                    className="absolute"
                    style={{
                      top: `${50 + 35 * Math.sin((startAngle + segmentSize / 2) * Math.PI / 180)}%`,
                      left: `${50 + 35 * Math.cos((startAngle + segmentSize / 2) * Math.PI / 180)}%`,
                      transform: 'translate(-50%, -50%) rotate(90deg)',
                    }}
                  >
                    {renderIcon(idea.icon)}
                  </div>
                </div>
              );
            })}
          </motion.div>
          
          {/* Center Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
              "w-24 h-24 rounded-full bg-gradient-to-br from-midnight-indigo to-midnight-indigo/80",
              "flex items-center justify-center text-white shadow-lg",
              "transition-transform hover:scale-105 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-lavender-blue",
              "disabled:opacity-70 z-10"
            )}
          >
            <div className="flex flex-col items-center">
              <CirclePlay className="h-8 w-8 mb-1" />
              <span className="text-xs font-medium">Spin</span>
            </div>
          </button>
          
          {/* Pointer indicator */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-midnight-indigo mx-auto"></div>
          </div>
        </div>
      ) : (
        <DateIdeaCard 
          dateIdea={selectedIdea}
          onSave={handleSaveIdea}
          onTryAgain={handleSpin}
        />
      )}
    </div>
  );
};

export default DateWheel;
