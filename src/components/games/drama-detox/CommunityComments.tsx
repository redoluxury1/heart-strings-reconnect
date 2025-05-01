
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CommentInput from './CommentInput';

type CommentType = {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
  likes: number;
};

interface CommunityCommentsProps {
  communityComments: string[];
  userComments: CommentType[];
  showCommunityComments: boolean;
  setShowCommunityComments: (show: boolean) => void;
  newComment: string;
  onCommentChange: (comment: string) => void;
  onAddComment: () => void;
}

const CommunityComments = ({
  communityComments,
  userComments,
  showCommunityComments,
  setShowCommunityComments,
  newComment,
  onCommentChange,
  onAddComment
}: CommunityCommentsProps) => {
  return (
    <div className="mt-2 w-full">
      <div 
        className="flex justify-between items-center mb-2 cursor-pointer" 
        onClick={() => setShowCommunityComments(!showCommunityComments)}
      >
        <h4 className="font-medium text-[#F1EAE8] text-base flex items-center">
          <MessageCircle className="h-4 w-4 mr-2" /> 
          <span>Community Takes ({communityComments.length + userComments.length})</span>
        </h4>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-[#9b87f5]"
        >
          {showCommunityComments ? "Hide" : "Show"}
        </Button>
      </div>

      {showCommunityComments && (
        <div className="space-y-4 mb-4">
          {/* Display pre-populated community comments */}
          {communityComments.length > 0 && (
            <div className="space-y-2 mb-4">
              {communityComments.map((comment, index) => (
                <div key={`community-${index}`} className="bg-black/20 p-2 rounded-lg">
                  <p className="text-[#F1EAE8]/90 text-sm">{comment}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Display user comments */}
          {userComments.length > 0 && (
            <div className="space-y-2 mb-4">
              {userComments.map(comment => (
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
          )}

          {/* Comment input */}
          <CommentInput
            newComment={newComment}
            onCommentChange={onCommentChange}
            onAddComment={onAddComment}
          />
        </div>
      )}
    </div>
  );
};

export default CommunityComments;
