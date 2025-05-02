
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useInterface } from '../../common/InterfaceProvider';

interface AddEntryButtonProps {
  onClick: () => void;
}

const AddEntryButton = ({ onClick }: AddEntryButtonProps) => {
  const { isEmotional } = useInterface();
  
  return (
    <div className="flex justify-center mb-6">
      <Button 
        className={isEmotional
          ? "bg-lavender-blue hover:bg-lavender-blue/90 text-white"
          : "bg-[#589391] hover:bg-[#589391]/90 text-white"
        }
        onClick={onClick}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a thought
      </Button>
    </div>
  );
};

export default AddEntryButton;
