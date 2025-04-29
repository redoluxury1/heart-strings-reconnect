
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

// Type definitions for the love note
export interface LoveNote {
  id: string;
  prompt: string;
  message: string;
  timestamp: Date;
}

interface LoveNoteTimelineProps {
  notes: LoveNote[];
}

const LoveNoteTimeline: React.FC<LoveNoteTimelineProps> = ({ notes }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-midnight-indigo text-lg">
          No love notes yet. Your partner's notes will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div 
          key={note.id}
          className="bg-white rounded-xl p-5 shadow-sm border border-opacity-10 border-midnight-indigo"
        >
          <p className="text-sm text-rosewood-tint mb-2">{note.prompt}</p>
          <p className="text-midnight-indigo font-medium">{note.message}</p>
          <div className="flex justify-end mt-3">
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(note.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoveNoteTimeline;
