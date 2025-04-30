
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Vote } from 'lucide-react';
import { Scenario } from '../../../types/games';

interface ScenarioCardProps {
  scenario: Scenario;
  onVote: (option: string) => void;
}

const ScenarioCard = ({ scenario, onVote }: ScenarioCardProps) => {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  const handleSubmitVote = () => {
    if (selectedOption) {
      onVote(selectedOption);
    }
  };

  return (
    <div className="rounded-lg bg-[#F1ECE8]/50 p-6">
      <h3 className="text-xl font-medium text-midnight-indigo mb-4">
        {scenario.title}
      </h3>
      
      <p className="mb-6 text-midnight-indigo/80">
        {scenario.description}
      </p>
      
      <div className="mb-6">
        <h4 className="font-medium text-midnight-indigo mb-3">Who's the problem?</h4>
        
        <RadioGroup className="space-y-3" value={selectedOption || ""} onValueChange={setSelectedOption}>
          {scenario.options.map((option, idx) => (
            <div key={idx} className="flex items-center space-x-2 rounded-lg p-2 hover:bg-[#F1ECE8]">
              <RadioGroupItem value={option.id} id={option.id} className="border-midnight-indigo text-midnight-indigo" />
              <Label htmlFor={option.id} className="flex-grow text-midnight-indigo/90">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <Button
        onClick={handleSubmitVote}
        disabled={!selectedOption}
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white flex items-center justify-center gap-2"
      >
        <Vote className="h-4 w-4" />
        Cast Your Vote
      </Button>
      
      {scenario.submittedBy && (
        <p className="text-xs text-midnight-indigo/60 text-right mt-4">
          Submitted by a BFC community member
        </p>
      )}
    </div>
  );
};

export default ScenarioCard;
