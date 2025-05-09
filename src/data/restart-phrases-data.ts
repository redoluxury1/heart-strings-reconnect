
export interface RestartPhrase {
  id: string;
  text: string;
  category: 'calm' | 'connection' | 'honest' | 'nervous';
}

export const restartPhrases: RestartPhrase[] = [
  {
    id: 'phrase-1',
    text: "I've had a little space. Can we try again calmly?",
    category: 'calm'
  },
  {
    id: 'phrase-2',
    text: "Still want to work through this—ready if you are.",
    category: 'connection'
  },
  {
    id: 'phrase-3',
    text: "Let's take a fresh approach. I don't want this to spiral again.",
    category: 'calm'
  },
  {
    id: 'phrase-4',
    text: "Can we go back to the hard part—but do it softer this time?",
    category: 'honest'
  },
  {
    id: 'phrase-5',
    text: "I care more about us than being right. Let's try again.",
    category: 'connection'
  },
  {
    id: 'phrase-6',
    text: "I'm nervous to restart—but I don't want to avoid this.",
    category: 'nervous'
  },
  {
    id: 'phrase-7',
    text: "I needed that break, and now I'm ready to listen better.",
    category: 'calm'
  },
  {
    id: 'phrase-8',
    text: "Can we start over? I think we both got caught up in reactions.",
    category: 'honest'
  },
  {
    id: 'phrase-9',
    text: "I want to understand your side better if you're ready to share.",
    category: 'connection'
  },
  {
    id: 'phrase-10',
    text: "That break helped me calm down. I'm ready to talk if you are.",
    category: 'calm'
  }
];
