
import React from 'react';
import { Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrbVisualizationProps {
  selectedColor: string;
  fadeIn: boolean;
  showButtons: boolean;
}

const OrbVisualization: React.FC<OrbVisualizationProps> = ({
  selectedColor,
  fadeIn,
  showButtons
}) => {
  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };
  
  return (
    <div className="h-64 w-full flex items-center justify-center">
      {/* Pulsating orb with multiple layers for more dynamic effect */}
      <div className="relative">
        {/* Outer layer - slow pulse */}
        <div 
          className="absolute rounded-full animate-pulse-slow"
          style={{ 
            backgroundColor: 'transparent',
            boxShadow: `0 0 40px 25px ${selectedColor}`,
            filter: 'blur(15px)',
            height: '100px', 
            width: '100px',
            opacity: fadeIn ? 0.3 : 0,
            transition: 'opacity 1200ms ease-in-out',
            left: '-50px',
            top: '-50px'
          }}
        />
        
        {/* Middle layer - circular movement */}
        <div 
          className="absolute rounded-full animate-wave-circle"
          style={{ 
            backgroundColor: 'transparent',
            boxShadow: `0 0 30px 15px ${selectedColor}`,
            filter: 'blur(10px)',
            height: '80px', 
            width: '80px',
            borderRadius: '60% 40% 65% 35%',
            opacity: fadeIn ? 0.45 : 0,
            transition: 'opacity 1000ms ease-in-out',
            left: '-40px',
            top: '-40px'
          }}
        />
        
        {/* Inner core - floating movement */}
        <div 
          className="absolute rounded-full animate-float-slow"
          style={{ 
            backgroundColor: selectedColor,
            boxShadow: `0 0 20px 12px ${selectedColor}`,
            filter: 'blur(5px)',
            height: '60px', 
            width: '60px',
            borderRadius: '55% 45% 60% 40%',
            opacity: fadeIn ? 0.7 : 0,
            transition: 'opacity 800ms ease-in-out',
            left: '-30px',
            top: '-30px'
          }}
        />
        
        {/* Center core - solid */}
        <div 
          className="absolute rounded-full animate-expand"
          style={{ 
            backgroundColor: selectedColor,
            height: '40px', 
            width: '40px',
            boxShadow: `0 0 15px 8px ${selectedColor}`,
            borderRadius: '50%',
            opacity: fadeIn ? 0.9 : 0,
            transition: 'opacity 600ms ease-in-out',
            left: '-20px',
            top: '-20px'
          }}
        />
      </div>

      {/* Fullscreen button for enhanced immersion */}
      {fadeIn && !showButtons && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100/30 rounded-full"
          onClick={handleFullscreen}
        >
          <Maximize2 className="h-4 w-4" />
          <span className="sr-only">Fullscreen</span>
        </Button>
      )}
    </div>
  );
};

export default OrbVisualization;
