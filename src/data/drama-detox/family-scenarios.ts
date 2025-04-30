
import { Scenario } from "../../types/games";

export const familyScenarios: Scenario[] = [
  {
    id: "maid-of-honor",
    title: "The Maid of Honor Dilemma",
    description: "Your sister backed out of being your maid of honor last minute because her dog got sick. You're hurt and think she's being selfish, but she says you're not being understanding of her fur baby emergency.",
    options: [
      {
        id: "a",
        label: "Sister with the pet emergency is the problem",
        votes: 45
      },
      {
        id: "b",
        label: "Bride who isn't understanding is the problem",
        votes: 55
      }
    ],
    insight: "Family dynamics are tricky, especially during high-stress events. Often, both perspectives have validity if we can see beyond our own viewpoint.",
    submittedBy: false
  },
  {
    id: "wedding-moh-dilemma",
    title: "The Maid of Honor Dilemma",
    description: "Her sister missed her wedding due to a pet emergency. Now, as her sister plans her own wedding, she asks her to be the maid of honor. She declines, citing unresolved hurt feelings.",
    options: [
      {
        id: "a",
        label: "Sister who declined to be MOH is the problem",
        votes: 45
      },
      {
        id: "b",
        label: "Sister who missed the wedding is the problem",
        votes: 55
      }
    ],
    insight: "Unresolved hurt often emerges in reciprocal situations. Healing requires acknowledging past hurts rather than expecting them to disappear without discussion.",
    submittedBy: true
  },
  {
    id: "financial-inquiry",
    title: "The Financial Inquiry Fallout",
    description: "She asked her mother-in-law about her financial plans to ensure future support if needed. The mother-in-law felt offended, interpreting it as an overstep into her personal affairs.",
    options: [
      {
        id: "a",
        label: "Daughter-in-law overstepped boundaries",
        votes: 65
      },
      {
        id: "b",
        label: "Mother-in-law overreacted to a practical question",
        votes: 35
      }
    ],
    insight: "Financial discussions between family members require sensitivity and clear context. Different generations often have different expectations around financial privacy and planning.",
    submittedBy: true
  },
  {
    id: "vegan-diet-debate",
    title: "The Vegan Diet Debate",
    description: "Following a doctor's advice, he introduced meat into their children's diet. His ex-wife, a strict vegan, was furious, accusing him of undermining her beliefs and threatening legal action.",
    options: [
      {
        id: "a",
        label: "Father who changed children's diet without discussion is the problem",
        votes: 55
      },
      {
        id: "b",
        label: "Mother who puts beliefs above medical advice is the problem",
        votes: 45
      }
    ],
    insight: "Co-parenting after separation requires ongoing communication. Decisions about children's health should involve both parents and relevant professionals.",
    submittedBy: true
  }
];
