
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JournalEntry, ViewMode } from '@/types/archive';
import { format } from 'date-fns';
import { 
  Search, 
  Star, 
  PenLine, 
  Trash2, 
  BookOpen,
  LayoutList,
  ListFilter,
  Plus 
} from 'lucide-react';

// Sample data - in a real app, this would come from storage/database
const sampleEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'Finally had that hard conversation',
    content: 'We talked about finances today. It was uncomfortable but it feels like we made progress. Setting up a budget next week.',
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    tags: ['breakthrough', 'finances'],
    isFavorite: true
  },
  {
    id: '2',
    title: 'Feeling disconnected',
    content: "It's been three days of barely talking. I know we're both busy but it's starting to feel like more than that. Need to check in.",
    timestamp: new Date(Date.now() - 86400000 * 7), // 7 days ago
    tags: ['conflict', 'communication'],
    isFavorite: false
  },
  {
    id: '3',
    title: 'Date night success',
    content: "Finally tried that new restaurant we've been meaning to go to. It was so nice to just focus on each other without distractions.",
    timestamp: new Date(Date.now() - 86400000 * 12), // 12 days ago
    tags: ['grateful', 'connection'],
    isFavorite: false
  }
];

const allTags = ['breakthrough', 'finances', 'conflict', 'communication', 'grateful', 'connection'];

const JournalEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // New entry state
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newEntryTags, setNewEntryTags] = useState<string[]>([]);
  const [isNewEntryDialogOpen, setIsNewEntryDialogOpen] = useState(false);
  
  // Edit entry state
  const [editEntryId, setEditEntryId] = useState<string | null>(null);
  const [editEntryTitle, setEditEntryTitle] = useState('');
  const [editEntryContent, setEditEntryContent] = useState('');
  const [editEntryTags, setEditEntryTags] = useState<string[]>([]);
  const [isEditEntryDialogOpen, setIsEditEntryDialogOpen] = useState(false);

  const toggleFavorite = (id: string) => {
    setEntries(entries.map(entry => 
      entry.id === id 
        ? { ...entry, isFavorite: !entry.isFavorite } 
        : entry
    ));
  };

  const deleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const handleCreateEntry = () => {
    if (!newEntryContent.trim()) return;
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntryTitle.trim() || 'Untitled Entry',
      content: newEntryContent,
      timestamp: new Date(),
      tags: newEntryTags,
      isFavorite: false
    };
    
    setEntries([newEntry, ...entries]);
    setNewEntryTitle('');
    setNewEntryContent('');
    setNewEntryTags([]);
    setIsNewEntryDialogOpen(false);
  };

  const handleEditEntry = () => {
    if (!editEntryContent.trim() || !editEntryId) return;
    
    setEntries(entries.map(entry => 
      entry.id === editEntryId 
        ? {
            ...entry,
            title: editEntryTitle.trim() || 'Untitled Entry',
            content: editEntryContent,
            tags: editEntryTags
          } 
        : entry
    ));
    
    setEditEntryId(null);
    setEditEntryTitle('');
    setEditEntryContent('');
    setEditEntryTags([]);
    setIsEditEntryDialogOpen(false);
  };

  const openEditDialog = (entry: JournalEntry) => {
    setEditEntryId(entry.id);
    setEditEntryTitle(entry.title);
    setEditEntryContent(entry.content);
    setEditEntryTags(entry.tags || []);
    setIsEditEntryDialogOpen(true);
  };

  const toggleTag = (tag: string, currentTags: string[], setTagsFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentTags.includes(tag)) {
      setTagsFn(currentTags.filter(t => t !== tag));
    } else {
      setTagsFn([...currentTags, tag]);
    }
  };

  const filteredEntries = entries
    .filter(entry => {
      // Apply search filter
      if (searchTerm && 
          !entry.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !entry.content.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply tag filter
      if (selectedTags.length > 0 && 
          (!entry.tags || !selectedTags.some(tag => entry.tags?.includes(tag)))) {
        return false;
      }
      
      // Apply favorites filter
      if (showFavoritesOnly && !entry.isFavorite) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

  return (
    <div>
      <div className="flex justify-center mb-4">
        <div className="bg-soft-blush/50 p-3 rounded-lg max-w-md text-center">
          <p className="text-midnight-indigo text-sm">
            Just need to get it out? This space is only for you.
          </p>
        </div>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search journal entries..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={showFavoritesOnly ? "bg-mauve-rose/10 text-mauve-rose border-mauve-rose/50" : ""}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <Star className="h-4 w-4 mr-1" />
            {showFavoritesOnly ? "Favorites" : "All Entries"}
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <ListFilter className="h-4 w-4 mr-1" />
                Tags
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter by Tags</DialogTitle>
                <DialogDescription>
                  Select tags to filter your journal entries
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2 py-4">
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"} 
                    className={`cursor-pointer ${
                      selectedTags.includes(tag) 
                        ? "bg-lavender-blue hover:bg-lavender-blue/80" 
                        : "hover:bg-lavender-blue/10"
                    }`}
                    onClick={() => toggleTag(tag, selectedTags, setSelectedTags)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <DialogFooter>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedTags([])}
                >
                  Clear All
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button
            variant="outline"
            size="sm"
            className={viewMode === 'list' ? "bg-mauve-rose/10 text-mauve-rose border-mauve-rose/50" : ""}
            onClick={() => setViewMode(viewMode === 'list' ? 'expanded' : 'list')}
          >
            {viewMode === 'list' ? (
              <>
                <LayoutList className="h-4 w-4 mr-1" />
                List
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4 mr-1" />
                Expanded
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <Dialog open={isNewEntryDialogOpen} onOpenChange={setIsNewEntryDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-lavender-blue hover:bg-lavender-blue/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Journal Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Journal Entry</DialogTitle>
              <DialogDescription>
                Write freely. This space is only for you.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Input
                  placeholder="Entry Title (optional)"
                  value={newEntryTitle}
                  onChange={(e) => setNewEntryTitle(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder="What's on your mind today?"
                  className="min-h-[200px]"
                  value={newEntryContent}
                  onChange={(e) => setNewEntryContent(e.target.value)}
                />
              </div>
              <div>
                <p className="text-sm mb-2">Tags (optional)</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge 
                      key={tag}
                      variant={newEntryTags.includes(tag) ? "default" : "outline"} 
                      className={`cursor-pointer ${
                        newEntryTags.includes(tag) 
                          ? "bg-lavender-blue hover:bg-lavender-blue/80" 
                          : "hover:bg-lavender-blue/10"
                      }`}
                      onClick={() => toggleTag(tag, newEntryTags, setNewEntryTags)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsNewEntryDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateEntry}
                disabled={!newEntryContent.trim()}
                className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
              >
                Save Entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Dialog open={isEditEntryDialogOpen} onOpenChange={setIsEditEntryDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Journal Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Input
                placeholder="Entry Title (optional)"
                value={editEntryTitle}
                onChange={(e) => setEditEntryTitle(e.target.value)}
              />
            </div>
            <div>
              <Textarea
                placeholder="What's on your mind today?"
                className="min-h-[200px]"
                value={editEntryContent}
                onChange={(e) => setEditEntryContent(e.target.value)}
              />
            </div>
            <div>
              <p className="text-sm mb-2">Tags (optional)</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={editEntryTags.includes(tag) ? "default" : "outline"} 
                    className={`cursor-pointer ${
                      editEntryTags.includes(tag) 
                        ? "bg-lavender-blue hover:bg-lavender-blue/80" 
                        : "hover:bg-lavender-blue/10"
                    }`}
                    onClick={() => toggleTag(tag, editEntryTags, setEditEntryTags)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditEntryDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditEntry}
              disabled={!editEntryContent.trim()}
              className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
            >
              Update Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {filteredEntries.length > 0 ? (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
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
      ) : (
        <div className="text-center py-10">
          <p className="text-midnight-indigo text-lg mb-2">
            No journal entries found
          </p>
          <p className="text-midnight-indigo/60">
            Create a new entry to start your journal.
          </p>
        </div>
      )}
    </div>
  );
};

export default JournalEntries;
