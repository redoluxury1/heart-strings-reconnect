
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Flag, Sparkles, Copy, Check, RefreshCw, Heart, MessageSquare, Hand } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Draft {
  message: string;
  approach: string;
}

interface GeneratedDrafts {
  drafts: Draft[];
  advice: string;
}

interface WhiteFlagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const messageTypes = [
  { 
    id: 'apology', 
    label: 'Apologize', 
    icon: Hand,
    description: 'Take ownership and express regret'
  },
  { 
    id: 'peace-offering', 
    label: 'Peace Offering', 
    icon: Flag,
    description: 'Extend an olive branch'
  },
  { 
    id: 'needs', 
    label: 'Express Needs', 
    icon: Heart,
    description: 'Share what you need gently'
  }
];

const WhiteFlagModal: React.FC<WhiteFlagModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>('peace-offering');
  const [context, setContext] = useState('');
  const [feeling, setFeeling] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [drafts, setDrafts] = useState<GeneratedDrafts | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [customDraft, setCustomDraft] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-white-flag', {
        body: { 
          type: selectedType,
          context: context || undefined,
          feeling: feeling || undefined
        }
      });

      if (error) {
        throw error;
      }

      setDrafts(data);
    } catch (error) {
      console.error('Error generating drafts:', error);
      toast({
        title: 'Unable to generate drafts',
        description: 'Please try again in a moment.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (message: string, index: number) => {
    await navigator.clipboard.writeText(message);
    setCopiedIndex(index);
    toast({
      title: 'Copied to clipboard',
      description: 'Practice saying it out loud before sharing with your partner.'
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSelectDraft = (message: string) => {
    setCustomDraft(message);
    toast({
      title: 'Draft selected',
      description: 'You can edit it below to make it your own.'
    });
  };

  const handleReset = () => {
    setDrafts(null);
    setContext('');
    setFeeling('');
    setCustomDraft('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-[#F9F6F2] border-[#E8DAD3] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#D3876A]/10 rounded-full h-10 w-10 flex items-center justify-center">
              <Flag className="h-5 w-5 text-[#D3876A]" />
            </div>
            <DialogTitle className="font-cormorant text-xl font-medium text-[#2C2C2C]">
              Draft Your White Flag
            </DialogTitle>
          </div>
          <DialogDescription className="text-[#3A3A3A] text-base">
            Let's help you find the right words to reconnect with your partner.
          </DialogDescription>
        </DialogHeader>

        {!drafts ? (
          <div className="space-y-5 py-4">
            {/* Message Type Selection */}
            <div>
              <p className="text-sm text-[#65595D] mb-3">What do you want to express?</p>
              <div className="grid grid-cols-3 gap-2">
                {messageTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedType === type.id
                        ? 'border-[#D3876A] bg-[#D3876A]/5'
                        : 'border-[#E8DAD3] bg-white hover:border-[#D3876A]/50'
                    }`}
                  >
                    <type.icon className={`h-5 w-5 mx-auto mb-1 ${
                      selectedType === type.id ? 'text-[#D3876A]' : 'text-[#65595D]'
                    }`} />
                    <span className={`text-xs font-medium ${
                      selectedType === type.id ? 'text-[#D3876A]' : 'text-[#3A3A3A]'
                    }`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Context */}
            <div>
              <label className="block text-sm text-[#65595D] mb-2">
                What happened? (optional)
              </label>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="We argued about plans this weekend..."
                className="border-[#E8DAD3] focus:border-[#D3876A] min-h-[60px] text-sm"
              />
            </div>

            {/* Feeling */}
            <div>
              <label className="block text-sm text-[#65595D] mb-2">
                How are you feeling now?
              </label>
              <Textarea
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="I miss them and want to make things right..."
                className="border-[#E8DAD3] focus:border-[#D3876A] min-h-[60px] text-sm"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-[#D3876A] hover:bg-[#D3876A]/90 text-white rounded-full py-5"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Drafts
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {/* Generated Drafts */}
            {drafts.drafts.map((draft, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg border border-[#E8DAD3] p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-1 bg-[#D3876A]/10 text-[#D3876A] rounded-full">
                    {draft.approach}
                  </span>
                </div>
                <p className="text-[#3A3A3A] mb-3 italic text-sm">"{draft.message}"</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectDraft(draft.message)}
                    className="border-[#5d4357] text-[#5d4357] text-xs"
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Use This
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(draft.message, index)}
                    className="border-[#E8DAD3] text-[#65595D] text-xs"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}

            {/* Edit/Customize Area */}
            {customDraft && (
              <div className="bg-[#5d4357]/5 rounded-lg p-4">
                <p className="text-sm text-[#5d4357] font-medium mb-2">Make it your own:</p>
                <Textarea
                  value={customDraft}
                  onChange={(e) => setCustomDraft(e.target.value)}
                  className="border-[#5d4357]/20 focus:border-[#5d4357] min-h-[80px] text-sm mb-3"
                />
                <Button
                  size="sm"
                  onClick={() => handleCopy(customDraft, -1)}
                  className="bg-[#5d4357] hover:bg-[#5d4357]/90 text-white text-xs"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy My Version
                </Button>
              </div>
            )}

            {/* Advice */}
            {drafts.advice && (
              <div className="bg-[#D3876A]/5 rounded-lg p-3 text-center">
                <p className="text-xs text-[#D3876A]">
                  💡 <strong>Tip:</strong> {drafts.advice}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1 border-[#E8DAD3] text-[#65595D]"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 bg-[#D3876A] hover:bg-[#D3876A]/90 text-white"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WhiteFlagModal;
