
import { ScenarioComment } from './types';
import { relationshipComments } from './comments/relationship-comments';
import { familyComments } from './comments/family-comments';
import { friendshipComments } from './comments/friendship-comments';
import { financialComments } from './comments/financial-comments';

// Combine all comment categories into a single array
export const scenarioComments: ScenarioComment[] = [
  ...relationshipComments,
  ...familyComments,
  ...friendshipComments,
  ...financialComments
];

// Helper function to get comments for a specific scenario by title or description
export const getCommentsForScenario = (titleOrDescription: string): string[] => {
  const match = scenarioComments.find(item => 
    item.scenario === titleOrDescription || 
    titleOrDescription.includes(item.scenario)
  );
  
  return match?.comments || [];
};
