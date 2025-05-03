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
  {
    id: 3,
    original: "You're being dramatic.",
    categories: ["Dismissive", "Emotional Invalidation", "Tone"],
    alternatives: [
      "I'm having a hard time understanding where you're coming from—can we slow it down?",
      "This seems really important to you. Help me understand it better.",
      "Can we talk about what's really underneath this?"
    ],
    whyItWorks: "Validates emotion while gently requesting clarity."
  },
  {
    id: 4,
    original: "You're trying to control everything I do.",
    categories: ["Control", "Autonomy", "Boundaries"],
    alternatives: [
      "I need to feel like I can make my own choices without pushback.",
      "When you [specific action], I feel like my independence is being questioned.",
      "I want us to make decisions as equals. Can we talk about how to do that?"
    ],
    whyItWorks: "Focuses on the feeling of constraint rather than accusation of control."
  },
  {
    id: 5,
    original: "You're just like your mom/dad.",
    categories: ["Triggering", "Comparison", "Family Conflict"],
    alternatives: [
      "I've seen this pattern before and it's hard for me not to react.",
      "When you say/do that, it reminds me of something I've struggled with. Can we talk about it?",
      "I'm reacting strongly and I think it's tied to stuff outside this moment. Can we unpack it together?"
    ],
    whyItWorks: "Addresses the trigger without weaponizing family."
  },
  {
    id: 6,
    original: "You always twist my words.",
    categories: ["Miscommunication", "Defensiveness", "Frustration"],
    alternatives: [
      "That's not how I meant it—can I try again?",
      "I feel misunderstood right now, and I want to make sure we're hearing each other clearly.",
      "It's frustrating when it feels like we're not on the same page. Can we slow down?"
    ],
    whyItWorks: "De-escalates and shifts focus toward clarity, not blame."
  },
  {
    id: 7,
    original: "You don't care about me.",
    categories: ["Emotional Neglect", "Hurt", "Insecurity"],
    alternatives: [
      "I'm feeling really disconnected from you right now.",
      "I want to feel prioritized, and right now I don't.",
      "I know you care—I just don't feel it right now, and that hurts."
    ],
    whyItWorks: "Makes space for vulnerability without assuming intention."
  },
  {
    id: 8,
    original: "Why are you always in a bad mood?",
    categories: ["Tone", "Emotional Tension", "Misreading"],
    alternatives: [
      "You seem off—what's going on today?",
      "I'm picking up on something and I want to check in, not assume.",
      "Is something bothering you, or am I reading too much into it?"
    ],
    whyItWorks: "Invites openness instead of criticism or projection."
  }
];
