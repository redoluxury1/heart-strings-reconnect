
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
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-medium mb-2 text-[#2e2a63]">Your emotions:</h3>
          <div className="flex flex-wrap gap-2">
            {emotions.map(emotion => (
              <span
                key={emotion}
                className="bg-[#7b4b69] text-white px-3 py-1 rounded-full text-sm"
              >
                {emotion}
              </span>
            ))}
          </div>
        </div>
        
        {partnerEmotions && (
          <div className="bg-white p-4 rounded-xl shadow-sm animate-fade-in">
            <h3 className="font-medium mb-2 text-[#2e2a63]">Your partner's emotions:</h3>
            <div className="flex flex-wrap gap-2">
              {partnerEmotions.map(emotion => (
                <span
                  key={emotion}
                  className="bg-[#E5DEFF] text-[#483D8B] px-3 py-1 rounded-full text-sm"
                >
                  {emotion}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {emotionalInsight && (
        <div className="mt-4 p-3 bg-[#f9f5ff] rounded-xl text-center text-gray-700 text-sm border border-[#e5deff]">
          {emotionalInsight}
        </div>
      )}
    </div>
  );
};

export default EmotionSummaryView;
