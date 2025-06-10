
import React from 'react';
import { PatternChip } from '../types/PatternTypes';

interface ChipSelectorProps {
  chips: PatternChip[];
  selectedChips: string[];
  onChipSelect: (chipId: string) => void;
  prompt: string;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ 
  chips, 
  selectedChips, 
  onChipSelect, 
  prompt 
}) => {
  const getSubheadText = (prompt: string) => {
    if (prompt.includes("triggers")) {
      return "Let's get curious about what sets things off—it's not about blame, it's about understanding.";
    } else if (prompt.includes("go-to move")) {
      return "No judgment here—we all have ways we try to protect ourselves when things get tough.";
    } else if (prompt.includes("partner usually")) {
      return "Think about their typical response—remember, they're probably protecting themselves too.";
    }
    return "Take your time and choose what feels most true to your experience.";
  };

  const getChipIcon = (chipText: string) => {
    if (chipText.includes("talk") && chipText.includes("shuts down")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <path d="M8 4h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-8l-4 4V7a3 3 0 0 1 3-3z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
          <path d="M20 16h-4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="15" y1="8" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="19" y1="8" x2="15" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    if (chipText.includes("ignored") || chipText.includes("dismissed")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="4" x2="20" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    if (chipText.includes("small") && chipText.includes("blows up")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <path d="M2 20l10-8 2-2 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="20" cy="4" r="2" fill="currentColor"/>
          <path d="M16 8c1 1 2 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M18 6c0.5 1 1 1.5 2 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 10c1.5 1.5 3 3 6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M10 14c2 2 4 4 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    }
    if (chipText.includes("reconnect") && chipText.includes("missed")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <path d="M8 12c2-2 4-3 6-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 12c-2-2-4-3-6-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 8l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 8l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    }
    if (chipText.includes("exhausted") && chipText.includes("nobody steps")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <rect x="4" y="6" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
          <rect x="6" y="8" width="3" height="6" rx="1" fill="currentColor"/>
          <path d="M22 12h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M2 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="4" r="1" fill="currentColor"/>
        </svg>
      );
    }
    if (chipText.includes("press for answers")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (chipText.includes("shut down") && chipText.includes("silent")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    if (chipText.includes("bring up other things")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (chipText.includes("smooth things over")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        </svg>
      );
    }
    if (chipText.includes("keep doing everything")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="17" cy="7" r="1" fill="currentColor"/>
        </svg>
      );
    }
    if (chipText.includes("double down") && chipText.includes("right")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="16" r="1" fill="currentColor"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (chipText.includes("dig in") || chipText.includes("control")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1v6m0 6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1 12h6m6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    if (chipText.includes("defensive")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (chipText.includes("walk away") || chipText.includes("quiet")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    if (chipText.includes("overreacting")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    if (chipText.includes("past mistakes")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <polyline points="1,4 1,10 7,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (chipText.includes("sorry") && chipText.includes("don't change")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    
    // Default icon for any unmapped chips
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    );
  };

  const getChipColor = (index: number, isSelected: boolean) => {
    if (isSelected) {
      return "bg-[#2e2a63] text-white border-[#2e2a63]";
    }
    
    const colors = [
      "bg-[#F5E6E8] text-[#2e2a63] border-[#E8D5C4] hover:border-[#D3876A]/30",
      "bg-[#FDF0E9] text-[#2e2a63] border-[#F0E5D6] hover:border-[#D3876A]/30",
      "bg-[#F9F5EF] text-[#2e2a63] border-[#E7D9C9] hover:border-[#D3876A]/30",
    ];
    
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-cormorant font-medium text-[#2e2a63] mb-3">
          {prompt}
        </h3>
        <p className="text-[#2e2a63]/70 text-lg leading-relaxed">
          {getSubheadText(prompt)}
        </p>
      </div>
      
      <div className="space-y-4">
        {chips.map((chip, index) => (
          <button
            key={chip.id}
            onClick={() => onChipSelect(chip.id)}
            className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
              getChipColor(index, selectedChips.includes(chip.id))
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1">
                {getChipIcon(chip.text)}
              </span>
              <span className="text-lg leading-relaxed font-medium">
                {chip.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChipSelector;
