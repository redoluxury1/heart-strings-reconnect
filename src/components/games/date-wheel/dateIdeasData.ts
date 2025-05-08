import { DateIdea } from '@/types/date-wheel';

// Create date idea data
const dateIdeas: DateIdea[] = [
  {
    id: 'movie-night',
    title: 'Movie Marathon Night',
    description: 'Each pick a favorite movie from your teen years and watch them back-to-back with popcorn and comfort snacks.',
    category: ['home', 'low-effort'],
    icon: 'Film',
    tip: 'Sharing nostalgic experiences helps you learn about each other\'s formative years and creates new shared memories.'
  },
  {
    id: 'diy-pizza',
    title: 'DIY Pizza Competition',
    description: 'Buy premade dough and toppings. Each person creates a signature pizza, then taste test and vote.',
    category: ['home'],
    icon: 'Pizza',
    tip: 'Playful competition can spark joy while cooking together builds cooperation skills.'
  },
  {
    id: 'stargazing',
    title: 'Backyard Stargazing',
    description: 'Lay a blanket outside with pillows, hot drinks, and use a stargazing app to identify constellations together.',
    category: ['home', 'flirty'],
    icon: 'Moon',
    tip: 'Sharing moments of awe and wonder creates powerful bonding experiences.'
  },
  {
    id: 'art-night',
    title: 'Paint & Sip Evening',
    description: 'Buy simple canvases and paints, open some wine, and follow an easy YouTube painting tutorial together.',
    category: ['home', 'adventure'],
    icon: 'Paintbrush',
    tip: 'Trying something creative without judgment builds emotional safety in your relationship.'
  },
  {
    id: 'farmers-market',
    title: 'Farmers Market Challenge',
    description: 'Visit a local market with $20 each. Buy ingredients that catch your eye, then cook a meal together using your finds.',
    category: ['out'],
    icon: 'MapPin',
    tip: 'Shared novel experiences release dopamine, which enhances your connection.'
  },
  {
    id: 'sunset-picnic',
    title: 'Sunset Picnic',
    description: 'Pack a simple picnic and find a spot with a good view of the sunset. Bring a portable speaker for music.',
    category: ['out', 'flirty'],
    icon: 'Sun',
    tip: 'Taking time to slow down and appreciate beauty together promotes mindfulness in your relationship.'
  },
  {
    id: 'massage-night',
    title: 'At-Home Spa Night',
    description: 'Take turns giving each other 15-minute massages. Light candles, play relaxing music, and use scented oils.',
    category: ['home', 'flirty'],
    icon: 'Heart',
    tip: 'Physical touch releases oxytocin, deepening your bond and reducing stress levels.'
  },
  {
    id: 'hiking',
    title: 'Sunrise Hike & Breakfast',
    description: 'Wake up early for a morning hike to a scenic spot, carrying a thermos of coffee and breakfast treats.',
    category: ['adventure', 'out'],
    icon: 'Mountain',
    tip: 'Overcoming small challenges together builds resilience in your relationship.'
  },
  {
    id: 'game-night',
    title: 'Nostalgic Game Night',
    description: 'Play board games or card games from your childhood. Winner gets to choose dessert or the next activity.',
    category: ['home', 'low-effort'],
    icon: 'Home',
    tip: 'Playful competition can increase positive emotions and create lasting memories.'
  },
  {
    id: 'bookstore-date',
    title: 'Bookstore Adventure',
    description: 'Visit a bookstore and each pick out a book the other would enjoy. Read them together over coffee afterward.',
    category: ['out', 'low-effort'],
    icon: 'MapPin',
    tip: 'Sharing intellectual interests builds respect and appreciation for each other\'s inner worlds.'
  },
  // Adding new date ideas
  {
    id: 'target-gift-swap',
    title: '$10 Target Gift Swap',
    description: 'Go to Target. Split up. Buy each other a $10 surprise gift.',
    category: ['out'],
    icon: 'Heart',
    tip: 'Small surprises create warmth without pressure.'
  },
  {
    id: 'blanket-fort',
    title: 'Build a Blanket Fort',
    description: 'Make a fort out of pillows and blankets, then hang out in it—no phones allowed.',
    category: ['home'],
    icon: 'Home',
    tip: 'Creating together builds lighthearted connection.'
  },
  {
    id: 'silent-walk',
    title: 'Take a "No Talking" Walk',
    description: 'Go for a 15-minute walk together without speaking. Just observe, smile, and hold hands.',
    category: ['out', 'low-effort'],
    icon: 'MapPin',
    tip: 'Physical closeness without words can reset the vibe.'
  },
  {
    id: 'highschool-throwback',
    title: 'High School Throwback Night',
    description: 'Watch a movie or eat a snack you loved as teens. Dress the part if you\'re feeling bold.',
    category: ['home'],
    icon: 'Film',
    tip: 'Shared nostalgia deepens emotional closeness.'
  },
  {
    id: 'power-outage',
    title: 'Power Outage Challenge',
    description: 'Turn off all lights and devices for an hour. Candles only. Talk, eat, or just be.',
    category: ['home'],
    icon: 'Moon',
    tip: 'Distraction-free time fosters deeper presence.'
  },
  {
    id: 'make-pizza',
    title: 'Make Pizza Together',
    description: 'Grab supplies and build your own pizzas—no judgment on toppings.',
    category: ['home'],
    icon: 'Pizza',
    tip: 'Collaborative activities bond partners without needing to "talk it out."'
  },
  {
    id: 'say-yes',
    title: 'Say Yes Night',
    description: 'You each take turns asking a question or suggesting something. The other says yes (within reason).',
    category: ['flirty'],
    icon: 'Heart',
    tip: 'Creates openness, laughter, and curiosity.'
  },
  {
    id: 'couple-playlist',
    title: 'Create a Couple Playlist',
    description: 'Build a joint Spotify playlist with songs that represent your relationship or mood.',
    category: ['home'],
    icon: 'Music',
    tip: 'Music unlocks emotional language.'
  },
  {
    id: 'eye-contact',
    title: '5-Minute Eye Contact',
    description: 'Sit facing each other. No talking, just eye contact for 5 minutes.',
    category: ['flirty', 'low-effort'],
    icon: 'Eye',
    tip: 'Eye contact builds trust and releases bonding hormones.'
  },
  {
    id: 'coffee-qa',
    title: 'Coffee Shop Q&A',
    description: 'Go get a drink together. Bring 3 questions each that you\'ve never asked the other.',
    category: ['out', 'low-effort'],
    icon: 'Coffee',
    tip: 'It\'s like dating again—on purpose.'
  },
  {
    id: 'dinner-roulette',
    title: 'Dinner Roulette',
    description: 'Pick a number 1–10 and randomly scroll a delivery app or cookbook. Make whatever you land on.',
    category: ['home'],
    icon: 'Utensils',
    tip: 'Adds surprise and removes indecision.'
  },
  {
    id: 'first-date',
    title: '"First Date" Reenactment',
    description: 'Recreate your first date—same outfits, same lines, same meal if possible.',
    category: ['out'],
    icon: 'Calendar',
    tip: 'Revisiting beginnings rekindles fondness.'
  },
  {
    id: 'new-recipe',
    title: 'Cook Something New Together',
    description: 'Find a recipe neither of you has tried and attempt it together.',
    category: ['home', 'adventure'],
    icon: 'Utensils',
    tip: 'Shared learning builds bonding and teamwork.'
  },
  {
    id: 'paint-night',
    title: 'Home Wine + Paint Night',
    description: 'Buy paint supplies or use an app. Pour drinks. Paint portraits of each other.',
    category: ['home'],
    icon: 'Paintbrush',
    tip: 'Laughter and creativity reduce tension.'
  },
  {
    id: '36-questions',
    title: 'Ask the "36 Questions"',
    description: 'Use a well-known list or pick 3 deeper questions to answer together.',
    category: ['home', 'flirty'],
    icon: 'MessageCircle',
    tip: 'Deeper questions build closeness through emotional openness.'
  },
  {
    id: 'time-capsule',
    title: 'Relationship Time Capsule',
    description: 'Write a note or memory to "future us" and tuck it away to read in a year.',
    category: ['home'],
    icon: 'Calendar',
    tip: 'Looking forward builds hope and partnership.'
  },
  {
    id: 'silent-movie',
    title: 'Silent Movie Night',
    description: 'Watch a movie with the sound off and make up your own dialogue as it plays.',
    category: ['home'],
    icon: 'Film',
    tip: 'Breaks tension and invites lightness.'
  },
  {
    id: 'teach-skill',
    title: 'Teach Each Other Something',
    description: 'Take 10 minutes each to teach your partner something you know well.',
    category: ['home', 'low-effort'],
    icon: 'Star',
    tip: 'Builds appreciation and creates new respect.'
  },
  {
    id: 'massage-swap',
    title: '10-Minute Massage Swap',
    description: 'One gives. One receives. Then switch. No strings.',
    category: ['home', 'flirty'],
    icon: 'Heart',
    tip: 'Touch re-regulates the nervous system and softens resentment.'
  },
  {
    id: 'dream-list',
    title: 'The Dream List',
    description: 'Each person writes 5 things they still want to do or try with their partner. Share and compare.',
    category: ['home'],
    icon: 'Star',
    tip: 'Dreaming together re-centers the "we."'
  },
  {
    id: 'parallel-play',
    title: 'Parallel Play Night',
    description: 'Sit together and do your own thing—reading, sketching, scrolling. Just be near each other.',
    category: ['home', 'low-effort'],
    icon: 'Book',
    tip: 'Reconnection doesn\'t always need words—just presence.'
  },
  {
    id: 'grocery-trial',
    title: 'Grocery Store Time Trial',
    description: 'Set a timer and split up. You each grab ingredients for a surprise snack. Regroup and eat.',
    category: ['out', 'adventure'],
    icon: 'ShoppingBag',
    tip: 'Light pressure and friendly competition spark fun.'
  },
  {
    id: 'bucket-list',
    title: 'Build a Shared Bucket List',
    description: 'Use the notes app or a notebook. Add big and small experiences you want to do together.',
    category: ['home', 'low-effort'],
    icon: 'Star',
    tip: 'Forward focus builds hope and "we" language.'
  },
  {
    id: 'couch-picnic',
    title: 'Couch Picnic',
    description: 'Eat something low-key (like snacks or takeout) on the couch, floor, or in bed—plates optional.',
    category: ['home', 'low-effort'],
    icon: 'Home',
    tip: 'Breaking the routine softens the vibe.'
  },
  {
    id: 'old-voicemail',
    title: 'Listen to an Old Voicemail',
    description: 'Pick an old message and listen together. Bonus: record a new one for each other.',
    category: ['home', 'flirty'],
    icon: 'Headphones',
    tip: 'Real voices bring back real connection.'
  },
  {
    id: 'ideal-weekend',
    title: '"Your Ideal Weekend" Swap',
    description: 'Describe what your perfect Saturday looks like. Then see how close you can get this week.',
    category: ['home', 'low-effort'],
    icon: 'Calendar',
    tip: 'Helps you understand and support each other\'s world.'
  },
  {
    id: 'new-neighborhood',
    title: 'Walk a New Neighborhood',
    description: 'Choose a nearby area you\'ve never walked and explore together without a plan.',
    category: ['out', 'adventure'],
    icon: 'MapPin',
    tip: 'Novelty creates fresh context for connection.'
  },
  {
    id: 'new-show',
    title: 'Watch Something You Normally Wouldn\'t',
    description: 'Pick a show or doc outside your usual genres—then talk about it after.',
    category: ['home', 'low-effort'],
    icon: 'Film',
    tip: 'Doing something different brings out new parts of you both.'
  },
  {
    id: 'swap-favorites',
    title: 'Swap Favorites',
    description: 'Trade each other\'s favorite snack, shirt, song, or movie—then try it like it\'s brand new.',
    category: ['home', 'flirty'],
    icon: 'Gift',
    tip: 'Builds curiosity and invites play.'
  },
  {
    id: 'tiktok-recipe',
    title: 'Recreate a TikTok Recipe',
    description: 'Pick a trending dish and try making it together. Bonus: record yourselves (or don\'t).',
    category: ['home', 'adventure'],
    icon: 'Utensils',
    tip: 'Doing, not talking, creates safer connection.'
  },
  {
    id: 'budget-date',
    title: 'Budget Date Challenge',
    description: 'Set a limit ($5, $15, $30) and design the best date you can with it.',
    category: ['out', 'adventure'],
    icon: 'Star',
    tip: 'Creates intention without requiring money.'
  },
  {
    id: 'clean-sprint',
    title: '20-Minute Clean Sprint (Then Reward)',
    description: 'Clean one room together fast—then treat yourselves with dessert or a show.',
    category: ['home'],
    icon: 'Home',
    tip: 'Creates "we did that" energy that spills into other parts of your relationship.'
  },
  {
    id: 'bookstore-stroll',
    title: 'Stroll Through a Bookstore',
    description: 'Grab a coffee, wander the aisles, show each other interesting covers or titles.',
    category: ['out', 'low-effort'],
    icon: 'Book',
    tip: 'Quiet curiosity builds comfort and shared rhythm.'
  },
  {
    id: 'fake-vacation',
    title: 'Make a Fake Vacation Plan',
    description: 'Pick a random place you\'ve never been and plan a pretend trip—flights, outfits, snacks.',
    category: ['home', 'adventure'],
    icon: 'MapPin',
    tip: 'Shared dreaming activates connection and creativity.'
  },
  {
    id: 'yelp-review',
    title: 'Write a Yelp Review Together',
    description: 'Pick a restaurant or place you both went and co-write a dramatic or funny review.',
    category: ['home', 'low-effort'],
    icon: 'Star',
    tip: 'Co-creating stories encourages laughter and bonding.'
  },
  {
    id: 'taste-test',
    title: 'Taste Test Something Weird',
    description: 'Try unusual snacks or drinks from another culture or a specialty store. Rate them together.',
    category: ['home', 'adventure'],
    icon: 'Coffee',
    tip: 'Shared risk (even in food!) builds intimacy.'
  },
  {
    id: 'slow-dance',
    title: 'Do a 1-Song Slow Dance',
    description: 'Pick a meaningful song and dance to it wherever you are. Just one.',
    category: ['home', 'flirty'],
    icon: 'Music',
    tip: 'Regulates the nervous system and reignites affection.'
  },
  {
    id: 'old-photos',
    title: 'Look Through Old Photos',
    description: 'Scroll through your old camera rolls or saved memes together.',
    category: ['home', 'low-effort'],
    icon: 'Camera',
    tip: 'Shared history is one of your strongest assets.'
  },
  {
    id: 'what-if-game',
    title: '"What If We…" Game',
    description: 'Take turns finishing the sentence: "What if we…" and see where it goes.',
    category: ['home', 'flirty'],
    icon: 'MessageCircle',
    tip: 'Opens the door to possibilities without expectations.'
  },
  {
    id: 'silence-coffee',
    title: 'Sit in Silence with Coffee or Wine',
    description: 'Just sit. Sip. No phones. No pressure.',
    category: ['home', 'low-effort'],
    icon: 'Coffee',
    tip: 'Sometimes, peace is the best reset of all.'
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
