
import { ReactNode } from 'react';

export interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: string[];
  icon: ReactNode;
  tip?: string;
}

export type Category = 'all' | 'home' | 'out' | 'adventure' | 'flirty' | 'low-effort';
