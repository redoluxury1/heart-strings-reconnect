import React from 'react';
import { Film, Pizza, Moon, Paintbrush, Heart, Home, MapPin, Mountain, Sun } from 'lucide-react';
import { DateIdea } from '@/types/date-wheel';

// Create date idea data
const dateIdeas: DateIdea[] = [
  {
    id: 'movie-night',
    title: 'Movie Marathon Night',
    description: 'Each pick a favorite movie from your teen years and watch them back-to-back with popcorn and comfort snacks.',
    category: ['home', 'low-effort'],
    icon: <Film className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Sharing nostalgic experiences helps you learn about each other\'s formative years and creates new shared memories.'
  },
  {
    id: 'diy-pizza',
    title: 'DIY Pizza Competition',
    description: 'Buy premade dough and toppings. Each person creates a signature pizza, then taste test and vote.',
    category: ['home'],
    icon: <Pizza className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Playful competition can spark joy while cooking together builds cooperation skills.'
  },
  {
    id: 'stargazing',
    title: 'Backyard Stargazing',
    description: 'Lay a blanket outside with pillows, hot drinks, and use a stargazing app to identify constellations together.',
    category: ['home', 'flirty'],
    icon: <Moon className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Sharing moments of awe and wonder creates powerful bonding experiences.'
  },
  {
    id: 'art-night',
    title: 'Paint & Sip Evening',
    description: 'Buy simple canvases and paints, open some wine, and follow an easy YouTube painting tutorial together.',
    category: ['home', 'adventure'],
    icon: <Paintbrush className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Trying something creative without judgment builds emotional safety in your relationship.'
  },
  {
    id: 'farmers-market',
    title: 'Farmers Market Challenge',
    description: 'Visit a local market with $20 each. Buy ingredients that catch your eye, then cook a meal together using your finds.',
    category: ['out'],
    icon: <MapPin className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Shared novel experiences release dopamine, which enhances your connection.'
  },
  {
    id: 'sunset-picnic',
    title: 'Sunset Picnic',
    description: 'Pack a simple picnic and find a spot with a good view of the sunset. Bring a portable speaker for music.',
    category: ['out', 'flirty'],
    icon: <Sun className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Taking time to slow down and appreciate beauty together promotes mindfulness in your relationship.'
  },
  {
    id: 'massage-night',
    title: 'At-Home Spa Night',
    description: 'Take turns giving each other 15-minute massages. Light candles, play relaxing music, and use scented oils.',
    category: ['home', 'flirty'],
    icon: <Heart className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Physical touch releases oxytocin, deepening your bond and reducing stress levels.'
  },
  {
    id: 'hiking',
    title: 'Sunrise Hike & Breakfast',
    description: 'Wake up early for a morning hike to a scenic spot, carrying a thermos of coffee and breakfast treats.',
    category: ['adventure', 'out'],
    icon: <Mountain className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Overcoming small challenges together builds resilience in your relationship.'
  },
  {
    id: 'game-night',
    title: 'Nostalgic Game Night',
    description: 'Play board games or card games from your childhood. Winner gets to choose dessert or the next activity.',
    category: ['home', 'low-effort'],
    icon: <Home className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Playful competition can increase positive emotions and create lasting memories.'
  },
  {
    id: 'bookstore-date',
    title: 'Bookstore Adventure',
    description: 'Visit a bookstore and each pick out a book the other would enjoy. Read them together over coffee afterward.',
    category: ['out', 'low-effort'],
    icon: <MapPin className="h-6 w-6 text-midnight-indigo" />,
    tip: 'Sharing intellectual interests builds respect and appreciation for each other\'s inner worlds.'
  }
];

// Helper function to get date ideas filtered by category
export const getDateIdeasByCategory = (category: string): DateIdea[] => {
  if (category === 'all') {
    return dateIdeas;
  }
  return dateIdeas.filter(idea => idea.category.includes(category));
};

export default dateIdeas;
