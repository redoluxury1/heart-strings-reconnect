
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smile, Zap, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { CommonPattern } from '../types';

interface PatternRepairScreenProps {
  pattern?: CommonPattern | null;
  onContinue: () => void;
  buttonText?: string;
}

const PatternRepairScreen: React.FC<PatternRepairScreenProps> = ({ 
  pattern, 
  onContinue,
  buttonText = "Continue"
}) => {
  const navigate = useNavigate();
  
  if (!pattern) return null;

  // Default configuration for Blame/Defend/Withdraw pattern
  let title = "You're not enemies—you're overwhelmed.";
  let subtitle = "Try these steps to interrupt the cycle and reconnect.";
  let steps = [
    { 
      icon: <Smile size={28} className="text-[#14213d]" />,
      title: "Soften the Start",
      description: "Use gentle language, not blame. Try \"I'm feeling...\" instead of \"You always...\""
    },
    { 
      icon: <Zap size={28} className="text-[#14213d]" />,
      title: "Breathe Before You Defend",
      description: "Pause and reflect instead of reacting. Defensiveness blocks connection."
    },
    { 
      icon: <MessageSquare size={28} className="text-[#14213d]" />,
      title: "Repair Before You Retreat",
      description: "Instead of shutting down, say: \"Can we reset?\" or \"I need a sec, but I want to come back.\""
    }
  ];
  
  // Override configuration based on pattern type
  switch(pattern.patternType) {
    case "silent-tension-snap":
      title = "Your silence isn't protection—it's pressure.";
      subtitle = "Try these steps to express yourself earlier and gentler.";
      steps = [
        { 
          icon: <Smile size={28} className="text-[#14213d]" />,
          title: "Check in Sooner",
          description: "Don't wait until you're boiling. Name small frustrations before they grow."
        },
        { 
          icon: <Zap size={28} className="text-[#14213d]" />,
          title: "Name the Build-Up",
          description: "Try \"Something's been bothering me...\" instead of exploding when it's too much."
        },
        { 
          icon: <MessageSquare size={28} className="text-[#14213d]" />,
          title: "Repair the Aftershock",
          description: "Apologize for your tone, not for your feelings or needs."
        }
      ];
      break;
    case "criticize-control":
      title = "It's not about being right—it's about being kind.";
      subtitle = "Try these steps to give feedback that feels like support, not criticism.";
      steps = [
        { 
          icon: <Smile size={28} className="text-[#14213d]" />,
          title: "Shift from Fixing to Understanding",
          description: "Ask what your partner needs before offering your solution."
        },
        { 
          icon: <Zap size={28} className="text-[#14213d]" />,
          title: "Ask, Don't Instruct",
          description: "\"Would it help if...\" feels better than \"You should...\""
        },
        { 
          icon: <MessageSquare size={28} className="text-[#14213d]" />,
          title: "Celebrate Progress, Not Perfection",
          description: "Notice what's going well, not just what could be better."
        }
      ];
      break;
    case "fix-reject":
      title = "Solutions without safety don't stick.";
      subtitle = "Try these steps to create emotional safety before problem-solving.";
      steps = [
        { 
          icon: <Smile size={28} className="text-[#14213d]" />,
          title: "Honor the Pause",
          description: "Don't force closure. Emotional processing has its own timeline."
        },
        { 
          icon: <Zap size={28} className="text-[#14213d]" />,
          title: "Ask, \"Is now okay?\"",
          description: "Get consent before offering solutions."
        },
        { 
          icon: <MessageSquare size={28} className="text-[#14213d]" />,
          title: "Come Back Later with Softness",
          description: "Start with connection, not the problem that needs fixing."
        }
      ];
      break;
    default:
      // Keep default configuration for Blame/Defend/Withdraw
  }

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6">
      <div className="mb-4 w-full">
        <h1 className="text-4xl md:text-5xl font-medium text-[#14213d] mb-4">
          {title}
        </h1>
        
        <h2 className="text-xl text-[#14213d] leading-relaxed">
          {subtitle}
        </h2>
      </div>
      
      <div className="w-full my-6">
        <img
          src="/lovable-uploads/3b284c19-cb83-4bd1-85b3-a1d36fd5aaab.png"
          alt="Couple calmly connecting and seated together after conflict"
          className="w-[65%] mx-auto h-auto"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      
      <div className="w-full space-y-4 mt-4">
        {steps.map((step, index) => (
          <Card key={index} className="p-4 flex items-start">
            <div className="mr-4 mt-1">
              {step.icon}
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg text-[#14213d]">{step.title}</h3>
              <p className="text-[#333333]">
                {step.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="w-full mt-10">
        <Button
          onClick={onContinue}
          className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-2 px-5 rounded-full text-sm"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PatternRepairScreen;
