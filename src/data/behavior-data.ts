
interface Behavior {
  id: string;
  behavior: string;
  meaning: string;
  response: string;
}

// Function to get the list of behaviors
export const getBehaviors = (): Behavior[] => {
  return [
    {
      id: "fine",
      behavior: "She says 'I'm fine' (but clearly isn't)",
      meaning: "She likely feels unheard or that expressing her real feelings won't make a difference based on past experiences.",
      response: "I can tell something's bothering you, and I want to understand. Would you prefer to talk now or do you need some space first?"
    },
    {
      id: "eye-roll",
      behavior: "Short answers + eye roll",
      meaning: "She feels ignored or that her concerns have been repeatedly dismissed. This is often a response to feeling unheard over time, not just in this moment.",
      response: "I can tell something's off. Want to talk about it now or later? I'm listening."
    },
    {
      id: "silent",
      behavior: "She's suddenly very quiet",
      meaning: "She might be processing her thoughts, feeling hurt, or protecting herself from saying something she'll regret. Silence often means emotional withdrawal for safety.",
      response: "I notice you're quiet. I'm here when you're ready to talk, no pressure."
    },
    {
      id: "sarcasm",
      behavior: "She's becoming sarcastic",
      meaning: "Sarcasm often masks hurt feelings or frustration when direct communication hasn't worked. It's a defense mechanism against vulnerability.",
      response: "I feel like there's something more serious under the sarcasm. Can we talk about what's really bothering you?"
    },
    {
      id: "slam",
      behavior: "She slams doors or cabinets",
      meaning: "Physical expressions of frustration usually indicate feeling powerless in the conversation or relationship. This is emotion that has no other outlet.",
      response: "I can see you're really upset, and that matters to me. Let's take a break and come back to this when we're both calmer."
    },
    {
      id: "crying",
      behavior: "She's tearing up or crying",
      meaning: "Tears can indicate feeling overwhelmed, deeply hurt, or frustrated by an inability to express the depth of her feelings in words that will be received.",
      response: "I can see this is really affecting you. Take all the time you need, and know that I'm here to listen when you're ready."
    },
    {
      id: "questions",
      behavior: "She keeps asking questions but rejecting answers",
      meaning: "She's likely looking for an answer that addresses her underlying concern, which might not be what she's explicitly asking about.",
      response: "It feels like we might be talking about different things. Can you help me understand what's really concerning you underneath these questions?"
    },
    {
      id: "brings-up-past",
      behavior: "She brings up past mistakes",
      meaning: "Unresolved issues are still causing pain, or there's a pattern she's trying to highlight that you might not be seeing in the current situation.",
      response: "I can see how this connects to things that have hurt you before. I want to address both what's happening now and any unresolved feelings from before."
    }
  ];
};
