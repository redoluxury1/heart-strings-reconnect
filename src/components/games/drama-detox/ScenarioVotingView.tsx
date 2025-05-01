
import React from 'react';
import { Scenario } from '../../../types/games';

interface ScenarioVotingViewProps {
  scenario: Scenario;
  onVote: (option: string) => void;
  isFirstScenario?: boolean;
}

const ScenarioVotingView = ({ 
  scenario, 
  onVote, 
  isFirstScenario = false 
}: ScenarioVotingViewProps) => {
  return (
    <div className="space-y-6 flex flex-col h-full">
      {isFirstScenario && (
        <h4 className="font-medium text-base text-[#F1EAE8] tracking-wider font-heading-now-medium">
          Pick a side. No fence-sitting.
        </h4>
      )}
      
      {/* Scenario description with improved typography and larger font size */}
      <p className="flex-grow mb-6 text-2xl md:text-3xl text-[#F1EAE8]/90 leading-relaxed tracking-wide font-heading-now-regular" 
         style={{ lineHeight: '1.4', letterSpacing: '0.02em' }}>
        {scenario.description}
      </p>
      
      {/* Answer buttons pushed down with some margin-top */}
      <div className="flex flex-wrap gap-2 justify-center mt-auto">
        {scenario.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onVote(option.id)}
            className="px-5 py-3 rounded-full bg-[#C7747F] text-[#F1EAE8] hover:bg-[#C7747F]/80 active:bg-[#C7747F]/90 font-medium text-sm transition-all"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioVotingView;
