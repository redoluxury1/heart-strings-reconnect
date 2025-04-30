
import { Scenario } from "../../types/games";

export const financialScenarios: Scenario[] = [
  {
    id: "financial-surprise",
    title: "The Financial Surprise",
    description: "He bought an expensive car without consulting his partner, significantly increasing their financial burden. She felt blindsided and upset about the lack of communication.",
    options: [
      {
        id: "a",
        label: "Partner who made a major purchase without consultation is the problem",
        votes: 85
      },
      {
        id: "b",
        label: "Partner who's upset about the purchase is the problem",
        votes: 15
      }
    ],
    insight: "Major financial decisions in a partnership require mutual consultation. Individual autonomy matters, but shared financial impact demands shared decision-making.",
    submittedBy: true
  }
];
