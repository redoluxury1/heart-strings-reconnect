
// Partner response type
export interface PartnerResponse {
  id: string;
  category: string;
  responses: string[];
}

// Partner response categories aligned with conflict topics
export const partnerResponses: PartnerResponse[] = [
  {
    id: 'ask-for-space',
    category: 'When they ask for space',
    responses: [
      "I understand you need some time. Let's take a break and come back to this in 15 minutes.",
      "Sure, I can see you need a moment. I'll give you some space, and we can talk when you're ready.",
      "Thanks for letting me know how you're feeling. Taking a break is a good idea."
    ]
  },
  {
    id: 'say-what-hurt',
    category: 'When they express hurt feelings',
    responses: [
      "I didn't realize that hurt you. Thank you for telling me - I want to understand better.",
      "I'm sorry that landed so hard for you. Your feelings matter to me.",
      "I appreciate you sharing this with me. It helps me understand your perspective better."
    ]
  },
  {
    id: 'explain-meant',
    category: 'When they clarify what they meant',
    responses: [
      "Thank you for explaining. I think I understand better now what you were trying to say.",
      "That helps me understand where you're coming from. I appreciate the clarification.",
      "Thanks for taking the time to explain. I was misinterpreting what you meant."
    ]
  },
  {
    id: 'apologize',
    category: 'When they apologize',
    responses: [
      "Thank you for apologizing. That means a lot to me.",
      "I appreciate you acknowledging that. It helps us move forward.",
      "Thank you. Let's learn from this and figure out how we can handle it differently next time."
    ]
  },
  {
    id: 'express-need',
    category: 'When they express a need',
    responses: [
      "I hear that you need more from me in this area. Let's talk about how we can make that work.",
      "That's important to know. I want to support your needs - let's figure out how I can do that.",
      "Thank you for telling me what you need. That helps me be a better partner to you."
    ]
  },
  {
    id: 'ask-question',
    category: 'When they ask a question calmly',
    responses: [
      "That's a good question. From my perspective...",
      "I appreciate you asking instead of assuming. Here's what was going on for me...",
      "Thanks for trying to understand. Let me think about how to explain this clearly..."
    ]
  },
  {
    id: 'express-feeling',
    category: 'When they express their feelings',
    responses: [
      "Thank you for sharing how you're feeling. That helps me understand.",
      "I appreciate your openness. It makes sense that you'd feel that way.",
      "Thanks for letting me know where you're at emotionally. That's important information."
    ]
  },
  {
    id: 'share-fear',
    category: 'When they share a vulnerability',
    responses: [
      "Thank you for being vulnerable with me. That took courage.",
      "I'm glad you felt safe enough to share that. Your fears matter to me.",
      "I appreciate you trusting me with something so personal."
    ]
  },
  {
    id: 'acknowledge-pattern',
    category: 'When they address a recurring issue',
    responses: [
      "You're right, we do keep hitting this same issue. I'm open to trying something different.",
      "I see the pattern too. Let's break it together.",
      "Good observation. I think we both want to find a new approach here."
    ]
  },
  {
    id: 'suggest-solution',
    category: 'When they suggest a compromise',
    responses: [
      "That sounds like a reasonable middle ground. I'm willing to try that approach.",
      "I appreciate you looking for a solution that works for both of us.",
      "That's a thoughtful suggestion. Let's give it a try."
    ]
  },
  {
    id: 'set-boundary',
    category: 'When they set a boundary',
    responses: [
      "Thank you for being clear about your boundaries. I'll respect that.",
      "I appreciate knowing where your limits are. That helps me show up better for you.",
      "Thanks for sharing that boundary. It's important that we both feel safe in this conversation."
    ]
  },
  {
    id: 'something-else',
    category: 'General supportive responses',
    responses: [
      "Thank you for bringing this up. It's important we talk about these things.",
      "I'm glad you wanted to discuss this. What else can I do to understand better?",
      "I appreciate you starting this conversation. Let's figure this out together."
    ]
  }
];

// Helper function to get appropriate responses based on topic ID
export const getPartnerResponsesForTopic = (topicId: string): string[] => {
  const matchingCategory = partnerResponses.find(category => category.id === topicId);
  return matchingCategory?.responses || partnerResponses.find(category => category.id === 'something-else')!.responses;
};
