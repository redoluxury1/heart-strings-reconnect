
import React, { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { useReflectionAnalysis } from '@/hooks/useReflectionAnalysis';
import TabView from './components/TabView';
import SharedInsight from './components/SharedInsight';
import ReflectionCards from './components/ReflectionCards';
import NextStepsButtons from './components/NextStepsButtons';

const ReflectionSummary: React.FC = () => {
  const { sessionData } = useSession();
  const [activeTab, setActiveTab] = useState<string>("side-by-side");
  const { matchedReflections } = useReflectionAnalysis(sessionData);
  
  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <HeartHandshake className="h-8 w-8 text-[#D3876A]" strokeWidth={1.5} />
        </div>
        
        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-2 text-center">
          You both showed up.
        </h2>
        
        {/* Subheader */}
        <p className="text-center text-[#3A3A3A] mb-8 max-w-xl">
          Here's a side-by-side look at how each of you experienced the moment—and how to move forward.
        </p>
        
        {/* Main Content */}
        <div className="w-full mb-8">
          <TabView 
            sessionData={sessionData} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>
        
        {/* Shared Insight Section */}
        <SharedInsight sessionData={sessionData} />
        
        {/* Therapist Reflection Cards */}
        {matchedReflections.length > 0 && (
          <ReflectionCards reflections={matchedReflections} />
        )}
        
        {/* CTA Section */}
        <NextStepsButtons />
      </div>
    </div>
  );
};

export default ReflectionSummary;
