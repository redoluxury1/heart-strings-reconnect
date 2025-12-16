
import { ReactNode } from 'react';

// Card content type definition
export type CardContent = {
  title: string;
  description: string;
  icon: ReactNode;
  tools: string[];
  link: string;
  originalDestination?: string; // The feature page to redirect to after onboarding
  gradientClass: string;
  iconBgClass: string;
  buttonText: string;
  sectionHeader: string;
  visualEffect?: string;
  borderColor?: string;
  headerColor?: string;
};
