
import React from 'react';
import { Mail } from "lucide-react";
import { useInterface } from '../../common/InterfaceProvider';

interface NotificationIconProps {
  size?: number;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ size = 5 }) => {
  const { isEmotional } = useInterface();
  
  return (
    <Mail 
      className={`h-${size} w-${size} ${
        isEmotional 
          ? "text-rosewood-tint" 
          : "text-[#C7747F]"
      }`} 
    />
  );
};

export default NotificationIcon;
