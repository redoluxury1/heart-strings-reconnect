
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
        votes: 45
      },
      {
        id: "b",
        label: "The person who's upset is being too dramatic",
        votes: 18
      },
      {
        id: "c",
        label: "They both need to chill and communicate better",
        votes: 37
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
        votes: 28
      },
      {
        id: "b",
        label: "Bride who isn't understanding is the problem",
        votes: 32
      },
      {
        id: "c",
        label: "They both need to find compromise",
        votes: 40
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
        votes: 32
      },
      {
        id: "b", 
        label: "Person refusing to consider alternatives is the problem",
        votes: 18
      },
      {
        id: "c",
        label: "They both need to find a compromise",
        votes: 50
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
        votes: 75
      },
      {
        id: "b",
        label: "She's the problem for not appreciating his effort",
        votes: 5
      },
      {
        id: "c",
        label: "They both need to communicate better",
        votes: 20
      }
    ],
    insight: "Showing care means paying attention to someone's needs and preferences, especially regarding health concerns like allergies. True thoughtfulness involves listening.",
    submittedBy: true
  },
  {
    id: "wedding-moh-dilemma",
    title: "The Maid of Honor Dilemma",
    description: "Her sister missed her wedding due to a pet emergency. Now, as her sister plans her own wedding, she asks her to be the maid of honor. She declines, citing unresolved hurt feelings.",
    options: [
      {
        id: "a",
        label: "Sister who declined to be MOH is the problem",
        votes: 35
      },
      {
        id: "b",
        label: "Sister who missed the wedding is the problem",
        votes: 25
      },
      {
        id: "c",
        label: "They both need to address their hurt feelings",
        votes: 40
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
        votes: 45
      },
      {
        id: "b",
        label: "Mother-in-law overreacted to a practical question",
        votes: 20
      },
      {
        id: "c",
        label: "Both need to approach sensitive topics more carefully",
        votes: 35
      }
    ],
    insight: "Financial discussions between family members require sensitivity and clear context. Different generations often have different expectations around financial privacy and planning.",
    submittedBy: true
  },
  {
    id: "destination-wedding",
    title: "The Destination Wedding Conflict",
    description: "She declined her best friend's destination wedding due to financial constraints but later planned a more affordable trip with her husband. The friend accused her of prioritizing vacations over their friendship.",
    options: [
      {
        id: "a",
        label: "Friend who made accusations is the problem",
        votes: 55
      },
      {
        id: "b",
        label: "Person who planned another vacation is the problem",
        votes: 15
      },
      {
        id: "c",
        label: "Both need to understand each other's perspectives",
        votes: 30
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
        votes: 70
      },
      {
        id: "b",
        label: "Host who didn't set clear boundaries is the problem",
        votes: 10
      },
      {
        id: "c",
        label: "Both need better communication about expectations",
        votes: 20
      }
    ],
    insight: "Kindness doesn't mean endless sacrifice. Clear time frames and expectations at the beginning of an arrangement can prevent resentment later.",
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
        votes: 40
      },
      {
        id: "b",
        label: "Wife who disapproved of his hobby is the problem",
        votes: 25
      },
      {
        id: "c",
        label: "Both need to respect individual interests and finances",
        votes: 35
      }
    ],
    insight: "Individual interests enrich our lives, but secrecy erodes trust. Couples need space for individual joy while maintaining financial transparency.",
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
        votes: 30
      },
      {
        id: "b",
        label: "Mother who puts beliefs above medical advice is the problem",
        votes: 25
      },
      {
        id: "c",
        label: "Both need to prioritize children's health and co-parent better",
        votes: 45
      }
    ],
    insight: "Co-parenting after separation requires ongoing communication. Decisions about children's health should involve both parents and relevant professionals.",
    submittedBy: true
  },
  {
    id: "financial-surprise",
    title: "The Financial Surprise",
    description: "He bought an expensive car without consulting his partner, significantly increasing their financial burden. She felt blindsided and upset about the lack of communication.",
    options: [
      {
        id: "a",
        label: "Partner who made a major purchase without consultation is the problem",
        votes: 65
      },
      {
        id: "b",
        label: "Partner who's upset about the purchase is the problem",
        votes: 5
      },
      {
        id: "c",
        label: "Both need to establish clearer financial boundaries",
        votes: 30
      }
    ],
    insight: "Major financial decisions in a partnership require mutual consultation. Individual autonomy matters, but shared financial impact demands shared decision-making.",
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
        votes: 35
      },
      {
        id: "b",
        label: "Boyfriend who didn't support his partner is the problem",
        votes: 40
      },
      {
        id: "c",
        label: "All three need better boundaries and communication",
        votes: 25
      }
    ],
    insight: "Relationships require safe boundaries from outside interference. Loyalty matters, but not at the expense of truth and respectful treatment.",
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
        votes: 20
      },
      {
        id: "b",
        label: "Colleague with hurt feelings is the problem",
        votes: 30
      },
      {
        id: "c",
        label: "Neither is a problem - these things happen",
        votes: 50
      }
    ],
    insight: "Gift-giving creates social expectations that can lead to hurt feelings when unmet. But not every oversight carries negative intent - sometimes we simply forget.",
    submittedBy: true
  }
];

export default dramaDetoxScenarios;
