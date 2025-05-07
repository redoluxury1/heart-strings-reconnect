
import React from 'react';
import OrbVisualization from './visualization/OrbVisualization';
import VisualizationControls from './visualization/VisualizationControls';
import VisualizationInstructions from './visualization/VisualizationInstructions';
import useVisualization from './hooks/useVisualization';

interface VisualizationScreenProps {
  selectedColor: string;
  onContinue: () => void;
  onBack: () => void;
}

const VisualizationScreen: React.FC<VisualizationScreenProps> = ({ 
  selectedColor,
  onContinue,
  onBack
}) => {
  const { fadeIn, showButtons } = useVisualization();
  
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center">
      <VisualizationInstructions />
      
      <OrbVisualization 
        selectedColor={selectedColor} 
        fadeIn={fadeIn} 
        showButtons={showButtons} 
      />
      
      <VisualizationControls 
        showButtons={showButtons} 
        onContinue={onContinue} 
        onBack={onBack} 
      />
    </div>
  );
};

export default VisualizationScreen;
