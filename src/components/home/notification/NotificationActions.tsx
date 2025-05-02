
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
        className={!isEmotional ? "border-[#589391] text-[#2C3E50]" : ""}
      >
        Close
      </Button>
      <Button 
        className={isEmotional
          ? "bg-rosewood-tint hover:bg-rosewood-tint/90 text-white"
          : "bg-[#E51D2C] hover:bg-[#E51D2C]/90 text-white"
        }
        onClick={onViewAll}
      >
        View All Notes
      </Button>
    </div>
  );
};

export default NotificationActions;
