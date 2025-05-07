
export interface RepairItem {
  id: number;
  text: string;
  selected: boolean;
}

export interface RepairPlan {
  title: string;
  items: RepairItem[];
  createdAt: Date;
}
