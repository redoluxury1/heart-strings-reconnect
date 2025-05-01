
// Common types for drama-detox data
export type ScenarioComment = {
  scenario: string;
  comments: string[];
};

// Speech Recognition API types
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
