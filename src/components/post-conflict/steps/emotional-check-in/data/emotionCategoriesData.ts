
export interface EmotionChip {
  id: string;
  label: string;
  category: string;
}

export interface EmotionCategory {
  name: string;
  emotions: EmotionChip[];
}

export const emotionCategories: EmotionCategory[] = [
  {
    name: 'OVERWHELMED',
    emotions: [
      { id: 'anxious', label: 'anxious', category: 'overwhelmed' },
      { id: 'chaotic', label: 'chaotic', category: 'overwhelmed' },
      { id: 'stressed', label: 'stressed', category: 'overwhelmed' }
    ]
  },
  {
    name: 'HURT',
    emotions: [
      { id: 'rejected', label: 'rejected', category: 'hurt' },
      { id: 'betrayed', label: 'betrayed', category: 'hurt' },
      { id: 'guilty', label: 'guilty', category: 'hurt' },
      { id: 'wounded', label: 'wounded', category: 'hurt' },
      { id: 'sad', label: 'sad', category: 'hurt' }
    ]
  },
  {
    name: 'SHUT DOWN',
    emotions: [
      { id: 'numb', label: 'numb', category: 'shut-down' },
      { id: 'withdrawn', label: 'withdrawn', category: 'shut-down' },
      { id: 'unheard', label: 'unheard', category: 'shut-down' }
    ]
  },
  {
    name: 'FRUSTRATED',
    emotions: [
      { id: 'misunderstood', label: 'misunderstood', category: 'frustrated' },
      { id: 'angry', label: 'angry', category: 'frustrated' },
      { id: 'irritated', label: 'irritated', category: 'frustrated' }
    ]
  }
];
