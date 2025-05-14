
import React from 'react';
import type { LucideProps } from 'lucide-react';

// This function creates icon components that can be referenced in .ts files
export const createIconComponent = (Icon: React.ComponentType<LucideProps>, size: string) => {
  return () => React.createElement(Icon, { className: size });
};
