
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ReflectionInsight } from '@/types/reflection-insights';

interface ReflectionCardsProps {
  reflections: ReflectionInsight[];
}

const ReflectionCards: React.FC<ReflectionCardsProps> = ({ reflections }) => {
  if (reflections.length === 0) {
    return null;
  }
  
  // Render a reflection card
  const renderReflectionCard = (reflection: ReflectionInsight, index: number) => (
    <Card key={index} className="mb-4 bg-[#F8F5F3] border-[#D9B9AF] hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[#2C2C2C]">{reflection.insight}</CardTitle>
        <CardDescription className="text-[#65595D] italic">Unbiased Insight</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[#3A3A3A] leading-relaxed">{reflection.reflection}</p>
        <div className="pt-2 border-t border-[#E8DAD3]">
          <h4 className="font-medium text-[#2C2C2C] mb-1">Try this:</h4>
          <p className="text-[#3A3A3A]">{reflection.recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-4">
      {reflections.map((reflection, index) => (
        renderReflectionCard(reflection, index)
      ))}
    </div>
  );
};

export default ReflectionCards;
