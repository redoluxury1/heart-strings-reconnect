
import React from 'react';
import { Button } from "@/components/ui/button";
import { useInterface } from '../../common/InterfaceProvider';

interface NotificationActionsProps {
  onClose: () => void;
  onViewAll: () => void;
}

const NotificationActions: React.FC<NotificationActionsProps> = ({ onClose, onViewAll }) => {
  const { isEmotional } = useInterface();
  
  return (
    <div className="flex justify-between mt-4">
      <Button 
        variant="outline" 
        onClick={onClose}
        className={!isEmotional ? "border-[#543544] text-[#2C3E50]" : ""}
      >
        Close
      </Button>
      <Button 
        className={isEmotional
          ? "bg-rosewood-tint hover:bg-rosewood-tint/90 text-white"
          : "bg-[#543544] hover:bg-[#543544]/90 text-white"
        }
        onClick={onViewAll}
      >
        View All Notes
      </Button>
    </div>
  );
};

export default NotificationActions;
