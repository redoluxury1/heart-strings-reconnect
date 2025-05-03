
import { quizQuestions } from './quiz-questions';
import { moreQuizQuestions } from './more-quiz-questions';
import { loveCodeDescriptions } from './love-code-descriptions';
import { moreLoveCodeDescriptions } from './more-love-code-descriptions';
import { sayInsteadPhrases } from './say-instead-phrases';
import { LoveCodeDescriptions } from '../../types/love-code-quiz';

// Combine all quiz questions
export const allQuizQuestions = [...quizQuestions, ...moreQuizQuestions];

// Combine all love code descriptions
export const allLoveCodeDescriptions: LoveCodeDescriptions = {
  ...loveCodeDescriptions,
  ...moreLoveCodeDescriptions
};

// Exports
export { sayInsteadPhrases };
export { allQuizQuestions as quizQuestions };
export { allLoveCodeDescriptions as loveCodeDescriptions };
