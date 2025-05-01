
import React from 'react';
import { Scenario, ScenarioOption } from '../../../types/games';
import CommunityComments from './CommunityComments';

type CommentType = {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
  likes: number;
};

interface ScenarioResultViewProps {
  scenario: Scenario;
  userOption: ScenarioOption | null;
  agreementPercentage: number;
  isControversial: boolean;
  communityComments: string[];
  userComments: CommentType[];
  showCommunityComments: boolean;
  setShowCommunityComments: (show: boolean) => void;
  newComment: string;
  onCommentChange: (comment: string) => void;
  onAddComment: () => void;
}

const ScenarioResultView = ({
  scenario,
  agreementPercentage,
  isControversial,
  communityComments,
  userComments,
  showCommunityComments,
  setShowCommunityComments,
  newComment,
  onCommentChange,
  onAddComment
}: ScenarioResultViewProps) => {
  return (
    <div className="space-y-4 animate-fade-in flex flex-col items-center justify-center h-full">
      <div className="text-center mt-4">
        <div className="text-[120px] font-bold text-[#F1EAE8] leading-none">
          {agreementPercentage}%
        </div>
        <p className="text-lg text-[#F1EAE8]/90 mt-1">
          of the community agrees with you
        </p>
        
        {/* Controversy meter */}
        {isControversial && (
          <p className="flex items-center justify-center mt-3 text-[#F1EAE8]/90 text-base">
            <span className="mr-2 text-xl">🔥</span>
            <span>This one's causing drama—hot take alert!</span>
          </p>
        )}
      </div>
      
      {/* How We See It box - removed title as requested */}
      {scenario.insight && (
        <div className="bg-[#C7747F] p-3 rounded-lg mt-3 max-w-md mx-auto w-full">
          <p className="text-[#F1EAE8]/90 text-sm">{scenario.insight}</p>
        </div>
      )}
      
      {/* Community Comments Section */}
      <CommunityComments
        communityComments={communityComments}
        userComments={userComments}
        showCommunityComments={showCommunityComments}
        setShowCommunityComments={setShowCommunityComments}
        newComment={newComment}
        onCommentChange={onCommentChange}
        onAddComment={onAddComment}
      />
    </div>
  );
};

export default ScenarioResultView;
