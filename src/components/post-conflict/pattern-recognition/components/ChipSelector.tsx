
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
    if (chipText.includes("talk") && chipText.includes("shuts down")) return "🗣️";
    if (chipText.includes("ignored") || chipText.includes("dismissed")) return "🕳️";
    if (chipText.includes("small") && chipText.includes("blows up")) return "🔥";
    if (chipText.includes("reconnect") && chipText.includes("missed")) return "💔";
    if (chipText.includes("exhausted") && chipText.includes("nobody steps")) return "😩";
    if (chipText.includes("press for answers")) return "🔍";
    if (chipText.includes("shut down") && chipText.includes("silent")) return "🤐";
    if (chipText.includes("bring up other things")) return "📚";
    if (chipText.includes("smooth things over")) return "🩹";
    if (chipText.includes("keep doing everything")) return "😤";
    if (chipText.includes("double down") && chipText.includes("right")) return "⚔️";
    if (chipText.includes("dig in") || chipText.includes("control")) return "🎯";
    if (chipText.includes("defensive")) return "🛡️";
    if (chipText.includes("walk away") || chipText.includes("quiet")) return "🚪";
    if (chipText.includes("overreacting")) return "🙄";
    if (chipText.includes("past mistakes")) return "⏪";
    if (chipText.includes("sorry") && chipText.includes("don't change")) return "🔄";
    return "💭";
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
              <span className="text-2xl flex-shrink-0 mt-1">
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
