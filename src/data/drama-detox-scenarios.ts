
import { Scenario } from '../types/games';

export const scenarios: Scenario[] = [
  {
    id: 'forgotten-birthday-cake',
    title: 'The Forgotten Birthday Cake',
    description: 'After reminding him all week, he still forgot to pick up your birthday cake from the bakery. When you mention it, he says you never gave clear instructions about when to get it.',
    options: [
      {
        id: 'option-a',
        label: "He's the problem",
        votes: 65
      },
      {
        id: 'option-b',
        label: "She's the problem",
        votes: 10
      },
      {
        id: 'option-c',
        label: "They both need to chill",
        votes: 25
      }
    ],
    insight: "Calendar reminders exist for a reason! But it's also helpful to be specific about timing expectations instead of assuming they're understood.",
    submittedBy: false
  },
  {
    id: 'maid-of-honor',
    title: 'The Maid of Honor Dilemma',
    description: 'Your sister backed out of being your maid of honor last minute because her dog got sick. You're hurt and think she's being selfish, but she says you're not being understanding of her fur baby emergency.',
    options: [
      {
        id: 'option-a',
        label: "Sister with the pet emergency is the problem",
        votes: 45
      },
      {
        id: 'option-b',
        label: "Bride who declined to be MOH is the problem",
        votes: 15
      },
      {
        id: 'option-c',
        label: "They both need to chill",
        votes: 40
      }
    ],
    insight: "Big events create big emotions. While commitments are important, sometimes emergencies happen with those we love—including pets. Finding middle ground (like video calling in) might help.",
    submittedBy: true
  },
  {
    id: 'vacation-planning',
    title: 'The Vacation Planning Dispute',
    description: 'You spent weeks planning the perfect vacation, but your partner wants to change destinations last minute because their friend recommended somewhere "way better." You feel your work isn't appreciated.',
    options: [
      {
        id: 'option-a',
        label: "The vacation planner is the problem",
        votes: 20
      },
      {
        id: 'option-b',
        label: "The last-minute changer is the problem",
        votes: 55
      },
      {
        id: 'option-c',
        label: "They both need to chill",
        votes: 25
      }
    ],
    insight: "Planning takes effort that deserves recognition, but vacation is about both people enjoying themselves. The timing of suggestions matters as much as the suggestions themselves.",
    submittedBy: false
  }
];
