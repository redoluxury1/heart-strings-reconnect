
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { LoveCodeResult } from '../../types/love-code-quiz';
import { loveCodeDescriptions } from '../../data/love-code-quiz-data';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

interface QuizResultsProps {
  results: LoveCodeResult;
  onRestart: () => void;
  onHome: () => void;
}

// Helper function to format love code ID for display
const formatLoveCode = (code: string): string => {
  return loveCodeDescriptions[code]?.title || code.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

// Darker, richer color scheme for the charts
const COLORS = [
  "#5B3E82", // Deeper purple for Loving Words
  "#9D2E4B", // Richer mauve for Thoughtful Gestures
  "#245478", // Deeper blue for Intentional Time
  "#2C5940", // Deeper green for Helpful Actions
  "#7D4324"  // Richer warm brown for Physical Connection
];

const QuizResults: React.FC<QuizResultsProps> = ({ results, onRestart, onHome }) => {
  const primaryDesc = loveCodeDescriptions[results.primaryCode];
  const secondaryDesc = loveCodeDescriptions[results.secondaryCode];
  const [showDetailedDescription, setShowDetailedDescription] = useState(false);
  const isMobile = useIsMobile();
  
  // Format data for the charts
  const chartData = Object.entries(results.percentages).map(([code, value], index) => ({
    name: formatLoveCode(code),
    value,
    code,
    fill: COLORS[index % COLORS.length]
  }));
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
        <div className="flex justify-center mb-6">
          <Heart className="h-12 w-12 text-mauve-rose" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-cormorant font-medium text-midnight-indigo text-center mb-4">
          Your Love Code is <span className="text-mauve-rose font-semibold block text-4xl md:text-5xl mt-2">{primaryDesc.title}!</span>
        </h1>
        
        {/* Chart Section with responsive chart types */}
        <div className="h-[300px] md:h-[400px] mb-10 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {isMobile ? (
              // Bar Chart for mobile
              <BarChart 
                data={chartData} 
                margin={{ top: 20, right: 10, left: 10, bottom: 50 }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#4B5563', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  unit="%" 
                  tick={{ fill: '#4B5563' }}
                  tickLine={false}
                  axisLine={false}
                  width={30}
                />
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderColor: '#E7D9C9',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]} 
                  label={{ 
                    position: 'top', 
                    fill: '#4B5563', 
                    fontSize: 12,
                    formatter: (value: number) => `${value}%`
                  }}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              // Pie Chart for desktop
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius="70%"
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
            )}
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
            
            <Button 
              variant="outline" 
              className="w-full mt-4 border-lavender-blue/30 text-midnight-indigo flex items-center justify-center"
              onClick={() => setShowDetailedDescription(!showDetailedDescription)}
            >
              {showDetailedDescription ? 'Show Less' : 'Read Detailed Description'} 
              {showDetailedDescription ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
            
            {showDetailedDescription && (
              <div className="mt-6 space-y-6 p-6 bg-soft-blush/20 rounded-lg">
                <div>
                  <h3 className="font-medium text-midnight-indigo mb-2">1. Emotional Core – Why {primaryDesc.title} Matter to You</h3>
                  <p className="whitespace-pre-line">
                    {primaryDesc.detailedDescription?.emotionalCore || "Detailed description coming soon."}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-midnight-indigo mb-2">2. How You Feel Most Loved</h3>
                  <p className="whitespace-pre-line">
                    {primaryDesc.detailedDescription?.howYouFeelLoved || "Detailed description coming soon."}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-midnight-indigo mb-2">3. How This Can Be Misread</h3>
                  <p className="whitespace-pre-line">
                    {primaryDesc.detailedDescription?.oftenMisread || "Detailed description coming soon."}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-midnight-indigo mb-2">4. Relational Growth Tips</h3>
                  <p className="whitespace-pre-line">
                    {primaryDesc.detailedDescription?.relationalGrowthTips || "Detailed description coming soon."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Secondary Love Code */}
        <div className="bg-soft-blush/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-cormorant font-medium text-midnight-indigo mb-3">
            Your Secondary Love Code: {secondaryDesc.title}
          </h2>
          <p className="text-midnight-indigo/80">
            {secondaryDesc.secondaryDescription || secondaryDesc.shortSummary}
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
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={onHome} className="border-midnight-indigo text-midnight-indigo">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
