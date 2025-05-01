
import React from 'react';

interface EmotionSummaryViewProps {
  emotions: string[];
  partnerEmotions: string[] | null;
  emotionalInsight: string | null;
}

const EmotionSummaryView: React.FC<EmotionSummaryViewProps> = ({ 
  emotions, 
  partnerEmotions,
  emotionalInsight
}) => {
  return (
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
        
        {partnerEmotions && (
          <div className="bg-soft-cream/30 p-5 rounded-lg animate-fade-in">
            <h3 className="font-medium mb-3 text-midnight-indigo">Your partner's emotions:</h3>
            <div className="flex flex-wrap gap-2">
              {partnerEmotions.map(emotion => (
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
  );
};

export default EmotionSummaryView;
