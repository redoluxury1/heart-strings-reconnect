
import React from 'react';
import GroundingStep from '../steps/GroundingStep';
import ToneSettingStep from '../steps/ToneSettingStep';
import PerspectiveStep from '../steps/PerspectiveStep';
import EmotionalCheckIn from '../steps/EmotionalCheckIn';
import NeedsRepairStep from '../steps/NeedsRepairStep';
import ConnectionPromptStep from '../steps/ConnectionPromptStep';
import EndSessionStep from '../steps/EndSessionStep';
import { useSession } from '../context/SessionContext';

export const useSteps = (onExit: () => void) => {
  const { handleResponse, sessionData, currentStep, handleRestart } = useSession();

  const steps = [
    {
      id: 'grounding',
      component: 
        <GroundingStep 
          onResponse={(response) => handleResponse('partner1', 'grounding', response)} 
          onExit={onExit}
          onNext={() => {}} // This will be set in GroundingStep
        />
    },
    {
      id: 'tone',
      component: 
        <ToneSettingStep 
          onResponse={(response) => handleResponse('partner1', 'tone', response)}
          partner1Response={sessionData.partner1.responses.tone}
          partner2Response={sessionData.partner2.ready ? "I want to listen more and react less" : null}
        />
    },
    {
      id: 'perspective',
      component: 
        <PerspectiveStep 
          onResponse={(response) => handleResponse('partner1', 'perspective', response)}
          partner1Response={sessionData.partner1.responses.perspective}
          partner2Response={sessionData.partner2.ready ? "I felt like you weren't listening to me when I tried to explain how I was feeling." : null}
        />
    },
    {
      id: 'emotions',
      component: 
        <EmotionalCheckIn 
          onResponse={(response) => handleResponse('partner1', 'emotions', response)}
          selectedEmotions={sessionData.partner1.responses.emotions}
          partner2Emotions={sessionData.partner2.ready ? ["hurt", "misunderstood", "frustrated"] : null}
        />
    },
    {
      id: 'needs',
      component: 
        <NeedsRepairStep 
          onResponse={(response) => handleResponse('partner1', 'needs', response)}
          partner1Response={sessionData.partner1.responses.needs}
          partner2Response={sessionData.partner2.ready ? "I need reassurance that we can talk about difficult topics without things escalating." : null}
        />
    },
    {
      id: 'connection',
      component: 
        <ConnectionPromptStep 
          onResponse={(response) => handleResponse('partner1', 'connection', response)}
          partner1Response={sessionData.partner1.responses.connection}
          partner2Response={sessionData.partner2.ready ? "I appreciate how you always try to make things right, even when it's hard." : null}
        />
    },
    {
      id: 'end',
      component: <EndSessionStep onSendLoveNote={onExit} onRestart={handleRestart} />
    }
  ];
  
  return {
    steps,
    currentStepContent: steps[currentStep].component,
    totalSteps: steps.length
  };
};
