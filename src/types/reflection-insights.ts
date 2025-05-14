
export interface ReflectionInsight {
  triggers: string[];
  category: string;
  insight: string;
  reflection: string;
  recommendation: string;
}

export interface ReflectionPackBatch {
  [key: number]: ReflectionInsight[];
}
