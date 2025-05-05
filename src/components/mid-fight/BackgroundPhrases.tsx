
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
  // Create a grid-like positioning system to avoid overlaps
  const createPositionedPhrases = () => {
    // Use fewer phrases to reduce overlap
    const selectedPhrases = deEscalationPhrases.slice(0, 10);
    
    // Create a 3x4 grid (12 positions)
    const grid = [
      [0, 0], [33, 0], [66, 0],
      [16, 25], [50, 25], [83, 25],
      [0, 50], [33, 50], [66, 50],
      [16, 75], [50, 75], [83, 75]
    ];
    
    return selectedPhrases.map((phrase, index) => {
      // Get grid position and add a small random offset
      const [baseX, baseY] = grid[index % grid.length];
      const xOffset = Math.random() * 10 - 5;
      const yOffset = Math.random() * 10 - 5;
      
      return {
        phrase,
        x: baseX + xOffset,
        y: baseY + yOffset,
        rotation: Math.random() * 40 - 20,
        size: Math.random() * 1 + 1.5
      };
    });
  };
  
  const positionedPhrases = createPositionedPhrases();
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {positionedPhrases.map((item, index) => (
        <div 
          key={index}
          className="absolute text-lavender-blue/15 font-cormorant italic"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `rotate(${item.rotation}deg)`,
            fontSize: `${item.size}rem`,
          }}
        >
          {item.phrase}
        </div>
      ))}
    </div>
  );
};

export default BackgroundPhrases;
