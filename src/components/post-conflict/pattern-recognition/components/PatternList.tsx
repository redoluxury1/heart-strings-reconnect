
import React from 'react';
import { ChevronRight, RefreshCcw, Users, Megaphone, Puzzle } from 'lucide-react';
import { CommonPattern } from '../types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import '@/styles/animations/pattern-recognition.css';

interface PatternListProps {
  patterns?: CommonPattern[];
  onPatternSelect: (pattern: CommonPattern) => void;
  togglePatternSelection?: (id: number | string) => void;
  selectedPatterns?: (number | string)[];
}

// Friendly pattern names for display
const friendlyPatternNames: Record<string, string> = {
  'criticism-defensiveness': 'Blame / Defend / Withdraw',
  'pursue-distance': 'Pursue / Distance',
  'silent-tension-snap': 'Silent Tension / Snap',
  'criticize-control': 'Criticize / Control',
  'fix-reject': 'Fix It / Reject It',
};

// More conversational descriptions
const friendlyDescriptions: Record<string, string> = {
  'criticism-defensiveness': 'You feel blamed, so you shut down. They get louder. Repeat.',
  'pursue-distance': 'One of you chases connection. The other pulls away.',
  'silent-tension-snap': 'It builds up... until it bursts.',
  'criticize-control': 'Everything feels like a correction.',
  'fix-reject': 'One wants to solve. The other isn\'t ready.',
};

// Color palette for pattern cards
const patternColors: Record<string, { bg: string, text: string, iconBg: string }> = {
  'criticism-defensiveness': { bg: 'bg-[#fbeaec]/30', text: 'text-[#C7747F]', iconBg: 'bg-[#fbeaec]' },
  'pursue-distance': { bg: 'bg-[#E5DEFF]/30', text: 'text-[#6E59A5]', iconBg: 'bg-[#E5DEFF]' },
  'silent-tension-snap': { bg: 'bg-[#FEC6A1]/30', text: 'text-[#D97941]', iconBg: 'bg-[#FEC6A1]' },
  'criticize-control': { bg: 'bg-[#FEF7CD]/30', text: 'text-[#A98600]', iconBg: 'bg-[#FEF7CD]' },
  'fix-reject': { bg: 'bg-[#D3E4FD]/30', text: 'text-[#3B7DD8]', iconBg: 'bg-[#D3E4FD]' },
};

// Sample patterns data if not provided via props
const samplePatterns: CommonPattern[] = [
  {
    id: 1,
    name: 'Criticism-Defensiveness Cycle',
    description: 'You feel blamed, so you shut down. They get louder. Repeat.',
    examples: ['You always...', 'I never said that!', 'Why are you making this my fault?'],
    breakingTips: ['Use "I" statements instead of "you" accusations', 'Take a pause before responding defensively'],
    patternType: 'criticism-defensiveness'
  },
  {
    id: 2,
    name: 'Pursue-Distance Dynamic',
    description: 'One of you chases connection. The other pulls away.',
    examples: ["Why won't you talk to me?", 'I just need some space', 'You never want to discuss our issues'],
    breakingTips: ['Set a specific time to talk later', "Respect each other's timing needs"],
    patternType: 'pursue-distance'
  },
  {
    id: 3,
    name: 'Silent Tension & Explosion',
    description: 'It builds up... until it bursts.',
    examples: ["I'm fine. (I'm not fine)", 'Suddenly exploding over small issues', 'Feeling resentful'],
    breakingTips: ['Address small issues before they grow', 'Create regular check-in times'],
    patternType: 'silent-tension-snap'
  },
  {
    id: 4,
    name: 'Control & Criticism Pattern',
    description: 'Everything feels like a correction.',
    examples: ["That's not how you do it", 'Let me show you', 'You should...'],
    breakingTips: ['Ask before offering help', 'Focus on appreciating efforts'],
    patternType: 'criticize-control'
  },
  {
    id: 5,
    name: 'Fix-It vs Feel-It Pattern',
    description: 'One wants to solve. The other isn\'t ready.',
    examples: ["Here's what we should do...", "I don't want solutions right now", 'Can you just listen?'],
    breakingTips: ['Ask if they want solutions or just listening', 'Be clear about your needs'],
    patternType: 'fix-reject'
  },
];

const PatternList: React.FC<PatternListProps> = ({ patterns = samplePatterns, onPatternSelect, togglePatternSelection, selectedPatterns }) => {
  // Get appropriate icon based on pattern type
  const getPatternIcon = (patternType: string) => {
    switch(patternType) {
      case 'criticism-defensiveness':
        return <RefreshCcw className={`h-8 w-8 ${patternColors[patternType].text} pattern-icon`} />;
      case 'pursue-distance':
        return <Users className={`h-8 w-8 ${patternColors[patternType].text} pattern-icon`} />;
      case 'criticize-control':
        return <Megaphone className={`h-8 w-8 ${patternColors[patternType].text} pattern-icon`} />;
      case 'fix-reject':
        return <Puzzle className={`h-8 w-8 ${patternColors[patternType].text} pattern-icon`} />;
      case 'silent-tension-snap':
        return (
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${patternColors[patternType].text} pattern-icon`}>
            <path d="M22 16L14 28H22L20 36L28 24H20L22 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-cormorant font-bold text-[#14213d] mb-3">
          Which pattern sounds like your relationship?
        </h1>
        <p className="text-sm md:text-base text-[#14213d]/80 mb-4 max-w-md mx-auto leading-relaxed">
          These common loops show up in many couples. 
          Tap one to explore how it plays out—and how to break it.
        </p>
      </div>
      
      <div className="space-y-4 max-w-md mx-auto">
        {patterns.map(pattern => {
          const colors = patternColors[pattern.patternType] || { bg: 'bg-[#f8f5f0]', text: 'text-[#14213d]', iconBg: 'bg-[#f8f5f0]' };
          
          return (
            <Card 
              key={pattern.id}
              onClick={() => onPatternSelect(pattern)}
              className={cn(
                "w-full p-4 hover:shadow-md border border-transparent",
                "transition-all duration-300 cursor-pointer pattern-card",
                colors.bg
              )}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 mr-4 p-3 rounded-full ${colors.iconBg}`}>
                  {getPatternIcon(pattern.patternType)}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#14213d] mb-1">
                    {friendlyPatternNames[pattern.patternType] || pattern.name}
                  </h3>
                  <p className="text-[#14213d]/70 text-sm">
                    {friendlyDescriptions[pattern.patternType] || pattern.description}
                  </p>
                </div>
                
                <ChevronRight className="h-5 w-5 text-[#14213d]/40" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PatternList;
