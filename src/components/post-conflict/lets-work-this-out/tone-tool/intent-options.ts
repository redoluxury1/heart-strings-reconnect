
export interface IntentOption {
  id: string;
  text: string;
}

export const intentOptions: IntentOption[] = [
  { id: 'together', text: 'I want us to work together to…' },
  { id: 'team', text: 'We\'re on the same team. Let\'s…' },
  { id: 'listen', text: 'I\'m open and willing to listen.' },
  { id: 'not-fight', text: 'I\'m here to listen, not fight.' },
  { id: 'care', text: 'I care about you, even if I\'m upset…' },
];
