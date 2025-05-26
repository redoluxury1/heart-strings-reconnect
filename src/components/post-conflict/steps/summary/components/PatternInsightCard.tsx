
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConflictPattern } from '@/hooks/useConflictPatternAnalysis';
import { Target, Heart, Shield, Users, Pause, Scale, MessageCircle } from 'lucide-react';

interface PatternInsightCardProps {
  pattern: ConflictPattern;
  patternName: string;
}

const PatternInsightCard: React.FC<PatternInsightCardProps> = ({ pattern, patternName }) => {
  const getPatternIcon = (pattern: ConflictPattern) => {
    const iconMap = {
      weaponized_vulnerability: Shield,
      broken_trust: Heart,
      emotional_invalidation: MessageCircle,
      power_struggles: Scale,
      emotional_shutdown: Pause,
      effort_imbalance: Users,
      miscommunication_loops: Target
    };
    
    const IconComponent = iconMap[pattern] || MessageCircle;
    return <IconComponent className="h-5 w-5 text-[#D3876A]" />;
  };

  const getPatternInsight = (pattern: ConflictPattern): string => {
    const insights = {
      weaponized_vulnerability: "This conversation touched on past vulnerabilities being brought up during conflict. When personal shares are used as ammunition, it can deeply damage trust and safety.",
      broken_trust: "Trust and follow-through seem to be central themes here. When promises feel broken or expectations aren't met, it creates a foundation of uncertainty in the relationship.",
      emotional_invalidation: "Someone may have felt unheard or dismissed during this exchange. Feeling emotionally invalidated can be more painful than the original disagreement.",
      power_struggles: "This conflict may reflect different approaches to decision-making and autonomy. Power dynamics in relationships need ongoing navigation and respect.",
      emotional_shutdown: "Emotional overwhelm or shutdown appeared in this conversation. Sometimes stepping back is self-protection, but it can feel like abandonment to the other person.",
      effort_imbalance: "There may be an underlying feeling that emotional or practical effort isn't equally shared. This creates resentment that often surfaces during conflicts.",
      miscommunication_loops: "You may be caught in a pattern where the same misunderstandings keep cycling. Breaking these loops requires slowing down and clarifying meaning."
    };
    
    return insights[pattern] || "Every conflict has deeper patterns worth exploring together.";
  };

  return (
    <Card className="w-full mb-6 bg-gradient-to-r from-[#F8F5F3] to-[#FAF6F4] border-[#D9B9AF]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-[#2C2C2C]">
          {getPatternIcon(pattern)}
          Conflict Pattern: {patternName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[#3A3A3A] leading-relaxed">{getPatternInsight(pattern)}</p>
        <div className="mt-4 p-3 bg-white/50 rounded-lg">
          <p className="text-sm text-[#65595D] italic">
            This insight was generated based on the specific themes and language in your conversation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatternInsightCard;
