
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, PenLine, Trash2 } from 'lucide-react';
import { JournalEntry } from '@/types/archive';
import { format } from 'date-fns';

interface JournalEntriesListProps {
  entries: JournalEntry[];
  viewMode: 'list' | 'expanded';
  toggleFavorite: (id: string) => void;
  deleteEntry: (id: string) => void;
  openEditDialog: (entry: JournalEntry) => void;
}

const JournalEntriesList = ({ 
  entries, 
  viewMode, 
  toggleFavorite, 
  deleteEntry, 
  openEditDialog 
}: JournalEntriesListProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-midnight-indigo text-lg mb-2">
          No journal entries found
        </p>
        <p className="text-midnight-indigo/60">
          Create a new entry to start your journal.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="bg-white">
          <CardHeader className={`pb-2 ${viewMode === 'list' ? '' : 'border-b'}`}>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-midnight-indigo">{entry.title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className={`p-1 h-auto ${entry.isFavorite ? 'text-mauve-rose' : 'text-gray-400'}`}
                onClick={() => toggleFavorite(entry.id)}
              >
                <Star className="h-5 w-5 fill-current" />
                <span className="sr-only">
                  {entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </span>
              </Button>
            </div>
            <CardDescription className="text-xs">
              {format(entry.timestamp, 'PPp')}
            </CardDescription>
          </CardHeader>
          <CardContent className={viewMode === 'list' ? 'line-clamp-3' : ''}>
            <p className="text-midnight-indigo/80 whitespace-pre-line">{entry.content}</p>
          </CardContent>
          <CardFooter className="pt-0 justify-between flex-wrap">
            <div className="flex flex-wrap gap-1">
              {entry.tags?.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="bg-white/50 text-midnight-indigo/70 border-lavender-blue/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-lavender-blue hover:text-mauve-rose"
                onClick={() => openEditDialog(entry)}
              >
                <PenLine className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-red-500"
                onClick={() => deleteEntry(entry.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default JournalEntriesList;
