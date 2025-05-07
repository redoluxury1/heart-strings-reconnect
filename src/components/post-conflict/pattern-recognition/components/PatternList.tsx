
import React from 'react';
import { CommonPattern } from '../types';
import { PatternId } from '../hooks/usePatternRecognition';
import { ArrowRight, RefreshCw, Users, Zap, Volume2, Puzzle } from 'lucide-react';

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
            IconComponent={RefreshCw}
            iconColor="#E69999" 
            title="Blame / Defend / Withdraw"
            description="You feel blamed, so you shut down. They get louder. Repeat."
            onClick={() => onPatternSelect("1")}
          />
          
          <PatternCard 
            IconComponent={Users}
            iconColor="#4A448C" 
            title="Pursue / Distance"
            description="One of you chases connection. The other pulls away."
            onClick={() => onPatternSelect("2")}
          />
          
          <PatternCard 
            IconComponent={Zap}
            iconColor="#E5C158" 
            title="Silent Tension > Snap > Shame"
            description="It builds up... until it bursts."
            onClick={() => onPatternSelect("3")}
          />
          
          <PatternCard 
            IconComponent={Volume2}
            iconColor="#4A448C" 
            title="Criticize / Control"
            description="Everything feels like a correction."
            onClick={() => onPatternSelect("4")}
          />
          
          <PatternCard 
            IconComponent={Puzzle}
            iconColor="#E69999" 
            title="Fix It / Reject It"
            description="One wants to solve. The other isn't ready."
            onClick={() => onPatternSelect("5")}
          />
        </div>
      </div>
    </div>
  );
};

// Pattern card component with Lucide icons instead of emojis
const PatternCard = ({ 
  IconComponent, 
  iconColor,
  title, 
  description, 
  onClick 
}: { 
  IconComponent: React.ElementType;
  iconColor: string;
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
        <div className="min-w-8 flex items-center justify-center">
          <IconComponent color={iconColor} size={20} strokeWidth={1.5} />
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
