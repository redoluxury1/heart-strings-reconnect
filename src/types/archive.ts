
export interface SavedRephrase {
  id: string;
  originalPhrase: string;
  rephraseText: string;
  dateSaved: string;
  category?: string;
  isFavorite: boolean;
}

export interface LoveNoteArchive {
  id: string;
  prompt: string;
  message: string;
  timestamp: Date;
  isFavorite: boolean;
  reaction?: 'heart' | 'star' | 'smile' | null;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  tags?: string[];
  isFavorite: boolean;
}

export type ViewMode = 'list' | 'expanded';

export interface SaveToastOptions {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
}
