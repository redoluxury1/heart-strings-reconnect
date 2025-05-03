
// This function simulates translating a user statement
export const translateStatement = (statement: string) => {
  // In a production app, this would use more sophisticated matching or AI
  const statementLower = statement.toLowerCase();
  
  // Sample translations based on common phrases
  if (statementLower.includes('trying to control') || statementLower.includes('control everything')) {
    return {
      heardAs: "This might come across like you're accusing them of being a parental figure - nobody wants to feel that way.",
      trySaying: "I feel like I can't make my own choices without you trying to change me, and it makes me feel small."
    };
  }
  
  if (statementLower.includes('not a big deal') || statementLower.includes('overreacting')) {
    return {
      heardAs: "You don't care about how I feel or what matters to me.",
      trySaying: "I know this feels big for you — I want to understand why."
    };
  }
  
  if (statementLower.includes('calm down') || statementLower.includes('relax')) {
    return {
      heardAs: "Your emotions are invalid and inappropriate.",
      trySaying: "I can see you're upset. Can we take a moment to talk through this?"
    };
  }
  
  if (statementLower.includes('always') && (statementLower.includes('you') || statementLower.includes('we'))) {
    return {
      heardAs: "You're attacking my character, not just my actions.",
      trySaying: "In this specific situation, I felt [emotion] when [specific action happened]."
    };
  }
  
  if (statementLower.includes('never') && (statementLower.includes('you') || statementLower.includes('we'))) {
    return {
      heardAs: "Nothing I do is ever enough for you.",
      trySaying: "I'd really appreciate it if we could [specific request] more often."
    };
  }
  
  if (statementLower.includes('fine')) {
    return {
      heardAs: "You're giving up and shutting down the conversation.",
      trySaying: "I need a moment to gather my thoughts, but I do want to resolve this."
    };
  }
  
  if (statementLower.includes('whatever')) {
    return {
      heardAs: "You don't respect my opinion and are dismissing me.",
      trySaying: "I'm feeling frustrated right now, but I still want to work this out."
    };
  }

  if (statementLower.includes('you don\'t care') || statementLower.includes('you never listen')) {
    return {
      heardAs: "You're being accused of emotional neglect and indifference.",
      trySaying: "I feel unheard when we talk about this topic. Could we try a different approach together?"
    };
  }

  if (statementLower.includes('just like your') && (statementLower.includes('mother') || statementLower.includes('father'))) {
    return {
      heardAs: "You're being unfairly compared to someone who likely triggers negative feelings.",
      trySaying: "Something about this situation reminds me of patterns I've seen before. Can we talk about what's really bothering me?"
    };
  }

  if (statementLower.includes('stop talking') || statementLower.includes('shut up')) {
    return {
      heardAs: "My voice and perspective don't matter to you.",
      trySaying: "I need a short break to collect my thoughts. Can we pause for 15 minutes and come back to this?"
    };
  }

  if (statementLower.includes('you always make it about you')) {
    return {
      heardAs: "You're selfish and don't consider my feelings at all.",
      trySaying: "I feel like my perspective gets lost in our conversations sometimes. I need to feel heard too."
    };
  }
  
  if (statementLower.includes('why can\'t you just')) {
    return {
      heardAs: "You're deficient and failing at something that should be simple.",
      trySaying: "It would mean a lot to me if we could find a way to approach this differently."
    };
  }

  // Default response if no patterns match
  return {
    heardAs: "This might come across as confrontational or dismissive.",
    trySaying: "I care about your perspective. Can you help me understand what you're feeling?"
  };
};
