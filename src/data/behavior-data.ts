
export interface Behavior {
  id: string;
  behavior: string;
  meaning: string;
  response: string;
}

// Function to get the list of female behaviors
export const getFemaleBehaviors = (): Behavior[] => {
  return [
    {
      id: "fine",
      behavior: "Says 'I'm fine' (but clearly isn't)",
      meaning: "She likely feels unheard or that expressing her real feelings won't make a difference based on past experiences.",
      response: "I can tell something's bothering you, and I want to understand. Would you prefer to talk now or do you need some space first?"
    },
    {
      id: "eye-roll",
      behavior: "Gives short answers + eye roll",
      meaning: "She feels ignored or that her concerns have been repeatedly dismissed. This is often a response to feeling unheard over time, not just in this moment.",
      response: "I can tell something's off. Want to talk about it now or later? I'm listening."
    },
    {
      id: "silent",
      behavior: "Suddenly very quiet",
      meaning: "She might be processing her thoughts, feeling hurt, or protecting herself from saying something she'll regret. Silence often means emotional withdrawal for safety.",
      response: "I notice you're quiet. I'm here when you're ready to talk, no pressure."
    },
    {
      id: "sarcasm",
      behavior: "Becomes sarcastic",
      meaning: "Sarcasm often masks hurt feelings or frustration when direct communication hasn't worked. It's a defense mechanism against vulnerability.",
      response: "I feel like there's something more serious under the sarcasm. Can we talk about what's really bothering you?"
    },
    {
      id: "slam",
      behavior: "Slams doors or cabinets",
      meaning: "Physical expressions of frustration usually indicate feeling powerless in the conversation or relationship. This is emotion that has no other outlet.",
      response: "I can see you're really upset, and that matters to me. Let's take a break and come back to this when we're both calmer."
    },
    {
      id: "crying",
      behavior: "Tearing up or crying",
      meaning: "Tears can indicate feeling overwhelmed, deeply hurt, or frustrated by an inability to express the depth of her feelings in words that will be received.",
      response: "I can see this is really affecting you. Take all the time you need, and know that I'm here to listen when you're ready."
    },
    {
      id: "questions",
      behavior: "Keeps asking questions but rejecting answers",
      meaning: "She's likely looking for an answer that addresses her underlying concern, which might not be what she's explicitly asking about.",
      response: "It feels like we might be talking about different things. Can you help me understand what's really concerning you underneath these questions?"
    },
    {
      id: "brings-up-past",
      behavior: "Brings up past mistakes",
      meaning: "Unresolved issues are still causing pain, or there's a pattern she's trying to highlight that you might not be seeing in the current situation.",
      response: "I can see how this connects to things that have hurt you before. I want to address both what's happening now and any unresolved feelings from before."
    }
  ];
};

// Function to get the list of male behaviors
export const getMaleBehaviors = (): Behavior[] => {
  return [
    {
      id: "silent-male",
      behavior: "Goes silent",
      meaning: "He might be overwhelmed or afraid he'll say something wrong. Many men process emotions internally before they can articulate them.",
      response: "I know you might need time to process. I'm not trying to force an answer, but I want us to come back to this when you're ready."
    },
    {
      id: "logical",
      behavior: "Gets overly logical or analytical",
      meaning: "He's trying to fix or simplify the moment to regain control. This often happens when emotions feel too intense or unpredictable.",
      response: "I know you're trying to solve this, but right now I just need you to hear how I'm feeling. Can we start there?"
    },
    {
      id: "not-big-deal",
      behavior: "Says 'It's not a big deal'",
      meaning: "He's trying to move on or de-escalate what feels overwhelming. This isn't dismissal as much as it is self-protection.",
      response: "I understand you might see it differently, but this matters to me. Can you help me understand your perspective without minimizing mine?"
    },
    {
      id: "leaves",
      behavior: "Physically leaves the room",
      meaning: "He might be trying to prevent the conflict from escalating by creating physical space. This can be a healthy boundary if done respectfully.",
      response: "I see you need space, and that's okay. Can we agree on when we'll come back to this conversation?"
    },
    {
      id: "changes-subject",
      behavior: "Changes the subject abruptly",
      meaning: "He might feel cornered or unsure how to respond in a way that won't make things worse.",
      response: "I noticed we moved away from what we were discussing. That topic is important to me. Can we find a time to revisit it?"
    },
    {
      id: "gets-defensive",
      behavior: "Becomes instantly defensive",
      meaning: "He likely feels accused or that his character is being attacked rather than his actions, triggering a protect-and-defend response.",
      response: "I'm not trying to blame you—I'm just sharing how I feel. We're on the same team, and I want us to work through this together."
    },
    {
      id: "busy-with-phone",
      behavior: "Gets busy with phone or distraction",
      meaning: "This might be an avoidance strategy when the emotional content feels too difficult to engage with directly.",
      response: "I'd really appreciate your full attention for just a few minutes. This matters to me, and I want to feel connected while we talk."
    },
    {
      id: "shuts-down",
      behavior: "Completely shuts down",
      meaning: "He might be experiencing emotional flooding—a physiological state where productive conversation becomes impossible due to stress hormones.",
      response: "I can see you're overwhelmed. Let's take a 20-minute break and come back to this when we're both calmer. I'm not giving up on us figuring this out."
    }
  ];
};

// Function to get all behaviors (for backward compatibility)
export const getBehaviors = (): Behavior[] => {
  return [...getFemaleBehaviors(), ...getMaleBehaviors()];
};
