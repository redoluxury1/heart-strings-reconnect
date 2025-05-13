
// Define the sentence starter interface
export interface NeedsStarter {
  id: number;
  text: string;
}

// Define the sentence starters for the "what do you need" step
export const needsStarters: NeedsStarter[] = [
  { id: 1, text: "I really need you to..." },
  { id: 2, text: "I think we could grow stronger if..." },
  { id: 3, text: "I want us to work on..." },
  { id: 4, text: "What helps me feel safe is..." },
  { id: 5, text: "It would mean a lot to me if you..." },
];
