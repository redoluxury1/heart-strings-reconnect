
import React from 'react';
import { useInterface } from '../../../hooks/useInterfaceContext';
import { LoveNote } from '../../home/LoveNoteTimeline';

interface NotificationPromptProps {
  loveNote: LoveNote;
}

const NotificationPrompt: React.FC<NotificationPromptProps> = ({ loveNote }) => {
  const { isEmotional } = useInterface();
  
  return (
    <div className={`p-4 rounded-lg my-4 ${
      isEmotional 
        ? "bg-soft-blush/30" 
        : "bg-[#D1E5F4]/50"
    }`}>
      <p className={`text-sm mb-2 ${
        isEmotional 
          ? "text-rosewood-tint" 
          : "text-[#543544]"
      }`}>
        {loveNote.prompt}
      </p>
      <p className={`italic ${
        isEmotional 
          ? "text-midnight-indigo" 
          : "text-[#2C3E50]"
      }`}>
        "{loveNote.message}"
      </p>
    </div>
  );
};

export default NotificationPrompt;
