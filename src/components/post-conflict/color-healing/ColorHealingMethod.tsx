
import React, { useState } from 'react';
import IntroScreen from './IntroScreen';
import ColorSelectionScreen from './ColorSelectionScreen';
import VisualizationScreen from './VisualizationScreen';
import BreathingGuideScreen from './BreathingGuideScreen';
import ColorExpansionScreen from './ColorExpansionScreen';
import ReflectionScreen from './ReflectionScreen';

const ColorHealingMethod: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('#7d6272'); // Default to mauve color
  const [reflectionResult, setReflectionResult] = useState<string | null>(null);

  // Total number of screens in the flow
  const totalScreens = 6;

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
    setSelectedColor('#7d6272');
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
    <div className="bg-soft-cream/40 rounded-xl shadow-md p-6 md:p-8 mb-12 overflow-hidden">
      {renderScreen()}
    </div>
  );
};

export default ColorHealingMethod;
