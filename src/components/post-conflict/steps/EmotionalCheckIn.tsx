
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface EmotionalCheckInProps {
  onResponse: (emotions: string[]) => void;
  selectedEmotions: string[] | null;
  partner2Emotions: string[] | null;
}

const EmotionalCheckIn: React.FC<EmotionalCheckInProps> = ({ 
  onResponse, 
  selectedEmotions,
  partner2Emotions 
}) => {
  const [emotions, setEmotions] = useState<string[]>(selectedEmotions || []);
  const [customEmotion, setCustomEmotion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(!!selectedEmotions);
  
  const emotionOptions = [
    'anger', 'sadness', 'fear', 'shame', 'hurt', 
    'overwhelmed', 'rejected', 'misunderstood', 'frustrated',
    'anxious', 'disappointed', 'betrayed', 'guilty'
  ];
  
  const handleEmotionToggle = (emotion: string) => {
    if (emotions.includes(emotion)) {
      setEmotions(emotions.filter(e => e !== emotion));
    } else {
      setEmotions([...emotions, emotion]);
    }
  };
  
  const handleAddCustom = () => {
    if (customEmotion.trim() && !emotions.includes(customEmotion.trim())) {
      setEmotions([...emotions, customEmotion.trim()]);
      setCustomEmotion('');
    }
  };
  
  const handleSubmit = () => {
    if (emotions.length > 0) {
      onResponse(emotions);
      setIsSubmitted(true);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-3 text-center">
        Emotional Check-In
      </h2>
      
      <p className="text-center text-gray-700 mb-6">
        What emotions came up for you during the fight?
      </p>
      
      {!isSubmitted ? (
        <>
          <div className="flex flex-wrap gap-2 mb-6 max-w-2xl mx-auto">
            {/* Standard emotion buttons and custom emotions that have been added */}
            {[...emotionOptions, ...emotions.filter(e => !emotionOptions.includes(e))].map(emotion => (
              <Button
                key={emotion}
                type="button"
                variant={emotions.includes(emotion) ? 'default' : 'outline'}
                className={emotions.includes(emotion) 
                  ? 'bg-blue-500 text-white' 
                  : 'border-gray-300 text-gray-700'
                }
                onClick={() => handleEmotionToggle(emotion)}
              >
                {emotions.includes(emotion) && <Check className="mr-1 h-4 w-4" />}
                {emotion}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 mb-8 max-w-lg mx-auto">
            <Input
              placeholder="Add your own emotion..."
              value={customEmotion}
              onChange={(e) => setCustomEmotion(e.target.value)}
              className="flex-grow"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustom();
                }
              }}
            />
            <Button
              onClick={handleAddCustom}
              variant="outline"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!customEmotion.trim()}
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              disabled={emotions.length === 0}
            >
              Share
            </Button>
          </div>
        </>
      ) : (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-soft-blush/20 p-5 rounded-lg">
              <h3 className="font-medium mb-3 text-midnight-indigo">Your emotions:</h3>
              <div className="flex flex-wrap gap-2">
                {emotions.map(emotion => (
                  <span
                    key={emotion}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
            
            {partner2Emotions && (
              <div className="bg-soft-cream/30 p-5 rounded-lg animate-fade-in">
                <h3 className="font-medium mb-3 text-midnight-indigo">Your partner's emotions:</h3>
                <div className="flex flex-wrap gap-2">
                  {partner2Emotions.map(emotion => (
                    <span
                      key={emotion}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionalCheckIn;
