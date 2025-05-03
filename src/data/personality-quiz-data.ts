
import { QuizQuestion, PersonalityDescriptions } from "@/types/personality-quiz";

export const personalityQuizQuestions: QuizQuestion[] = [
  {
    id: "question1",
    text: "When you're in an argument, you're most likely to…",
    answers: [
      {
        id: "q1a",
        text: "Try to keep things calm and avoid escalation",
        type: "anchor"
      },
      {
        id: "q1b",
        text: "Say exactly how you feel, even if it's intense",
        type: "spark"
      },
      {
        id: "q1c",
        text: "Jump to solving the problem as fast as possible",
        type: "strategist"
      },
      {
        id: "q1d",
        text: "Retreat to think about what's really going on emotionally",
        type: "reflector"
      }
    ]
  },
  {
    id: "question2",
    text: "You feel most connected to your partner when…",
    answers: [
      {
        id: "q2a",
        text: "You're having deep, vulnerable conversations",
        type: "reflector"
      },
      {
        id: "q2b",
        text: "You're solving problems and being a team",
        type: "strategist"
      },
      {
        id: "q2c",
        text: "You're relaxing peacefully together without stress",
        type: "anchor"
      },
      {
        id: "q2d",
        text: "You're laughing, flirting, or having fun together",
        type: "spark"
      }
    ]
  },
  {
    id: "question3",
    text: "In a high-stress situation, your instinct is to…",
    answers: [
      {
        id: "q3a",
        text: "Take a step back and try to calm everyone down",
        type: "anchor"
      },
      {
        id: "q3b",
        text: "Respond quickly and passionately",
        type: "spark"
      },
      {
        id: "q3c",
        text: "Figure out the most logical next step",
        type: "strategist"
      },
      {
        id: "q3d",
        text: "Try to understand everyone's emotional undercurrent",
        type: "reflector"
      }
    ]
  },
  {
    id: "question4",
    text: "Your partner starts acting distant. You…",
    answers: [
      {
        id: "q4a",
        text: "Worry what you did wrong and start analyzing the vibe",
        type: "reflector"
      },
      {
        id: "q4b",
        text: "Confront them directly — you need to know what's going on",
        type: "spark"
      },
      {
        id: "q4c",
        text: "Assume they need space and give them time",
        type: "anchor"
      },
      {
        id: "q4d",
        text: "Try to fix whatever caused the distance",
        type: "strategist"
      }
    ]
  },
  {
    id: "question5",
    text: "Which sentence sounds most like you?",
    answers: [
      {
        id: "q5a",
        text: "\"Let's keep the peace.\"",
        type: "anchor"
      },
      {
        id: "q5b",
        text: "\"Let's get real.\"",
        type: "spark"
      },
      {
        id: "q5c",
        text: "\"Let's fix this.\"",
        type: "strategist"
      },
      {
        id: "q5d",
        text: "\"Let's figure out what's underneath this.\"",
        type: "reflector"
      }
    ]
  },
  {
    id: "question6",
    text: "When you feel misunderstood, you usually…",
    answers: [
      {
        id: "q6a",
        text: "Shut down or walk away",
        type: "anchor"
      },
      {
        id: "q6b",
        text: "Get emotional and try to explain passionately",
        type: "spark"
      },
      {
        id: "q6c",
        text: "Get frustrated and focus on facts",
        type: "strategist"
      },
      {
        id: "q6d",
        text: "Replay the conversation in your head trying to decode it",
        type: "reflector"
      }
    ]
  },
  {
    id: "question7",
    text: "You feel safest in a relationship when…",
    answers: [
      {
        id: "q7a",
        text: "Everything is emotionally calm and steady",
        type: "anchor"
      },
      {
        id: "q7b",
        text: "There's room to be fully expressive and seen",
        type: "spark"
      },
      {
        id: "q7c",
        text: "Roles and expectations are clear and logical",
        type: "strategist"
      },
      {
        id: "q7d",
        text: "There's open space for honest, layered conversation",
        type: "reflector"
      }
    ]
  },
  {
    id: "question8",
    text: "Your ideal partner would be someone who…",
    answers: [
      {
        id: "q8a",
        text: "Keeps things grounded and doesn't panic",
        type: "anchor"
      },
      {
        id: "q8b",
        text: "Matches your energy and feels everything with you",
        type: "spark"
      },
      {
        id: "q8c",
        text: "Handles things without needing tons of talk",
        type: "strategist"
      },
      {
        id: "q8d",
        text: "Can sit in silence and still understand you",
        type: "reflector"
      }
    ]
  },
  {
    id: "question9",
    text: "When someone apologizes to you, you need…",
    answers: [
      {
        id: "q9a",
        text: "Time and space to let it settle",
        type: "anchor"
      },
      {
        id: "q9b",
        text: "Emotion and vulnerability in their voice",
        type: "spark"
      },
      {
        id: "q9c",
        text: "A clear plan for how they'll make it right",
        type: "strategist"
      },
      {
        id: "q9d",
        text: "A deep, meaningful conversation to rebuild trust",
        type: "reflector"
      }
    ]
  },
  {
    id: "question10",
    text: "You tend to overthink…",
    answers: [
      {
        id: "q10a",
        text: "Why people act distant or weird",
        type: "reflector"
      },
      {
        id: "q10b",
        text: "Whether you said something too blunt",
        type: "spark"
      },
      {
        id: "q10c",
        text: "The logistics of what went wrong",
        type: "strategist"
      },
      {
        id: "q10d",
        text: "How to keep the peace without rocking the boat",
        type: "anchor"
      }
    ]
  },
  {
    id: "question11",
    text: "How do you usually respond to emotional conflict?",
    answers: [
      {
        id: "q11a",
        text: "I stay calm, even if I'm hurt",
        type: "anchor"
      },
      {
        id: "q11b",
        text: "I say what I feel, sometimes too strongly",
        type: "spark"
      },
      {
        id: "q11c",
        text: "I get solution-focused and a little cold",
        type: "strategist"
      },
      {
        id: "q11d",
        text: "I overthink and feel a lot, even if I don't show it",
        type: "reflector"
      }
    ]
  },
  {
    id: "question12",
    text: "What frustrates you most in a relationship?",
    answers: [
      {
        id: "q12a",
        text: "People who overreact or create drama",
        type: "anchor"
      },
      {
        id: "q12b",
        text: "Being dismissed or not emotionally acknowledged",
        type: "spark"
      },
      {
        id: "q12c",
        text: "Feeling like I'm doing all the problem-solving",
        type: "strategist"
      },
      {
        id: "q12d",
        text: "People who won't talk about what's really going on",
        type: "reflector"
      }
    ]
  },
  {
    id: "question13",
    text: "During a disagreement, you wish your partner would…",
    answers: [
      {
        id: "q13a",
        text: "Stay calm and not make it a big thing",
        type: "anchor"
      },
      {
        id: "q13b",
        text: "Let it out — say how they really feel",
        type: "spark"
      },
      {
        id: "q13c",
        text: "Be more logical and less emotional",
        type: "strategist"
      },
      {
        id: "q13d",
        text: "Open up emotionally without shutting down",
        type: "reflector"
      }
    ]
  },
  {
    id: "question14",
    text: "When you're upset but don't know why, you…",
    answers: [
      {
        id: "q14a",
        text: "Pull away and try to get your emotions under control",
        type: "anchor"
      },
      {
        id: "q14b",
        text: "Blurt something out and figure it out later",
        type: "spark"
      },
      {
        id: "q14c",
        text: "Focus on what needs to be done while ignoring the emotion",
        type: "strategist"
      },
      {
        id: "q14d",
        text: "Go quiet and try to untangle the feelings beneath the surface",
        type: "reflector"
      }
    ]
  },
  {
    id: "question15",
    text: "Which phrase hits hardest for you?",
    answers: [
      {
        id: "q15a",
        text: "\"You don't need to walk on eggshells with me.\"",
        type: "anchor"
      },
      {
        id: "q15b",
        text: "\"It's okay to feel big things — I'm here.\"",
        type: "spark"
      },
      {
        id: "q15c",
        text: "\"You don't have to fix everything to be loved.\"",
        type: "strategist"
      },
      {
        id: "q15d",
        text: "\"I want to understand what's underneath what you're saying.\"",
        type: "reflector"
      }
    ]
  }
];

export const personalityDescriptions: PersonalityDescriptions = {
  anchor: {
    title: "The Anchor",
    shortDescription: "Steady, calm, and grounding. You're the emotional rock in relationships.",
    fullDescription: "As an Anchor, you bring stability and calm to your relationships. You tend to be the steadying force during conflicts, prioritizing peace and harmony. You value emotional consistency and security above all else, which helps those around you feel safe. Your natural ability to remain level-headed in challenging situations is your superpower, though sometimes you might hold back your own emotions to keep the peace.",
    color: "#33c3f0",
    expressionStrengths: "Creating a sense of safety and calm",
    expressionChallenges: "Expressing intense emotions or vulnerability"
  },
  spark: {
    title: "The Spark",
    shortDescription: "Passionate, expressive, and energetic. You bring intensity and authenticity.",
    fullDescription: "As a Spark, you lead with your heart in relationships. Your emotional honesty and expressiveness create deep, authentic connections. You're not afraid to show your feelings, whether joy, anger, or love—and this transparency helps others feel permission to be their true selves. Your passion and intensity make relationships exciting and meaningful, though sometimes your strong emotions might overwhelm others who process feelings differently.",
    color: "#f97316",
    expressionStrengths: "Authentic emotional expression and passion",
    expressionChallenges: "Managing emotional intensity in sensitive situations"
  },
  strategist: {
    title: "The Strategist",
    shortDescription: "Practical, solution-focused, and clear. You bring logic to emotional situations.",
    fullDescription: "As a Strategist, you approach relationships with thoughtful analysis and practicality. You excel at problem-solving and finding clear paths forward during conflicts. Your logical mind helps cut through emotional fog to identify what actually needs to be addressed. While you might sometimes seem detached, your intentions are to improve situations efficiently. Your gift is turning emotional chaos into manageable action steps.",
    color: "#9b87f5",
    expressionStrengths: "Finding practical solutions to relationship challenges",
    expressionChallenges: "Connecting with and expressing deeper emotions"
  },
  reflector: {
    title: "The Reflector",
    shortDescription: "Thoughtful, perceptive, and deep. You see below the surface in relationships.",
    fullDescription: "As a Reflector, you bring depth and insight to your relationships. You have a natural ability to understand emotional undercurrents and unspoken feelings. Your thoughtful nature means you process experiences deeply and seek meaningful connection. You value authenticity and are often the one who notices when something feels off in a relationship. While you might sometimes overthink interactions, your sensitivity allows for profound understanding of others.",
    color: "#d946ef",
    expressionStrengths: "Deep emotional understanding and empathy",
    expressionChallenges: "Overthinking interactions or getting lost in analysis"
  }
};

// Helper function to shuffle array (for randomizing answer order)
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
