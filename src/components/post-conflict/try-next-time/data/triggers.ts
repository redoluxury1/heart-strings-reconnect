export interface TriggerOption {
  id: string;
  label: string;
  icon: string;
}

export const triggerOptions: TriggerOption[] = [
  { id: 'dismissed', label: 'Feeling dismissed', icon: 'EarOff' },
  { id: 'criticized', label: 'Being criticized', icon: 'MessageSquareWarning' },
  { id: 'tone', label: 'Their tone of voice', icon: 'Volume2' },
  { id: 'interrupted', label: 'Being interrupted', icon: 'Hand' },
  { id: 'blamed', label: 'Feeling blamed', icon: 'Target' },
  { id: 'overwhelmed', label: 'Feeling overwhelmed', icon: 'Waves' },
  { id: 'controlled', label: 'Feeling controlled', icon: 'Lock' },
  { id: 'unappreciated', label: 'Feeling unappreciated', icon: 'Heart' },
];
