
import React from 'react';
import { Button } from '@/components/ui/button';
import { CommonPattern } from '../types';
import { MessageSquare, Shield, X, ArrowLeft, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { CycleIcon, SilentTensionIcon, CriticizeControlIcon, FixRejectIcon, PursueDistanceIcon } from './PatternRecognitionIcons';
import { Card } from '@/components/ui/card';
import OptimizedImage from '@/components/common/OptimizedImage';

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
      text: "\"You never care about what I need.\"", 
      subtext: "(Blame disguised as hurt)"
    },
    { 
      icon: <Shield size={18} className="text-[#07183D] mr-2" />, 
      title: "Defensiveness:", 
      text: "\"That's not true! I didn't do anything wrong.\"", 
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
  let useCustomImage = false;
  let customImageSrc = "";
  
  // Check if this pattern involves feeling ignored or dismissed
  const isIgnoredDismissedPattern = pattern.description?.toLowerCase().includes('ignored') || 
                                  pattern.description?.toLowerCase().includes('dismissed') ||
                                  pattern.name?.toLowerCase().includes('ignored') ||
                                  pattern.name?.toLowerCase().includes('dismissed');
  
  // Check if this is an effort imbalance pattern
  const isEffortImbalancePattern = pattern.description?.toLowerCase().includes('effort') || 
                                 pattern.description?.toLowerCase().includes('imbalance') ||
                                 pattern.name?.toLowerCase().includes('effort') ||
                                 pattern.name?.toLowerCase().includes('imbalance');
  
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
      useCustomImage = true;
      customImageSrc = "/lovable-uploads/bb777e8d-3c83-44c7-b4cf-42089f1d5e8b.png";
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
      useCustomImage = true;
      customImageSrc = "/lovable-uploads/c249001f-7813-4798-ac22-ea1fa988bce3.png";
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

  // If this is an ignored/dismissed pattern, use the custom image
  if (isIgnoredDismissedPattern) {
    useCustomImage = true;
    customImageSrc = "/lovable-uploads/43d77678-108c-4565-978c-3afdead85010.png";
  }

  // If this is an effort imbalance pattern, use the new uploaded image
  if (isEffortImbalancePattern) {
    useCustomImage = true;
    customImageSrc = "/lovable-uploads/5c296369-ace3-41ef-a2f0-7f788e5cd3c5.png";
  }

  return (
    <div className="flex flex-col items-center max-w-md mx-auto py-6 rounded-lg">
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
      
      {/* Pattern visualization - larger and more prominent */}
      <div className="w-full flex justify-center mb-4 bg-[#f8f5f0] rounded-lg p-6">
        {useCustomImage ? (
          <OptimizedImage
            src={customImageSrc}
            alt={`${title} pattern illustration`}
            className="w-44 h-44 md:w-56 md:h-56 object-contain"
            width={224}
            height={224}
            priority={true}
          />
        ) : (
          <CycleIconComponent className="w-44 h-44 md:w-56 md:h-56 text-[#2e2a63] animate-gentle-rotate" />
        )}
      </div>
      
      {/* Pattern title and headline in a card */}
      <Card className="w-full px-5 py-4 mb-4 border-l-4 border-l-[#2e2a63] bg-gradient-to-r from-[#f8f5f0] to-white">
        <p className="text-xs uppercase tracking-wide font-medium text-[#2e2a63]/80 mb-1">
          Pattern: {title}
        </p>
        <h1 className="text-2xl md:text-3xl font-serif font-medium text-[#07183D] mb-2">
          {headline}
        </h1>
        <p className="text-md text-[#333333] leading-relaxed">
          {subheadline}
        </p>
      </Card>
      
      {/* Key insights in separated cards */}
      <div className="w-full grid grid-cols-1 gap-3 mb-6">
        {insights.map((insight, index) => (
          <Card 
            key={index} 
            className="p-3 bg-white border-[#C7747F]/20 shadow-sm"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-2 mt-1 h-5 w-5 rounded-full bg-[#2e2a63]/10 flex items-center justify-center">
                <span className="text-[#2e2a63] font-bold">!</span>
              </div>
              <p className="text-[#333333] text-sm">{insight}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Spot the signs section */}
      <div className="w-full px-4 mb-6">
        <div className="flex items-center bg-[#fbeaec]/30 p-3 rounded-lg mb-3">
          <Eye size={18} className="text-[#C7747F] mr-2" />
          <h3 className="text-lg font-medium text-[#333333]">Spot the Signs</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {signs.map((sign, index) => (
            <Card 
              key={index} 
              className={`p-3 border-none ${index % 2 === 0 ? 'bg-[#f8f5f0]' : 'bg-white'}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 p-1.5 rounded-full bg-[#C7747F]/10">
                  {sign.icon}
                </div>
                <div>
                  <p className="font-medium text-[#07183D] mb-1">{sign.title}</p>
                  <p className="text-[#333333] text-sm">{sign.text}</p>
                  {sign.subtext && (
                    <p className="text-[#333333]/70 text-xs italic mt-1">{sign.subtext}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Action button */}
      <div className="w-full px-4 mt-2">
        <Button
          onClick={onViewRepair}
          className="bg-[#2e2a63] hover:bg-[#2e2a63]/90 text-white font-medium py-2 px-5 rounded-full text-sm w-full"
        >
          Show Me How to Break This Pattern
        </Button>
      </div>
    </div>
  );
};

export default PatternDetailScreen;
