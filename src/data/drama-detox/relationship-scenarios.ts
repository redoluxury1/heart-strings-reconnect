
import { Scenario } from "../../types/games";

export const relationshipScenarios: Scenario[] = [
  {
    id: "birthday-surprise",
    title: "The Forgotten Birthday Cake",
    description: "Your partner promised to pick up the special cake you ordered for your birthday. They completely forgot, and now the bakery is closed. You're upset about the ruined surprise.",
    options: [
      {
        id: "a",
        label: "The partner who forgot the cake is the problem",
        votes: 70
      },
      {
        id: "b",
        label: "The person who's upset is being too dramatic",
        votes: 30
      }
    ],
    insight: "Thoughtfulness matters in relationships, but so does grace when mistakes happen. Neither perfection nor punishment builds connection.",
    submittedBy: false
  },
  {
    id: "vacation-plans",
    title: "The Changed Vacation Plans",
    description: "After months of planning a beach vacation together, your partner suddenly wants to change to a mountain cabin trip instead because their friend recommended it. You've already mentally prepared for the beach.",
    options: [
      {
        id: "a",
        label: "Partner changing plans last minute is the problem",
        votes: 65
      },
      {
        id: "b", 
        label: "Person refusing to consider alternatives is the problem",
        votes: 35
      }
    ],
    insight: "Flexibility and respect for joint planning are both important in relationships. The issue is less about the destination and more about how changes are communicated and negotiated.",
    submittedBy: false
  },
  {
    id: "allergic-birthday-cake",
    title: "The Allergic Birthday Cake",
    description: "For her birthday, she specifically asked for a carrot cake. He brought home a chocolate cake, knowing she's allergic. When she expressed her disappointment, he accused her of being ungrateful.",
    options: [
      {
        id: "a",
        label: "He's the problem for ignoring her allergy",
        votes: 85
      },
      {
        id: "b",
        label: "She's the problem for not appreciating his effort",
        votes: 15
      }
    ],
    insight: "Showing care means paying attention to someone's needs and preferences, especially regarding health concerns like allergies. True thoughtfulness involves listening.",
    submittedBy: true
  },
  {
    id: "roommate-interference",
    title: "The Roommate's Interference",
    description: "His best friend and roommate constantly interfered in their relationship, even spreading rumors. When she confronted her boyfriend, he sided with his friend, leading to a breakup.",
    options: [
      {
        id: "a",
        label: "Interfering roommate is the problem",
        votes: 45
      },
      {
        id: "b",
        label: "Boyfriend who didn't support his partner is the problem",
        votes: 55
      }
    ],
    insight: "Relationships require safe boundaries from outside interference. Loyalty matters, but not at the expense of truth and respectful treatment.",
    submittedBy: true
  },
  {
    id: "hobby-dispute",
    title: "The Hobby Dispute",
    description: "He took up flying remote control planes as a hobby. His wife disapproved, feeling it was a waste of time and money. He purchased a plane secretly, leading to a significant argument.",
    options: [
      {
        id: "a",
        label: "Husband who made a secret purchase is the problem",
        votes: 60
      },
      {
        id: "b",
        label: "Wife who disapproved of his hobby is the problem",
        votes: 40
      }
    ],
    insight: "Individual interests enrich our lives, but secrecy erodes trust. Couples need space for individual joy while maintaining financial transparency.",
    submittedBy: true
  }
];
