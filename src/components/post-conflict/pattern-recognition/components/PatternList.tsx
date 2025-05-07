
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CommonPattern } from '../types';

interface PatternListProps {
  patterns: CommonPattern[];
  onPatternSelect: (patternId: string) => void;
}

const PatternIcons: Record<string, React.ReactNode> = {
  'criticism-defensiveness': (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
          stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V12" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16H12.01" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  'pursue-distance': (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" 
          stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" 
          stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" 
          stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" 
          stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  'silent-tension-snap': (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  'criticize-control': (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" 
          stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#D97706"/>
        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" 
          stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#D97706"/>
        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" 
          stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#D97706"/>
      </svg>
    </div>
  ),
  'fix-reject': (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
};

const PatternList: React.FC<PatternListProps> = ({ patterns, onPatternSelect }) => {
  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-cormorant font-medium text-[#14213d] mb-4">
          Which pattern sounds like your relationship?
        </h1>
        <p className="text-lg text-[#14213d]/80 mb-6">
          These common loops show up in many couples. Tap one to explore how it plays out—and how to break it.
        </p>
      </div>
      
      <div className="space-y-4">
        {patterns.map(pattern => (
          <button 
            key={pattern.id} 
            className="w-full p-4 bg-white hover:bg-[#f9f4e8] border border-gray-200 rounded-xl flex items-center transition-colors duration-200 shadow-sm hover:shadow-md"
            onClick={() => onPatternSelect(pattern.id.toString())}
          >
            {/* Icon on the left */}
            {PatternIcons[pattern.patternType]}
            
            {/* Text content in the middle */}
            <div className="flex-1 text-left ml-4">
              <h3 className="text-xl font-cormorant font-semibold text-[#14213d]">{pattern.name}</h3>
              <p className="text-[#14213d]/80">{pattern.description}</p>
            </div>
            
            {/* Chevron on the right */}
            <ChevronRight className="h-6 w-6 text-[#14213d]/60 flex-shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatternList;
