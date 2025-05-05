
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { personalityDescriptions } from '@/data/personality-quiz-data';
import { QuizResult } from '@/types/personality-quiz';
import { useIsMobile } from '@/hooks/use-mobile';

interface PersonalityTypeChartProps {
  results: QuizResult;
}

// Brighter, richer color scheme matching the love code quiz colors
const COLORS = [
  "#9B87F5", // Purple for Anchor
  "#D946EF", // Magenta for Spark
  "#33C3F0", // Blue for Strategist
  "#2C5940", // Green for Reflector
];

const PersonalityTypeChart: React.FC<PersonalityTypeChartProps> = ({ results }) => {
  const isMobile = useIsMobile();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [chartData, setChartData] = useState<Array<any>>([]);
  
  // Format data for the chart
  useEffect(() => {
    // Initialize with zero values
    const initialData = Object.entries(results.percentages).map(([type, _], index) => ({
      name: type,
      value: 0,
      type,
      fill: COLORS[index % COLORS.length]
    }));
    
    setChartData(initialData);
    
    // Animate to actual values after a short delay
    const timer = setTimeout(() => {
      const actualData = Object.entries(results.percentages).map(([type, value], index) => ({
        name: personalityDescriptions[type as keyof typeof personalityDescriptions].title,
        value,
        type,
        fill: COLORS[index % COLORS.length]
      }));
      
      setChartData(actualData);
      
      // Mark animation as complete for label rendering
      setTimeout(() => {
        setAnimationComplete(true);
      }, 600);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [results]);

  // Format personality type for display
  const formatPersonalityType = (type: string): string => {
    return personalityDescriptions[type as keyof typeof personalityDescriptions]?.title || 
      type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <Card className="mb-8 mx-auto max-w-lg">
      <CardContent className="p-4 h-[280px]">
        <h3 className="text-xl font-medium text-midnight-indigo mb-2">Your Type Breakdown</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={isMobile ? "55%" : "65%"}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
                if (!animationComplete) return null;
                
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                
                const value = `${(percent * 100).toFixed(0)}%`;
                
                // Only show full labels for sections >= 15%
                if (percent < 0.15 && isMobile) {
                  // For small sections, just show percentage
                  return (
                    <text 
                      x={x} 
                      y={y} 
                      fill={COLORS[index % COLORS.length]}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {value}
                    </text>
                  );
                }
                
                // For sections >= 15% show full label
                return (
                  <text 
                    x={x} 
                    y={y} 
                    fill={COLORS[index % COLORS.length]}
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    fontSize={isMobile ? "10" : "12"}
                    fontWeight="bold"
                  >
                    {isMobile ? `${value}` : `${name}: ${value}`}
                  </text>
                );
              }}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
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
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      
      {/* Color Chart Legend for Better Mobile Experience */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs md:text-sm max-w-2xl mx-auto mt-4 px-4 pb-4">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm flex-shrink-0" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex flex-col">
              <span className="font-medium">{formatPersonalityType(entry.type)}</span>
              <span>{entry.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PersonalityTypeChart;
