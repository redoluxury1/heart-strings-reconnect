
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, ArrowLeft, SendHorizontal } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

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
  },
  {
    id: 'share-fear',
    title: 'Share a vulnerability',
    phrases: [
      "I'm afraid that if I'm honest about this, you might pull away from me.",
      "It's hard for me to say this, but I'm worried about where we're heading.",
      "I feel scared to bring this up because I don't want to make things worse between us."
    ]
  },
  {
    id: 'acknowledge-pattern',
    title: 'Address a recurring issue',
    phrases: [
      "I notice we keep having the same argument. Can we try something different this time?",
      "I think we're stuck in a pattern here. I want us to find a new way through this together.",
      "This feels familiar—like we've been here before. What can we do differently right now?"
    ]
  },
  {
    id: 'suggest-solution',
    title: 'Suggest a compromise',
    phrases: [
      "What if we both try to meet in the middle? Maybe I could... and you could...",
      "I have an idea that might work for both of us. Would you be open to hearing it?",
      "I think we both want the same thing deep down. Could we try approaching it this way?"
    ]
  },
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
  const [startConversationOpen, setStartConversationOpen] = useState(false);
  const [partnerName, setPartnerName] = useState("your partner"); // In a real app, this would come from user data

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

  const handleStartConversation = () => {
    setStartConversationOpen(true);
  };

  const handleSendInvite = () => {
    toast({
      title: "Conversation request sent",
      description: `${partnerName} will be notified that you want to talk things through.`,
    });
    setStartConversationOpen(false);
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
                <span className="text-sm text-left line-clamp-2">{goal.title}</span>
              </Button>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button
              variant="default"
              className="bg-lavender-blue hover:bg-lavender-blue/90 text-white flex items-center gap-2"
              onClick={handleStartConversation}
            >
              <SendHorizontal className="h-4 w-4" />
              Start Conversation with Partner
            </Button>
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

      {/* Start Conversation Dialog */}
      <Dialog open={startConversationOpen} onOpenChange={setStartConversationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start a conversation</DialogTitle>
            <DialogDescription>
              This will send a notification to {partnerName} that you'd like to talk things through together.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-midnight-indigo/80">
              In-app conversations help both of you communicate more effectively with guidance on rephrasing difficult messages.
            </p>
            
            <div className="bg-soft-blush/20 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">How it works:</p>
              <ul className="text-xs space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-lavender-blue/20 text-lavender-blue rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">1</span>
                  <span>{partnerName} will receive a notification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-lavender-blue/20 text-lavender-blue rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">2</span>
                  <span>Once they join, you can both send messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-lavender-blue/20 text-lavender-blue rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">3</span>
                  <span>The app will suggest kinder ways to phrase difficult messages</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStartConversationOpen(false)}
              className="border-midnight-indigo text-midnight-indigo"
            >
              Cancel
            </Button>
            <Button 
              variant="default"
              className="bg-lavender-blue hover:bg-lavender-blue/90"
              onClick={handleSendInvite}
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PausePhraseTool;
