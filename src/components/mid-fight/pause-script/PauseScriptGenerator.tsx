
import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Script {
  title: string;
  script: string;
  tone: string;
}

interface GeneratedScripts {
  scripts: Script[];
  tip: string;
}

const PauseScriptGenerator: React.FC = () => {
  const { toast } = useToast();
  const [situation, setSituation] = useState('');
  const [emotion, setEmotion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scripts, setScripts] = useState<GeneratedScripts | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const quickEmotions = [
    'Overwhelmed',
    'Frustrated',
    'Hurt',
    'Anxious',
    'Shutting down',
    'Need space'
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-pause-script', {
        body: { 
          situation: situation || undefined,
          emotion: emotion || undefined,
          goal: 'to pause the conversation respectfully without making things worse'
        }
      });

      if (error) {
        throw error;
      }

      setScripts(data);
    } catch (error) {
      console.error('Error generating scripts:', error);
      toast({
        title: 'Unable to generate scripts',
        description: 'Please try again in a moment.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (script: string, index: number) => {
    await navigator.clipboard.writeText(script);
    setCopiedIndex(index);
    toast({
      title: 'Copied to clipboard',
      description: 'Practice saying it out loud before your conversation.'
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleReset = () => {
    setScripts(null);
    setSituation('');
    setEmotion('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/10 mt-6 mb-10">
      {/* Header */}
      <div className="text-center my-6">
        <h2 className="text-4xl md:text-5xl font-cormorant text-[#5d4357] font-medium">
          Pause Script Generator
        </h2>
        <p className="text-lg md:text-xl text-[#5d4357] mt-3 mb-6">
          Find the right words to pause a conflict with care.
        </p>
      </div>

      {!scripts ? (
        <div className="max-w-lg mx-auto space-y-6">
          {/* Situation Input */}
          <div>
            <label className="block text-sm font-medium text-[#5d4357] mb-2">
              What's happening? (optional)
            </label>
            <Textarea
              placeholder="We're arguing about household responsibilities..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="border-[#d9cdc8] focus:border-[#D3876A] min-h-[80px]"
            />
          </div>

          {/* Emotion Selection */}
          <div>
            <label className="block text-sm font-medium text-[#5d4357] mb-2">
              How are you feeling?
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {quickEmotions.map((em) => (
                <button
                  key={em}
                  onClick={() => setEmotion(em)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    emotion === em
                      ? 'bg-[#D3876A] text-white'
                      : 'bg-[#f7e0dc] text-[#5d4357] hover:bg-[#e7c6c0]'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or type your own..."
              value={quickEmotions.includes(emotion) ? '' : emotion}
              onChange={(e) => setEmotion(e.target.value)}
              className="w-full px-3 py-2 border border-[#d9cdc8] rounded-lg focus:border-[#D3876A] focus:outline-none text-sm"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-[#5d4357] hover:bg-[#5d4357]/90 text-white rounded-full py-6"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Pause Scripts
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Generated Scripts */}
          <div className="space-y-4">
            {scripts.scripts.map((script, index) => (
              <div 
                key={index}
                className="bg-[#FDFBF9] rounded-lg border border-[#E8DAD3] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-[#D3876A]" />
                    <span className="font-medium text-[#5d4357]">{script.title}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-[#D3876A]/10 text-[#D3876A] rounded-full">
                    {script.tone}
                  </span>
                </div>
                <p className="text-[#3A3A3A] mb-4 italic">"{script.script}"</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(script.script, index)}
                  className="border-[#5d4357] text-[#5d4357]"
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
            ))}
          </div>

          {/* Tip */}
          {scripts.tip && (
            <div className="bg-[#5d4357]/5 rounded-lg p-4 text-center">
              <p className="text-sm text-[#5d4357]">
                💡 <strong>Tip:</strong> {scripts.tip}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-[#5d4357] text-[#5d4357]"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate New Scripts
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PauseScriptGenerator;
