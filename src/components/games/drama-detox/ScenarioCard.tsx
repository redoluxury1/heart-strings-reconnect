
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Scenario } from '../../../types/games';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
  const [showComments, setShowComments] = useState(false);

  // Find user's option if they voted
  const userOption = userVote ? 
    scenario.options.find(option => option.id === userVote) : null;

  // Random agreement percentage between 30-80%
  const agreementPercentage = Math.floor(Math.random() * 50) + 30;
  
  // Determine if this scenario is "controversial" (under 60%)
  const isControversial = agreementPercentage < 60;

  return (
    <div className="w-full h-full flex flex-col pt-2 pb-4 px-4 overflow-hidden">
      {/* Compact card to fit on one screen */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Scenario content */}
        <div className="flex-grow overflow-y-auto pb-2 scrollbar-hide no-scrollbar">
          <div className={`rounded-xl shadow-md p-5 md:p-6 mb-2 h-full flex flex-col justify-between`} style={{ backgroundColor }}>
            {!userVote ? (
              // Voting view with the scenario and options
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
            ) : (
              // Results view with large percentage
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
                
                {scenario.insight && (
                  <div className="bg-[#C7747F] p-3 rounded-lg mt-3 max-w-md mx-auto w-full">
                    <h4 className="font-medium text-[#F1EAE8] mb-1 text-sm">How We See It:</h4>
                    <p className="text-[#F1EAE8]/90 text-sm">{scenario.insight}</p>
                  </div>
                )}
                
                {/* Comments section */}
                <div className="mt-4 w-full">
                  <div 
                    className="flex justify-between items-center mb-2 cursor-pointer" 
                    onClick={() => setShowComments(!showComments)}
                  >
                    <h4 className="font-medium text-[#F1EAE8] text-base flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" /> 
                      Comments ({comments.length})
                    </h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-[#9b87f5]"
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
