
import React from 'react';

export const User: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M32 36V33C32 30.7909 30.2091 29 28 29H20C17.7909 29 16 30.7909 16 33V36" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx="24" cy="19" r="5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

export const Speaker: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M14 18.5V29.5L21 29.5L29 36V12L21 18.5L14 18.5Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path d="M35 18C36.8565 19.8593 37.9747 22.3589 37.9747 25C37.9747 27.6411 36.8565 30.1407 35 32" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

export const ConnectIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M18 30C23.5228 30 28 25.5228 28 20C28 14.4772 23.5228 10 18 10C12.4772 10 8 14.4772 8 20C8 25.5228 12.4772 30 18 30Z" 
        stroke="currentColor" 
        strokeWidth="2" 
      />
      <path d="M30 18C35.5228 18 40 22.4772 40 28C40 33.5228 35.5228 38 30 38C24.4772 38 20 33.5228 20 28C20 22.4772 24.4772 18 30 18Z" 
        stroke="currentColor" 
        strokeWidth="2" 
      />
    </svg>
  );
};
