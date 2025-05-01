
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, MicOff } from 'lucide-react';

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
  const [input, setInput] = useState(partner1Response || '');
  const [isSubmitted, setIsSubmitted] = useState(!!partner1Response);
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  
  // Setup speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      setSpeechRecognition(recognition);
    }
    
    return () => {
      if (speechRecognition) {
        speechRecognition.stop();
      }
    };
  }, []);
  
  const toggleRecording = () => {
    if (!speechRecognition) return;
    
    if (isRecording) {
      speechRecognition.stop();
      setIsRecording(false);
    } else {
      setInput('');
      speechRecognition.start();
      setIsRecording(true);
    }
  };
  
  const handleSubmit = () => {
    if (input.trim()) {
      if (isRecording && speechRecognition) {
        speechRecognition.stop();
        setIsRecording(false);
      }
      onResponse(input);
      setIsSubmitted(true);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-3 text-center">
        What Just Happened
      </h2>
      
      <p className="text-center text-gray-700 mb-6">
        Briefly describe what the argument was about from your perspective.
      </p>
      
      {!isSubmitted ? (
        <div className="max-w-lg mx-auto">
          <Textarea 
            placeholder="Write your perspective here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mb-4 min-h-[150px]"
          />
          
          <div className="flex gap-2 mb-4">
            {('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) && (
              <Button
                type="button"
                onClick={toggleRecording}
                variant="outline"
                className={`${isRecording ? 'bg-red-100 text-red-800 border-red-300' : 'border-gray-300'}`}
              >
                {isRecording ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
                {isRecording ? 'Stop Recording' : 'Speak Instead'}
              </Button>
            )}
          </div>
          
          <Button 
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full flex items-center justify-center gap-2"
            disabled={!input.trim()}
          >
            <Send size={16} />
            Share
          </Button>
        </div>
      ) : (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-soft-blush/20 p-5 rounded-lg">
              <h3 className="font-medium mb-3 text-midnight-indigo">Your perspective:</h3>
              <p className="text-gray-700">{partner1Response}</p>
            </div>
            
            {partner2Response && (
              <div className="bg-soft-cream/30 p-5 rounded-lg animate-fade-in">
                <h3 className="font-medium mb-3 text-midnight-indigo">Your partner's perspective:</h3>
                <p className="text-gray-700">{partner2Response}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerspectiveStep;
