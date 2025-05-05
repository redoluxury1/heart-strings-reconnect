
import React from 'react';
import { Card } from '@/components/ui/card';
import { PersonalityTypeDescription } from '@/types/personality-quiz';

interface PersonalityTypeCardProps {
  type: PersonalityTypeDescription;
  isSecondary?: boolean;
  percentage: number;
}

const PersonalityTypeCard: React.FC<PersonalityTypeCardProps> = ({ 
  type, 
  isSecondary = false, 
  percentage 
}) => {
  return (
    <Card className="mb-8 border-l-4" style={{ borderLeftColor: type.color }}>
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className={`${isSecondary ? 'text-xl' : 'text-2xl md:text-3xl'} font-medium mb-2`}>
              {type.title}
            </h2>
            <p className="text-gray-500 text-lg">{isSecondary ? 'Your Secondary Type' : 'Your Primary Type'}</p>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-md">
            <p className="font-medium">{percentage}% Match</p>
          </div>
        </div>
        
        {isSecondary ? (
          <div className="mt-4 space-y-4">
            <p className="text-midnight-indigo/80">{type.shortDescription}</p>
            <div>
              <h4 className="font-medium text-midnight-indigo mb-1">Mini Overview:</h4>
              <p className="text-midnight-indigo/80">{type.fullDescription.split('.')[0] + '.'}</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-2">Personality Overview:</h3>
              <p className="text-midnight-indigo/80">{type.fullDescription}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-2">How You Respond Best to Support:</h3>
              <p className="text-midnight-indigo/80">
                {type.supportNeeds || "You appreciate having your feelings acknowledged and respected, even when they're complex."}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-2">Common Misunderstandings:</h3>
              <p className="text-midnight-indigo/80">
                {type.commonMisunderstandings || "Others may misread your communication style, but this isn't a reflection of your intentions or care."}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-2">Compatibility:</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-midnight-indigo">Most Compatible With:</h4>
                  <p className="text-midnight-indigo/80">{type.mostCompatibleWith || "Each personality type offers unique strengths in relationships."}</p>
                </div>
                <div>
                  <h4 className="font-medium text-midnight-indigo">Potential Clashes With:</h4>
                  <p className="text-midnight-indigo/80">{type.potentialClashesWith || "Every relationship has challenges that can be overcome with understanding."}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PersonalityTypeCard;
