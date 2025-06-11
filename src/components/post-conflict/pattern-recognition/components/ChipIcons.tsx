
import React from 'react';

export const getChipIcon = (chipText: string) => {
  if (chipText.includes("talk") && chipText.includes("shuts down")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        {/* Left speech bubble - filled */}
        <path d="M3 6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H8l-3 3V6z" 
              fill="currentColor"/>
        {/* Right speech bubble - crossed out */}
        <path d="M15 6c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-3l-3 3V6z" 
              stroke="currentColor" strokeWidth="2" fill="none"/>
        {/* Cross over right bubble */}
        <line x1="15" y1="4" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="23" y1="4" x2="15" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (chipText.includes("ignored") || chipText.includes("dismissed")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        {/* Person outline */}
        <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M7 18c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" fill="none"/>
        {/* Minus/removal symbol */}
        <circle cx="20" cy="6" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <line x1="18" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (chipText.includes("small") && chipText.includes("blows up")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <path d="M2 20l10-8 2-2 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="4" r="2" fill="currentColor"/>
        <path d="M16 8c1 1 2 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 6c0.5 1 1 1.5 2 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 10c1.5 1.5 3 3 6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 14c2 2 4 4 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (chipText.includes("reconnect") && chipText.includes("missed")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <path d="M8 12c2-2 4-3 6-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 12c-2-2-4-3-6-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 8l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 8l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (chipText.includes("exhausted") && chipText.includes("nobody steps")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <rect x="4" y="6" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="6" y="8" width="3" height="6" rx="1" fill="currentColor"/>
        <path d="M22 12h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="4" r="1" fill="currentColor"/>
      </svg>
    );
  }
  if (chipText.includes("press for answers")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (chipText.includes("shut down") && chipText.includes("silent")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (chipText.includes("bring up other things")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (chipText.includes("smooth things over")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
      </svg>
    );
  }
  if (chipText.includes("keep doing everything")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17" cy="7" r="1" fill="currentColor"/>
      </svg>
    );
  }
  if (chipText.includes("double down") && chipText.includes("right")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (chipText.includes("dig in") || chipText.includes("control")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 1v6m0 6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M1 12h6m6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (chipText.includes("defensive")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (chipText.includes("walk away") || chipText.includes("quiet")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (chipText.includes("overreacting")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (chipText.includes("past mistakes")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <polyline points="1,4 1,10 7,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (chipText.includes("sorry") && chipText.includes("don't change")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  
  // Default icon for any unmapped chips
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  );
};
