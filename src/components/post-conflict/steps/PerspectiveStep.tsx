
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Send } from 'lucide-react';

interface PerspectiveStepProps {
  onResponse: (response: string) => void;
  partner1Response: string | null;
  partner2Response: string | null;
}

const PerspectiveStep: React.FC<PerspectiveStepProps> = ({
  onResponse,
  partner1Response,
  partner2Response
}) => {
  const [perspective, setPerspective] = useState(partner1Response || '');
  const [isRecording, setIsRecording] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(!!partner1Response);
  const recognitionRef = useRef<any>(null);
  
  const starterPrompts = [
    "I feel like you misunderstood me when...",
    "I got really frustrated because...",
    "I didn't feel like I could explain myself...",
    "I shut down because I felt...",
    "What I was trying to say was..."
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionApi = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognitionApi();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        setPerspective(prev => prev + ' ' + transcript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleStarterPrompt = (prompt: string) => {
    setPerspective(prompt);
  };
  
  const handleSubmit = () => {
    if (perspective.trim()) {
      onResponse(perspective.trim());
      setHasSubmitted(true);
    }
  };
  
  const speechRecognitionAvailable = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
        What just happened?
      </h2>
      
      <div className="mb-6">
        <div className="flex items-center mb-2 justify-center">
          <label htmlFor="perspective" className="text-sm text-gray-600 mr-2">
            Share your perspective:
          </label>
          
          {speechRecognitionAvailable && (
            <Button
              type="button"
              size="sm"
              variant={isRecording ? "default" : "outline"}
              className={isRecording ? "bg-red-500 hover:bg-red-600" : ""}
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              {isRecording ? "Stop" : "Record"}
            </Button>
          )}
        </div>
        
        {!hasSubmitted && (
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            {starterPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="bg-white border-gray-300 hover:bg-gray-100 text-gray-700 whitespace-normal h-auto py-1"
                onClick={() => handleStarterPrompt(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        )}
        
        <Textarea
          id="perspective"
          value={perspective}
          onChange={(e) => setPerspective(e.target.value)}
          placeholder="Type your perspective here..."
          className="w-full h-32"
        />
        
        {!hasSubmitted && (
          <Button 
            className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white px-8 mt-4"
            onClick={handleSubmit}
            disabled={!perspective.trim()}
          >
            <Send size={16} className="mr-2" />
            Share
          </Button>
        )}
      </div>
      
      {/* Only show partner's perspective after submission */}
      {hasSubmitted && partner2Response && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Your partner's perspective:</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-gray-700">{partner2Response}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerspectiveStep;
