
import React from 'react';
import { Button } from '@/components/ui/button';

interface AlternativeOptionProps {
  alternative: string;
  onFavorite: () => void;
  onCustomize: () => void;
}

const AlternativeOption: React.FC<AlternativeOptionProps> = ({ 
  alternative,
  onFavorite,
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
          className="text-xs text-lavender-blue hover:bg-lavender-blue/10"
          onClick={onFavorite}
        >
          Favorite
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs text-lavender-blue hover:bg-lavender-blue/10"
          onClick={onCustomize}
        >
          Customize
        </Button>
      </div>
    </div>
  );
};

export default AlternativeOption;
