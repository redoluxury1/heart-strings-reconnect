
import React, { useState, useEffect } from 'react';
import { Book, Heart, BookOpen, Check, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ContentContainer from '../components/common/ContentContainer';
import SavedRephrases from '../components/archive/SavedRephrases';
import LoveNotesArchive from '../components/archive/LoveNotesArchive';
import JournalEntries from '../components/archive/JournalEntries';
import RepairPlansArchive from '../components/archive/RepairPlansArchive';
import JournalBubblesHero from '../components/archive/JournalBubblesHero';
import { useIsMobile } from '../hooks/use-mobile';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Archive = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('saved-rephrases');
  const isMobile = useIsMobile();

  // Set the active tab based on location state if provided
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Map section names to their display values
  const sectionNames = {
    'saved-rephrases': 'Saved Rephrases',
    'love-notes': 'Love Notes',
    'repair-plans': 'Repair Plans',
    'thoughts': 'Thoughts'
  };

  // Icon mapping for each section
  const sectionIcons = {
    'saved-rephrases': <Book className="h-4 w-4" />,
    'love-notes': <Heart className="h-4 w-4" />,
    'repair-plans': <Check className="h-4 w-4" />,
    'thoughts': <BookOpen className="h-4 w-4" />
  };

  // Helper to get active section class
  const getSectionClass = (sectionName) => {
    if (sectionName === 'saved-rephrases') {
      return activeTab === sectionName ? 'bg-midnight-indigo text-white' : 'text-midnight-indigo';
    } else if (sectionName === 'love-notes') {
      return activeTab === sectionName ? 'bg-mauve-rose text-white' : 'text-midnight-indigo';
    } else {
      return activeTab === sectionName ? 'bg-soft-blush text-midnight-indigo' : 'text-midnight-indigo';
    }
  };

  return (
    <div className="min-h-screen bg-[#F1ECE8]">
      <Navbar />
      
      <div className="py-10">
        <ContentContainer>
          <JournalBubblesHero />
          
          <div className="mt-16 w-full">
            {/* Dropdown menu for section selection */}
            <div className="flex justify-center mb-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2 border border-midnight-indigo/30 bg-white"
                  >
                    {sectionIcons[activeTab]}
                    <span>{sectionNames[activeTab]}</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white">
                  <DropdownMenuItem 
                    className={`flex items-center gap-2 py-3 cursor-pointer ${getSectionClass('saved-rephrases')}`}
                    onClick={() => setActiveTab('saved-rephrases')}
                  >
                    <Book className="h-4 w-4" />
                    <span>Saved Rephrases</span>
                    {activeTab !== 'love-notes' && location.state?.newNote && activeTab === 'saved-rephrases' && (
                      <div className="ml-auto bg-mauve-rose text-white text-xs px-2 py-1 rounded-full">
                        New
                      </div>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`flex items-center gap-2 py-3 cursor-pointer ${getSectionClass('love-notes')}`}
                    onClick={() => setActiveTab('love-notes')}
                  >
                    <Heart className="h-4 w-4" />
                    <span>Love Notes</span>
                    {activeTab !== 'love-notes' && location.state?.newNote && (
                      <div className="ml-auto bg-mauve-rose text-white text-xs px-2 py-1 rounded-full">
                        New
                      </div>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={`flex items-center gap-2 py-3 cursor-pointer ${getSectionClass('repair-plans')}`}
                    onClick={() => setActiveTab('repair-plans')}
                  >
                    <Check className="h-4 w-4" />
                    <span>Repair Plans</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={`flex items-center gap-2 py-3 cursor-pointer ${getSectionClass('thoughts')}`}
                    onClick={() => setActiveTab('thoughts')}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Thoughts</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Content for each section */}
            <div>
              {activeTab === 'saved-rephrases' && <SavedRephrases />}
              {activeTab === 'love-notes' && <LoveNotesArchive newNote={location.state?.newNote} />}
              {activeTab === 'repair-plans' && <RepairPlansArchive />}
              {activeTab === 'thoughts' && <JournalEntries />}
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};

export default Archive;
