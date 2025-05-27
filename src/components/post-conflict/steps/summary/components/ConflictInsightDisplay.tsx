
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConflictPattern } from '@/hooks/useConflictPatternAnalysis';
import { conflictInsights } from '@/data/conflict-insights';
import { Heart, Brain, Scale, Lightbulb } from 'lucide-react';

interface ConflictInsightDisplayProps {
  pattern: ConflictPattern;
  patternName: string;
}

const ConflictInsightDisplay: React.FC<ConflictInsightDisplayProps> = ({ pattern, patternName }) => {
  const insights = conflictInsights[pattern];
  
  if (!insights) {
    return null;
  }

  const insightCards = [
    {
      title: "What You Share",
      content: insights.shared,
      icon: Heart,
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      iconColor: "text-rose-600"
    },
    {
      title: "Therapist Insight",
      content: insights.therapist,
      icon: Brain,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      title: "Unbiased Perspective",
      content: insights.unbiased,
      icon: Scale,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      title: "Try This",
      content: insights.tryThis,
      icon: Lightbulb,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Pattern Header */}
      <div className="text-center mb-8">
        <h3 className="font-cormorant text-xl font-semibold text-[#2C2C2C] mb-2">
          Conflict Pattern: {patternName}
        </h3>
        <p className="text-sm text-[#65595D] italic">
          Insights tailored to your specific conversation
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid gap-6">
        {insightCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card key={index} className={`${card.bgColor} ${card.borderColor} border-2`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg text-[#2C2C2C]">
                  <IconComponent className={`h-5 w-5 ${card.iconColor}`} />
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#3A3A3A] leading-relaxed whitespace-pre-line">
                  {card.content}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ConflictInsightDisplay;
