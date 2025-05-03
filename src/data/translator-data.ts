
// This function simulates translating a user statement
export const translateStatement = (statement: string) => {
  // In a production app, this would use more sophisticated matching or AI
  const statementLower = statement.toLowerCase();
  
  // Sample translations based on common phrases
  if (statementLower.includes('not a big deal') || statementLower.includes('overreacting')) {
    return {
      heardAs: "You don't care about how I feel.",
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
  
  // Default response if no patterns match
  return {
    heardAs: "This might come across as confrontational or dismissive.",
    trySaying: "I care about your perspective. Can you help me understand what you're feeling?"
  };
};
