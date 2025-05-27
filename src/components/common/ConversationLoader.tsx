
import React from 'react';

interface ConversationLoaderProps {
  message?: string;
}

const ConversationLoader: React.FC<ConversationLoaderProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto text-center p-8">
        {/* Simple loading spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e2a63] mx-auto mb-6"></div>
        
        {/* Single loading message */}
        <p className="text-[#2e2a63] text-lg font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ConversationLoader;
