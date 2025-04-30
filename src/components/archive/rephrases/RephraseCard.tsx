
import React from 'react';
import { format } from 'date-fns';
import { Star, StarOff, Copy } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SavedRephrase } from '@/types/archive';
import { useToast } from "@/hooks/use-toast";

interface RephraseCardProps {
  rephrase: SavedRephrase;
  toggleFavorite: (id: string) => void;
  index: number;
}

const RephraseCard: React.FC<RephraseCardProps> = ({ 
  rephrase,
  toggleFavorite,
  index
}) => {
  const { toast } = useToast();

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Phrase copied to clipboard",
        duration: 2000,
      });
    });
  };

  return (
    <div 
      key={rephrase.id} 
      className="bg-[#fcfbf6] rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.07)] border border-slate-100/80 p-6 animate-fade-in relative"
      style={{
        animationDelay: `${index * 150}ms`,
        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmNmYmY2Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMC4yNSIgZmlsbD0iI2U3ZTVkZSIgZmlsbC1vcGFjaXR5PSIwLjA4Ii8+PC9zdmc+')"
      }}
    >
      <div className="flex justify-between items-start">
        <div className="mb-4 flex items-center gap-3">
          {rephrase.category && (
            <Badge className="bg-soft-blush/30 text-midnight-indigo hover:bg-soft-blush/40 border-none">
              {rephrase.category}
            </Badge>
          )}
          <p className="text-xs text-slate-500">
            {format(new Date(rephrase.dateSaved), 'MMMM d, yyyy')}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-auto ${rephrase.isFavorite ? 'text-mauve-rose' : 'text-gray-400'}`}
            onClick={() => toggleFavorite(rephrase.id)}
          >
            {rephrase.isFavorite ? (
              <Star className="h-5 w-5 fill-mauve-rose" />
            ) : (
              <StarOff className="h-5 w-5" />
            )}
            <span className="sr-only">
              {rephrase.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto text-gray-400"
            onClick={() => handleCopyToClipboard(rephrase.rephraseText)}
          >
            <Copy className="h-5 w-5" />
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-xl md:text-2xl text-midnight-indigo font-cormorant mb-5 leading-relaxed">
          "{rephrase.rephraseText}"
        </p>
        <div className="bg-slate-100/70 rounded-lg p-3 mx-2">
          <p className="text-sm text-slate-600 italic">
            Original: {rephrase.originalPhrase}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RephraseCard;
