
import { useContext } from 'react';
import InterfaceContext, { InterfaceContextType } from '../contexts/InterfaceContext';

export const useInterface = (): InterfaceContextType => {
  const context = useContext(InterfaceContext);
  if (context === undefined) {
    throw new Error('useInterface must be used within an InterfaceProvider');
  }
  return context;
};
