
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Scenario } from '../../../types/games';

interface VotingResultsCardProps {
  scenario: Scenario;
  userVote: string;
}

const VotingResultsCard = ({ scenario, userVote }: VotingResultsCardProps) => {
  // Find user's option
  const userOption = scenario.options.find(option => option.id === userVote);
  
  return (
    <div className="rounded-lg bg-[#F1ECE8]/50 p-6">
      <h3 className="text-xl font-medium text-midnight-indigo mb-4">
        {scenario.title}
      </h3>
      
      <p className="mb-6 text-midnight-indigo/80">
        {scenario.description}
      </p>
      
      <div className="mb-6">
        <div className="bg-white p-4 rounded-lg mb-4">
          <h4 className="font-medium text-midnight-indigo mb-2">You voted:</h4>
          <p className="text-[#7E69AB] font-medium">{userOption?.label}</p>
        </div>
        
        <h4 className="font-medium text-midnight-indigo mb-3">Community votes:</h4>
        
        {scenario.options.map((option, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className={`text-sm ${option.id === userVote ? 'text-[#7E69AB] font-medium' : 'text-midnight-indigo/80'}`}>
                {option.label}
              </span>
              <span className={`text-sm ${option.id === userVote ? 'text-[#7E69AB] font-medium' : 'text-midnight-indigo/80'}`}>
                {option.votes}%
              </span>
            </div>
            <Progress 
              value={option.votes} 
              className={`h-2 ${option.id === userVote ? 'bg-[#E5DEFF]' : 'bg-gray-100'}`}
            />
          </div>
        ))}
      </div>
      
      {scenario.insight && (
        <div className="bg-white p-4 rounded-lg mb-4 border-l-4 border-[#9b87f5]">
          <h4 className="font-medium text-midnight-indigo mb-2">Bridge Insight:</h4>
          <p className="text-midnight-indigo/80 text-sm">{scenario.insight}</p>
        </div>
      )}
      
      {scenario.submittedBy && (
        <p className="text-xs text-midnight-indigo/60 text-right">
          Submitted by a BFC community member
        </p>
      )}
    </div>
  );
};

export default VotingResultsCard;
