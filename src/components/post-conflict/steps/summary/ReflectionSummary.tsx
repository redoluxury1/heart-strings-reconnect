
import React, { useState, useEffect } from 'react';
import { HeartHandshake } from 'lucide-react';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import { useConflictPatternAnalysis } from '@/hooks/useConflictPatternAnalysis';
import TabView from './components/TabView';
import ConflictInsightDisplay from './components/ConflictInsightDisplay';
import NextStepsButtons from './components/NextStepsButtons';
import { Skeleton } from '@/components/ui/skeleton';

const ReflectionSummary: React.FC = () => {
  const { sessionData } = useSession();
  const [activeTab, setActiveTab] = useState<string>("side-by-side");
  const { primaryPattern, isAnalyzing, analysisMethod, getPatternDisplayName } = useConflictPatternAnalysis(sessionData);
  
  // Force a small delay to ensure analysis has time to complete
  const [showInsights, setShowInsights] = useState(false);
  
  useEffect(() => {
    // Short delay to ensure analysis has completed
    const timer = setTimeout(() => {
      setShowInsights(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
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
        
        {/* Pattern-Based Insights */}
        <div className="w-full mb-8">
          {isAnalyzing || !showInsights ? (
            // Skeleton loading state
            <div className="space-y-6">
              <Skeleton className="h-8 w-64 mx-auto bg-[#F8F5F3] opacity-70" />
              <Skeleton className="h-48 w-full bg-[#F8F5F3] opacity-70" />
              <Skeleton className="h-48 w-full bg-[#F8F5F3] opacity-70" />
              <Skeleton className="h-48 w-full bg-[#F8F5F3] opacity-70" />
              <Skeleton className="h-48 w-full bg-[#F8F5F3] opacity-70" />
            </div>
          ) : primaryPattern ? (
            <div>
              <ConflictInsightDisplay 
                pattern={primaryPattern}
                patternName={getPatternDisplayName(primaryPattern)}
              />
              {/* Analysis method indicator for development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-400 text-center mt-4">
                  Analysis method: {analysisMethod}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-[#3A3A3A] py-8">
              <p className="mb-4">
                We're still analyzing your conversation to provide personalized insights.
              </p>
              <p className="text-sm text-[#65595D]">
                Every conflict is unique, and we want to give you the most relevant guidance.
              </p>
            </div>
          )}
        </div>
        
        {/* CTA Section */}
        <NextStepsButtons />
      </div>
    </div>
  );
};

export default ReflectionSummary;
