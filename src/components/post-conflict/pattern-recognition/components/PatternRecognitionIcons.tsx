
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
      {/* Abstract pattern shapes with smoother lines */}
      <circle cx="100" cy="50" r="25" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="120" r="25" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
      <circle cx="150" cy="120" r="25" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
      {/* Connecting lines with better flow */}
      <path d="M85 70L65 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
      <path d="M115 70L135 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
      <path d="M75 120L125 120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
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
      {/* Improved cycle visualization with smoother arrows */}
      <path d="M100 40C125 40 145 60 145 85C145 92 143 98.5 140 104" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M130 115C120 130 105 140 85 140C60 140 40 120 40 95C40 80 47 67 58 58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 50C75 45 82 42 90 41" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      
      {/* Person Icons */}
      <circle cx="155" cy="95" r="15" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="45" cy="60" r="15" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
      
      {/* Arrow heads */}
      <path d="M148 106L140 104L143 96" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M68 42L90 41L80 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M47 70L58 58L70 65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const SilentTensionIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Container/pressure vessel */}
      <path d="M55 120C55 85 85 55 120 55C155 55 185 85 185 120" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M55 120v25c0 5.523 4.477 10 10 10h110c5.523 0 10-4.477 10-10v-25" stroke="currentColor" strokeWidth="3" />
      <path d="M100 55c0-15 10-25 25-25s25 10 25 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      
      {/* Pressure lines */}
      <path d="M80 95c15 0 15-10 30-10s15 10 30 10 15-10 30-10 15 10 30 10" stroke="currentColor" strokeWidth="2" strokeDasharray="2 3" />
      <path d="M80 110c15 0 15-8 30-8s15 8 30 8 15-8 30-8 15 8 30 8" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
      <path d="M80 125c15 0 15-5 30-5s15 5 30 5 15-5 30-5 15 5 30 5" stroke="currentColor" strokeWidth="2" strokeDasharray="1 2" />
      
      {/* Explosion */}
      <path d="M30 45L15 30M45 15L15 30M30 15L15 30M15 45L30 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M35 35L20 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="15" cy="30" r="5" fill="currentColor" />
    </svg>
  );
};

export const CriticizeControlIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Control dial and person */}
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2.5" />
      
      {/* Control knob */}
      <path d="M100 70L100 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M130 100L140 100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M100 130L100 140" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 100L60 100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Control pointer - more visible */}
      <path d="M100 100L130 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="100" r="6" fill="currentColor" />
      
      {/* Person outlines representing control dynamic */}
      <circle cx="60" cy="50" r="15" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="140" cy="150" r="15" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
      
      {/* Control lines */}
      <path d="M70 60L90 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M110 120L130 140" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
};

export const FixRejectIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Split visual to show two approaches */}
      <rect x="50" y="50" width="100" height="100" rx="10" stroke="currentColor" strokeWidth="2.5" />
      <path d="M100 50L100 150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Fix side - tools/solutions */}
      <rect x="60" y="70" width="30" height="5" rx="2" fill="currentColor" />
      <rect x="60" y="85" width="25" height="5" rx="2" fill="currentColor" />
      <rect x="60" y="100" width="30" height="5" rx="2" fill="currentColor" />
      <rect x="60" y="115" width="20" height="5" rx="2" fill="currentColor" />
      <path d="M75 60v-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      
      {/* Reject side - emotion/feeling */}
      <path d="M125 90C125 85 130 80 135 80C140 80 145 85 145 90C145 100 135 105 135 105C135 105 125 100 125 90Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
      <path d="M125 115L115 125M135 115L125 125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M115 70L120 75L125 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M135 70L140 75L145 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const PursueDistanceIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Two people with clear pursuit/distance dynamic */}
      <circle cx="70" cy="100" r="30" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="130" cy="100" r="30" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
      
      {/* Pursuer features */}
      <path d="M70 90C75 90 75 95 70 95C65 95 65 90 70 90Z" fill="currentColor" />
      <path d="M60 95C60 100 80 100 80 95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Distance features */}
      <path d="M125 90C130 90 130 95 125 95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M135 90C130 90 130 95 135 95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M125 105C135 105 135 105 135 105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Movement arrows */}
      <path d="M100 85H110" stroke="currentColor" strokeWidth="2.5" />
      <path d="M105 80L110 85L105 90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      
      <path d="M100 115H90" stroke="currentColor" strokeWidth="2.5" />
      <path d="M95 110L90 115L95 120" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Connection attempts */}
      <path d="M75 70C75 70 85 60 95 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M80 65L75 70L80 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Distance movement */}
      <path d="M130 130L140 140" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M132 140L140 140L140 132" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
      {/* Improved heart with stitching */}
      <path d="M160 60C160 90 130 110 100 145C70 110 40 90 40 60C40 30 65 30 85 50C89 54 95 60 100 65C105 60 111 54 115 50C135 30 160 30 160 60Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.1" />
      
      {/* Better stitching visualization */}
      <path d="M70 80L130 120" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M70 120L130 80" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M100 60L100 145" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      
      {/* Connection points */}
      <circle cx="70" cy="80" r="5" fill="currentColor" />
      <circle cx="130" cy="80" r="5" fill="currentColor" />
      <circle cx="70" cy="120" r="5" fill="currentColor" />
      <circle cx="130" cy="120" r="5" fill="currentColor" />
      <circle cx="100" cy="100" r="8" fill="currentColor" />
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
      {/* Speech bubbles with improved appearance */}
      <path d="M140 80C140 97.6731 125.673 112 108 112H72C54.3269 112 40 97.6731 40 80C40 62.3269 54.3269 48 72 48H108C125.673 48 140 62.3269 140 80Z" 
        fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" 
      />
      <path d="M160 120C160 137.673 145.673 152 128 152H92C74.3269 152 60 137.673 60 120C60 102.327 74.3269 88 92 88H128C145.673 88 160 102.327 160 120Z" 
        fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" 
      />
      
      {/* Interactive dots */}
      <circle cx="75" cy="80" r="4" fill="currentColor" />
      <circle cx="90" cy="80" r="4" fill="currentColor" />
      <circle cx="105" cy="80" r="4" fill="currentColor" />
      <circle cx="95" cy="120" r="4" fill="currentColor" />
      <circle cx="110" cy="120" r="4" fill="currentColor" />
      <circle cx="125" cy="120" r="4" fill="currentColor" />
    </svg>
  );
};
