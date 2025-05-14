
import React from 'react';
import { IconProps } from 'lucide-react';

// This function creates icon components that can be referenced in .ts files
export const createIconComponent = (Icon: React.ComponentType<IconProps>, size: string) => {
  return () => React.createElement(Icon, { className: size });
};
