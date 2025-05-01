
import React, { useState, useMemo } from 'react';
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

  // Map emotions to insights
  const emotionalInsight = useMemo(() => {
    if (emotions.length === 0) return null;
    
    const insights: Record<string, string> = {
      'anger': "Anger often masks hurt or fear. When we feel threatened or violated, anger can be our shield.",
      'sadness': "Sadness helps us process loss and change. It's your heart's way of acknowledging what matters to you.",
      'fear': "Fear signals that something important feels at risk. Behind it is often a deep care for what might be lost.",
      'shame': "Shame can be a belief that we are fundamentally flawed. Sharing it often reveals we're more alike than different.",
      'hurt': "Hurt often comes when something we value feels damaged. It shows how much you care.",
      'overwhelmed': "Feeling overwhelmed happens when we've reached our capacity. It's your system asking for support or space.",
      'rejected': "Feeling rejected can stem from a deep need for acceptance or closeness. It often signals a fear of not being chosen.",
      'misunderstood': "Being misunderstood can feel isolating. It often reveals a desire to be truly seen by those who matter to us.",
      'frustrated': "Frustration emerges when our efforts are blocked. It shows your determination to reach something valuable.",
      'anxious': "Anxiety often points to how much you care about what might happen. It's protective in nature.",
      'disappointed': "Disappointment reflects the gap between our hopes and reality. It reveals what matters most to you.",
      'betrayed': "Feelings of betrayal reveal how deeply you trusted. The pain reflects the value of the trust that was broken.",
      'guilty': "Guilt, while uncomfortable, can reflect your moral compass and desire to honor your values."
    };

    // Multiple emotions logic
    if (emotions.length > 1) {
      if (emotions.includes('hurt') && emotions.includes('frustrated')) {
        return "Hurt often hides beneath frustration - it can mean you care more than you're letting on.";
      }
      if (emotions.includes('angry') && emotions.includes('sad')) {
        return "When anger and sadness mix, it often means something very important to you has been damaged.";
      }
      if (emotions.includes('rejected') && emotions.includes('anxious')) {
        return "The combination of feeling rejected and anxious often reveals a deep need for security and belonging.";
      }
      
      // Default to the insight for the first emotion if we don't have a specific combo insight
      return insights[emotions[0]] || null;
    }
    
    // Single emotion
    return insights[emotions[0]] || null;
    
  }, [emotions]);
  
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
                  ? 'bg-mauve-rose text-white hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:text-mauve-rose'
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
              className="bg-midnight-indigo/20 hover:bg-midnight-indigo/30 text-midnight-indigo hover:text-midnight-indigo"
              disabled={!customEmotion.trim()}
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>
          
          {emotions.length > 0 && emotionalInsight && (
            <div className="mb-8 p-4 bg-soft-blush/60 rounded-lg text-center text-midnight-indigo italic">
              {emotionalInsight}
            </div>
          )}
          
          <div className="text-center">
            <Button 
              onClick={handleSubmit}
              className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white px-8"
              disabled={emotions.length === 0}
            >
              Continue
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

          {emotionalInsight && (
            <div className="mt-6 p-4 bg-soft-blush/60 rounded-lg text-center text-midnight-indigo italic">
              {emotionalInsight}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmotionalCheckIn;
