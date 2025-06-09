
import { SayInsteadPhrase } from '../types/say-instead';

export const sayInsteadPhrases: SayInsteadPhrase[] = [
  {
    id: "phrase-1",
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
    id: "phrase-2",
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
    id: "phrase-3",
    original: "You're being dramatic.",
    categories: ["Dismissive", "Emotional Invalidation", "Tone"],
    alternatives: [
      "I'm having a hard time understanding where you're coming from—can we slow it down?",
      "This seems really big for you. Help me get it.",
      "Can we talk about what's really underneath this?"
    ],
    whyItWorks: "Validates emotion while gently requesting clarity."
  },
  {
    id: "phrase-4",
    original: "I shouldn't have to tell you this.",
    categories: ["Expectations", "Logistics", "Resentment"],
    alternatives: [
      "It's hard when I feel like I keep having to bring this up.",
      "I want us to be on the same page without constant reminders—can we figure out a system?",
      "This matters to me. Can we make it easier to remember together?"
    ],
    whyItWorks: "Expresses frustration while inviting partnership."
  },
  {
    id: "phrase-5",
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
    id: "phrase-6",
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
    id: "phrase-7",
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
    id: "phrase-8",
    original: "Why are you always in a bad mood?",
    categories: ["Tone", "Emotional Tension", "Misreading"],
    alternatives: [
      "You seem off—what's going on today?",
      "I'm picking up on something and I want to check in, not assume.",
      "Is something bothering you, or am I reading too much into it?"
    ],
    whyItWorks: "Invites openness instead of criticism or projection."
  },
  {
    id: "phrase-9",
    original: "I can't do this with you anymore.",
    categories: ["Shutdown", "Overwhelm"],
    alternatives: [
      "I'm feeling really overwhelmed and unsure of how to move forward right now.",
      "This is hard for me, but I still want to figure it out with you.",
      "I need a minute before I say something I regret. I care about us too much."
    ],
    whyItWorks: "Keeps the door open instead of slamming it in fear or frustration."
  },
  {
    id: "phrase-10",
    original: "You're so sensitive.",
    categories: ["Emotional Invalidation", "Dismissive"],
    alternatives: [
      "I didn't realize that hit you so hard—can you help me understand?",
      "I want to understand why that felt big for you.",
      "I see that upset you. Let's figure out what's underneath that together."
    ],
    whyItWorks: "Honors emotional response instead of minimizing it."
  },
  {
    id: "phrase-11",
    original: "You're overreacting.",
    categories: ["Emotional Invalidation", "Conflict Escalation", "Tone"],
    alternatives: [
      "That felt like a big reaction—can we pause and talk it through?",
      "I didn't realize this would land that hard. Can we unpack it?",
      "This clearly hit something for you. Help me understand what's underneath."
    ],
    whyItWorks: "Avoids judgment and shifts from dismissal to curiosity."
  },
  {
    id: "phrase-12",
    original: "All you care about is yourself.",
    categories: ["Self-centeredness", "Resentment", "Emotional Distance"],
    alternatives: [
      "I'm feeling really unseen in this moment.",
      "It's hard when I feel like my needs don't matter in this dynamic.",
      "I want to feel like we're in this together, not like I'm on my own."
    ],
    whyItWorks: "Expresses emotional need without character attack."
  },
  {
    id: "phrase-13",
    original: "You make me feel crazy.",
    categories: ["Confusion", "Emotional Dysregulation"],
    alternatives: [
      "I'm starting to question my own reactions in this, and that's hard for me.",
      "I feel confused and overwhelmed—can we slow this down?",
      "I don't feel grounded in this conversation, and that scares me."
    ],
    whyItWorks: "Centers disorientation without blame, opens space for validation."
  },
  {
    id: "phrase-14",
    original: "You don't even try.",
    categories: ["Effort Imbalance", "Disconnection", "Exhaustion"],
    alternatives: [
      "I'm putting in a lot right now and I'm feeling alone in it.",
      "I want to feel like we're both working on this—not just one of us.",
      "It would mean a lot to see more from your side, too."
    ],
    whyItWorks: "Expresses hurt and desire without shutting the other person down."
  },
  {
    id: "phrase-15",
    original: "This is why I can't talk to you.",
    categories: ["Shutdown", "Emotional Safety", "Avoidance"],
    alternatives: [
      "When I get that reaction, it makes me want to pull away.",
      "I want to talk, but I need to know it's safe to do that.",
      "I need space to express myself without it becoming a battle."
    ],
    whyItWorks: "Keeps the door open while still naming emotional risk."
  },
  {
    id: "phrase-16",
    original: "You always make me feel like I'm not enough.",
    categories: ["Insecurity", "Emotional Wounding", "Vulnerability"],
    alternatives: [
      "I feel small around you sometimes, and I don't think you realize it.",
      "It's hard to feel confident in this when I constantly question if I'm enough for you.",
      "I need more reassurance from you than I've been getting."
    ],
    whyItWorks: "Expresses deep vulnerability without accusation."
  },
  {
    id: "phrase-17",
    original: "Why can't you just get it?",
    categories: ["Frustration", "Emotional Misalignment", "Communication Breakdown"],
    alternatives: [
      "I know this might not make total sense to you, but it really matters to me.",
      "I want to feel understood—can I try to explain it a different way?",
      "Even if it's not clicking yet, I need you to stay in this with me."
    ],
    whyItWorks: "Replaces exasperation with an invitation for empathy."
  },
  {
    id: "phrase-18",
    original: "This is just who I am, deal with it.",
    categories: ["Avoidance", "Emotional Rigidity", "Defensiveness"],
    alternatives: [
      "This is a pattern I know I have. I'm working on it.",
      "I don't want to shut you out by defaulting to this version of me.",
      "I've done this before and I don't want it to cost us connection."
    ],
    whyItWorks: "Shifts from deflection to ownership and growth."
  },
  {
    id: "phrase-19",
    original: "You never make me feel wanted.",
    categories: ["Physical Connection", "Rejection", "Intimacy Issues"],
    alternatives: [
      "I want to feel chosen and desired by you, not just loved.",
      "I miss the way we used to show up for each other physically and emotionally.",
      "It hurts when I reach for you and don't feel you reaching back."
    ],
    whyItWorks: "Communicates longing without shaming or blaming."
  },
  {
    id: "phrase-20",
    original: "You're just trying to control everything.",
    categories: ["Autonomy", "Boundaries"],
    alternatives: [
      "I feel like I don't have space to contribute or do things my way.",
      "It's hard when I feel managed instead of trusted.",
      "I want more room to lead in this with you—not feel like I'm being handled."
    ],
    whyItWorks: "Highlights the emotional impact of control without escalating into a power war."
  },
  {
    id: "phrase-21",
    original: "I'm done talking.",
    categories: ["Shutdown", "Avoidance", "Overwhelm"],
    alternatives: [
      "I need a pause to gather my thoughts—I'll come back when I can be clear.",
      "This conversation matters, but I'm hitting my limit. Can we revisit it soon?",
      "I want to keep talking, but not like this. Let's take a minute."
    ],
    whyItWorks: "Maintains connection while setting boundaries for emotional regulation."
  },
  {
    id: "phrase-22",
    original: "You're being ridiculous.",
    categories: ["Dismissive", "Tone"],
    alternatives: [
      "This doesn't make sense to me yet, but I want to understand where you're coming from.",
      "It's hard for me to relate, but I know this is real for you.",
      "Can you help me see this through your lens?"
    ],
    whyItWorks: "Keeps curiosity open instead of invalidating their reality."
  },
  {
    id: "phrase-23",
    original: "You clearly don't care about this relationship.",
    categories: ["Insecurity", "Emotional Distance"],
    alternatives: [
      "Sometimes I feel like I'm the only one fighting for us. I need to know you're still in it.",
      "It scares me when you pull away—I start wondering if I matter.",
      "Can you tell me how you're feeling about us right now?"
    ],
    whyItWorks: "Expresses fear and longing without emotional blackmail."
  },
  {
    id: "phrase-24",
    original: "I don't even know who you are anymore.",
    categories: ["Disconnection", "Emotional Distance", "Identity Loss"],
    alternatives: [
      "Lately, it feels like we've lost touch with each other.",
      "I miss the version of us where we felt more connected.",
      "I want to reconnect with the real you—not just survive the day-to-day."
    ],
    whyItWorks: "Focuses on reconnection instead of identity-shaming."
  },
  {
    id: "phrase-25",
    original: "Everything's always on your terms.",
    categories: ["Resentment", "Boundaries"],
    alternatives: [
      "I want to feel like we're making decisions together, not defaulting to one person's way.",
      "I notice I've been going along with things more than I'm comfortable with.",
      "I'd love to find more balance where we both feel heard in what we need."
    ],
    whyItWorks: "Calls out imbalance while inviting teamwork."
  },
  {
    id: "phrase-26",
    original: "Let me try again because I don't think I expressed myself well the first time.",
    categories: ["Communication", "Clarification", "Self-Awareness"],
    alternatives: [
      "I'd like to try again because I think I didn't explain myself the first time.",
      "I want to be clearer about what I meant—can I try saying it differently?",
      "I don't think I communicated that well. Let me rephrase."
    ],
    whyItWorks: "Takes responsibility for communication while requesting another chance."
  },
  {
    id: "phrase-27",
    original: "I'm realizing my words didn't match what I was feeling. Can I try again?",
    categories: ["Self-Awareness", "Emotional Clarity", "Communication"],
    alternatives: [
      "I realized that I didn't say what I was actually feeling, can we try again?",
      "My words came out wrong—what I was feeling was different than what I said.",
      "I need to be more honest about what's really going on for me emotionally."
    ],
    whyItWorks: "Shows emotional awareness and commitment to authentic communication."
  },
  {
    id: "phrase-28",
    original: "I'd like to understand your perspective better. Can you help me see what this looks like from your side?",
    categories: ["Understanding", "Perspective", "Curiosity"],
    alternatives: [
      "I want to understand your perspective. I was too frustrated before, can we start over?",
      "Help me see this from where you're sitting—I know I was reactive earlier.",
      "I want to really hear you this time instead of just defending myself."
    ],
    whyItWorks: "Acknowledges previous reactivity while expressing genuine desire to understand."
  },
  {
    id: "phrase-29",
    original: "I'm curious about how you're experiencing this conversation. Would you share that with me?",
    categories: ["Emotional Check-in", "Understanding", "Connection"],
    alternatives: [
      "I want to know what this feels like for you so we can get on the same page.",
      "How is this conversation landing for you right now?",
      "What's this experience like from your side?"
    ],
    whyItWorks: "Shifts focus to their emotional experience to create mutual understanding."
  },
  {
    id: "phrase-30",
    original: "I notice we keep having the same argument. Can we try something different this time?",
    categories: ["Pattern Recognition", "Problem-Solving", "Growth"],
    alternatives: [
      "We keep having the same argument, can we try to discuss what the root of it is?",
      "This feels like the same fight again—what if we looked at what's really underneath it?",
      "Instead of rehashing this, can we figure out why this keeps coming up?"
    ],
    whyItWorks: "Identifies the pattern while inviting deeper exploration of root causes."
  },
  {
    id: "phrase-31",
    original: "I think we're stuck in a pattern here. I want us to find a new way through this together.",
    categories: ["Pattern Recognition", "Partnership", "Growth"],
    alternatives: [
      "I don't like this pattern of constantly getting into the same argument, what can we do better this time?",
      "We're in our usual cycle—how can we break out of it together?",
      "This pattern isn't working for us. What would a different approach look like?"
    ],
    whyItWorks: "Names the pattern while emphasizing collaborative problem-solving."
  },
  {
    id: "phrase-32",
    original: "This feels familiar—like we've been here before. What can we do differently right now?",
    categories: ["Pattern Recognition", "Prevention", "Action"],
    alternatives: [
      "What can we do differently right now to keep this from escalating?",
      "I can feel this heading toward our usual fight—how do we stop it?",
      "Let's catch this before it becomes the same argument we always have."
    ],
    whyItWorks: "Focuses on immediate prevention rather than analyzing the pattern."
  },
  {
    id: "phrase-33",
    original: "We seem to keep circling back to this issue. What if we tried a new approach?",
    categories: ["Pattern Recognition", "Problem-Solving", "Innovation"],
    alternatives: [
      "What if we really listened to each other clearly this time?",
      "Instead of our usual back-and-forth, what if we each just really heard the other person?",
      "Can we try something different—like actually understanding each other instead of defending?"
    ],
    whyItWorks: "Suggests a specific alternative approach focused on genuine listening and understanding."
  }
];
