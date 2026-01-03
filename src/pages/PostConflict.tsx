import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import FloatingTextBubbles from '@/components/post-conflict/FloatingTextBubbles';
import PostConflictToolHub, { ToolType } from '@/components/post-conflict/tool-hub/PostConflictToolHub';
import TryNextTimeFlow from '@/components/post-conflict/try-next-time/TryNextTimeFlow';
import PatternTrackerFlow from '@/components/post-conflict/pattern-tracker/PatternTrackerFlow';

const PostConflict = () => {
  const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const handleSelectTool = (tool: ToolType) => {
    setSelectedTool(tool);
    setShowIntro(false);
  };

  const handleBackToHub = () => {
    setSelectedTool(null);
  };

  const handleToolComplete = () => {
    // Return to hub after completing a tool
    setSelectedTool(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-0 pb-20">
        {showIntro && !selectedTool && <FloatingTextBubbles />}
        
        <ContentContainer maxWidth="lg">
          <div className="max-w-3xl mx-auto mt-2">
            {showIntro && !selectedTool && (
              <p className="text-center text-muted-foreground mb-10 mt-2 pt-2">
                Take a breath. Let's work through what happened—no judgment, just honest reflection to help you move forward.
              </p>
            )}
            
            {/* Main content area */}
            <div className="mb-16">
              {!selectedTool && (
                <PostConflictToolHub onSelectTool={handleSelectTool} />
              )}
              
              {selectedTool === 'try-next-time' && (
                <TryNextTimeFlow 
                  onComplete={handleToolComplete}
                  onBack={handleBackToHub}
                />
              )}
              
              {selectedTool === 'pattern-tracker' && (
                <PatternTrackerFlow 
                  onComplete={handleToolComplete}
                  onBack={handleBackToHub}
                />
              )}
            </div>
          </div>
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default PostConflict;
