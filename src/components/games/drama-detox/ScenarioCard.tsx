
import React, { useState } from 'react';
import { Scenario } from '../../../types/games';
import { getCommentsForScenario } from '../../../data/drama-detox/scenario-comments';
import ScenarioVotingView from './ScenarioVotingView';
import ScenarioResultView from './ScenarioResultView';

type CommentType = {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
  likes: number;
};

interface ScenarioCardProps {
  scenario: Scenario;
  userVote: string | undefined;
  onVote: (option: string) => void;
  comments: CommentType[];
  newComment: string;
  onCommentChange: (comment: string) => void;
  onAddComment: () => void;
  isFirstScenario?: boolean;
  backgroundColor?: string;
}

const ScenarioCard = ({ 
  scenario, 
  userVote, 
  onVote, 
  comments,
  newComment,
  onCommentChange,
  onAddComment,
  isFirstScenario = false,
  backgroundColor = "#4A448C"
}: ScenarioCardProps) => {
  const [showCommunityComments, setShowCommunityComments] = useState(false);

  // Find user's option if they voted
  const userOption = userVote ? 
    scenario.options.find(option => option.id === userVote) : null;

  // Random agreement percentage between 30-80%
  const agreementPercentage = Math.floor(Math.random() * 50) + 30;
  
  // Determine if this scenario is "controversial" (under 60%)
  const isControversial = agreementPercentage < 60;
  
  // Get pre-populated community comments for this scenario
  const communityComments = getCommentsForScenario(scenario.title || scenario.description);

  return (
    <div className="w-full h-full flex flex-col pt-2 pb-4 px-4 overflow-hidden">
      {/* Compact card to fit on one screen */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Scenario content */}
        <div className="flex-grow overflow-y-auto pb-2 scrollbar-hide no-scrollbar">
          <div className={`rounded-xl shadow-md p-5 md:p-6 mb-2 h-full flex flex-col justify-between`} style={{ backgroundColor }}>
            {!userVote ? (
              <ScenarioVotingView 
                scenario={scenario} 
                onVote={onVote} 
                isFirstScenario={isFirstScenario} 
              />
            ) : (
              <ScenarioResultView
                scenario={scenario}
                userOption={userOption}
                agreementPercentage={agreementPercentage}
                isControversial={isControversial}
                communityComments={communityComments}
                userComments={comments}
                showCommunityComments={showCommunityComments}
                setShowCommunityComments={setShowCommunityComments}
                newComment={newComment}
                onCommentChange={onCommentChange}
                onAddComment={onAddComment}
              />
            )}
          </div>

          {scenario.submittedBy && (
            <p className="text-xs text-[#F1EAE8]/60 text-right mb-2">
              Submitted by a BFC community member
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
