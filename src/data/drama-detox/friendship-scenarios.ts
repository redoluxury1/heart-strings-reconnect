
import { Scenario } from "../../types/games";

export const friendshipScenarios: Scenario[] = [
  {
    id: "destination-wedding",
    title: "The Destination Wedding Conflict",
    description: "She declined her best friend's destination wedding due to financial constraints but later planned a more affordable trip with her husband. The friend accused her of prioritizing vacations over their friendship.",
    options: [
      {
        id: "a",
        label: "Friend who made accusations is the problem",
        votes: 75
      },
      {
        id: "b",
        label: "Person who planned another vacation is the problem",
        votes: 25
      }
    ],
    insight: "Financial decisions are personal, and comparing different expenses isn't always fair. True friendship allows others to set their own priorities without guilt.",
    submittedBy: true
  },
  {
    id: "extended-guest",
    title: "The Extended Guest",
    description: "She allowed her friend to stay over for a few days after a breakup. Weeks later, the friend was still there, contributing nothing and disrupting her daily routine. When asked to leave, the friend accused her of being heartless.",
    options: [
      {
        id: "a",
        label: "Overstaying friend is the problem",
        votes: 85
      },
      {
        id: "b",
        label: "Host who didn't set clear boundaries is the problem",
        votes: 15
      }
    ],
    insight: "Kindness doesn't mean endless sacrifice. Clear time frames and expectations at the beginning of an arrangement can prevent resentment later.",
    submittedBy: true
  },
  {
    id: "birthday-gift-oversight",
    title: "The Birthday Gift Oversight",
    description: "She forgot to get a birthday gift for a colleague who had previously given her a thoughtful present. The colleague was hurt, and she felt guilty for the oversight.",
    options: [
      {
        id: "a",
        label: "Person who forgot the gift is the problem",
        votes: 40
      },
      {
        id: "b",
        label: "Colleague with hurt feelings is the problem",
        votes: 60
      }
    ],
    insight: "Gift-giving creates social expectations that can lead to hurt feelings when unmet. But not every oversight carries negative intent - sometimes we simply forget.",
    submittedBy: true
  },
  {
    id: "engagement-overshadow",
    title: "The Engagement Overshadow",
    description: "During a weekend getaway, a woman got engaged. Coincidentally, her best friend announced her own engagement the same weekend. The friend accused her of stealing the spotlight.",
    options: [
      {
        id: "a",
        label: "Newly engaged woman is the problem",
        votes: 20
      },
      {
        id: "b",
        label: "Best friend making accusations is the problem",
        votes: 80
      }
    ],
    insight: "Life's milestones often coincide by chance. Joy doesn't need to be competitive - there's enough celebration to go around when we focus on mutual happiness rather than attention.",
    submittedBy: true
  }
];
