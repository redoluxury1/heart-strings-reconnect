
import { ReactElement } from 'react';

// Card content type definition
export type CardContent = {
  title: string;
  description: string;
  icon: ReactElement;
  tools: string[];
  comingSoonTools?: string[];
  link: string;
  gradientClass: string;
  iconBgClass: string;
  buttonText: string;
  sectionHeader: string;
};
