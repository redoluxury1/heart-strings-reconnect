export interface ReactionOption {
  id: string;
  label: string;
  icon: string;
}

export const reactionOptions: ReactionOption[] = [
  { id: 'defensive', label: 'Got defensive', icon: 'Shield' },
  { id: 'shutdown', label: 'Shut down', icon: 'Lock' },
  { id: 'raised-voice', label: 'Raised my voice', icon: 'Volume2' },
  { id: 'walked-away', label: 'Walked away', icon: 'DoorOpen' },
  { id: 'hurtful', label: 'Said something hurtful', icon: 'MessageCircleX' },
  { id: 'cried', label: 'Cried', icon: 'Droplets' },
  { id: 'stonewalled', label: 'Gave the silent treatment', icon: 'VolumeX' },
  { id: 'blamed-back', label: 'Blamed them back', icon: 'RotateCcw' },
];
