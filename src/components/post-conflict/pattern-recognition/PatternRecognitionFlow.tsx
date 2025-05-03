import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { reconnectionTips, ReconnectionTip } from '@/data/reconnection-tips';

// Define quiz questions for each pattern
const patternQuizzes = {
  "criticism-defensiveness": [
    {
      id: 1,
      question: "During disagreements, does one of you often point out what the other is doing wrong?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "How often do you feel the need to explain yourself or defend your actions?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "Do conversations about problems often turn into accusations?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ],
  "stonewalling-pursuit": [
    {
      id: 1,
      question: "During conflicts, does one of you tend to shut down or go quiet?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "How often does one of you push to resolve things immediately while the other needs space?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "Do you find yourselves in a pattern where one person withdraws and the other keeps pursuing?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ],
  "contempt-contempt": [
    {
      id: 1,
      question: "How often do eye-rolls, sarcasm, or mockery show up in your disagreements?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 2,
      question: "Do you sometimes feel like your partner doesn't respect your perspective?",
      options: ["Almost always", "Sometimes", "Rarely"],
    },
    {
      id: 3,
      question: "During arguments, do either of you make comments that feel dismissive or belittling?",
      options: ["Almost always", "Sometimes", "Rarely"],
    }
  ]
};

const commonPatterns = [
  {
    id: 1,
    name: "Criticism-Defensiveness Cycle",
    description: "One partner criticizes, the other becomes defensive, leading to escalation.",
    examples: ["You always...", "You never...", "Why can't you just..."],
    breakingTips: [
      "Try using 'I' statements instead of 'you' statements",
      "Take a break when you notice this pattern starting",
      "Ask clarifying questions instead of defending immediately"
    ],
    patternType: "criticism-defensiveness"
  },
  {
    id: 2,
    name: "Stonewalling-Pursuit Cycle",
    description: "One partner withdraws, the other pursues, creating a distance-closeness struggle.",
    examples: ["Silent treatment", "Walking away mid-conversation", "Constant checking in"],
    breakingTips: [
      "Agree on a specific time to return to the conversation",
      "Practice self-soothing during breaks",
      "Use gentle startups when re-engaging"
    ],
    patternType: "stonewalling-pursuit"
  },
  {
    id: 3,
    name: "Contempt-Contempt Cycle",
    description: "Partners exchange hostile humor, sarcasm, name-calling, or disrespectful body language.",
    examples: ["Eye-rolling", "Mockery", "Hostile humor"],
    breakingTips: [
      "Build a culture of appreciation",
      "Express needs directly without contempt",
      "Focus on the underlying feelings beneath contempt"
    ],
    patternType: "contempt-contempt"
  }
];

interface QuizAnswer {
  questionId: number;
  answer: string;
}

const PatternRecognitionFlow: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const [isShowingQuiz, setIsShowingQuiz] = useState(false);
  const [isShowingTips, setIsShowingTips] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { sessionData } = useSession();
  
  const handlePatternSelect = (patternId: number) => {
    setSelectedPattern(patternId);
    setIsShowingQuiz(true);
    setQuizAnswers([]);
    setCurrentQuestionIndex(0);
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setQuizAnswers([...quizAnswers, { questionId, answer }]);
    
    const selectedPatternData = selectedPattern !== null 
      ? commonPatterns.find(p => p.id === selectedPattern)
      : null;
      
    const quizQuestions = selectedPatternData ? patternQuizzes[selectedPatternData.patternType as keyof typeof patternQuizzes] : [];
    
    // If we've answered all questions, show reconnection tips
    if (currentQuestionIndex >= quizQuestions.length - 1) {
      setIsShowingQuiz(false);
      setIsShowingTips(true);
    } else {
      // Otherwise, move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleShowReconnectionTips = () => {
    setIsShowingTips(true);
  };
  
  const handleGoBack = () => {
    if (isShowingTips) {
      setIsShowingTips(false);
      if (isShowingQuiz) {
        setIsShowingQuiz(true);
      } else {
        setSelectedPattern(null);
      }
    } else if (isShowingQuiz) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        // Remove the last answer
        setQuizAnswers(quizAnswers.slice(0, quizAnswers.length - 1));
      } else {
        setIsShowingQuiz(false);
        setSelectedPattern(null);
      }
    } else if (selectedPattern !== null) {
      setSelectedPattern(null);
    }
  };

  // Get pattern-specific reconnection tips
  const getPatternSpecificTips = (patternType: string): ReconnectionTip[] => {
    // First try to get pattern-specific tips
    const specificTips = reconnectionTips
      .filter(tip => tip.patterns && tip.patterns.includes(patternType as any))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    // If we don't have enough specific tips, supplement with general ones
    if (specificTips.length < 3) {
      const generalTips = reconnectionTips
        .filter(tip => !tip.patterns || !tip.patterns.includes(patternType as any))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 - specificTips.length);
      
      return [...specificTips, ...generalTips];
    }
    
    return specificTips;
  };
  
  const selectedPatternData = selectedPattern !== null 
    ? commonPatterns.find(p => p.id === selectedPattern)
    : null;
  
  const quizQuestions = selectedPatternData ? patternQuizzes[selectedPatternData.patternType as keyof typeof patternQuizzes] : [];
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const tipsToDisplay = selectedPatternData 
    ? getPatternSpecificTips(selectedPatternData.patternType)
    : reconnectionTips.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        {(selectedPattern !== null || isShowingQuiz || isShowingTips) && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        
        {isShowingTips ? (
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
              Reconnection Activities
            </h2>
            
            {selectedPatternData && (
              <div className="bg-soft-cream/20 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-mauve-rose mb-2">Your Pattern: {selectedPatternData.name}</h3>
                <p className="text-gray-700 mb-2">{selectedPatternData.description}</p>
                <div className="mt-3">
                  <h4 className="font-medium text-gray-700">Tips to Break This Pattern:</h4>
                  <ul className="list-disc pl-5 mt-1">
                    {selectedPatternData.breakingTips.map((tip, index) => (
                      <li key={index} className="text-gray-600 text-sm">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <p className="text-gray-700 mb-6">
              {selectedPatternData 
                ? `Try these specific activities to help break the ${selectedPatternData.name.toLowerCase()}:` 
                : "Try one of these activities together to help rebuild connection:"}
            </p>
            
            <ul className="space-y-4 mb-6">
              {tipsToDisplay.map(tip => (
                <li key={tip.id} className="bg-soft-cream/20 p-4 rounded-lg">
                  <p className="text-gray-800">{tip.text}</p>
                  <p className="text-sm text-gray-500 mt-1 capitalize">
                    {tip.category} connection
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : isShowingQuiz && currentQuestion ? (
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
              Understanding Your Pattern
            </h2>
            
            <div className="bg-soft-cream/20 p-5 rounded-lg mb-6">
              <h3 className="font-medium text-mauve-rose mb-4">Question {currentQuestionIndex + 1} of {quizQuestions.length}</h3>
              <p className="text-gray-800 mb-5">{currentQuestion.question}</p>
              
              <div className="space-y-3">
                {currentQuestion.options.map(option => (
                  <button
                    key={option}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-mauve-rose/10 transition-colors"
                    onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6 text-center">
              Identify Your Pattern
            </h2>
            
            <p className="text-gray-700 mb-8 text-center">
              Which of these patterns feels most familiar in your relationship? 
              Identifying your pattern is the first step to breaking it.
            </p>
            
            <div className="space-y-4">
              {commonPatterns.map(pattern => (
                <button
                  key={pattern.id}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-soft-cream/20 transition-colors"
                  onClick={() => handlePatternSelect(pattern.id)}
                >
                  <h3 className="font-medium text-mauve-rose">{pattern.name}</h3>
                  <p className="text-gray-600 mt-1">{pattern.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternRecognitionFlow;
