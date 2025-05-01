
import React from 'react';
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
  
  // Format data for the charts
  const chartData = Object.entries(results.percentages).map(([code, value], index) => ({
    name: formatLoveCode(code),
    value,
    code,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <div className="h-[300px] md:h-[400px] mb-10 w-full">
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
            label={isMobile ? false : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={!isMobile}
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
  );
};

export default LoveCodeChart;
