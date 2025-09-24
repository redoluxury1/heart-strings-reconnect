
import React from 'react';
import { CardContent } from './types';
import FeatureCard from './FeatureCard';

interface StillUsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tools: string[];
  link: string;
  gradientClass: string;
  iconBgClass: string;
  buttonText: string;
  sectionHeader: string;
  visualEffect?: string | null;
  borderColor?: string;
  headerColor?: string;
}

const StillUsCard: React.FC<StillUsCardProps> = (props) => {
  const card: CardContent = {
    title: props.title,
    description: props.description,
    icon: props.icon,
    tools: props.tools,
    link: props.link,
    gradientClass: props.gradientClass,
    iconBgClass: props.iconBgClass,
    buttonText: props.buttonText,
    sectionHeader: props.sectionHeader,
    visualEffect: props.visualEffect || null,
    borderColor: props.borderColor,
    headerColor: props.headerColor
  };

  return <FeatureCard card={card} />;
};

export default StillUsCard;
