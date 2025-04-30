
import { Scenario } from "../types/games";

const dramaDetoxScenarios: Scenario[] = [
  {
    id: "birthday-surprise",
    title: "The Forgotten Birthday Cake",
    description: "Your partner promised to pick up the special cake you ordered for your birthday. They completely forgot, and now the bakery is closed. You're upset about the ruined surprise.",
    options: [
      {
        id: "a",
        label: "The partner who forgot the cake is the problem",
        votes: 450
      },
      {
        id: "b",
        label: "The person who's upset is being too dramatic",
        votes: 180
      },
      {
        id: "c",
        label: "They both need to chill and communicate better",
        votes: 370
      }
    ],
    insight: "Thoughtfulness matters in relationships, but so does grace when mistakes happen. Neither perfection nor punishment builds connection.",
    submittedBy: false
  },
  {
    id: "maid-of-honor",
    title: "The Maid of Honor Dilemma",
    description: "Your sister backed out of being your maid of honor last minute because her dog got sick. You're hurt and think she's being selfish, but she says you're not being understanding of her fur baby emergency.",
    options: [
      {
        id: "a",
        label: "Sister with the pet emergency is the problem",
        votes: 280
      },
      {
        id: "b",
        label: "Bride who isn't understanding is the problem",
        votes: 320
      },
      {
        id: "c",
        label: "They both need to find compromise",
        votes: 400
      }
    ],
    insight: "Family dynamics are tricky, especially during high-stress events. Often, both perspectives have validity if we can see beyond our own viewpoint.",
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
        votes: 320
      },
      {
        id: "b", 
        label: "Person refusing to consider alternatives is the problem",
        votes: 180
      },
      {
        id: "c",
        label: "They both need to find a compromise",
        votes: 500
      }
    ],
    insight: "Flexibility and respect for joint planning are both important in relationships. The issue is less about the destination and more about how changes are communicated and negotiated.",
    submittedBy: true
  }
];

export default dramaDetoxScenarios;
