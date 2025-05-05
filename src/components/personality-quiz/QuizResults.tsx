
import React from 'react';
import { QuizResult } from '@/types/personality-quiz';
import { personalityDescriptions } from '@/data/personality-quiz-data';
import ResultsHeader from './components/ResultsHeader';
import PersonalityTypeChart from './components/PersonalityTypeChart';
import PersonalityTypeCard from './components/PersonalityTypeCard';
import ExpressionProfile from './components/ExpressionProfile';
import ActionButtons from './components/ActionButtons';
import PdfGenerator from './components/PdfGenerator';

interface QuizResultsProps {
  results: QuizResult;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ results, onRestart }) => {
  const primaryType = personalityDescriptions[results.primaryType];
  const secondaryType = personalityDescriptions[results.secondaryType];
  
  return (
    <div className="max-w-4xl mx-auto">
      <PdfGenerator results={results}>
        {(handleDownload) => (
          <>
            <ResultsHeader>
              {/* Type Breakdown Chart - Moved to top */}
              <PersonalityTypeChart results={results} />
            </ResultsHeader>
            
            {/* Primary Type Card */}
            <PersonalityTypeCard 
              type={primaryType} 
              percentage={results.percentages[results.primaryType]} 
            />
            
            {/* Secondary Type Card */}
            <PersonalityTypeCard 
              type={secondaryType} 
              percentage={results.percentages[results.secondaryType]}
              isSecondary={true} 
            />
            
            {/* Expression Profile */}
            <ExpressionProfile primaryType={primaryType} />
            
            {/* Action Buttons */}
            <ActionButtons 
              results={results}
              onDownloadPdf={handleDownload}
            />
          </>
        )}
      </PdfGenerator>
    </div>
  );
};

export default QuizResults;
