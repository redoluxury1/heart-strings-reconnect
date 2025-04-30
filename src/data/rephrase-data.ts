
import { SavedRephrase } from "@/types/archive";

// Sample data - in a real app, this would come from storage/database
export const sampleRephrases: SavedRephrase[] = [
  {
    id: '1',
    originalPhrase: "You never listen to me.",
    rephraseText: "It feels like I'm not being heard. Can we try again?",
    dateSaved: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    category: "Communication",
    isFavorite: true
  },
  {
    id: '2',
    originalPhrase: "You always make everything about you.",
    rephraseText: "Sometimes I feel like my side of things gets lost in the conversation.",
    dateSaved: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    category: "Self-centeredness",
    isFavorite: false
  },
  {
    id: '3',
    originalPhrase: "You're being dramatic.",
    rephraseText: "I'm having a hard time understanding where you're coming from—can we slow it down?",
    dateSaved: new Date(Date.now() - 86400000 * 8).toISOString(), // 8 days ago
    category: "Emotional Invalidation",
    isFavorite: false
  }
];

export const categoriesList = [
  "Communication", 
  "Self-centeredness", 
  "Emotional Invalidation", 
  "Resentment", 
  "Frustration"
];
