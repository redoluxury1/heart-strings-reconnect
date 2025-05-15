
import React from 'react';
import { Button } from '@/components/ui/button';
import { CommonPattern } from '../types';
import { MessageSquare, Shield, X, ArrowLeft, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
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
  let title = "Criticize–Defend–Shutdown";
  let headline = "You blame. They defend. Someone shuts down.";
  let subheadline = "It's a predictable cycle that keeps you stuck. But it's also one you can break.";
  let insights = [
    "One partner feels hurt and lashes out with blame or criticism.",
    "The other gets defensive or retreats to avoid the conflict.",
    "The more they pull away, the more alone and misunderstood each person feels."
  ];
  let signs = [
    { 
      icon: <MessageSquare size={18} className="text-[#07183D] mr-2" />, 
      title: "Criticism:", 
      text: '"You never care about what I need."', 
      subtext: "(Blame disguised as hurt)"
    },
    { 
      icon: <Shield size={18} className="text-[#07183D] mr-2" />, 
      title: "Defensiveness:", 
      text: '"That\'s not true! I didn\'t do anything wrong."', 
      subtext: "(Protecting self over repairing connection)"
    },
    { 
      icon: <X size={18} className="text-[#07183D] mr-2" />, 
      title: "Withdrawal:", 
      text: "Silent treatment, phone scrolling, or leaving the room mid-conversation."
    },
    { 
      icon: <X size={18} className="text-[#07183D] mr-2" />, 
      title: "Disconnection grows:", 
      text: "You both start walking on eggshells or avoiding important conversations entirely."
    }
  ];
  let CycleIconComponent = CycleIcon;
  
  // Override configuration based on pattern type
  switch(pattern.patternType) {
    case "silent-tension-snap":
      title = "Silent Tension–Snap";
      headline = "You hold it in… until it explodes.";
      subheadline = "You try to keep the peace, but it builds inside. When it finally comes out, it comes out harsh.";
      insights = [
        "Small irritations are ignored until they become too big to contain.",
        "The explosion feels disproportionate to the partner on the receiving end.",
        "Both people feel misunderstood—one for bottling up, one for being blindsided."
      ];
      signs = [
        { 
          icon: <MessageSquare size={18} className="text-[#07183D] mr-2" />, 
          title: "Passive tension:", 
          text: "Subtle signs like sighing, eye-rolling, or tension in your body", 
          subtext: "(Silent signals that something's wrong)"
        },
        { 
          icon: <Shield size={18} className="text-[#07183D] mr-2" />, 
          title: "Avoidance:", 
          text: '"It\'s fine. Nothing\'s wrong."', 
          subtext: "(When it's clearly not fine)"
        },
        { 
          icon: <X size={18} className="text-[#07183D] mr-2" />, 
          title: "The eruption:", 
          text: "One small trigger causes weeks of built-up frustration to come pouring out."
        },
        { 
          icon: <X size={18} className="text-[#07183D] mr-2" />, 
          title: "The aftermath:", 
          text: "Shock, hurt feelings, and regret that damages trust on both sides."
        }
      ];
      CycleIconComponent = SilentTensionIcon;
      break;
    case "criticize-control":
      title = "Criticize–Control";
      headline = "Everything feels like a correction.";
      subheadline = "One partner constantly critiques. The other feels micromanaged and inadequate.";
      insights = [
        "Good intentions (wanting things to be better) come across as constant criticism.",
        "The criticized partner starts to feel nothing they do is ever good enough.",
        "Resentment builds as one feels controlled and the other feels unappreciated."
      ];
      signs = [
        { 
          icon: <MessageSquare size={18} className="text-[#07183D] mr-2" />, 
          title: "Scrutiny:", 
          text: '"Why did you load the dishwasher that way?"', 
          subtext: "(Constant commentary on how things are done)"
        },
        { 
          icon: <Shield size={18} className="text-[#07183D] mr-2" />, 
          title: "Perfectionism:", 
          text: "Noticing mistakes more than successes", 
          subtext: "(The focus is on what's wrong, not what's right)"
        },
        { 
          icon: <X size={18} className="text-[#07183D] mr-2" />, 
          title: "Pushback:", 
          text: "The controlled partner either rebels or stops trying altogether."
        },
        { 
          icon: <X size={18} className="text-[#07183D] mr-2" />, 
          title: "Power struggle:", 
          text: "Every interaction becomes about control rather than connection."
        }
      ];
      CycleIconComponent = CriticizeControlIcon;
      break;
    case "fix-reject":
      title = "Fix–Reject";
      headline = "One of you wants to fix it. The other isn't ready.";
      subheadline = "One partner needs resolution ASAP. The other needs space to process emotions first.";
      insights = [
        "The fixer believes solutions equal caring, but pushes too quickly past emotions.",
        "The emotional processor feels invalidated when solutions come before understanding.",
        "This timing mismatch creates a frustrating loop where neither feels heard."
      ];
      signs = [
        { 
          icon: <MessageSquare size={18} className="text-[#07183D] mr-2" />, 
          title: "Quick solutions:", 
          text: '"Here\'s what we should do to fix this right now."', 
          subtext: "(Before emotions are processed)"
        },
        { 
          icon: <Shield size={18} className="text-[#07183D] mr-2" />, 
          title: "Emotional pause:", 
          text: '"I can\'t talk about solutions yet. I\'m still upset."', 
          subtext: "(Need to feel before fixing)"
        },
        { 
          icon: <X size={18} className="text-[#07183D] mr-2" />, 
          title: "Frustrated fixer:", 
          text: '"Why won\'t you just let me help? Why make this harder?"'
        },
        { 
          icon: <X size={18} className="text-[#07183D] mr-2" />, 
          title: "Rejection cycle:", 
          text: "Solutions get ignored because they came too soon, frustrating both people."
        }
      ];
      CycleIconComponent = FixRejectIcon;
      break;
    case "pursue-distance":
      title = "Pursue–Distance";
      headline = "One of you chases connection. The other pulls away.";
      subheadline = "The more one pursues, the more the other distances. Round and round it goes.";
      insights = [
        "The pursuer feels abandoned and craves reassurance through more connection.",
        "The distancer feels overwhelmed and needs space to feel safe and autonomous.",
        "Each response triggers the other's fears, creating an intensifying pattern."
      ];
      signs = [
        { 
          icon: <MessageSquare size={18} className="text-[#07183D] mr-2" />, 
          title: "Persistent pursuit:", 
          text: '"Why won\'t you talk to me about this? Where are you going?"', 
          subtext: "(Attempts to force connection)"
        },
        { 
          icon: <Shield size={18} className="text-[#07183D] mr-2" />, 
          title: "Defensive distance:", 
          text: '"I just need some space right now. Leave me alone."', 
          subtext: "(Creating physical or emotional space)"
        },
        { 
          icon: <X size={18} className="text-[#07183D] mr-2" />, 
          title: "Escalation:", 
          text: "The pursuit becomes more desperate as the distance grows."
        },
        { 
          icon: <X size={18} className="text-[#07183D] mr-2" />, 
          title: "Polarization:", 
          text: "Each partner becomes an extreme version of their tendency."
        }
      ];
      CycleIconComponent = PursueDistanceIcon;
      break;
    default:
      // Keep default configuration for Blame/Defend/Withdraw
  }

  return (
    <div className="flex flex-col items-center max-w-md mx-auto py-6 bg-[#f8f5f0] rounded-lg">
      <div className="mb-2 w-full flex justify-start">
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
      
      {/* Pattern title - small caps style */}
      <div className="w-full px-6">
        <p className="text-xs uppercase tracking-wide font-serif text-[#2e2a63]/80">
          Pattern: {title}
        </p>
      </div>
      
      {/* Headline and subheadline */}
      <div className="w-full px-6 mt-2">
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#07183D] mb-3">
          {headline}
        </h1>
        
        <h2 className="text-lg text-[#07183D] leading-relaxed font-sans">
          {subheadline}
        </h2>
      </div>
      
      {/* Icon visualization */}
      <div className="w-full my-6 flex justify-center">
        <CycleIconComponent className="w-56 h-56 text-[#14213d]" />
      </div>
      
      {/* Emotional insights as bullets */}
      <div className="w-full px-6 bg-white/50 py-5 rounded-lg mx-2">
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <div className="min-w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-[#2e2a63] font-bold">!</span>
              </div>
              <span className="text-[#333333]">{insight}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Separator */}
      <Separator className="w-10 h-[2px] bg-[#2e2a63]/30 my-6" />
      
      {/* Spot the signs section */}
      <div className="w-full px-6 text-left">
        <div className="flex items-center mb-4">
          <Eye size={18} className="text-[#2e2a63] mr-2" />
          <h3 className="text-xl font-serif font-medium text-[#2e2a63]">Spot the Signs</h3>
        </div>
        
        <ul className="space-y-4">
          {signs.map((sign, index) => (
            <li key={index} className={`flex items-start p-3 rounded-md ${index % 2 === 0 ? 'bg-[#f8f5f0]' : 'bg-[#fbeaec]/30'}`}>
              <div className="mt-0.5">
                {sign.icon}
              </div>
              <div>
                <span className="font-bold text-[#07183D]">{sign.title} </span>
                <span className="text-[#333333]">{sign.text} </span>
                {sign.subtext && (
                  <span className="text-[#333333]/70 text-sm italic">{sign.subtext}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* What to try instead button */}
      <div className="w-full px-6 mt-8">
        <Button
          onClick={onViewRepair}
          className="bg-[#2e2a63] hover:bg-[#2e2a63]/90 text-white font-medium py-2 px-5 rounded-full text-sm w-full"
        >
          What to Try Instead
        </Button>
      </div>
    </div>
  );
};

export default PatternDetailScreen;
