
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, MessageCircle, BrainCircuit, Flag } from 'lucide-react';

interface OnboardingFeaturesProps {
  onContinue: () => void;
}

const OnboardingFeatures: React.FC<OnboardingFeaturesProps> = ({ onContinue }) => {
  const handleClick = () => {
    console.log("Start Exploring button clicked");
    onContinue();
  };

  return (
    <div className="text-center space-y-8">
      <h2 className="text-2xl font-semibold mb-2">Welcome to Bridge for Couples</h2>
      <p className="text-gray-600 mb-6">Discover the key features that will help strengthen your relationship</p>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4 text-left">
          <div className="bg-[#F8F2F0] p-3 rounded-full">
            <Heart className="text-[#D36B4B] h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Connection Tools</h3>
            <p className="text-sm text-gray-600">Daily questions and activities to deepen your bond</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-left">
          <div className="bg-[#F8F2F0] p-3 rounded-full">
            <MessageCircle className="text-[#1E2A38] h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Better Communication</h3>
            <p className="text-sm text-gray-600">Tools to help you express yourself clearly and listen better</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-left">
          <div className="bg-[#F8F2F0] p-3 rounded-full">
            <BrainCircuit className="text-[#D36B4B] h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Conflict Resolution</h3>
            <p className="text-sm text-gray-600">Techniques to navigate disagreements with understanding</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-left">
          <div className="bg-[#F8F2F0] p-3 rounded-full">
            <Flag className="text-[#1E2A38] h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Growth Tracking</h3>
            <p className="text-sm text-gray-600">Celebrate your progress and identify areas to improve</p>
          </div>
        </div>
      </div>
      
      <div className="pt-6">
        <Button 
          onClick={handleClick} 
          className="w-full rounded-full bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white"
        >
          Start Exploring
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingFeatures;
