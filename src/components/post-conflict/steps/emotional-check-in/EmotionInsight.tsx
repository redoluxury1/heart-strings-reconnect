
import React from 'react';

interface EmotionInsightProps {
  emotions: string[];
}

const EmotionInsight: React.FC<EmotionInsightProps> = ({ emotions }) => {
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
      return (
        <div className="mb-8 p-4 bg-soft-blush/60 rounded-lg text-center text-midnight-indigo italic">
          Hurt often hides beneath frustration - it can mean you care more than you're letting on.
        </div>
      );
    }
    if (emotions.includes('angry') && emotions.includes('sad')) {
      return (
        <div className="mb-8 p-4 bg-soft-blush/60 rounded-lg text-center text-midnight-indigo italic">
          When anger and sadness mix, it often means something very important to you has been damaged.
        </div>
      );
    }
    if (emotions.includes('rejected') && emotions.includes('anxious')) {
      return (
        <div className="mb-8 p-4 bg-soft-blush/60 rounded-lg text-center text-midnight-indigo italic">
          The combination of feeling rejected and anxious often reveals a deep need for security and belonging.
        </div>
      );
    }
    
    // Default to the insight for the first emotion if we don't have a specific combo insight
    if (insights[emotions[0]]) {
      return (
        <div className="mb-8 p-4 bg-soft-blush/60 rounded-lg text-center text-midnight-indigo italic">
          {insights[emotions[0]]}
        </div>
      );
    }
    
    return null;
  }
  
  // Single emotion
  if (insights[emotions[0]]) {
    return (
      <div className="mb-8 p-4 bg-soft-blush/60 rounded-lg text-center text-midnight-indigo italic">
        {insights[emotions[0]]}
      </div>
    );
  }
  
  return null;
};

export default EmotionInsight;
