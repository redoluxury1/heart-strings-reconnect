
import React from 'react';

export const PatternsIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract pattern shapes */}
      <path d="M100 30C111.046 30 120 39.0543 120 50C120 60.9457 111.046 70 100 70C88.9543 70 80 60.9457 80 50C80 39.0543 88.9543 30 100 30Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
      <path d="M50 100C61.0457 100 70 108.954 70 120C70 131.046 61.0457 140 50 140C38.9543 140 30 131.046 30 120C30 108.954 38.9543 100 50 100Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
      <path d="M150 100C161.046 100 170 108.954 170 120C170 131.046 161.046 140 150 140C138.954 140 130 131.046 130 120C130 108.954 138.954 100 150 100Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
      {/* Connecting lines */}
      <path d="M90 60L60 100" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M110 60L140 100" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M70 130L130 130" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
};

export const CycleIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Repeating cycle arrows */}
      <path d="M100 40C122.091 40 140 57.9086 140 80C140 84.4183 139.329 88.6684 138.076 92.6537" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M129.856 106.585C124.36 119.273 113.071 128.614 99.5 130" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 120C58.9543 120 50 111.046 50 100C50 88.9543 58.9543 80 70 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M90 60C83.3726 60 78 65.3726 78 72C78 78.6274 83.3726 84 90 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arrows */}
      <path d="M145 90L138.076 92.6537L143 98" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M90 135L99.5 130L94 122" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 70L70 80L78 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 50L90 60L100 66" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const RepairIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Heart with stitch */}
      <path d="M158.802 51.0878C153.787 46.0731 147.147 43.0034 140.055 43.0034C132.962 43.0034 126.323 46.0731 121.308 51.0878L100 72.3957L78.6924 51.0878C73.6773 46.0731 67.038 43.0034 59.9453 43.0034C52.8527 43.0034 46.2134 46.0731 41.1983 51.0878C30.9346 61.3515 30.9346 78.0649 41.1983 88.3286L100 147.13L158.802 88.3286C169.065 78.0649 169.065 61.3515 158.802 51.0878Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stitching on the heart */}
      <path d="M100 72.3958V147.13" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" />
      <path d="M70 90L130 110" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" />
      <path d="M70 110L130 90" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" />
      {/* Healing symbols */}
      <circle cx="60" cy="60" r="8" fill="currentColor" fillOpacity="0.2" />
      <circle cx="140" cy="60" r="8" fill="currentColor" fillOpacity="0.2" />
      <circle cx="100" cy="120" r="10" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
};

export const ConversationIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Speech bubbles */}
      <path d="M140 80C140 97.6731 125.673 112 108 112H72C54.3269 112 40 97.6731 40 80C40 62.3269 54.3269 48 72 48H108C125.673 48 140 62.3269 140 80Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" />
      <path d="M160 120C160 137.673 145.673 152 128 152H92C74.3269 152 60 137.673 60 120C60 102.327 74.3269 88 92 88H128C145.673 88 160 102.327 160 120Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" />
      {/* Connection dots */}
      <circle cx="75" cy="80" r="4" fill="currentColor" />
      <circle cx="90" cy="80" r="4" fill="currentColor" />
      <circle cx="105" cy="80" r="4" fill="currentColor" />
      <circle cx="95" cy="120" r="4" fill="currentColor" />
      <circle cx="110" cy="120" r="4" fill="currentColor" />
      <circle cx="125" cy="120" r="4" fill="currentColor" />
    </svg>
  );
};
