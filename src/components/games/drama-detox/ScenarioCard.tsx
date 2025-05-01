
import React, { useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Scenario } from '../../../types/games';
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);

  // Find user's option if they voted
  const userOption = userVote ? 
    scenario.options.find(option => option.id === userVote) : null;

  // Random agreement percentage between 30-80%
  const agreementPercentage = Math.floor(Math.random() * 50) + 30;
  
  // Determine if this scenario is "controversial" (under 60% agreement)
  const isControversial = agreementPercentage < 60;

  return (
    <div className="w-full h-full flex flex-col pt-14 pb-20 px-4 overflow-hidden">
      {/* Full-screen card */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Scenario content */}
        <div className="flex-grow overflow-y-auto pb-4 scrollbar-hide no-scrollbar">
          <div className="bg-[#4A448C] rounded-xl shadow-md p-6 md:p-8 mb-4">
            <h3 className="text-2xl md:text-3xl font-medium text-[#F1EAE8] mb-6">
              {scenario.title}
            </h3>
            
            <p className="mb-8 text-lg md:text-xl text-[#F1EAE8]/90 leading-relaxed">
              {scenario.description}
            </p>
            
            {!userVote ? (
              // Voting view
              <div className="space-y-6">
                <h4 className="font-medium text-lg text-[#F1EAE8]">Pick a side. No fence-sitting.</h4>
                
                <ToggleGroup 
                  type="single"
                  className="w-full flex flex-col gap-3"
                  value={selectedOption || ""}
                  onValueChange={(value) => {
                    if (value) setSelectedOption(value);
                  }}
                >
                  {scenario.options.map((option, idx) => (
                    <ToggleGroupItem
                      key={idx}
                      value={option.id}
                      className="w-full p-4 rounded-full border border-[#F1EAE8]/30 bg-[#9b87f5]/10 text-left text-[#F1EAE8] hover:bg-[#9b87f5]/20 data-[state=on]:bg-[#9b87f5]/40"
                    >
                      {option.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                
                <Button
                  onClick={() => selectedOption && onVote(selectedOption)}
                  disabled={!selectedOption}
                  className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-[#F1EAE8] flex items-center justify-center gap-2 py-6 text-lg"
                >
                  Cast Your Vote
                </Button>
              </div>
            ) : (
              // Results view
              <div className="space-y-6 animate-fade-in">
                <div className="bg-[#5D569B]/50 p-5 rounded-lg mb-4">
                  <h4 className="font-medium text-[#F1EAE8] mb-2 text-lg">You voted:</h4>
                  <p className="text-[#F1EAE8] font-medium text-xl">{userOption?.label}</p>
                  
                  {/* Community agreement percentage */}
                  <div className="mt-4">
                    <p className="text-[#F1EAE8] text-lg flex items-center">
                      <span className="font-medium text-[#9b87f5]">
                        {agreementPercentage}%
                      </span>
                      <span className="ml-2">of the community agrees with you</span>
                    </p>
                    
                    {/* Controversy meter */}
                    {isControversial && (
                      <p className="flex items-center mt-2 text-[#F1EAE8]/90 text-sm">
                        <span className="mr-1">🔥</span>
                        <span>This one's causing drama—hot take alert!</span>
                      </p>
                    )}
                  </div>
                </div>
                
                {scenario.insight && (
                  <div className="border-l-4 border-[#9b87f5] pl-4 py-2">
                    <h4 className="font-medium text-[#F1EAE8] mb-2 text-lg">How We See It:</h4>
                    <p className="text-[#F1EAE8]/90 text-lg">{scenario.insight}</p>
                  </div>
                )}
                
                {/* Comments section */}
                <div className="mt-8">
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
