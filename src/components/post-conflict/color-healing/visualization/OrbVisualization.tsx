
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
  
  // Use the provided color or default to mauve if not provided
  const enhancedColor = selectedColor || '#8a6f8e'; // Default to mauve if no color provided
  
  return (
    <div className="h-72 w-full flex items-center justify-center">
      {/* Pulsating orb with multiple layers for more dynamic effect */}
      <div className="relative">
        {/* Outer glow layer - slow pulse */}
        <div 
          className="absolute rounded-full animate-pulse-slow will-change-transform"
          style={{ 
            backgroundColor: 'transparent',
            boxShadow: `0 0 60px 40px ${enhancedColor}`,
            filter: 'blur(20px)',
            height: '130px', 
            width: '130px',
            opacity: fadeIn ? 0.4 : 0,
            transition: 'opacity 1200ms ease-in-out',
            left: '-65px',
            top: '-65px'
          }}
        />
        
        {/* Middle layer - circular movement with more pronounced shape */}
        <div 
          className="absolute rounded-full animate-wave-circle will-change-transform"
          style={{ 
            backgroundColor: 'transparent',
            boxShadow: `0 0 40px 25px ${enhancedColor}`,
            filter: 'blur(8px)',
            height: '100px', 
            width: '100px',
            borderRadius: '60% 40% 65% 35%',
            opacity: fadeIn ? 0.6 : 0,
            transition: 'opacity 1000ms ease-in-out',
            left: '-50px',
            top: '-50px'
          }}
        />
        
        {/* Additional movement layer */}
        <div 
          className="absolute rounded-full animate-wave-top will-change-transform"
          style={{ 
            backgroundColor: 'transparent',
            boxShadow: `0 0 35px 20px ${enhancedColor}`,
            filter: 'blur(10px)',
            height: '90px', 
            width: '90px',
            borderRadius: '50% 50% 40% 60%',
            opacity: fadeIn ? 0.5 : 0,
            transition: 'opacity 900ms ease-in-out',
            left: '-45px',
            top: '-45px'
          }}
        />
        
        {/* Inner core - floating movement */}
        <div 
          className="absolute rounded-full animate-float-slow will-change-transform"
          style={{ 
            backgroundColor: enhancedColor,
            boxShadow: `0 0 25px 15px ${enhancedColor}`,
            filter: 'blur(5px)',
            height: '70px', 
            width: '70px',
            borderRadius: '55% 45% 60% 40%',
            opacity: fadeIn ? 0.8 : 0,
            transition: 'opacity 800ms ease-in-out',
            left: '-35px',
            top: '-35px'
          }}
        />
        
        {/* Center core - solid */}
        <div 
          className="absolute rounded-full animate-expand will-change-transform"
          style={{ 
            backgroundColor: enhancedColor,
            height: '50px', 
            width: '50px',
            boxShadow: `0 0 20px 12px ${enhancedColor}`,
            borderRadius: '50%',
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 600ms ease-in-out',
            left: '-25px',
            top: '-25px'
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
