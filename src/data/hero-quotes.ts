// Daily hero quotes including holiday-specific ones
export interface HeroQuote {
  id: number;
  headline: string;
  subtext: string;
  // MM-DD format for specific dates (e.g., "02-14" for Valentine's Day)
  // null means it can be used any day
  specificDate?: string | null;
  // Special category for general rotation quotes
  category?: 'general' | 'holiday' | 'seasonal' | 'submitted';
}

export const heroQuotes: HeroQuote[] = [
  // General quotes for rotation
  {
    id: 1,
    headline: "Finally, an app that teaches him when to feed her and tell her she's pretty.",
    subtext: "And also how to stop turning every disagreement into a silent standoff. We can help with that.",
    specificDate: null,
    category: 'general'
  },
  {
    id: 2,
    headline: "Finally, an app that helps you fight less and love more.",
    subtext: "Because sometimes 'I'm fine' actually means 'we need to talk'.",
    specificDate: null,
    category: 'general'
  },
  {
    id: 3,
    headline: "Finally, an app that translates what they actually mean.",
    subtext: "Turns out 'whatever you want' never actually means whatever you want.",
    specificDate: null,
    category: 'general'
  },
  {
    id: 4,
    headline: "Finally, an app that reminds you why you fell in love in the first place.",
    subtext: "Even on the days when you can't remember why yourself.",
    specificDate: null,
    category: 'general'
  },
  
  // Holiday-specific quotes
  // Valentine's Day
  {
    id: 101,
    headline: "Finally, an app that helps you express love beyond just flowers and chocolates.",
    subtext: "Though we still recommend getting those too. Just to be safe.",
    specificDate: "02-14",
    category: 'holiday'
  },
  // Thanksgiving
  {
    id: 102,
    headline: "Finally, an app that helps us not argue on the way to the in-laws today.",
    subtext: "Or on the way back, or at home later that day, or never talk to the in-laws again.",
    specificDate: "11-25", // Approximate date, adjusts each year
    category: 'holiday'
  },
  // Christmas
  {
    id: 103,
    headline: "Finally, an app that prevents gift-giving disasters.",
    subtext: "No, they don't want a vacuum cleaner. Yes, they'll pretend to like it anyway.",
    specificDate: "12-25",
    category: 'holiday'
  },
  // New Year's
  {
    id: 104,
    headline: "Finally, an app that helps your relationship resolutions last beyond January.",
    subtext: "Unlike your gym membership.",
    specificDate: "01-01",
    category: 'holiday'
  },
  // Anniversary (generic)
  {
    id: 105,
    headline: "Finally, an app that remembers your anniversary so you don't have to.",
    subtext: "Though you should probably remember it anyway. Just saying.",
    specificDate: null,
    category: 'seasonal'
  }
];

// Helper function to get daily quote based on date
export const getDailyQuote = (): HeroQuote => {
  // Return the specific quote about feeding her and telling her she's pretty
  return heroQuotes.find(quote => quote.id === 1) || heroQuotes[0];
};
