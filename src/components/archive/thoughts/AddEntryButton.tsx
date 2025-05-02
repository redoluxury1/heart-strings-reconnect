
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface AddEntryButtonProps {
  onClick: () => void;
}

const AddEntryButton = ({ onClick }: AddEntryButtonProps) => {
  return (
    <div className="flex justify-center mb-6">
      <Button 
        className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
        onClick={onClick}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a thought
      </Button>
    </div>
  );
};

export default AddEntryButton;
