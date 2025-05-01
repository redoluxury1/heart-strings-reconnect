
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronUp, MessageCircle, ArrowUp } from 'lucide-react';
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);

  const handleSubmitVote = () => {
    if (selectedOption) {
      onVote(selectedOption);
    }
  };

  // Find user's option if they voted
  const userOption = userVote ? 
    scenario.options.find(option => option.id === userVote) : null;

  return (
    <div className="w-full h-full flex flex-col pt-14 pb-20 px-4 overflow-hidden">
      {/* Full-screen card */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Scenario content */}
        <div className="flex-grow overflow-y-auto pb-4 scrollbar-hide no-scrollbar">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-4">
            <h3 className="text-2xl md:text-3xl font-medium text-midnight-indigo mb-6">
              {scenario.title}
            </h3>
            
            <p className="mb-8 text-lg md:text-xl text-midnight-indigo/80 leading-relaxed">
              {scenario.description}
            </p>
            
            {!userVote ? (
              // Voting view
              <div className="space-y-6">
                <h4 className="font-medium text-lg text-midnight-indigo">Who's the problem?</h4>
                
                <RadioGroup className="space-y-5" value={selectedOption || ""} onValueChange={setSelectedOption}>
                  {scenario.options.map((option, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center space-x-3 rounded-lg border border-transparent p-5 hover:bg-[#F1ECE8] transition-colors"
                    >
                      <RadioGroupItem value={option.id} id={option.id} className="border-midnight-indigo text-midnight-indigo" />
                      <Label htmlFor={option.id} className="flex-grow text-midnight-indigo/90 cursor-pointer text-lg">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <Button
                  onClick={handleSubmitVote}
                  disabled={!selectedOption}
                  className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white flex items-center justify-center gap-2 py-6 text-lg"
                >
                  Cast Your Vote
                </Button>
              </div>
            ) : (
              // Results view
              <div className="space-y-6 animate-fade-in">
                <div className="bg-[#F1ECE8]/50 p-5 rounded-lg mb-4">
                  <h4 className="font-medium text-midnight-indigo mb-2 text-lg">You voted:</h4>
                  <p className="text-[#7E69AB] font-medium text-xl">{userOption?.label}</p>
                  
                  {/* Community agreement percentage - using a random number between 30-70 for demo */}
                  <p className="text-midnight-indigo mt-4 text-lg">
                    <span className="font-medium text-[#7E69AB]">
                      {Math.floor(Math.random() * 40) + 30}%
                    </span> of the community agrees with you
                  </p>
                </div>
                
                {scenario.insight && (
                  <div className="border-l-4 border-[#9b87f5] pl-4 py-2">
                    <h4 className="font-medium text-midnight-indigo mb-2 text-lg">How We See It:</h4>
                    <p className="text-midnight-indigo/80 text-lg">{scenario.insight}</p>
                  </div>
                )}
                
                {/* Swipe prompt now appears at bottom of screen */}
              </div>
            )}
          </div>

          {scenario.submittedBy && (
            <p className="text-xs text-midnight-indigo/60 text-right mb-4">
              Submitted by a BFC community member
            </p>
          )}

          {/* Comments section */}
          {userVote && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-midnight-indigo text-lg flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" /> 
                  Comments ({comments.length})
                </h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowComments(!showComments)}
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
                        <div key={comment.id} className="border-b pb-3">
                          <div className="flex justify-between">
                            <span className="font-medium text-midnight-indigo">{comment.username}</span>
                            <span className="text-xs text-midnight-indigo/60">
                              {comment.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-midnight-indigo/80 mt-1">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-midnight-indigo/60 italic mb-4">No comments yet. Be the first!</p>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Input 
                      value={newComment}
                      onChange={(e) => onCommentChange(e.target.value)}
                      placeholder="Add your thoughts..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={onAddComment}
                      disabled={!newComment.trim()}
                      className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                    >
                      Post
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
