
import React from 'react';
import { Button } from "@/components/ui/button";
import BrandSection from '../common/BrandSection';

const CallToAction = () => {
  return (
    <BrandSection 
      className="bg-midnight-indigo text-white"
      title="Start Healing Today"
      subtitle="Every relationship faces challenges. Take the first step toward healthier conflict resolution and deeper connection."
      darkBackground={true}
    >
      <div className="text-center">
        <Button 
          size="lg" 
          className="bg-rosewood-tint hover:bg-rose-600 text-white px-8 mt-4"
        >
          Begin Your Journey
        </Button>
      </div>
    </BrandSection>
  );
};

export default CallToAction;
