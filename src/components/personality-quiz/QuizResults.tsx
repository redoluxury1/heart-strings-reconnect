
import React from 'react';
import { QuizResult, PersonalityTypeDescription } from '@/types/personality-quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { personalityDescriptions } from '@/data/personality-quiz-data';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowRight, Download, Home, RefreshCcw, UserPlus, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuizResultsProps {
  results: QuizResult;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ results, onRestart }) => {
  const navigate = useNavigate();
  const primaryType = personalityDescriptions[results.primaryType];
  const secondaryType = personalityDescriptions[results.secondaryType];
  
  // Prepare data for pie chart
  const chartData = Object.entries(results.percentages).map(([key, value]) => ({
    name: key,
    value,
    color: personalityDescriptions[key as keyof typeof personalityDescriptions].color
  }));
  
  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    console.log('Downloading results...');
  };

  const navigateToLoveCodeQuiz = () => {
    navigate('/love-code-quiz');
  };
  
  const handlePartnerInvite = () => {
    // For now, just log
    console.log('Invite partner flow would start here');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-medium text-midnight-indigo mb-4">
          Your Personality Blueprint
        </h1>
        <p className="text-midnight-indigo/70 max-w-2xl mx-auto mb-6">
          Based on your responses, we've identified your primary and secondary personality types.
          These influence how you communicate, process emotions, and navigate conflicts in relationships.
        </p>
        
        {/* Type Breakdown Chart - Moved to top */}
        <Card className="mb-8 mx-auto max-w-lg">
          <CardContent className="p-4 h-[280px]">
            <h3 className="text-xl font-medium text-midnight-indigo mb-2">Your Type Breakdown</h3>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${personalityDescriptions[name as keyof typeof personalityDescriptions].title} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Primary Type Card */}
      <Card className="mb-8 border-l-4" style={{ borderLeftColor: primaryType.color }}>
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium mb-2">
                {primaryType.title}
              </h2>
              <p className="text-gray-500 text-lg">Your Primary Type</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-md">
              <p className="font-medium">{results.percentages[results.primaryType]}% Match</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-2">Personality Overview:</h3>
              <p className="text-midnight-indigo/80">{primaryType.fullDescription}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-2">How You Respond Best to Support:</h3>
              <p className="text-midnight-indigo/80">
                {primaryType.supportNeeds || "You appreciate having your feelings acknowledged and respected, even when they're complex."}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-2">Common Misunderstandings:</h3>
              <p className="text-midnight-indigo/80">
                {primaryType.commonMisunderstandings || "Others may misread your communication style, but this isn't a reflection of your intentions or care."}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-midnight-indigo mb-2">Compatibility:</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-midnight-indigo">Most Compatible With:</h4>
                  <p className="text-midnight-indigo/80">{primaryType.mostCompatibleWith || "Each personality type offers unique strengths in relationships."}</p>
                </div>
                <div>
                  <h4 className="font-medium text-midnight-indigo">Potential Clashes With:</h4>
                  <p className="text-midnight-indigo/80">{primaryType.potentialClashesWith || "Every relationship has challenges that can be overcome with understanding."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Secondary Type Card */}
      <Card className="mb-10 border-l-4" style={{ borderLeftColor: secondaryType.color }}>
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-medium mb-2">
                {secondaryType.title}
              </h3>
              <p className="text-gray-500">Your Secondary Type</p>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-md">
              <p className="font-medium">{results.percentages[results.secondaryType]}% Match</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <p className="text-midnight-indigo/80">{secondaryType.shortDescription}</p>
            <div>
              <h4 className="font-medium text-midnight-indigo mb-1">Mini Overview:</h4>
              <p className="text-midnight-indigo/80">{secondaryType.fullDescription.split('.')[0] + '.'}</p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Expression Profile */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-xl font-medium text-midnight-indigo mb-4">Your Expression Profile</h3>
          
          <Card className="mb-4">
            <CardContent className="p-6">
              <h4 className="font-medium mb-2">Your Strengths</h4>
              <p className="text-midnight-indigo/80">{primaryType.expressionStrengths}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h4 className="font-medium mb-2">Your Challenges</h4>
              <p className="text-midnight-indigo/80">{primaryType.expressionChallenges}</p>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h3 className="text-xl font-medium text-midnight-indigo mb-4">Growth Opportunities</h3>
          <Card className="h-full">
            <CardContent className="p-6 h-full">
              <p className="text-midnight-indigo/80">
                Learning to balance your {primaryType.title.toLowerCase()} tendencies with elements of other personality 
                types can help you grow. Consider exploring how you might benefit from:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-midnight-indigo/80">
                <li>The emotional expression of a Spark</li>
                <li>The calming presence of an Anchor</li>
                <li>The analytical approach of a Strategist</li>
                <li>The depth of understanding of a Reflector</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex-1 max-w-[200px]"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Results
        </Button>
        
        <Button
          variant="outline"
          onClick={onRestart}
          className="flex-1 max-w-[200px]"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Retake Quiz
        </Button>
      </div>
      
      {/* New Buttons */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 text-center">
        <h3 className="text-xl font-medium text-midnight-indigo mb-3">
          Continue Your Relationship Journey
        </h3>
        <p className="text-midnight-indigo/70 mb-6 max-w-2xl mx-auto">
          Deepen your connection by inviting your partner to take the quiz or discover your Love Code for even more insights.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={handlePartnerInvite}
            className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Your Partner
          </Button>
          
          <Button 
            onClick={navigateToLoveCodeQuiz}
            className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
          >
            <Heart className="mr-2 h-4 w-4" />
            Take Love Code Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
