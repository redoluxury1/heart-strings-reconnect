
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smile, Clock, Heart, ArrowLeft, Link } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { CommonPattern } from '../types';
import { RepairIcon } from './PatternRecognitionIcons';

interface PatternRepairScreenProps {
  pattern?: CommonPattern | null;
  onBack: () => void;
  onContinue: () => void;
  buttonText?: string;
}

const PatternRepairScreen: React.FC<PatternRepairScreenProps> = ({ 
  pattern, 
  onBack,
  onContinue,
  buttonText = "Continue"
}) => {
  const navigate = useNavigate();
  
  if (!pattern) return null;

  // Default configuration for Criticize-Defend-Shutdown pattern
  let title = "What to Try Instead";
  let steps = [
    { 
      icon: <Clock size={24} className="text-[#2e2a63]" />,
      title: "Pause to Reset",
      description: "Take a 5-minute break with intention.",
      example: 'Say: "I want to talk about this, but I need a second to calm down so I don\'t just react."'
    },
    { 
      icon: <Heart size={24} className="text-[#2e2a63]" />,
      title: "Lead with Your Own Emotion",
      description: "Start from your hurt, not their fault.",
      example: 'Say: "I felt really discouraged when that happened. Can we talk about it?"'
    },
    { 
      icon: <Link size={24} className="text-[#2e2a63]" />,
      title: "Make Repair Easier",
      description: "Ask for what you need in a non-accusing way.",
      example: 'Say: "I think I just need to feel like we\'re on the same team again. Can we reset?"'
    }
  ];
  let tagline = "It's not about blame—it's about rebuilding connection.";
  
  // Override configuration based on pattern type
  switch(pattern.patternType) {
    case "silent-tension-snap":
      steps = [
        { 
          icon: <Clock size={24} className="text-[#2e2a63]" />,
          title: "Check in Sooner",
          description: "Don't wait until you're boiling.",
          example: 'Say: "Something small has been bothering me. Can we talk about it before it gets bigger?"'
        },
        { 
          icon: <Heart size={24} className="text-[#2e2a63]" />,
          title: "Name the Build-Up",
          description: "Acknowledge the pattern without blame.",
          example: 'Say: "I notice I\'ve been holding things in. I want to share this with you before it becomes too much."'
        },
        { 
          icon: <Link size={24} className="text-[#2e2a63]" />,
          title: "Repair the Aftershock",
          description: "Take responsibility for your reaction.",
          example: 'Say: "I\'m sorry I exploded. The issue matters to me, but I should have brought it up differently."'
        }
      ];
      tagline = "Small conversations now prevent big explosions later.";
      break;
    case "criticize-control":
      steps = [
        { 
          icon: <Clock size={24} className="text-[#2e2a63]" />,
          title: "Shift from Fixing to Understanding",
          description: "Listen first, suggest later (if asked).",
          example: 'Say: "I want to understand how you see this before I share my thoughts."'
        },
        { 
          icon: <Heart size={24} className="text-[#2e2a63]" />,
          title: "Ask, Don't Instruct",
          description: "Phrase suggestions as questions.",
          example: 'Say: "Would it be helpful if..." instead of "You should..."'
        },
        { 
          icon: <Link size={24} className="text-[#2e2a63]" />,
          title: "Celebrate Progress, Not Perfection",
          description: "Notice what's going well, not just what could be better.",
          example: 'Say: "I really appreciate how you handled that. It made a difference."'
        }
      ];
      tagline = "Support feels different than criticism, even when addressing the same issue.";
      break;
    case "fix-reject":
      steps = [
        { 
          icon: <Clock size={24} className="text-[#2e2a63]" />,
          title: "Honor the Pause",
          description: "Emotional processing has its own timeline.",
          example: 'Say: "I can see you\'re still processing. When would be a good time to talk solutions?"'
        },
        { 
          icon: <Heart size={24} className="text-[#2e2a63]" />,
          title: 'Ask, "Is now okay?"',
          description: "Get consent before offering solutions.",
          example: 'Say: "I have some thoughts that might help, but I want to make sure you\'re ready to hear them."'
        },
        { 
          icon: <Link size={24} className="text-[#2e2a63]" />,
          title: "Come Back Later with Softness",
          description: "Start with connection, not the problem.",
          example: 'Say: "I\'ve been thinking about what you shared earlier. How are you feeling about it now?"'
        }
      ];
      tagline = "Solutions land better when emotions are heard first.";
      break;
    default:
      // Keep default configuration for Criticize-Defend-Shutdown
  }

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6 bg-[#f8f5f0] rounded-lg">
      <div className="mb-2 w-full flex justify-start">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="text-xs flex items-center text-[#07183D]/70 hover:text-[#07183D]"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to pattern
        </Button>
      </div>
      
      {/* Section title */}
      <div className="w-full px-6 text-left mb-4">
        <h2 className="text-2xl font-serif font-medium text-[#2e2a63]">
          {title}
        </h2>
      </div>
      
      {/* Illustration */}
      <div className="w-full my-4 flex justify-center">
        <RepairIcon className="w-44 h-44 text-[#2e2a63]" />
      </div>
      
      {/* Steps cards */}
      <div className="w-full space-y-4 mt-4 px-6">
        {steps.map((step, index) => (
          <Card key={index} className="p-4 bg-white border-[#2e2a63]/10 shadow-sm">
            <div className="flex items-start">
              <div className="mr-3 p-2 bg-[#f8f5f0] rounded-full">
                {step.icon}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-[#2e2a63] mb-1">{step.title}</h3>
                <p className="text-[#333333] mb-2">
                  {step.description}
                </p>
                <p className="text-[#333333]/80 italic text-sm">
                  {step.example}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Tagline */}
      <div className="w-full px-6 mt-6 mb-4">
        <Separator className="w-8 h-[2px] mx-auto bg-[#2e2a63]/30 mb-4" />
        <p className="text-center text-[#2e2a63] italic">
          {tagline}
        </p>
      </div>
      
      {/* Continue button */}
      <div className="w-full px-6 mt-4">
        <Button
          onClick={onContinue}
          className="bg-[#2e2a63] hover:bg-[#2e2a63]/90 text-white font-medium py-2 px-5 rounded-full text-sm"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PatternRepairScreen;
