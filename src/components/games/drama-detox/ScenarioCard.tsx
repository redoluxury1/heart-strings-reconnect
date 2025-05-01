
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronUp } from 'lucide-react';
import { Scenario } from '../../../types/games';

interface ScenarioCardProps {
  scenario: Scenario;
  userVote: string | undefined;
  onVote: (option: string) => void;
}

const ScenarioCard = ({ scenario, userVote, onVote }: ScenarioCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmitVote = () => {
    if (selectedOption) {
      onVote(selectedOption);
    }
  };

  // Find user's option if they voted
  const userOption = userVote ? 
    scenario.options.find(option => option.id === userVote) : null;

  return (
    <div className="w-full max-w-lg mx-auto h-full overflow-y-auto px-4 pt-6 pb-16">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h3 className="text-xl font-medium text-midnight-indigo mb-4">
          {scenario.title}
        </h3>
        
        <p className="mb-6 text-midnight-indigo/80">
          {scenario.description}
        </p>
        
        {!userVote ? (
          // Voting view
          <div className="space-y-6">
            <h4 className="font-medium text-midnight-indigo">Who's the problem?</h4>
            
            <RadioGroup className="space-y-3" value={selectedOption || ""} onValueChange={setSelectedOption}>
              {scenario.options.map((option, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center space-x-2 rounded-lg border border-transparent p-4 hover:bg-[#F1ECE8] transition-colors"
                  onClick={() => setSelectedOption(option.id)}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="border-midnight-indigo text-midnight-indigo" />
                  <Label htmlFor={option.id} className="flex-grow text-midnight-indigo/90 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button
              onClick={handleSubmitVote}
              disabled={!selectedOption}
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white flex items-center justify-center gap-2"
            >
              Cast Your Vote
            </Button>
          </div>
        ) : (
          // Results view
          <div className="space-y-6 animate-fade-in">
            <div className="bg-[#F1ECE8]/50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-midnight-indigo mb-2">You voted:</h4>
              <p className="text-[#7E69AB] font-medium">{userOption?.label}</p>
              
              {/* Community agreement percentage - using a random number between 30-70 for demo */}
              <p className="text-midnight-indigo mt-3">
                <span className="font-medium text-[#7E69AB]">
                  {Math.floor(Math.random() * 40) + 30}%
                </span> of the community agrees with you
              </p>
            </div>
            
            {scenario.insight && (
              <div className="border-l-4 border-[#9b87f5] pl-4">
                <h4 className="font-medium text-midnight-indigo mb-2">How We See It:</h4>
                <p className="text-midnight-indigo/80">{scenario.insight}</p>
              </div>
            )}
            
            <Button
              className="w-full bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20 text-[#7E69AB] flex items-center justify-center gap-2 border-none"
            >
              <ChevronUp className="h-4 w-4" />
              Swipe up for next scenario
            </Button>
          </div>
        )}
      </div>
      
      {scenario.submittedBy && (
        <p className="text-xs text-midnight-indigo/60 text-right mt-4">
          Submitted by a BFC community member
        </p>
      )}
    </div>
  );
};

export default ScenarioCard;
