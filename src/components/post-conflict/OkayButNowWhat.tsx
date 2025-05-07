
import React, { useState } from 'react';
import { useInterface } from '../../hooks/useInterfaceContext';
import { useSession } from './context/SessionContext';
import InitialOptionsView from './okay-but-now-what/InitialOptionsView';
import FlowContentView from './okay-but-now-what/FlowContentView';

const OkayButNowWhat = () => {
  const { colors } = useInterface();
  const { sessionData } = useSession();
  const [activeFlow, setActiveFlow] = useState<'pattern' | 'repair' | null>(null);
  
  const handleFindPattern = () => {
    setActiveFlow('pattern');
  };
  
  const handleCreateRepairPlan = () => {
    setActiveFlow('repair');
  };
  
  const handleBackToOptions = () => {
    setActiveFlow(null);
  };
  
  return (
    <div id="okay-but-now-what" className="bg-[#F5F0E8] rounded-xl shadow-sm">
      {activeFlow === null ? (
        <InitialOptionsView 
          onFindPattern={handleFindPattern}
          onCreateRepairPlan={handleCreateRepairPlan}
        />
      ) : (
        <FlowContentView 
          activeFlow={activeFlow} 
          onBack={handleBackToOptions} 
        />
      )}
    </div>
  );
};

export default OkayButNowWhat;
