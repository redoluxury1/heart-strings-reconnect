
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PhraseOptionProps {
  text: string;
  onFavorite: () => void;
  onCustomize: () => void;
}

const PhraseOption: React.FC<PhraseOptionProps> = ({ text, onFavorite, onCustomize }) => {
  return (
    <div className="bg-soft-blush/20 p-4 rounded-lg mb-4 border border-lavender-blue/20 hover:bg-mauve-rose/5 transition-colors">
      <p className="text-midnight-indigo mb-3 font-light italic hover:text-mauve-rose">{text}</p>
      <div className="flex space-x-2 justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs flex items-center gap-1 border-mauve-rose/50 text-mauve-rose hover:bg-mauve-rose/10"
          onClick={onFavorite}
        >
          <Heart className="h-3.5 w-3.5" />
          <span>Favorite</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs flex items-center gap-1 border-lavender-blue/50 text-lavender-blue hover:bg-lavender-blue/10"
          onClick={onCustomize}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>Customize</span>
        </Button>
      </div>
    </div>
  );
};

// Goal data type
interface Goal {
  id: string;
  title: string;
  phrases: string[];
}

// All available goals with their phrases
const goals: Goal[] = [
  {
    id: 'ask-for-space',
    title: 'Ask for space',
    phrases: [
      "I need a moment to collect my thoughts. Can we take 15 minutes and then come back to this?",
      "I'm feeling overwhelmed right now. I'd like some time to process before we continue.",
      "I want to have this conversation, but I need a short break first so I can be more present."
    ]
  },
  {
    id: 'say-what-hurt',
    title: 'Say what hurt me',
    phrases: [
      "It really hurt when I felt dismissed in that moment.",
      "I'm not trying to attack you—I just felt really small when that happened.",
      "That landed hard for me, and I'm still trying to sort through why."
    ]
  },
  {
    id: 'explain-meant',
    title: 'Explain what I meant',
    phrases: [
      "What I was trying to express earlier was... I think I didn't say it clearly.",
      "I can see how that came across differently than I intended. What I meant was...",
      "Let me try again because I don't think I expressed myself well the first time."
    ]
  },
  {
    id: 'apologize',
    title: 'Apologize',
    phrases: [
      "I'm sorry I hurt you. That wasn't my intention, but I see the impact it had.",
      "I apologize for how I responded. You deserved better than that.",
      "I was wrong to say that. I'm truly sorry, and I'd like to make it right."
    ]
  },
  {
    id: 'express-need',
    title: 'Express a need',
    phrases: [
      "Something I really need in our relationship is... Would that be possible?",
      "It would mean a lot to me if we could... How does that sound to you?",
      "I realize I need more... in moments like this. Could we work on that together?"
    ]
  },
  {
    id: 'ask-question',
    title: 'Ask a question calmly',
    phrases: [
      "I'd like to understand your perspective better. Can you help me see what this looks like from your side?",
      "What was going through your mind when that happened?",
      "What would feel supportive to you right now?"
    ]
  },
  {
    id: 'express-feeling',
    title: 'Say how I feel without blame',
    phrases: [
      "I'm feeling anxious about our conversation, but I still want to work through this.",
      "I notice I'm feeling sad, and I'm trying to understand why.",
      "When that happened, I felt confused about where we stand."
    ]
  }
];

interface PausePhraseToolProps {
  onClose: () => void;
}

const PausePhraseTool: React.FC<PausePhraseToolProps> = ({ onClose }) => {
  const [step, setStep] = useState<'goal-selection' | 'phrase-options'>('goal-selection');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [customPhrase, setCustomPhrase] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const { toast } = useToast();

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
    setStep('phrase-options');
  };

  const handleFavoritePhrase = (phrase: string) => {
    // In a real app, we would save this to user's favorites
    toast({
      title: "Phrase saved to favorites",
      description: "You can access this later in your saved phrases",
    });
  };

  const handleCustomizePhrase = (phrase: string) => {
    setCustomPhrase(phrase);
    setIsCustomizing(true);
  };

  const handleSaveCustomPhrase = () => {
    toast({
      title: "Custom phrase saved",
      description: "Your personalized phrase is ready to use",
    });
    setIsCustomizing(false);
  };

  return (
    <div className="flex flex-col">
      {step === 'goal-selection' ? (
        <>
          <div className="mb-6 text-center">
            <h3 className="text-xl font-cormorant font-medium text-midnight-indigo mb-2">
              What are you trying to say?
            </h3>
            <p className="text-sm text-midnight-indigo/70">
              We'll help you say it clearly—without making things worse.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {goals.map((goal) => (
              <Button
                key={goal.id}
                variant="outline"
                className="flex justify-start border-lavender-blue/40 text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 h-auto py-3 px-4 transition-all"
                onClick={() => handleGoalSelect(goal)}
              >
                {goal.title}
              </Button>
            ))}
          </div>
        </>
      ) : isCustomizing ? (
        <>
          <div className="mb-6">
            <Button
              variant="ghost"
              className="text-midnight-indigo hover:bg-midnight-indigo/5 mb-2"
              onClick={() => setIsCustomizing(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to phrases
            </Button>
            <h3 className="text-xl font-cormorant font-medium text-midnight-indigo mb-2">
              Customize your phrase
            </h3>
          </div>
          
          <textarea
            value={customPhrase}
            onChange={(e) => setCustomPhrase(e.target.value)}
            className="w-full border border-lavender-blue/30 rounded-lg p-3 mb-4 h-32 focus:outline-none focus:ring-1 focus:ring-lavender-blue"
          />
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              className="border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10"
              onClick={() => setIsCustomizing(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
              onClick={handleSaveCustomPhrase}
            >
              Save Phrase
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <Button
              variant="ghost"
              className="text-midnight-indigo hover:bg-midnight-indigo/5 mb-2"
              onClick={() => setStep('goal-selection')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to goals
            </Button>
            <h3 className="text-xl font-cormorant font-medium text-midnight-indigo mb-2">
              Try saying it like this...
            </h3>
          </div>
          
          {selectedGoal && selectedGoal.phrases.map((phrase, index) => (
            <PhraseOption
              key={index}
              text={phrase}
              onFavorite={() => handleFavoritePhrase(phrase)}
              onCustomize={() => handleCustomizePhrase(phrase)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default PausePhraseTool;
