interface RealIssue {
  id: string;
  label: string;
  explanation: string;
  suggestion: string;
}

// Function to get the list of real issues
export const getRealIssues = (): RealIssue[] => {
  return [
    {
      id: "dismissed",
      label: "I feel dismissed",
      explanation: "When your concerns or opinions are brushed aside, it triggers a deeper feeling of not being valued or respected in the relationship.",
      suggestion: "When you [specific action], I feel like my perspective isn't important. I need to know you value my input even when we disagree."
    },
    {
      id: "always-wrong",
      label: "I'm tired of always being wrong",
      explanation: "This feeling often stems from a pattern where disagreements consistently end with one person feeling like they have to concede or apologize, creating resentment over time.",
      suggestion: "I'm feeling defensive because I don't think we're approaching this as equals. Can we find a solution where neither of us has to be 'wrong'?"
    },
    {
      id: "disrespected",
      label: "I'm feeling disrespected",
      explanation: "This comes from moments where your boundaries, opinions, or needs feel ignored or belittled, undermining the mutual respect essential to a healthy relationship.",
      suggestion: "When you [specific action], I feel disrespected. I need us to find a way to disagree without making me feel devalued."
    },
    {
      id: "unloved",
      label: "I don't feel loved",
      explanation: "This deep-seated feeling often surfaces during conflicts when emotional connection is strained, and actions or words seem to contradict the care you expect in the relationship.",
      suggestion: "Can we pause for a second? I know we're upset, but right now I just need to feel like we're still on the same team."
    },
    {
      id: "confused",
      label: "I don't even know why this matters so much right now",
      explanation: "Sometimes conflicts escalate because they're connected to other unresolved issues or because you're stressed about something entirely different.",
      suggestion: "I'm realizing I'm more worked up about this than makes sense. Can we pause? I might be bringing other stress into this conversation."
    },
    {
      id: "unheard",
      label: "I keep saying the same thing and it's not getting through",
      explanation: "Repeating yourself often means you don't feel heard on an important point, or that the issue is more significant than is being acknowledged.",
      suggestion: "This is really important to me, and I don't feel like we're connecting on it. Can I try explaining why it matters so much?"
    },
    {
      id: "control",
      label: "I feel controlled or managed",
      explanation: "This feeling arises when decisions or discussions seem one-sided, leading to frustration about autonomy and equal partnership.",
      suggestion: "When decisions happen this way, I feel like I don't have equal input. I need us to approach things more as partners."
    },
    {
      id: "expectations",
      label: "I can't meet the expectations being placed on me",
      explanation: "Feeling overwhelmed by explicit or implicit demands can create anxiety and inadequacy, especially when they haven't been clearly discussed.",
      suggestion: "I'm feeling overwhelmed by what seems expected of me. Can we talk about what's realistic and fair for both of us?"
    }
  ];
};
