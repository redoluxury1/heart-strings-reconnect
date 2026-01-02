
import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, Lightbulb, MessageSquare, Target } from 'lucide-react';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import NextStepsButtons from './components/NextStepsButtons';

const SoloReflectionSummary: React.FC = () => {
  const navigate = useNavigate();
  const { sessionData, handleRestart } = useSession();
  
  // Extract user's reflection data
  const userReflection = {
    intent: sessionData.partner1.responses.complete?.intent || "Not specified",
    emotions: sessionData.partner1.responses.emotions || [],
    perspective: sessionData.partner1.responses.complete?.perspective || "No perspective shared",
    wish: sessionData.partner1.responses.complete?.understanding || "No wishes shared",
    need: sessionData.partner1.responses.complete?.needs || "No needs shared"
  };

  const handleSaveToArchive = () => {
    // In a real implementation, save to database
    navigate('/archive');
  };
  
  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <BookOpen className="h-8 w-8 text-[#D3876A]" strokeWidth={1.5} />
        </div>
        
        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-2 text-center">
          Your Reflection
        </h2>
        
        {/* Subheader */}
        <p className="text-center text-[#3A3A3A] mb-8 max-w-xl">
          Here's what you discovered about yourself and this conflict. Use these insights to guide your next conversation.
        </p>
        
        {/* Reflection Cards */}
        <div className="w-full space-y-4 mb-8">
          {/* Intention Card */}
          <div className="bg-white rounded-lg border border-[#E8DAD3] p-4">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-[#5D3A5A]" />
              <h3 className="font-medium text-[#2C2C2C]">Your Intention</h3>
            </div>
            <p className="text-[#3A3A3A] pl-8">{userReflection.intent}</p>
          </div>
          
          {/* Emotions Card */}
          {userReflection.emotions.length > 0 && (
            <div className="bg-white rounded-lg border border-[#E8DAD3] p-4">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="h-5 w-5 text-[#D3876A]" />
                <h3 className="font-medium text-[#2C2C2C]">How You Felt</h3>
              </div>
              <div className="flex flex-wrap gap-2 pl-8">
                {userReflection.emotions.map((emotion, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#D3876A]/10 text-[#D3876A] rounded-full text-sm"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Perspective Card */}
          <div className="bg-white rounded-lg border border-[#E8DAD3] p-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="h-5 w-5 text-[#5D3A5A]" />
              <h3 className="font-medium text-[#2C2C2C]">Your Perspective</h3>
            </div>
            <p className="text-[#3A3A3A] pl-8 whitespace-pre-wrap">{userReflection.perspective}</p>
          </div>
          
          {/* Wish Card */}
          <div className="bg-white rounded-lg border border-[#E8DAD3] p-4">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="h-5 w-5 text-[#D3876A]" />
              <h3 className="font-medium text-[#2C2C2C]">What You Wish They Understood</h3>
            </div>
            <p className="text-[#3A3A3A] pl-8 whitespace-pre-wrap">{userReflection.wish}</p>
          </div>
          
          {/* Need Card */}
          <div className="bg-white rounded-lg border border-[#E8DAD3] p-4">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-[#5D3A5A]" />
              <h3 className="font-medium text-[#2C2C2C]">What You Need Moving Forward</h3>
            </div>
            <p className="text-[#3A3A3A] pl-8 whitespace-pre-wrap">{userReflection.need}</p>
          </div>
        </div>
        
        {/* Guidance Section */}
        <div className="w-full bg-[#5D3A5A]/5 rounded-lg p-5 mb-8">
          <h3 className="font-medium text-[#2C2C2C] mb-3 text-center">
            💡 How to Use This Reflection
          </h3>
          <ul className="space-y-2 text-[#3A3A3A] text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#D3876A]">•</span>
              <span>Wait until you're both calm before starting a conversation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D3876A]">•</span>
              <span>Lead with your intention—it sets the tone for repair</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D3876A]">•</span>
              <span>Share your perspective using "I felt..." statements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D3876A]">•</span>
              <span>Ask your partner what they need too—it goes both ways</span>
            </li>
          </ul>
        </div>
        
        {/* CTA Section */}
        <NextStepsButtons />
      </div>
    </div>
  );
};

export default SoloReflectionSummary;
