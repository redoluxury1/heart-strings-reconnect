
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface SpeechToTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

const SpeechToTextInput: React.FC<SpeechToTextInputProps> = ({
  value,
  onChange,
  placeholder = 'Type or speak your thoughts...',
  className = '',
  minHeight = '120px',
}) => {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      return;
    }
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    if (recognitionRef.current) {
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
          
        // Append to existing text rather than replacing it
        onChange(value + transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Speech recognition error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive"
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [value, onChange, toast]);
  
  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition. Please use a modern browser like Chrome.",
        variant: "destructive"
      });
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
      toast({
        title: "Listening...",
        description: "Speak clearly into your microphone. Click the button again to stop."
      });
    }
  };
  
  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`pr-12 ${className}`}
        style={{ minHeight }}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="absolute right-2 bottom-2 text-[#D3876A] hover:text-[#D3876A]/80 hover:bg-[#D3876A]/10"
        onClick={toggleListening}
        title={isListening ? "Stop listening" : "Start voice input"}
      >
        {isListening ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default SpeechToTextInput;
