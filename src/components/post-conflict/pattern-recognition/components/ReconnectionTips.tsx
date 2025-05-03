
import React from 'react';
import { CommonPattern } from '../types';
import { ReconnectionTip } from '@/data/reconnection-tips';

interface ReconnectionTipsProps {
  selectedPattern: CommonPattern | null;
  tipsToDisplay: ReconnectionTip[];
}

const ReconnectionTips: React.FC<ReconnectionTipsProps> = ({ selectedPattern, tipsToDisplay }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
        Reconnection Activities
      </h2>
      
      {selectedPattern && (
        <div className="bg-soft-cream/20 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-mauve-rose mb-2">Your Pattern: {selectedPattern.name}</h3>
          <p className="text-gray-700 mb-2">{selectedPattern.description}</p>
          <div className="mt-3">
            <h4 className="font-medium text-gray-700">Tips to Break This Pattern:</h4>
            <ul className="list-disc pl-5 mt-1">
              {selectedPattern.breakingTips.map((tip, index) => (
                <li key={index} className="text-gray-600 text-sm">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <p className="text-gray-700 mb-6">
        {selectedPattern 
          ? `Try these specific activities to help break the ${selectedPattern.name.toLowerCase()}:` 
          : "Try one of these activities together to help rebuild connection:"}
      </p>
      
      <ul className="space-y-4 mb-6">
        {tipsToDisplay.map(tip => (
          <li key={tip.id} className="bg-soft-cream/20 p-4 rounded-lg">
            <p className="text-gray-800">{tip.text}</p>
            <p className="text-sm text-gray-500 mt-1 capitalize">
              {tip.category} connection
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReconnectionTips;
