
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X } from 'lucide-react';
import { getCardById } from '@/data/would-you-rather-cards';
import { GameAnswer } from '@/types/would-you-rather';

interface ResultsViewProps {
  myAnswers: GameAnswer[];
  partnerAnswers: GameAnswer[];
  partnerName: string;
  onBackToGame: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  myAnswers,
  partnerAnswers,
  partnerName,
  onBackToGame
}) => {
  // Find cards that both partners have answered
  const comparedResults = myAnswers
    .filter(myAns => partnerAnswers.some(partnerAns => partnerAns.cardId === myAns.cardId))
    .map(myAns => {
      const partnerAns = partnerAnswers.find(p => p.cardId === myAns.cardId);
      const card = getCardById(myAns.cardId);
      const isMatch = partnerAns?.selectedOption === myAns.selectedOption;
      
      return {
        card,
        myChoice: myAns.selectedOption,
        partnerChoice: partnerAns?.selectedOption,
        isMatch,
        answeredAt: new Date(myAns.answeredAt)
      };
    })
    .sort((a, b) => b.answeredAt.getTime() - a.answeredAt.getTime()); // Sort by most recent
  
  // Find cards that I've answered but partner hasn't
  const pendingPartnerAnswers = myAnswers
    .filter(myAns => !partnerAnswers.some(partnerAns => partnerAns.cardId === myAns.cardId))
    .map(myAns => {
      const card = getCardById(myAns.cardId);
      return {
        card,
        myChoice: myAns.selectedOption,
        answeredAt: new Date(myAns.answeredAt)
      };
    })
    .sort((a, b) => b.answeredAt.getTime() - a.answeredAt.getTime()); // Sort by most recent

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={onBackToGame}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <h2 className="text-2xl font-cormorant font-medium text-midnight-indigo flex-grow text-center mr-10">
          Your Results
        </h2>
      </div>
      
      {comparedResults.length === 0 && pendingPartnerAnswers.length === 0 ? (
        <div className="text-center p-8 bg-gray-100 rounded-lg">
          <p>You haven't answered any questions yet.</p>
          <Button className="mt-4" onClick={onBackToGame}>
            Start Playing
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {comparedResults.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-3">
                Compared Results
              </h3>
              
              <div className="space-y-4">
                {comparedResults.map(result => (
                  <div 
                    key={result.card?.id} 
                    className={`rounded-lg border p-4 ${result.isMatch ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`rounded-full p-1 mt-1 ${result.isMatch ? 'bg-green-100' : 'bg-amber-100'}`}>
                        {result.isMatch ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-700">{result.card?.question}</p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">You chose:</span> {" "}
                          {result.myChoice === 'optionA' ? result.card?.optionA : result.card?.optionB}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">{partnerName} chose:</span> {" "}
                          {result.partnerChoice === 'optionA' ? result.card?.optionA : result.card?.optionB}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {pendingPartnerAnswers.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-3">
                Waiting for {partnerName}'s Answers
              </h3>
              
              <div className="space-y-4">
                {pendingPartnerAnswers.map(pending => (
                  <div 
                    key={pending.card?.id} 
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <p className="font-medium text-gray-700">{pending.card?.question}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">You chose:</span> {" "}
                      {pending.myChoice === 'optionA' ? pending.card?.optionA : pending.card?.optionB}
                    </p>
                    <p className="text-sm mt-1 text-gray-500 italic">
                      Waiting for {partnerName} to answer...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsView;
