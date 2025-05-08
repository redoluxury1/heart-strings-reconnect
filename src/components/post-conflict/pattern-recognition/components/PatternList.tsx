
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CommonPattern } from '../types';

interface PatternListProps {
  patterns: CommonPattern[];
  onPatternSelect: (patternId: string) => void;
}

// Custom SVG icons for each pattern type
const PatternIcons: Record<string, React.ReactNode> = {
  'criticism-defensiveness': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="#E9A875" strokeWidth="2"/>
      <path d="M16 24C20 19 28 19 32 24" stroke="#E9A875" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 30C20 35 28 35 32 30" stroke="#E9A875" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2"/>
    </svg>
  ),
  'pursue-distance': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 30C16 24.4772 20.4772 20 26 20C31.5228 20 36 24.4772 36 30" stroke="#E9A875" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 15L32 24" stroke="#E9A875" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 30L20 21" stroke="#E9A875" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 25L20 21L24 25" stroke="#E9A875" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36 20L32 24L28 20" stroke="#E9A875" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'silent-tension-snap': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16L14 28H22L20 36L28 24H20L22 16Z" stroke="#E9A875" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'criticize-control': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 17C20 15.3431 21.3431 14 23 14H25C26.6569 14 28 15.3431 28 17V19C28 20.6569 26.6569 22 25 22H23C21.3431 22 20 20.6569 20 19V17Z" stroke="#E9A875" strokeWidth="2"/>
      <path d="M24 22V32" stroke="#E9A875" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 32H30" stroke="#E9A875" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'fix-reject': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 18L24 14L32 18" stroke="#E9A875" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 24L24 20L32 24" stroke="#E9A875" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 30L24 26L32 30" stroke="#E9A875" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 34L24 30L32 34" stroke="#E9A875" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// Friendly pattern names for display
const friendlyPatternNames: Record<string, string> = {
  'criticism-defensiveness': 'Blame / Defend / Withdraw',
  'pursue-distance': 'Pursue / Distance',
  'silent-tension-snap': 'Silent Tension > Snap > Shame',
  'criticize-control': 'Criticize / Control',
  'fix-reject': 'Fix It / Reject It',
};

// More conversational descriptions
const friendlyDescriptions: Record<string, string> = {
  'criticism-defensiveness': 'You feel blamed, so you shut down. They get louder. Repeat.',
  'pursue-distance': 'One of you chases connection. The other pulls away.',
  'silent-tension-snap': 'It builds up... until it bursts.',
  'criticize-control': 'Everything feels like a correction.',
  'fix-reject': 'One wants to solve. The other isn't ready.',
};

const PatternList: React.FC<PatternListProps> = ({ patterns, onPatternSelect }) => {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-cormorant font-bold text-[#14213d] mb-5">
          Which pattern sounds like your relationship?
        </h1>
        <p className="text-lg text-[#14213d]/80 mb-2 max-w-lg mx-auto leading-relaxed">
          These common loops show up in many couples. 
          Tap one to explore how it plays out—and how to break it.
        </p>
      </div>
      
      <div className="space-y-3">
        {patterns.map(pattern => (
          <button 
            key={pattern.id} 
            className="w-full p-4 bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl flex items-center transition-colors duration-200 shadow-sm hover:shadow"
            onClick={() => onPatternSelect(pattern.id.toString())}
          >
            {/* Icon on the left */}
            <div className="flex-shrink-0 mr-3 text-[#E9A875]">
              {PatternIcons[pattern.patternType]}
            </div>
            
            {/* Text content in the middle */}
            <div className="flex-1 text-left">
              <h3 className="text-xl font-cormorant font-bold text-[#14213d]">
                {friendlyPatternNames[pattern.patternType] || pattern.name}
              </h3>
              <p className="text-[#14213d]/80 text-base leading-relaxed">
                {friendlyDescriptions[pattern.patternType] || pattern.description}
              </p>
            </div>
            
            {/* Chevron on the right */}
            <ChevronRight className="h-6 w-6 text-[#14213d]/40 flex-shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatternList;
