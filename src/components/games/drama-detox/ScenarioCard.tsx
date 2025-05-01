
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Scenario } from '../../../types/games';
import { Input } from "@/components/ui/input";

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
}

const ScenarioCard = ({ 
  scenario, 
  userVote, 
  onVote, 
  comments,
  newComment,
  onCommentChange,
  onAddComment
}: ScenarioCardProps) => {
  const [showComments, setShowComments] = useState(false);

  // Find user's option if they voted
  const userOption = userVote ? 
    scenario.options.find(option => option.id === userVote) : null;

  // Random agreement percentage between 30-80%
  const agreementPercentage = Math.floor(Math.random() * 50) + 30;
  
  // Determine if this scenario is "controversial" (under 60%)
  const isControversial = agreementPercentage < 60;

  return (
    <div className="w-full h-full flex flex-col py-6 px-4 overflow-hidden">
      {/* Full-screen card */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Scenario content */}
        <div className="flex-grow overflow-y-auto pb-4 scrollbar-hide no-scrollbar">
          <div className="bg-[#4A448C] rounded-xl shadow-md p-6 md:p-8 mb-4 h-full">
            {/* Larger scenario description, no title */}
            <p className="mb-8 text-2xl md:text-3xl text-[#F1EAE8]/90 leading-relaxed font-medium">
              {scenario.description}
            </p>
            
            {!userVote ? (
              // Voting view with just the options, no "Cast Your Vote" button
              <div className="space-y-6">
                <h4 className="font-medium text-lg text-[#F1EAE8]">Pick a side. No fence-sitting.</h4>
                
                <div className="flex flex-col gap-3">
                  {scenario.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => onVote(option.id)}
                      className="w-full p-5 rounded-full border border-[#F1EAE8]/30 bg-[#9b87f5]/10 text-left text-lg text-[#F1EAE8] hover:bg-[#9b87f5]/20 active:bg-[#9b87f5]/40"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Results view with large percentage
              <div className="space-y-6 animate-fade-in flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-[120px] font-bold text-[#F1EAE8] leading-none">
                    {agreementPercentage}%
                  </div>
                  <p className="text-xl text-[#F1EAE8]/90 mt-2">
                    of the community agrees with you
                  </p>
                  
                  {/* Controversy meter */}
                  {isControversial && (
                    <p className="flex items-center justify-center mt-6 text-[#F1EAE8]/90 text-lg">
                      <span className="mr-2 text-2xl">🔥</span>
                      <span>This one's causing drama—hot take alert!</span>
                    </p>
                  )}
                </div>
                
                {scenario.insight && (
                  <div className="bg-[#C7747F]/20 p-4 rounded-lg mt-8 max-w-md mx-auto w-full">
                    <h4 className="font-medium text-[#F1EAE8] mb-1 text-sm">How We See It:</h4>
                    <p className="text-[#F1EAE8]/90 text-base">{scenario.insight}</p>
                  </div>
                )}
                
                {/* Comments section */}
                <div className="mt-8 w-full">
                  <div 
                    className="flex justify-between items-center mb-4 cursor-pointer" 
                    onClick={() => setShowComments(!showComments)}
                  >
                    <h4 className="font-medium text-[#F1EAE8] text-lg flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" /> 
                      Comments ({comments.length})
                    </h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-sm text-[#9b87f5]"
                    >
                      {showComments ? "Hide" : "Show"}
                    </Button>
                  </div>

                  {showComments && (
                    <>
                      {comments.length > 0 ? (
                        <div className="space-y-4 mb-4">
                          {comments.map(comment => (
                            <div key={comment.id} className="border-b border-[#F1EAE8]/20 pb-3">
                              <div className="flex justify-between">
                                <span className="font-medium text-[#F1EAE8]">{comment.username}</span>
                                <span className="text-xs text-[#F1EAE8]/60">
                                  {comment.timestamp.toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-[#F1EAE8]/90 mt-1">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[#F1EAE8]/60 italic mb-4">No comments yet. Be the first to add your take!</p>
                      )}

                      <div className="flex gap-2 mt-4">
                        <Input 
                          value={newComment}
                          onChange={(e) => onCommentChange(e.target.value)}
                          placeholder="Add your take..."
                          className="flex-1 bg-[#4A448C] border-[#F1EAE8]/30 text-[#F1EAE8] placeholder:text-[#F1EAE8]/50"
                        />
                        <Button 
                          onClick={onAddComment}
                          disabled={!newComment.trim()}
                          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-[#F1EAE8]"
                        >
                          Post
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {scenario.submittedBy && (
            <p className="text-xs text-[#F1EAE8]/60 text-right mb-4">
              Submitted by a BFC community member
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
