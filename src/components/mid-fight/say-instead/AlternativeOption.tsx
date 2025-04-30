
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, BookmarkPlus } from 'lucide-react';

interface AlternativeOptionProps {
  alternative: string;
  onSaveToLibrary: () => void;
  onCustomize: () => void;
}

const AlternativeOption: React.FC<AlternativeOptionProps> = ({ 
  alternative,
  onSaveToLibrary,
  onCustomize
}) => {
  return (
    <div className="group bg-white p-3 rounded border border-lavender-blue/10 hover:border-lavender-blue/30 transition-all">
      <p className="text-midnight-indigo group-hover:text-mauve-rose transition-colors">
        "{alternative}"
      </p>
      <div className="flex justify-end gap-2 mt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs text-lavender-blue hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/50"
          onClick={onSaveToLibrary}
        >
          <BookmarkPlus className="h-3.5 w-3.5 mr-1" />
          Save
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs text-lavender-blue hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/50"
          onClick={onCustomize}
        >
          <Edit className="h-3.5 w-3.5 mr-1" />
          Customize
        </Button>
      </div>
    </div>
  );
};

export default AlternativeOption;
