
import React, { useState, useMemo } from 'react';
import { Search, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { SayItBetterPhrase, getFilteredPhrases, getAllCategories } from '@/data/say-it-better-data';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CustomizePhraseView from '@/components/mid-fight/CustomizePhraseView';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ConversationDialog from '@/components/mid-fight/ConversationDialog';

interface SayItBetterProps {
  allowSave?: boolean;
}

const SayItBetter: React.FC<SayItBetterProps> = ({ allowSave = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedPhraseId, setExpandedPhraseId] = useState<string | null>(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState<SayItBetterPhrase | null>(null);
  const [customizedPhrase, setCustomizedPhrase] = useState('');
  const { toast } = useToast();
  
  const categories = useMemo(() => getAllCategories(), []);
  const filteredPhrases = useMemo(() => 
    getFilteredPhrases(searchTerm, selectedCategory),
    [searchTerm, selectedCategory]
  );
  
  const handlePhraseClick = (phraseId: string) => {
    setExpandedPhraseId(expandedPhraseId === phraseId ? null : phraseId);
  };

  const handleCustomize = (phrase: SayItBetterPhrase) => {
    setCurrentPhrase(phrase);
    setCustomizedPhrase(phrase.trySayingInstead);
    setIsCustomizeOpen(true);
  };
  
  const handleStartConversation = () => {
    setIsCustomizeOpen(false);
    setIsConversationOpen(true);
  };
  
  const handleSavePhrase = (phrase: SayItBetterPhrase) => {
    // In a real app, this would save to local storage or database
    toast({
      title: "Phrase Saved",
      description: "This phrase has been saved to your collection.",
    });
    
    // For now, just log it
    console.log('Saved phrase:', phrase);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-midnight-indigo mb-3">
          Say It Better
        </h3>
        <p className="text-sm text-midnight-indigo/70 mb-4">
          Find better ways to express difficult feelings without causing harm
        </p>
      </div>
      
      {/* Search and filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search phrases..."
            className="pl-9 bg-white border-lavender-blue/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="bg-white border-lavender-blue/30">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Results */}
      {filteredPhrases.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-md text-center">
          <p className="text-gray-500">No phrases found matching your search</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-auto pr-1">
          {filteredPhrases.map(phrase => (
            <Card 
              key={phrase.id} 
              className={`border-lavender-blue/20 shadow-sm transition-all ${expandedPhraseId === phrase.id ? 'bg-lavender-blue/5' : 'bg-white'}`}
            >
              <div className="p-4">
                {/* Phrase header */}
                <div 
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => handlePhraseClick(phrase.id)}
                >
                  <div>
                    <h4 className="font-medium text-midnight-indigo mb-1">"{phrase.original}"</h4>
                    <p className="text-sm text-gray-600">{phrase.emotionalSubtext}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    {expandedPhraseId === phrase.id ? '−' : '+'}
                  </Button>
                </div>
                
                {/* Expanded content */}
                {expandedPhraseId === phrase.id && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <div>
                      <h5 className="text-sm font-medium text-mauve-rose mb-1">How It Might Land:</h5>
                      <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100">
                        {phrase.howItMightLand}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-lavender-blue mb-1">Try Saying Instead:</h5>
                      <p className="text-sm bg-lavender-blue/10 p-3 rounded border border-lavender-blue/20">
                        "{phrase.trySayingInstead}"
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {phrase.categories.map(category => (
                        <span 
                          key={category} 
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs flex items-center"
                        onClick={() => handleCustomize(phrase)}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1.5" />
                        Customize
                      </Button>
                      
                      {allowSave && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleSavePhrase(phrase)}
                        >
                          Save for Later
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Customize phrase dialog */}
      <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
        <DialogContent className="sm:max-w-md">
          {currentPhrase && (
            <CustomizePhraseView
              customPhrase={customizedPhrase}
              onCustomPhraseChange={setCustomizedPhrase}
              onBackToTopics={() => setIsCustomizeOpen(false)}
              onStartConversation={handleStartConversation}
              showSaveOption={allowSave}
              onSaveToLibrary={() => {
                if (currentPhrase) handleSavePhrase(currentPhrase);
                setIsCustomizeOpen(false);
              }}
              isFromSayThisInstead={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Conversation dialog */}
      <ConversationDialog
        isOpen={isConversationOpen}
        onOpenChange={setIsConversationOpen}
        partnerName="Partner" 
        onSendInvite={() => {
          console.log('Sending conversation invite with phrase:', customizedPhrase);
          // In a real app, this would send the invite
          toast({
            title: "Conversation Started",
            description: "We've sent your partner a notification to start the conversation.",
          });
        }}
      />
    </div>
  );
};

export default SayItBetter;
