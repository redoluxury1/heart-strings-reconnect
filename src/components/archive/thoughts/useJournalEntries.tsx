
import { useState } from 'react';
import { JournalEntry } from '@/types/archive';

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

export const allTags = ['breakthrough', 'finances', 'conflict', 'communication', 'grateful', 'connection'];

export const useJournalEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [viewMode, setViewMode] = useState<'list' | 'expanded'>('list');
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

  return {
    filteredEntries,
    viewMode,
    searchTerm,
    setSearchTerm,
    showFavoritesOnly,
    setShowFavoritesOnly,
    toggleFavorite,
    deleteEntry,
    openEditDialog,
    newEntryTitle,
    setNewEntryTitle,
    newEntryContent,
    setNewEntryContent,
    newEntryTags,
    setNewEntryTags,
    isNewEntryDialogOpen,
    setIsNewEntryDialogOpen,
    handleCreateEntry,
    editEntryTitle,
    setEditEntryTitle,
    editEntryContent,
    setEditEntryContent,
    editEntryTags,
    setEditEntryTags,
    isEditEntryDialogOpen,
    setIsEditEntryDialogOpen,
    handleEditEntry,
    toggleTag
  };
};
