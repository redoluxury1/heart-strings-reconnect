
import { SayInsteadPhrase, PhraseCategory } from '../../types/love-code-quiz';

// Original phrase to alternative phrases data
export const sayInsteadPhrases: SayInsteadPhrase[] = [
  {
    id: 1,
    original: "You never listen to me.",
    categories: ["Dismissed", "Communication", "Defensive"],
    alternatives: [
      "It feels like I'm not being heard. Can we try again?",
      "I need to know you're actually hearing what I'm saying, not just waiting to reply.",
      "Can you repeat back what you heard? I want to make sure I'm being clear."
    ],
    whyItWorks: "Shifts from accusation to clarity and mutual understanding."
  },
  {
    id: 2,
    original: "You always make everything about you.",
    categories: ["Self-centeredness", "Resentment", "Frustration"],
    alternatives: [
      "Sometimes I feel like my side of things gets lost in the conversation.",
      "I want to feel seen too—not just like I'm reacting to your version of things.",
      "Can we make space for both of us in this?"
    ],
    whyItWorks: "Centers emotional impact without assigning motive or blame."
  },
  // ... add more phrases as needed
];
