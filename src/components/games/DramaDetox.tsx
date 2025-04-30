import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad } from 'lucide-react';
import ScenarioCard from './drama-detox/ScenarioCard';
import VotingResultsCard from './drama-detox/VotingResultsCard';
import dramaDetoxScenarios from '../../data/drama-detox';

const DramaDetox = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userVote, setUserVote] = useState<string | null>(null);
  
  const currentScenario = dramaDetoxScenarios[currentScenarioIndex];
  
  const handleVote = (option: string) => {
    setUserVote(option);
    setShowResults(true);
  };
  
  const handleNextScenario = () => {
    if (currentScenarioIndex < dramaDetoxScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setShowResults(false);
      setUserVote(null);
      // Scroll to top when going to next scenario
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  const handlePrevScenario = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(prev => prev - 1);
      setShowResults(false);
      setUserVote(null);
      // Scroll to top when going to previous scenario as well
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-[#9b87f5]/20 p-3 rounded-full mr-3">
            <Gamepad className="h-6 w-6 text-[#7E69AB]" />
          </div>
          <h2 className="text-2xl font-cormorant font-medium text-midnight-indigo">Drama Detox™</h2>
        </div>
        
        <p className="text-center mb-8 text-midnight-indigo/80">
          Read each scenario, vote on who's the problem, and see how the community voted!
        </p>
        
        {!showResults ? (
          <ScenarioCard 
            scenario={currentScenario} 
            onVote={handleVote}
          />
        ) : (
          <VotingResultsCard 
            scenario={currentScenario} 
            userVote={userVote || ''} 
          />
        )}
        
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevScenario}
            disabled={currentScenarioIndex === 0}
            className="border-midnight-indigo text-midnight-indigo"
          >
            Previous
          </Button>
          
          {showResults && (
            <Button
              onClick={handleNextScenario}
              disabled={currentScenarioIndex === dramaDetoxScenarios.length - 1}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            >
              Next Scenario
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DramaDetox;
