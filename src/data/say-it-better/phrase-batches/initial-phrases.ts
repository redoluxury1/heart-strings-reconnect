
import { SayItBetterPhrase } from '../phrases';

// First batch of phrases (1-10)
export const initialPhrases: SayItBetterPhrase[] = [
  {
    id: "phrase-1",
    original: "You're trying to control everything I do",
    emotionalSubtext: "I feel like I don't have room to make my own decisions.",
    howItMayComeOff: "This might sound like you're accusing your partner of being a parental figure — which can feel disrespectful or threatening.",
    trySayingInstead: "I feel like I can't make choices without it being questioned, and that's frustrating to me.",
    categories: ["Control", "Autonomy", "Boundaries"]
  },
  {
    id: "phrase-2",
    original: "You never listen to me",
    emotionalSubtext: "I feel dismissed and like my words don't matter.",
    howItMayComeOff: "Your partner might hear this as a total shutdown of their efforts, even if they've tried.",
    trySayingInstead: "Every time I talk it feels like you disregard everything I say or don't truly listen to understand me.",
    categories: ["Communication", "Dismissive", "Invalidation"]
  },
  {
    id: "phrase-3",
    original: "You're overreacting",
    emotionalSubtext: "I don't understand your emotional response and it's making me uncomfortable.",
    howItMayComeOff: "This can feel invalidating or even mocking — like their feelings aren't real or welcome.",
    trySayingInstead: "I didn't expect that to feel so big for you, can you help me understand why it's so important to you?",
    categories: ["Emotional Invalidation", "Dismissive", "Understanding"]
  },
  {
    id: "phrase-4",
    original: "I do everything around here!",
    emotionalSubtext: "I feel unacknowledged and overwhelmed by the imbalance.",
    howItMayComeOff: "It can sound accusatory and escalate defensiveness fast.",
    trySayingInstead: "I feel like I'm carrying most of the load, and I'm starting to burn out. Can we figure out a better split together?",
    categories: ["Effort Imbalance", "Household", "Overwhelm"]
  },
  {
    id: "phrase-5",
    original: "Leave me alone!",
    emotionalSubtext: "I'm feeling emotionally flooded and need space.",
    howItMayComeOff: "This can feel like abandonment or rejection in the middle of a fight.",
    trySayingInstead: "I'm really overwhelmed right now, can we pause for a bit and come back to this when I can think more clearly?",
    categories: ["Space", "Overwhelm", "Emotional Regulation"]
  },
  {
    id: "phrase-6",
    original: "You're so sensitive.",
    emotionalSubtext: "I don't understand why this bothered you so much.",
    howItMayComeOff: "It can sound belittling or dismissive, making your partner feel ashamed for caring.",
    trySayingInstead: "I didn't realize that would hit you that way. Can you tell me what felt hurtful?",
    categories: ["Emotional Invalidation", "Dismissive", "Sensitivity"]
  },
  {
    id: "phrase-7",
    original: "You always twist my words.",
    emotionalSubtext: "I feel misunderstood and like you're not being fair to what I meant.",
    howItMayComeOff: "It can feel like an accusation that shuts down conversation.",
    trySayingInstead: "It's frustrating to even talk when everything I say seems to get turned into something else.",
    categories: ["Communication", "Miscommunication", "Frustration"]
  },
  {
    id: "phrase-8",
    original: "Why are you making such a big deal out of this?",
    emotionalSubtext: "This doesn't seem serious to me, and I don't get why you're so upset.",
    howItMayComeOff: "It minimizes their feelings and can make them feel childish or dramatic.",
    trySayingInstead: "This feels really big for you. I want to understand why, even if I don't feel it the same way.",
    categories: ["Minimizing", "Understanding", "Emotional Invalidation"]
  },
  {
    id: "phrase-9",
    original: "You're being dramatic.",
    emotionalSubtext: "I think you're exaggerating and I don't know how to respond.",
    howItMayComeOff: "Feels invalidating and dismissive — like their emotions aren't valid.",
    trySayingInstead: "I'm struggling to understand why this feels so intense for you, but I want to get it. Can we talk about it?",
    categories: ["Emotional Invalidation", "Dismissive", "Understanding"]
  },
  {
    id: "phrase-10",
    original: "You just want to fight.",
    emotionalSubtext: "I feel like no matter what I say, it turns into a conflict.",
    howItMayComeOff: "Sounds like you're blaming them for the argument and avoids taking responsibility.",
    trySayingInstead: "It feels like we keep ending up fighting. I just want us to get on the same page.",
    categories: ["Blame", "Conflict", "Communication"]
  }
];
