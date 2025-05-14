
import React from 'react';
import { Edit, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlternativeOptionProps {
  alternative: string;
  onCustomize: () => void;
  onSaveToLibrary: () => void;
}

const AlternativeOption: React.FC<AlternativeOptionProps> = ({ 
  alternative, 
  onCustomize,
  onSaveToLibrary 
}) => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <p className="text-sm text-midnight-indigo mb-2">"{alternative}"</p>
      <div className="flex flex-wrap gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-lavender-blue text-lavender-blue hover:bg-lavender-blue/10"
          onClick={onCustomize}
        >
          <Edit className="h-3 w-3 mr-1" />
          Customize
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-mauve-rose text-mauve-rose hover:bg-mauve-rose/10"
          onClick={onSaveToLibrary}
        >
          <BookmarkPlus className="h-3 w-3 mr-1" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default AlternativeOption;
