
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import { CommonPattern } from './types';
import PatternIntroScreen from './components/PatternIntroScreen';
import PatternList from './components/PatternList';
import PatternDetailScreen from './components/PatternDetailScreen';
import PatternRepairScreen from './components/PatternRepairScreen';

interface PatternRecognitionFlowProps {
  fullScreen?: boolean;
  onClose?: () => void;
}

const PatternRecognitionFlow: React.FC<PatternRecognitionFlowProps> = ({ fullScreen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'list' | 'detail' | 'repair'>('intro');
  const [selectedPattern, setSelectedPattern] = useState<CommonPattern | null>(null);
  const { sessionData } = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Prevent scrolling to top when changing steps
  const handleStepChange = (step: 'intro' | 'list' | 'detail' | 'repair') => {
    // Save current scroll position
    const currentScrollPos = window.scrollY;
    
    // Update the step
    setCurrentStep(step);
    
    // Use setTimeout to allow the component to render before scrolling
    setTimeout(() => {
      window.scrollTo(0, currentScrollPos);
    }, 0);
  };
  
  const handlePatternSelect = (pattern: CommonPattern) => {
    setSelectedPattern(pattern);
    handleStepChange('detail');
  };
  
  const handleGoToRepair = () => {
    if (selectedPattern) {
      handleStepChange('repair');
    }
  };
  
  const handleBackToList = () => {
    handleStepChange('list');
    setSelectedPattern(null);
  };
  
  const handleBackToDetail = () => {
    handleStepChange('detail');
  };
  
  const handleStartOver = () => {
    handleStepChange('intro');
    setSelectedPattern(null);
  };
  
  const handleGoToPatternList = () => {
    handleStepChange('list');
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        {currentStep !== 'intro' && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => {
              if (currentStep === 'list') handleStartOver();
              else if (currentStep === 'detail') handleBackToList();
              else if (currentStep === 'repair') handleBackToDetail();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        
        {fullScreen && (
          <Button
            variant="ghost"
            className="mb-4 ml-auto"
            onClick={handleClose}
          >
            Close
          </Button>
        )}
        
        {currentStep === 'intro' && (
          <PatternIntroScreen onContinue={handleGoToPatternList} />
        )}
        
        {currentStep === 'list' && (
          <PatternList onPatternSelect={handlePatternSelect} />
        )}
        
        {currentStep === 'detail' && selectedPattern && (
          <PatternDetailScreen 
            pattern={selectedPattern} 
            onContinue={handleGoToRepair} 
          />
        )}
        
        {currentStep === 'repair' && selectedPattern && (
          <PatternRepairScreen 
            pattern={selectedPattern}
            onContinue={handleStartOver}
          />
        )}
      </div>
    </div>
  );
};

export default PatternRecognitionFlow;
