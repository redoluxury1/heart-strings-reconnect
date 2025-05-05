
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { personalityDescriptions } from '@/data/personality-quiz-data';
import { QuizResult } from '@/types/personality-quiz';

interface PersonalityTypeChartProps {
  results: QuizResult;
}

const PersonalityTypeChart: React.FC<PersonalityTypeChartProps> = ({ results }) => {
  // Prepare data for pie chart
  const chartData = Object.entries(results.percentages).map(([key, value]) => ({
    name: key,
    value,
    color: personalityDescriptions[key as keyof typeof personalityDescriptions].color
  }));
  
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
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => 
                `${personalityDescriptions[name as keyof typeof personalityDescriptions].title} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PersonalityTypeChart;
