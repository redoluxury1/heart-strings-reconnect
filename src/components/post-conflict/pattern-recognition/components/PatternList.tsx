
import React from 'react';
import { CommonPattern } from '../types';
import { PatternId } from '../hooks/usePatternRecognition';
import { Button } from '@/components/ui/button';

interface PatternListProps {
  patterns: CommonPattern[];
  onPatternSelect: (patternId: PatternId) => void;
}

const PatternList: React.FC<PatternListProps> = ({ patterns, onPatternSelect }) => {
  return (
    <div className="bg-[#F5F0E8] p-4 rounded-lg">
      <div className="flex flex-col items-center justify-center mb-8 mt-4">
        <div className="relative w-full max-w-md">
          <svg viewBox="0 0 500 500" className="w-full h-auto">
            {/* Circular arrow */}
            <path 
              d="M 250,120 C 350,120 400,200 400,250 C 400,350 350,400 250,400 C 150,400 100,350 100,250 C 100,200 150,120 250,120" 
              fill="none" 
              stroke="#E69999" 
              strokeWidth="8" 
            />
            
            {/* Frustrated Node */}
            <g transform="translate(250, 100)">
              <circle cx="0" cy="0" r="30" fill="#E69999" />
              <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fill="#14213d" fontSize="14" fontWeight="bold">😠</text>
            </g>
            <text x="250" y="70" textAnchor="middle" fill="#14213d" fontFamily="Inter" fontWeight="bold" fontSize="24">Frustrated</text>
            
            {/* React Node */}
            <g transform="translate(400, 250)">
              <path d="M-15,-30 L 15,0 L-15,30 Z" fill="#E69999" />
            </g>
            <text x="400" y="290" textAnchor="middle" fill="#14213d" fontFamily="Inter" fontWeight="bold" fontSize="24">React</text>
            
            {/* Hurt Node */}
            <g transform="translate(250, 400)">
              <circle cx="0" cy="0" r="30" fill="#E69999" />
              <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fill="#14213d" fontSize="14" fontWeight="bold">😔</text>
            </g>
            <text x="250" y="450" textAnchor="middle" fill="#14213d" fontFamily="Inter" fontWeight="bold" fontSize="24">Hurt</text>
            
            {/* Distance Node */}
            <g transform="translate(100, 250)">
              <image href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCwgMTApIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNFNjk5OTkiLz48dGV4dCB4PSIyMCIgeT0iMjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiMxNDIxM2QiIGZvbnQtc2l6ZT0iMTAiPvCfmILwn5iB4oCN4pmC77iP</dGV4dD48L2c+PC9zdmc+" width="60" height="60" x="-30" y="-30" />
            </g>
            <text x="100" y="290" textAnchor="middle" fill="#14213d" fontFamily="Inter" fontWeight="bold" fontSize="24">Distance</text>
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-cormorant font-medium text-midnight-indigo my-6">
          Does this feel familiar?
        </h2>
        
        <p className="text-midnight-indigo text-lg md:text-xl max-w-2xl text-center mb-6">
          Most couples fall into the same pattern again and again. It usually starts small—then spirals. 
          Let's slow it down and catch the steps.
        </p>

        <Button 
          className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-6 px-8 rounded-full text-xl w-full max-w-md"
          onClick={() => onPatternSelect("1")}
        >
          See Common Patterns
        </Button>
      </div>
    </div>
  );
};

export default PatternList;
