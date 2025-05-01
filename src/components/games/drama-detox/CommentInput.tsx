
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CommentInputProps {
  newComment: string;
  onCommentChange: (comment: string) => void;
  onAddComment: () => void;
}

const CommentInput = ({ 
  newComment, 
  onCommentChange, 
  onAddComment 
}: CommentInputProps) => {
  return (
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
  );
};

export default CommentInput;
