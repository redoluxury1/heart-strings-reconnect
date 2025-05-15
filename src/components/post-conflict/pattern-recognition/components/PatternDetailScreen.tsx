
import React from 'react';
import { Button } from '@/components/ui/button';
import { CommonPattern } from '../types';
import { MessageSquare, Shield, X, ArrowLeft } from 'lucide-react';
import { CycleIcon, SilentTensionIcon, CriticizeControlIcon, FixRejectIcon, PursueDistanceIcon } from './PatternRecognitionIcons';

interface PatternDetailScreenProps {
  pattern: CommonPattern | null;
  onBack: () => void;
  onViewCycle: () => void;
  onViewRepair: () => void;
}

const PatternDetailScreen: React.FC<PatternDetailScreenProps> = ({ pattern, onBack, onViewCycle, onViewRepair }) => {
  if (!pattern) return null;
  
  // Default configuration for Blame/Defend/Withdraw pattern
  let title = "You blame. They defend. Someone shuts down.";
  let subtitle = "It's a predictable cycle that keeps you stuck.";
  let description = "This is one of the most common emotional cycles. One person criticizes, the other gets defensive, and eventually someone withdraws to avoid more pain. Over time, both feel unheard and connection starts to fade.";
  let signs = [
    { icon: <MessageSquare size={20} className="text-[#07183D]" />, title: "Criticism:", text: "\"You never help around here.\"" },
    { icon: <Shield size={20} className="text-[#07183D]" />, title: "Defense:", text: "\"That's not fair. I did the dishes yesterday!\"" },
    { icon: <X size={20} className="text-[#07183D]" />, title: "Withdrawal:", text: "Walking away, shutting down, or changing the subject" }
  ];
  let CycleIconComponent = CycleIcon;
  
  // Override configuration based on pattern type
  switch(pattern.patternType) {
    case "silent-tension-snap":
      title = "You hold it in… until it explodes.";
      subtitle = "You try to keep the peace, but it builds inside. When it finally comes out, it comes out harsh.";
      description = "Every couple has tension, but when we're afraid to express it early, it builds until it explodes. This pattern often leaves both partners feeling shocked by the intensity and hurt by the aftermath.";
      signs = [
        { icon: <MessageSquare size={20} className="text-[#07183D]" />, title: "Passive tension:", text: "Subtle signs like sighing or tension in the body" },
        { icon: <Shield size={20} className="text-[#07183D]" />, title: "Bottled-up frustration:", text: "Small irritations pile up without being addressed" },
        { icon: <X size={20} className="text-[#07183D]" />, title: "Big reaction:", text: "Explosive outburst followed by shame or regret" }
      ];
      CycleIconComponent = SilentTensionIcon;
      break;
    case "criticize-control":
      title = "Everything feels like a correction.";
      subtitle = "One partner constantly critiques. The other feels micromanaged.";
      description = "This pattern often comes from good intentions. One partner wants things to be better, but their suggestions feel like constant criticism. Over time, the other partner begins to feel inadequate or controlled.";
      signs = [
        { icon: <MessageSquare size={20} className="text-[#07183D]" />, title: "Correction:", text: "\"Why did you do it like that?\"" },
        { icon: <Shield size={20} className="text-[#07183D]" />, title: "Hyper-focus:", text: "Noticing mistakes more than successes" },
        { icon: <X size={20} className="text-[#07183D]" />, title: "Rebellion:", text: "Partner pulls away or rebels against perceived control" }
      ];
      CycleIconComponent = CriticizeControlIcon;
      break;
    case "fix-reject":
      title = "One of you wants to fix it. The other isn't ready.";
      subtitle = "One partner needs resolution ASAP. The other needs space to feel.";
      description = "This pattern creates a timing mismatch. One partner jumps to solutions before emotions have been processed. The other feels rushed or invalidated, leading to rejection of the solutions entirely.";
      signs = [
        { icon: <MessageSquare size={20} className="text-[#07183D]" />, title: "Quick fix:", text: "\"Let's just fix this now and move on.\"" },
        { icon: <Shield size={20} className="text-[#07183D]" />, title: "Emotional pause:", text: "\"I can't talk about this right now.\"" },
        { icon: <X size={20} className="text-[#07183D]" />, title: "Disconnect:", text: "One over-explains, the other shuts down" }
      ];
      CycleIconComponent = FixRejectIcon;
      break;
    case "pursue-distance":
      title = "One of you chases connection. The other pulls away.";
      subtitle = "The more one pursues, the more the other distances. Round and round it goes.";
      description = "This dynamic creates a painful loop. One partner seeks closeness and conversation, while the other feels overwhelmed and retreats. The pursuit intensifies the withdrawal, and the withdrawal intensifies the pursuit.";
      signs = [
        { icon: <MessageSquare size={20} className="text-[#07183D]" />, title: "Pursuit:", text: "\"Why won't you talk to me about this?\"" },
        { icon: <Shield size={20} className="text-[#07183D]" />, title: "Distance:", text: "\"I just need some space right now.\"" },
        { icon: <X size={20} className="text-[#07183D]" />, title: "Escalation:", text: "The cycle gets more intense with each rotation" }
      ];
      CycleIconComponent = PursueDistanceIcon;
      break;
    default:
      // Keep default configuration for Blame/Defend/Withdraw
  }

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6">
      <div className="mb-4 w-full flex justify-start">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="text-xs flex items-center text-[#07183D]/70 hover:text-[#07183D]"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to patterns
        </Button>
      </div>
      
      <div className="mb-4 w-full">
        <h1 className="text-4xl md:text-5xl font-medium text-[#07183D] mb-4">
          {title}
        </h1>
        
        <h2 className="text-xl text-[#07183D] leading-relaxed">
          {subtitle}
        </h2>
      </div>
      
      <div className="w-full my-6 flex justify-center">
        <CycleIconComponent className="w-64 h-64 text-[#14213d]" />
      </div>
      
      <div className="w-full px-6 py-5">
        <p className="text-[#333333] text-base leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="w-full px-6 mt-8 text-left">
        <h3 className="text-xl font-bold text-[#07183D] mb-6">Spot the Signs</h3>
        
        <ul className="space-y-5">
          {signs.map((sign, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-3 mt-1">
                {sign.icon}
              </div>
              <div>
                <span className="font-bold text-[#07183D]">{sign.title} </span>
                <span className="text-[#333333]">{sign.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="w-full px-6 mt-10">
        <Button
          onClick={onViewRepair}
          className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-2 px-5 rounded-full text-sm"
        >
          What to Try Instead
        </Button>
      </div>
    </div>
  );
};

export default PatternDetailScreen;
