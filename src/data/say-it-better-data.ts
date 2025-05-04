// Define the SayItBetterPhrase type within this file
export interface SayItBetterPhrase {
  id: string;
  original: string;
  emotionalSubtext: string;
  howItMightLand: string;
  trySayingInstead: string;
  categories: string[];
}

// This array contains all the phrases for the Say It Better feature
export const sayItBetterPhrases: SayItBetterPhrase[] = [
  {
    id: "phrase-1",
    original: "You're trying to control everything I do",
    emotionalSubtext: "I feel like I don't have room to make my own decisions.",
    howItMightLand: "This might sound like you're accusing your partner of being a parental figure — which can feel disrespectful or threatening.",
    trySayingInstead: "I feel like I can't make choices without it being questioned, and that's frustrating to me.",
    categories: ["Control", "Autonomy", "Boundaries"]
  },
  {
    id: "phrase-2",
    original: "You never listen to me",
    emotionalSubtext: "I feel dismissed and like my words don't matter.",
    howItMightLand: "Your partner might hear this as a total shutdown of their efforts, even if they've tried.",
    trySayingInstead: "Every time I talk it feels like you disregard everything I say or don't truly listen to understand me.",
    categories: ["Communication", "Dismissive", "Invalidation"]
  },
  {
    id: "phrase-3",
    original: "You're overreacting",
    emotionalSubtext: "I don't understand your emotional response and it's making me uncomfortable.",
    howItMightLand: "This can feel invalidating or even mocking — like their feelings aren't real or welcome.",
    trySayingInstead: "I didn't expect that to feel so big for you, can you help me understand why it's so important to you?",
    categories: ["Emotional Invalidation", "Dismissive", "Understanding"]
  },
  {
    id: "phrase-4",
    original: "I do everything around here!",
    emotionalSubtext: "I feel unacknowledged and overwhelmed by the imbalance.",
    howItMightLand: "It can sound accusatory and escalate defensiveness fast.",
    trySayingInstead: "I feel like I'm carrying most of the load, and I'm starting to burn out. Can we figure out a better split together?",
    categories: ["Effort Imbalance", "Household", "Overwhelm"]
  },
  {
    id: "phrase-5",
    original: "Leave me alone!",
    emotionalSubtext: "I'm feeling emotionally flooded and need space.",
    howItMightLand: "This can feel like abandonment or rejection in the middle of a fight.",
    trySayingInstead: "I'm really overwhelmed right now, can we pause for a bit and come back to this when I can think more clearly?",
    categories: ["Space", "Overwhelm", "Emotional Regulation"]
  },
  {
    id: "phrase-6",
    original: "You're so sensitive.",
    emotionalSubtext: "I don't understand why this bothered you so much.",
    howItMightLand: "It can sound belittling or dismissive, making your partner feel ashamed for caring.",
    trySayingInstead: "I didn't realize that would hit you that way. Can you tell me what felt hurtful?",
    categories: ["Emotional Invalidation", "Dismissive", "Sensitivity"]
  },
  {
    id: "phrase-7",
    original: "You always twist my words.",
    emotionalSubtext: "I feel misunderstood and like you're not being fair to what I meant.",
    howItMightLand: "It can feel like an accusation that shuts down conversation.",
    trySayingInstead: "It's frustrating to even talk when everything I say seems to get turned into something else.",
    categories: ["Communication", "Miscommunication", "Frustration"]
  },
  {
    id: "phrase-8",
    original: "Why are you making such a big deal out of this?",
    emotionalSubtext: "This doesn't seem serious to me, and I don't get why you're so upset.",
    howItMightLand: "It minimizes their feelings and can make them feel childish or dramatic.",
    trySayingInstead: "This feels really big for you. I want to understand why, even if I don't feel it the same way.",
    categories: ["Minimizing", "Understanding", "Emotional Invalidation"]
  },
  {
    id: "phrase-9",
    original: "You're being dramatic.",
    emotionalSubtext: "I think you're exaggerating and I don't know how to respond.",
    howItMightLand: "Feels invalidating and dismissive — like their emotions aren't valid.",
    trySayingInstead: "I'm struggling to understand why this feels so intense for you, but I want to get it. Can we talk about it?",
    categories: ["Emotional Invalidation", "Dismissive", "Understanding"]
  },
  {
    id: "phrase-10",
    original: "You just want to fight.",
    emotionalSubtext: "I feel like no matter what I say, it turns into a conflict.",
    howItMightLand: "Sounds like you're blaming them for the argument and avoids taking responsibility.",
    trySayingInstead: "It feels like we keep ending up fighting. I just want us to get on the same page.",
    categories: ["Blame", "Conflict", "Communication"]
  },
  {
    id: "phrase-11",
    original: "You never take my side.",
    emotionalSubtext: "I feel like you don't have my back when it matters.",
    howItMightLand: "Comes off as accusatory and paints your partner as disloyal or unsupportive.",
    trySayingInstead: "I really need to know you're in my corner, even if we see things differently.",
    categories: ["Support", "Trust", "Loyalty"]
  },
  {
    id: "phrase-12",
    original: "You're always criticizing me.",
    emotionalSubtext: "I feel judged and like I can't do anything right.",
    howItMightLand: "Sounds like an attack, which might trigger more defensiveness instead of awareness.",
    trySayingInstead: "Lately, it feels like I'm being picked apart more than built up and it's wearing on me.",
    categories: ["Criticism", "Validation", "Self-Worth"]
  },
  {
    id: "phrase-13",
    original: "You don't even care.",
    emotionalSubtext: "I feel neglected and emotionally disconnected from you.",
    howItMightLand: "Can feel like an ultimatum or emotional manipulation.",
    trySayingInstead: "I honestly feel like you don't care about my opinions and my feelings right now",
    categories: ["Emotional Connection", "Neglect", "Invalidation"]
  },
  {
    id: "phrase-14",
    original: "You're acting like a child.",
    emotionalSubtext: "I'm frustrated and don't know how to deal with how you're reacting.",
    howItMightLand: "Feels condescending and shaming — likely to escalate things fast.",
    trySayingInstead: "I'm having a hard time understanding your reaction, it's throwing me off. Can you please explain in a calmer way.",
    categories: ["Condescension", "Respect", "Communication"]
  },
  {
    id: "phrase-15",
    original: "You never make time for me.",
    emotionalSubtext: "I feel unimportant and like I'm not a priority in your life.",
    howItMightLand: "May feel like pressure or guilt, even if it's coming from hurt.",
    trySayingInstead: "I miss us. I'd love if we could carve out more time just for each other.",
    categories: ["Time", "Priority", "Attention"]
  },
  {
    id: "phrase-16",
    original: "You always walk away when it gets hard.",
    emotionalSubtext: "I feel abandoned when things get difficult.",
    howItMightLand: "Feels like a character attack and might trigger shame or more withdrawal.",
    trySayingInstead: "It hurts when you shut down or leave in the middle of a disagreement. I need to feel like we can talk through things without you walking away.",
    categories: ["Abandonment", "Communication", "Conflict Resolution"]
  },
  {
    id: "phrase-17",
    original: "You make me feel like I'm crazy.",
    emotionalSubtext: "I feel invalidated and gaslit.",
    howItMightLand: "Can be triggering and derail the conversation entirely.",
    trySayingInstead: "When you act like my concerns don't make sense, I start questioning myself and that's really stressful.",
    categories: ["Gaslighting", "Emotional Invalidation", "Trust"]
  },
  {
    id: "phrase-18",
    original: "You never initiate anything.",
    emotionalSubtext: "I feel undesired or like I care more than you do.",
    howItMightLand: "May sound like a blame-heavy jab, especially around intimacy.",
    trySayingInstead: "I miss feeling like you want me or think about spending time together first.",
    categories: ["Initiation", "Desire", "Intimacy"]
  },
  {
    id: "phrase-19",
    original: "You're just like your mom/dad.",
    emotionalSubtext: "I'm seeing a pattern that reminds me of something that hurt me before.",
    howItMightLand: "Likely to feel like a cheap shot or deeply personal insult.",
    trySayingInstead: "I feel like you're reflecting patterns from your past and it's stressful for me to deal with.",
    categories: ["Family Patterns", "Triggers", "Respect"]
  },
  {
    id: "phrase-20",
    original: "You're impossible to talk to.",
    emotionalSubtext: "I feel shut down every time I try to communicate.",
    howItMightLand: "Can sound like you've given up on communicating altogether.",
    trySayingInstead: "I don't know how to reach you when we talk lately, and it's really discouraging.",
    categories: ["Communication", "Frustration", "Connection"]
  }
];

// Return a filtered list of phrases by search term and/or category
export const getFilteredPhrases = (
  searchTerm: string = "", 
  category: string = ""
): SayItBetterPhrase[] => {
  let filtered = sayItBetterPhrases;
  
  // Filter by search term if provided
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(phrase => 
      phrase.original.toLowerCase().includes(term) || 
      phrase.emotionalSubtext.toLowerCase().includes(term) || 
      phrase.trySayingInstead.toLowerCase().includes(term)
    );
  }
  
  // Filter by category if provided
  if (category && category !== "all") {
    filtered = filtered.filter(phrase => 
      phrase.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
    );
  }
  
  return filtered;
};

// Get a list of all unique categories
export const getAllCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  
  sayItBetterPhrases.forEach(phrase => {
    phrase.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet).sort();
};

// Get a phrase by ID
export const getPhraseById = (id: string): SayItBetterPhrase | undefined => {
  return sayItBetterPhrases.find(phrase => phrase.id === id);
};

// Get all phrases
export const getAllPhrases = (): SayItBetterPhrase[] => {
  return sayItBetterPhrases;
};
