
import React from 'react';
import GroundingStep from '../steps/GroundingStep';
import ToneSettingStep from '../steps/ToneSettingStep';
import PerspectiveStep from '../steps/PerspectiveStep';
import EmotionalCheckIn from '../steps/EmotionalCheckIn';
import NeedsRepairStep from '../steps/NeedsRepairStep';
import ConnectionPromptStep from '../steps/ConnectionPromptStep';
import ReflectionSummaryStep from '../steps/ReflectionSummaryStep';
import EndSessionStep from '../steps/EndSessionStep';
import { useSession } from '../context/SessionContext';

export const useSteps = (onExit: () => void) => {
  const { handleResponse, sessionData, currentStep, handleRestart, setCurrentStep } = useSession();

  // Helper function for auto-advancing
  const autoAdvance = () => {
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 500);
  };

  const steps = [
    {
      id: 'grounding',
      component: 
        <GroundingStep 
          onResponse={(response) => {
            handleResponse('partner1', 'grounding', response);
          }} 
          onExit={onExit}
          onNext={() => {}} // This will be set in GroundingStep
        />
    },
    {
      id: 'tone',
      component: 
        <ToneSettingStep 
          onResponse={(response) => {
            handleResponse('partner1', 'tone', response);
            // Auto-advance after a short delay
            autoAdvance();
          }}
          partner1Response={sessionData.partner1.responses.tone}
        />
    },
    {
      id: 'perspective',
      component: 
        <PerspectiveStep 
          onResponse={(response) => {
            handleResponse('partner1', 'perspective', response);
            // Auto-advance after handling response
            autoAdvance();
          }}
          partner1Response={sessionData.partner1.responses.perspective}
          partner2Response={sessionData.partner2.responses.perspective}
        />
    },
    {
      id: 'emotions',
      component: 
        <EmotionalCheckIn 
          onResponse={(response) => {
            handleResponse('partner1', 'emotions', response);
            // Auto-advance after handling response
            autoAdvance();
          }}
          selectedEmotions={sessionData.partner1.responses.emotions}
          partner2Emotions={sessionData.partner2.responses.emotions}
        />
    },
    {
      id: 'needs',
      component: 
        <NeedsRepairStep 
          onResponse={(response) => {
            handleResponse('partner1', 'needs', response);
            // Auto-advance after handling response
            autoAdvance();
          }}
          partner1Response={sessionData.partner1.responses.needs}
          partner2Response={sessionData.partner2.responses.needs}
        />
    },
    {
      id: 'connection',
      component: 
        <ConnectionPromptStep 
          onResponse={(response) => {
            handleResponse('partner1', 'connection', response);
            // Auto-advance after handling response
            autoAdvance();
          }}
          partner1Response={sessionData.partner1.responses.connection}
          partner2Response={sessionData.partner2.responses.connection}
        />
    },
    {
      id: 'reflection',
      component: 
        <ReflectionSummaryStep
          partner1Data={{
            perspective: sessionData.partner1.responses.perspective,
            emotions: sessionData.partner1.responses.emotions,
            needs: sessionData.partner1.responses.needs,
            connection: sessionData.partner1.responses.connection
          }}
          partner2Data={{
            perspective: sessionData.partner2.ready ? "I felt like you weren't listening to me when I tried to explain how I was feeling." : undefined,
            emotions: sessionData.partner2.ready ? ["hurt", "misunderstood", "frustrated"] : undefined,
            needs: sessionData.partner2.ready ? "I need reassurance that we can talk about difficult topics without things escalating." : undefined,
            connection: sessionData.partner2.ready ? "I appreciate how you always try to make things right, even when it's hard." : undefined
          }}
          onContinue={() => {}} // This is handled by the navigation buttons
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
