
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LoveCodeResult } from '../../types/love-code-quiz';
import { loveCodeDescriptions } from '../../data/love-code-quiz-data';
import { useIsMobile } from '../../hooks/use-mobile';

interface LoveCodeChartProps {
  results: LoveCodeResult;
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
    <div className="h-[300px] md:h-[400px] mb-10 w-full animate-fade-in">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={isMobile ? "60%" : "70%"}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={!isMobile && animationComplete ? ({ name, percent }) => 
              `${name}: ${(percent * 100).toFixed(0)}%` : false
            }
            labelLine={!isMobile && animationComplete}
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
          <Tooltip 
            formatter={(value) => `${value}%`}
            contentStyle={{ 
              backgroundColor: 'white',
              borderColor: '#E7D9C9',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
            animationDuration={300}
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
  );
};

export default LoveCodeChart;
