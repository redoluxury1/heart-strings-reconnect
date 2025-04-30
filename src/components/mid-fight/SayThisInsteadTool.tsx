
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sayInsteadPhrases, SayInsteadPhrase } from '@/data/say-instead-phrases';

const SayThisInsteadTool = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState<SayInsteadPhrase | null>(null);
  
  // Filter phrases based on search term
  const filteredPhrases = searchTerm.trim() === '' 
    ? sayInsteadPhrases 
    : sayInsteadPhrases.filter(phrase => 
        phrase.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phrase.categories.some(category => 
          category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-2">
          Say This Instead
        </h3>
        <p className="text-midnight-indigo/80 mb-4">
          Turn common conflict phrases into calmer alternatives that keep the conversation productive.
        </p>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="h-4 w-4 absolute top-3 left-3 text-midnight-indigo/50" />
        <Input
          type="text"
          placeholder="Search by phrase or category (e.g., 'listen', 'dismissive'...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white border-lavender-blue/30 focus:border-lavender-blue"
        />
      </div>
      
      {/* Results display */}
      <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
        {selectedPhrase ? (
          <div className="bg-soft-blush/30 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-lg text-midnight-indigo">"{selectedPhrase.original}"</h4>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedPhrase(null)} 
                className="text-xs text-lavender-blue hover:text-lavender-blue/80"
              >
                Back to list
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {selectedPhrase.categories.map((category, index) => (
                <Badge key={index} variant="outline" className="bg-white/50 text-midnight-indigo/70 border-lavender-blue/20">
                  {category}
                </Badge>
              ))}
            </div>
            
            <div className="space-y-3 mb-3">
              <p className="font-medium text-midnight-indigo">Say this instead:</p>
              {selectedPhrase.alternatives.map((alternative, index) => (
                <div 
                  key={index} 
                  className="group bg-white p-3 rounded border border-lavender-blue/10 hover:border-lavender-blue/30 transition-all"
                >
                  <p className="text-midnight-indigo group-hover:text-mauve-rose transition-colors">
                    "{alternative}"
                  </p>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs text-lavender-blue hover:bg-lavender-blue/10"
                    >
                      Favorite
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs text-lavender-blue hover:bg-lavender-blue/10"
                    >
                      Customize
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white/70 p-3 rounded-lg mt-4">
              <p className="text-sm text-midnight-indigo/80">
                <span className="font-medium">Why this works:</span> {selectedPhrase.whyItWorks}
              </p>
            </div>
          </div>
        ) : (
          filteredPhrases.length > 0 ? (
            filteredPhrases.map((phrase) => (
              <div 
                key={phrase.id}
                onClick={() => setSelectedPhrase(phrase)}
                className="bg-white p-4 rounded-lg border border-lavender-blue/10 cursor-pointer hover:border-lavender-blue/30 transition-all hover:shadow-sm"
              >
                <p className="font-medium text-midnight-indigo mb-2">"{phrase.original}"</p>
                <div className="flex flex-wrap gap-1">
                  {phrase.categories.slice(0, 2).map((category, index) => (
                    <Badge key={index} variant="outline" className="bg-white/50 text-midnight-indigo/70 border-lavender-blue/20">
                      {category}
                    </Badge>
                  ))}
                  {phrase.categories.length > 2 && (
                    <Badge variant="outline" className="bg-white/50 text-midnight-indigo/70 border-lavender-blue/20">
                      +{phrase.categories.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-midnight-indigo/60">No phrases match your search.</p>
              <p className="text-midnight-indigo/60">Try another term or category.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SayThisInsteadTool;
