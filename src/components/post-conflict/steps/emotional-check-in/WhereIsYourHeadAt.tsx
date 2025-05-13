
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { useToast } from '@/hooks/use-toast';

interface EmotionChip {
  id: string;
  label: string;
  category: string;
}

interface WhereIsYourHeadAtProps {
  onComplete?: () => void;
  onBack?: () => void;
}

const WhereIsYourHeadAt: React.FC<WhereIsYourHeadAtProps> = ({ onComplete, onBack }) => {
  const { toast } = useToast();
  const { setCurrentStep } = useSession();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [customEmotion, setCustomEmotion] = useState('');
  const [customEmotions, setCustomEmotions] = useState<EmotionChip[]>([]);
  const maxSelections = 5;

  const emotionCategories = [
    {
      name: 'OVERWHELMED',
      emotions: [
        { id: 'anxious', label: 'anxious', category: 'overwhelmed' },
        { id: 'chaotic', label: 'chaotic', category: 'overwhelmed' },
        { id: 'stressed', label: 'stressed', category: 'overwhelmed' }
      ]
    },
    {
      name: 'HURT',
      emotions: [
        { id: 'rejected', label: 'rejected', category: 'hurt' },
        { id: 'betrayed', label: 'betrayed', category: 'hurt' },
        { id: 'guilty', label: 'guilty', category: 'hurt' },
        { id: 'wounded', label: 'wounded', category: 'hurt' },
        { id: 'sad', label: 'sad', category: 'hurt' }
      ]
    },
    {
      name: 'SHUT DOWN',
      emotions: [
        { id: 'numb', label: 'numb', category: 'shut-down' },
        { id: 'withdrawn', label: 'withdrawn', category: 'shut-down' },
        { id: 'unheard', label: 'unheard', category: 'shut-down' }
      ]
    },
    {
      name: 'FRUSTRATED',
      emotions: [
        { id: 'misunderstood', label: 'misunderstood', category: 'frustrated' },
        { id: 'angry', label: 'angry', category: 'frustrated' },
        { id: 'irritated', label: 'irritated', category: 'frustrated' }
      ]
    }
  ];

  const handleEmotionToggle = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      setSelectedEmotions(selectedEmotions.filter(id => id !== emotionId));
    } else {
      if (selectedEmotions.length >= maxSelections) {
        toast({
          title: "Maximum selections reached",
          description: `You can only select up to ${maxSelections} emotions.`,
        });
        return;
      }
      setSelectedEmotions([...selectedEmotions, emotionId]);
    }
  };

  const handleAddCustomEmotion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmotion.trim()) return;
    
    // Check if maximum selections would be exceeded
    if (selectedEmotions.length + 1 > maxSelections) {
      toast({
        title: "Maximum selections reached",
        description: `You can only select up to ${maxSelections} emotions.`,
      });
      return;
    }

    const newCustomEmotion = {
      id: `custom-${Date.now()}`,
      label: customEmotion.toLowerCase().trim(),
      category: 'custom'
    };

    setCustomEmotions([...customEmotions, newCustomEmotion]);
    setSelectedEmotions([...selectedEmotions, newCustomEmotion.id]);
    setCustomEmotion('');
  };

  const handleNext = () => {
    if (selectedEmotions.length === 0) {
      toast({
        title: "Select at least one emotion",
        description: "Please select at least one emotion to continue.",
      });
      return;
    }

    // Here you would typically save the selected emotions to your state
    console.log("Selected emotions:", selectedEmotions);
    
    // Fixed: Now setting a fixed number instead of using a function
    setCurrentStep(3);
    
    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    setCurrentStep(1);
  };

  // Function to get all emotions (predefined + custom)
  const getAllEmotions = () => {
    const predefinedEmotions = emotionCategories.flatMap(category => category.emotions);
    return [...predefinedEmotions, ...customEmotions];
  };

  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <Heart className="h-7 w-7 text-[#D3876A] animate-gentle-pulse" />
        </div>

        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-3 text-center">
          Where's Your Head At?
        </h2>

        {/* Subheading */}
        <p className="text-center text-[#3A3A3A] mb-8">
          Emotions run deep—let's name what came up for you.
        </p>

        {/* Selected count */}
        <div className="text-sm text-[#555555] mb-6">
          Selected: {selectedEmotions.length}/{maxSelections}
        </div>

        {/* Emotion Categories */}
        <div className="w-full space-y-6">
          {emotionCategories.map((category) => (
            <div key={category.name} className="w-full">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#555555] mb-3">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.emotions.map((emotion) => (
                  <button
                    key={emotion.id}
                    onClick={() => handleEmotionToggle(emotion.id)}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      selectedEmotions.includes(emotion.id)
                        ? 'bg-[#85607D] text-white scale-105'
                        : 'bg-transparent border border-[#C4B9B2] text-[#2C2C2C] hover:bg-[#C4B9B2]/20'
                    }`}
                  >
                    {emotion.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Custom emotions section */}
          {customEmotions.length > 0 && (
            <div className="w-full">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#555555] mb-3">
                YOUR ADDITIONS
              </h3>
              <div className="flex flex-wrap gap-2">
                {customEmotions.map((emotion) => (
                  <button
                    key={emotion.id}
                    onClick={() => handleEmotionToggle(emotion.id)}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      selectedEmotions.includes(emotion.id)
                        ? 'bg-[#85607D] text-white scale-105'
                        : 'bg-transparent border border-[#C4B9B2] text-[#2C2C2C] hover:bg-[#C4B9B2]/20'
                    }`}
                  >
                    {emotion.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom emotion input */}
          <div className="mt-6">
            <p className="text-sm text-[#555555] mb-2">Didn't see yours? Add your own.</p>
            <form onSubmit={handleAddCustomEmotion} className="flex gap-2">
              <Input
                type="text"
                value={customEmotion}
                onChange={(e) => setCustomEmotion(e.target.value)}
                placeholder="Write your own..."
                className="bg-[#F5F2F0] border-[#D9B9AF] rounded-xl"
                disabled={selectedEmotions.length >= maxSelections}
              />
              <Button 
                type="submit" 
                variant="outline"
                className="border-[#D9B9AF] text-[#555555]"
                disabled={!customEmotion.trim() || selectedEmotions.length >= maxSelections}
              >
                Add
              </Button>
            </form>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex w-full justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-[#D9B9AF] text-[#3A3A3A] hover:bg-[#F8F5F3]"
          >
            Back
          </Button>
          <Button
            className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full px-6"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhereIsYourHeadAt;
