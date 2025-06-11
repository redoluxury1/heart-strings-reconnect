
import { PhotoAlbum, Gamepad, ShootingStar, Heart, Compass } from 'lucide-react';

export interface TalkAboutUsQuestion {
  id: string;
  text: string;
}

export interface TalkAboutUsCategory {
  id: string;
  title: string;
  icon: any;
  questions: TalkAboutUsQuestion[];
}

export const talkAboutUsCategories: TalkAboutUsCategory[] = [
  {
    id: 'past-memories',
    title: 'Past & Memories',
    icon: PhotoAlbum,
    questions: [
      { id: 'pm1', text: "What's a childhood memory that still makes you smile?" },
      { id: 'pm2', text: "What song instantly takes you back to your teenage years?" },
      { id: 'pm3', text: "What was your favorite food when you were a kid?" },
      { id: 'pm4', text: "What did you want to be when you grew up?" },
      { id: 'pm5', text: "Who had the biggest influence on you as a child?" }
    ]
  },
  {
    id: 'fun-play',
    title: 'Fun & Play',
    icon: Gamepad,
    questions: [
      { id: 'fp1', text: "What's a board game you used to love playing as a kid?" },
      { id: 'fp2', text: "If you could spend a day doing any silly or fun activity, what would it be?" },
      { id: 'fp3', text: "What movie always makes you laugh no matter how many times you've seen it?" },
      { id: 'fp4', text: "Who was your first celebrity crush?" },
      { id: 'fp5', text: "What kind of vacation makes you feel like a kid again?" }
    ]
  },
  {
    id: 'dreams-growth',
    title: 'Dreams & Growth',
    icon: ShootingStar,
    questions: [
      { id: 'dg1', text: "What's something you've always wanted to learn but haven't yet?" },
      { id: 'dg2', text: "If money didn't matter, what would you spend your time doing?" },
      { id: 'dg3', text: "What's one thing you've changed your mind about in the last few years?" },
      { id: 'dg4', text: 'What does "success" mean to you now vs. when you were younger?' },
      { id: 'dg5', text: "What kind of person are you hoping to become in the next decade?" }
    ]
  },
  {
    id: 'preferences-favorites',
    title: 'Preferences & Favorites',
    icon: Heart,
    questions: [
      { id: 'pf1', text: "What's your comfort TV show?" },
      { id: 'pf2', text: "Sweet or salty snacks—what's your go-to?" },
      { id: 'pf3', text: "What's a weird combination of food you secretly love?" },
      { id: 'pf4', text: "Morning person or night owl?" },
      { id: 'pf5', text: "What's one thing you'd splurge on for yourself guilt-free?" }
    ]
  },
  {
    id: 'meaning-values',
    title: 'Meaning & Values',
    icon: Compass,
    questions: [
      { id: 'mv1', text: 'What does "home" mean to you?' },
      { id: 'mv2', text: "What's something that grounds you when life feels chaotic?" },
      { id: 'mv3', text: "What value do you hope people remember you for?" },
      { id: 'mv4', text: "What's something you think is underrated in today's world?" },
      { id: 'mv5', text: "What does being a good partner mean to you?" }
    ]
  }
];
