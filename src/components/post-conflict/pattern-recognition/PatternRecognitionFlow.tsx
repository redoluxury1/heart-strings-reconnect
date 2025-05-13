
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import { CommonPattern, PatternType } from './types';
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
  
  const handlePatternSelect = (pattern: CommonPattern) => {
    setSelectedPattern(pattern);
    setCurrentStep('detail');
  };
  
  const handleGoToRepair = () => {
    if (selectedPattern) {
      setCurrentStep('repair');
    }
  };
  
  const handleBackToList = () => {
    setCurrentStep('list');
    setSelectedPattern(null);
  };
  
  const handleBackToDetail = () => {
    setCurrentStep('detail');
  };
  
  const handleStartOver = () => {
    setCurrentStep('intro');
    setSelectedPattern(null);
  };
  
  const handleGoToPatternList = () => {
    setCurrentStep('list');
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
          <PatternList onSelectPattern={handlePatternSelect} />
        )}
        
        {currentStep === 'detail' && selectedPattern && (
          <PatternDetailScreen 
            pattern={selectedPattern} 
            onContinueToRepair={handleGoToRepair} 
          />
        )}
        
        {currentStep === 'repair' && selectedPattern && (
          <PatternRepairScreen 
            pattern={selectedPattern}
            onFinish={handleStartOver}
          />
        )}
      </div>
    </div>
  );
};

export default PatternRecognitionFlow;
