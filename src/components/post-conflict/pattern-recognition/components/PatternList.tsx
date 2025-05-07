
import React from 'react';
import { CommonPattern } from '../types';
import { PatternId } from '../hooks/usePatternRecognition';
import { ArrowRight } from 'lucide-react';

interface PatternListProps {
  patterns: CommonPattern[];
  onPatternSelect: (patternId: PatternId) => void;
}

const PatternList: React.FC<PatternListProps> = ({ patterns, onPatternSelect }) => {
  return (
    <div className="bg-[#F5F0E8] p-4 md:p-6 rounded-lg">
      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-[#14213d] mb-3 text-center">
          Which pattern sounds familiar?
        </h2>
        
        <p className="text-[#14213d] text-md md:text-lg max-w-xl text-center mb-6">
          These common loops show up in many couples. Tap one to explore how it plays out—and how to break it.
        </p>

        <div className="w-full max-w-md space-y-2">
          {/* Pattern Cards */}
          <PatternCard 
            icon="🔄" 
            title="Blame / Defend / Withdraw"
            description="You feel blamed, so you shut down. They get louder. Repeat."
            onClick={() => onPatternSelect("1")}
          />
          
          <PatternCard 
            icon="👫" 
            title="Pursue / Distance"
            description="One of you chases connection. The other pulls away."
            onClick={() => onPatternSelect("2")}
          />
          
          <PatternCard 
            icon="⚡" 
            title="Silent Tension > Snap > Shame"
            description="It builds up... until it bursts."
            onClick={() => onPatternSelect("3")}
          />
          
          <PatternCard 
            icon="🔊" 
            title="Criticize / Control"
            description="Everything feels like a correction."
            onClick={() => onPatternSelect("4")}
          />
          
          <PatternCard 
            icon="🧩" 
            title="Fix It / Reject It"
            description="One wants to solve. The other isn't ready."
            onClick={() => onPatternSelect("5")}
          />
        </div>
      </div>
    </div>
  );
};

// Pattern card component - make skinnier with smaller text
const PatternCard = ({ 
  icon, 
  title, 
  description, 
  onClick 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  onClick: () => void;
}) => {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-white rounded-xl p-2.5 flex items-center justify-between border border-gray-100 shadow-sm hover:shadow transition-shadow"
    >
      <div className="flex items-center gap-2">
        <div className="text-[#E9B872] text-xl min-w-8 flex items-center justify-center">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="text-sm font-medium text-[#14213d]">{title}</h3>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
      <ArrowRight className="text-gray-400 h-4 w-4" />
    </button>
  );
};

export default PatternList;
