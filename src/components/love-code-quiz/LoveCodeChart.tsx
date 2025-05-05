
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Label } from 'recharts';
import { LoveCodeResult } from '../../types/love-code-quiz';
import { loveCodeDescriptions } from '../../data/love-code-quiz-data';
import { moreLoveCodeDescriptions } from '../../data/love-code-quiz/more-love-code-descriptions';
import { useIsMobile } from '../../hooks/use-mobile';

interface LoveCodeChartProps {
  results: LoveCodeResult;
}

// Helper function to format love code ID for display
const formatLoveCode = (code: string): string => {
  const descriptions = { ...loveCodeDescriptions, ...moreLoveCodeDescriptions };
  return descriptions[code]?.title || code.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

// Brighter, richer color scheme matching the personality quiz colors
const COLORS = [
  "#9B87F5", // Primary Purple for Affirm
  "#D946EF", // Magenta Pink for Support
  "#33C3F0", // Sky Blue for Together
  "#2C5940", // Deep Green for Uplift 
  "#F97316"  // Bright Orange for Touch
];

const LoveCodeChart: React.FC<LoveCodeChartProps> = ({ results }) => {
  const isMobile = useIsMobile();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [chartData, setChartData] = useState<Array<any>>([]);
  
  // Format data for the charts
  useEffect(() => {
    // Initialize with zero values
    const initialData = Object.entries(results.percentages).map(([code, _], index) => ({
      name: formatLoveCode(code),
      value: 0,
      code,
      fill: COLORS[index % COLORS.length]
    }));
    
    setChartData(initialData);
    
    // Animate to actual values after a short delay
    const timer = setTimeout(() => {
      const actualData = Object.entries(results.percentages).map(([code, value], index) => ({
        name: formatLoveCode(code),
        value,
        code,
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

  return (
    <div className="mb-8 w-full animate-fade-in">
      <div className="h-[280px] md:h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
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
      </div>
      
      {/* Color Chart Legend for Better Mobile Experience */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs md:text-sm max-w-2xl mx-auto mt-4">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm flex-shrink-0" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex flex-col">
              <span className="font-medium">{entry.name}</span>
              <span>{entry.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveCodeChart;
