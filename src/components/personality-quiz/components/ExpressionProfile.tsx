
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, AlertTriangle, Flower } from 'lucide-react';
import { PersonalityTypeDescription } from '@/types/personality-quiz';

interface ExpressionProfileProps {
  primaryType: PersonalityTypeDescription;
}

const ExpressionProfile: React.FC<ExpressionProfileProps> = ({ primaryType }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-10">
      <div>
        <h3 className="text-xl font-medium text-midnight-indigo mb-4">Your Expression Profile</h3>
        
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-500 h-5 w-5" />
              <h4 className="font-medium">Your Strengths</h4>
            </div>
            <p className="text-midnight-indigo/80">{primaryType.expressionStrengths}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-orange-500 h-5 w-5" />
              <h4 className="font-medium">Your Challenges</h4>
            </div>
            <p className="text-midnight-indigo/80">{primaryType.expressionChallenges}</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-xl font-medium text-midnight-indigo mb-4">Growth Opportunities</h3>
        <Card className="h-full">
          <CardContent className="p-6 h-full">
            <div className="flex items-center gap-2 mb-2">
              <Flower className="text-lavender-blue h-5 w-5" />
              <h4 className="font-medium">Growing Your Potential</h4>
            </div>
            <p className="text-midnight-indigo/80">
              Learning to balance your {primaryType.title.toLowerCase()} tendencies with elements of other personality 
              types can help you grow. Consider exploring how you might benefit from:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-midnight-indigo/80">
              <li>The emotional expression of a Spark</li>
              <li>The calming presence of an Anchor</li>
              <li>The analytical approach of a Strategist</li>
              <li>The depth of understanding of a Reflector</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpressionProfile;
