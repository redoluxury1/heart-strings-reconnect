export interface EmpathyPrompt {
  id: string;
  prompt: string;
  placeholder: string;
  helpText: string;
}

export const empathyPrompts: EmpathyPrompt[] = [
  {
    id: 'feelings',
    prompt: "When this happened, my partner might have felt...",
    placeholder: "e.g., hurt, confused, unappreciated, scared...",
    helpText: "Try to imagine what emotions they experienced in that moment"
  },
  {
    id: 'reason',
    prompt: "They might have reacted that way because...",
    placeholder: "e.g., they felt attacked, they were already stressed, they felt unheard...",
    helpText: "Consider what might have been going on for them beneath the surface"
  },
  {
    id: 'need',
    prompt: "What they probably needed from me was...",
    placeholder: "e.g., to feel heard, reassurance, patience, space...",
    helpText: "Think about what would have helped them feel safer or more connected"
  }
];

export const generateConversationStarters = (responses: Record<string, string>): string[] => {
  const starters: string[] = [];
  
  const feelings = responses['feelings'] || '';
  const reason = responses['reason'] || '';
  const need = responses['need'] || '';
  
  if (feelings) {
    starters.push(
      `"I've been thinking about what happened, and I realize you might have felt ${feelings.toLowerCase()}. Was that part of it?"`
    );
  }
  
  if (reason) {
    starters.push(
      `"I think I understand now that when I [what you did], it might have seemed like ${reason.toLowerCase()}. I didn't mean for it to come across that way."`
    );
  }
  
  if (need) {
    starters.push(
      `"I want to do better. It sounds like you needed ${need.toLowerCase()} from me. Can we talk about how I can show up differently?"`
    );
  }
  
  // Add a general reconnection starter
  starters.push(
    `"I've been reflecting on our conflict, and I want you to know I'm working on understanding your side better. Can we talk when you're ready?"`
  );
  
  return starters.slice(0, 3);
};
