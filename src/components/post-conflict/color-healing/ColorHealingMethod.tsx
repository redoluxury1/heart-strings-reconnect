
import React, { useState, useEffect } from 'react';
import IntroScreen from './IntroScreen';
import ColorSelectionScreen from './ColorSelectionScreen';
import VisualizationScreen from './VisualizationScreen';
import BreathingGuideScreen from './BreathingGuideScreen';
import ColorExpansionScreen from './ColorExpansionScreen';
import ReflectionScreen from './ReflectionScreen';
import { Card } from '@/components/ui/card';

const ColorHealingMethod: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('#7D5248'); // Default to the warm brown color
  const [reflectionResult, setReflectionResult] = useState<string | null>(null);

  // Total number of screens in the flow
  const totalScreens = 6;

  // Scroll to top when screen changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleNext = () => {
    if (currentScreen < totalScreens - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleRestart = () => {
    setCurrentScreen(0);
    setSelectedColor('#7D5248');
    setReflectionResult(null);
  };

  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
  };

  const handleReflectionSelection = (feeling: string) => {
    setReflectionResult(feeling);
  };

  // Render the appropriate screen based on currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return <IntroScreen onBegin={handleNext} />;
      case 1:
        return <ColorSelectionScreen 
                selectedColor={selectedColor}
                onColorSelect={handleColorSelection}
                onContinue={handleNext}
                onBack={handleBack}
              />;
      case 2:
        return <VisualizationScreen 
                selectedColor={selectedColor} 
                onContinue={handleNext}
                onBack={handleBack}
              />;
      case 3:
        return <BreathingGuideScreen 
                selectedColor={selectedColor} 
                onContinue={handleNext}
                onBack={handleBack}
              />;
      case 4:
        return <ColorExpansionScreen 
                selectedColor={selectedColor} 
                onContinue={handleNext}
                onBack={handleBack}
              />;
      case 5:
        return <ReflectionScreen 
                selectedColor={selectedColor}
                onSelection={handleReflectionSelection} 
                onFinish={handleRestart}
                onBack={handleBack}
              />;
      default:
        return <IntroScreen onBegin={handleNext} />;
    }
  };

  return (
    <Card className="border-none rounded-xl shadow-md overflow-hidden mb-12">
      <div className="p-8 lg:p-12 bg-[#F8EFE0]">
        {renderScreen()}
      </div>
    </Card>
  );
};

export default ColorHealingMethod;
