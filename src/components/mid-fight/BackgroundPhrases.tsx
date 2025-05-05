
import React from 'react';

// De-escalation phrases that will appear in the background
const deEscalationPhrases = [
  "breathe",
  "listen",
  "pause",
  "reflect",
  "connect",
  "understand",
  "patience",
  "gentle words",
  "step back",
  "this will pass",
  "we'll be okay",
  "choose kindness",
  "slow down",
  "stay present",
  "hear me out",
  "it's not about winning",
  "one moment at a time",
  "we're on the same team",
  "what matters most?",
  "I care about us"
];

const BackgroundPhrases: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {deEscalationPhrases.map((phrase, index) => (
        <div 
          key={index}
          className="absolute text-midnight-indigo/5 font-cormorant italic"
          style={{
            left: `${Math.random() * 85}%`,
            top: `${Math.random() * 85}%`,
            transform: `rotate(${Math.random() * 40 - 20}deg)`,
            fontSize: `${Math.random() * 1.5 + 1}rem`,
          }}
        >
          {phrase}
        </div>
      ))}
    </div>
  );
};

export default BackgroundPhrases;
