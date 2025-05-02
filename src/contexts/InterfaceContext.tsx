
import { createContext } from 'react';

export type PartnerStatus = 'solo' | 'couple';

export type InterfaceContextType = {
  partnerStatus: PartnerStatus;
  setPartnerStatus: (status: PartnerStatus) => void;
  isPartnerInvited: boolean;
  setIsPartnerInvited: (invited: boolean) => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    accent: string;
    highlight: string;
    plum: string;
  };
};

const InterfaceContext = createContext<InterfaceContextType | undefined>(undefined);

export default InterfaceContext;
