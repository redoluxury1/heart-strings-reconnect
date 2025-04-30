
export interface ScenarioOption {
  id: string;
  label: string;
  votes: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  options: ScenarioOption[];
  insight?: string;
  submittedBy?: boolean;
}
