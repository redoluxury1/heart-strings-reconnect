
import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Reply, Smile } from 'lucide-react';
import { LoveNoteArchive } from '@/types/archive';
import { format } from 'date-fns';
import { LoveNote } from '../home/LoveNoteTimeline';

interface LoveNotesArchiveProps {
  newNote?: LoveNote;
}

// Sample data - in a real app, this would come from storage/database
const sampleLoveNotes: LoveNoteArchive[] = [
  {
    id: '1',
    prompt: "What's one small way your partner made life easier this week?",
    message: "You made dinner three nights in a row when I was stressed about work. It meant the world to me.",
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    isFavorite: true,
    reaction: 'heart'
  },
  {
    id: '2',
    prompt: "When did your partner make you feel seen?",
    message: "When you noticed I was quiet yesterday and asked if I was okay instead of just letting it go.",
    timestamp: new Date(Date.now() - 86400000 * 5), // 5 days ago
    isFavorite: false,
    reaction: null
  },
  {
    id: '3',
    prompt: "Share a moment your partner made you smile recently.",
    message: "The silly dance you did while making breakfast just to make me laugh.",
    timestamp: new Date(Date.now() - 86400000 * 8), // 8 days ago
    isFavorite: false,
    reaction: 'smile'
  }
];

const LoveNotesArchive: React.FC<LoveNotesArchiveProps> = ({ newNote }) => {
  const [loveNotes, setLoveNotes] = useState<LoveNoteArchive[]>([]);
  
  // Initialize notes and add new note if provided
  useEffect(() => {
    // Start with sample notes (in a real app, this would fetch from storage/API)
    setLoveNotes(sampleLoveNotes);
    
    // If a new note is provided, add it to the beginning of the list
    if (newNote) {
      const archiveNote: LoveNoteArchive = {
        id: newNote.id,
        prompt: newNote.prompt,
        message: newNote.message,
        timestamp: newNote.timestamp,
        isFavorite: false,
        reaction: null
      };
      
      setLoveNotes(prevNotes => {
        // Check if note with same ID already exists to prevent duplicates
        if (!prevNotes.some(note => note.id === archiveNote.id)) {
          return [archiveNote, ...prevNotes];
        }
        return prevNotes;
      });
    }
  }, [newNote]);
  
  // Set reaction for a note
  const setReaction = (id: string, reaction: 'heart' | 'star' | 'smile' | null) => {
    setLoveNotes(loveNotes.map(note => 
      note.id === id 
        ? { ...note, reaction } 
        : note
    ));
  };

  // Sort notes by date (newest first)
  const sortedNotes = [...loveNotes].sort((a, b) => {
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <div>
      <p className="text-center mb-10 mt-6 max-w-lg mx-auto text-midnight-indigo">
        This is your private collection of appreciation notes from your partner. 
        Take time to revisit these moments when you need a reminder of your connection.
      </p>
      
      {sortedNotes.length > 0 ? (
        <div className="max-w-md mx-auto space-y-4">
          {sortedNotes.map((note) => (
            <div 
              key={note.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-opacity-10 border-midnight-indigo"
            >
              <p className="text-sm text-rosewood-tint mb-2">{note.prompt}</p>
              <p className="text-midnight-indigo font-medium">{note.message}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(note.timestamp, { addSuffix: true })}
                </p>
                
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-1 h-auto ${note.reaction === 'heart' ? 'text-red-500' : 'text-gray-400'}`}
                    onClick={() => setReaction(note.id, note.reaction === 'heart' ? null : 'heart')}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-1 h-auto ${note.reaction === 'smile' ? 'text-amber-500' : 'text-gray-400'}`}
                    onClick={() => setReaction(note.id, note.reaction === 'smile' ? null : 'smile')}
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-midnight-indigo text-lg mb-2">
            No love notes found
          </p>
          <p className="text-midnight-indigo/60">
            Love notes sent by your partner will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoveNotesArchive;
