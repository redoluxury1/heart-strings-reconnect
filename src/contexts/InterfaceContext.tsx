
import { createContext } from 'react';
import { InterfaceStyle, PartnerStatus } from '../pages/Onboarding';

// Define solution-focused color palette with slate blue/crimson
export const SolutionFocusedColors = {
  background: '#6a8cb3',   // Slate blue
  text: '#2C3E50',        // Deep Charcoal
  primary: '#543544',     // Crimson
  accent: '#4f6572',      // Slate accent
  highlight: '#543544',   // Crimson highlight
};

export type InterfaceContextType = {
  interfaceStyle: InterfaceStyle;
  setInterfaceStyle: (style: InterfaceStyle) => void;
  partnerStatus: PartnerStatus;
  setPartnerStatus: (status: PartnerStatus) => void;
  isEmotional: boolean;
  isPartnerInvited: boolean;
  setIsPartnerInvited: (invited: boolean) => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    accent: string;
    highlight: string;
    plum: string; // Added plum accent color
  };
};

const InterfaceContext = createContext<InterfaceContextType | undefined>(undefined);

export default InterfaceContext;
