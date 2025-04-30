
import React from 'react';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LoveCodeResult } from '../../types/love-code-quiz';
import { loveCodeDescriptions } from '../../data/love-code-quiz-data';
import { Heart } from 'lucide-react';

interface QuizResultsProps {
  results: LoveCodeResult;
  onRestart: () => void;
  onHome: () => void;
}

// Helper function to format love code ID for display
const formatLoveCode = (code: string): string => {
  return loveCodeDescriptions[code]?.title || code.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

// Richer, deeper color scheme for the pie chart
const COLORS = [
  "#7E59A5", // Deeper purple for Loving Words
  "#BB5575", // Richer mauve for Thoughtful Gestures
  "#3E7A9C", // Deeper blue for Intentional Time
  "#4A7B5A", // Deeper green for Helpful Actions
  "#9C5B41"  // Richer warm brown for Physical Connection
];

const QuizResults: React.FC<QuizResultsProps> = ({ results, onRestart, onHome }) => {
  const primaryDesc = loveCodeDescriptions[results.primaryCode];
  const secondaryDesc = loveCodeDescriptions[results.secondaryCode];
  
  // Format data for the pie chart
  const chartData = Object.entries(results.percentages).map(([code, value]) => ({
    name: formatLoveCode(code),
    value,
    code
  }));
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
        <div className="flex justify-center mb-6">
          <Heart className="h-12 w-12 text-mauve-rose" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-cormorant font-medium text-midnight-indigo text-center mb-8">
          Your Love Code™ Results
        </h1>
        
        {/* Pie Chart Section with better mobile responsiveness */}
        <div className="h-[300px] md:h-[400px] mb-10 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{ 
                  backgroundColor: 'white',
                  borderColor: '#E7D9C9',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Primary Love Code */}
        <div className="border-t border-b border-lavender-blue/20 py-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-mauve-rose mb-4">
            Your Primary Love Code: {primaryDesc.title}
          </h2>
          
          <div className="space-y-6 text-midnight-indigo/80">
            <div>
              <h3 className="font-medium text-midnight-indigo mb-2">Emotional Core:</h3>
              <p>{primaryDesc.emotionalCore}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-midnight-indigo mb-2">How You Feel Loved:</h3>
              <p>{primaryDesc.howYouFeelLoved}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-midnight-indigo mb-2">Often Misread:</h3>
              <p>{primaryDesc.oftenMisread}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-midnight-indigo mb-2">Growth Tips:</h3>
              <p>{primaryDesc.growthTips}</p>
            </div>
          </div>
        </div>
        
        {/* Secondary Love Code */}
        <div className="bg-soft-blush/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-cormorant font-medium text-midnight-indigo mb-3">
            Your Secondary Love Code: {secondaryDesc.title}
          </h2>
          <p className="text-midnight-indigo/80">
            {secondaryDesc.shortSummary}
          </p>
        </div>
        
        {/* How You Love Others Section */}
        <div className="mb-10">
          <h2 className="text-xl font-cormorant font-medium text-midnight-indigo mb-4">
            How You Love Others
          </h2>
          <p className="text-midnight-indigo/80 mb-4">
            You naturally tend to express love through {primaryDesc.title.toLowerCase()}. When you care about someone, 
            your instinct is to {primaryDesc.title === "Loving Words" ? "verbally affirm them" : 
              primaryDesc.title === "Thoughtful Gestures" ? "surprise them with thoughtful gestures" :
              primaryDesc.title === "Intentional Time" ? "give them your undivided attention" :
              primaryDesc.title === "Helpful Actions" ? "support them through helpful actions" :
              "connect with them physically"}.
          </p>
          <p className="text-midnight-indigo/80">
            Understanding that others may have different Love Codes can help you express your care in ways they'll 
            most deeply appreciate. Consider adapting your natural style when loving someone whose primary Code differs from yours.
          </p>
        </div>
        
        {/* Invite Partner Section */}
        <div className="bg-mauve-rose/10 rounded-lg p-6 mb-8 text-center">
          <h3 className="font-cormorant font-medium text-xl text-midnight-indigo mb-3">
            Invite Your Partner to Take the Quiz
          </h3>
          <p className="text-midnight-indigo/80 mb-4">
            When both partners understand each other's Love Codes, connection deepens and miscommunication decreases.
          </p>
          <Button className="bg-mauve-rose hover:bg-mauve-rose/90 text-white">
            Share the Quiz
          </Button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Button variant="outline" onClick={onRestart} className="border-midnight-indigo text-midnight-indigo">
            Retake Quiz
          </Button>
          <Button variant="outline" onClick={onHome} className="border-midnight-indigo text-midnight-indigo">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
