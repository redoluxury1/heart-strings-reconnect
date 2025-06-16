
import { useState, useEffect } from 'react';
import { DateIdea, Category } from '@/types/date-wheel';
import { getDateIdeasByCategory } from '../dateIdeasData';
import { toast } from '@/hooks/use-toast';

export const useWheelLogic = () => {
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

  return {
    isSpinning,
    rotation,
    selectedCategory,
    selectedIdea,
    dateIdeas,
    handleSpin,
    handleFilterChange,
    handleSaveIdea
  };
};
