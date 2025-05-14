
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import BrandSection from '@/components/common/BrandSection';
import { Button } from '@/components/ui/button';
import Card from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface Prompt {
  text: string;
  type: 'open-ended' | 'yes-no';
}

interface SubcategoryData {
  id: string;
  name: string;
  prompts: Prompt[];
}

interface ResponseData {
  [promptId: string]: {
    response: string;
    sent: boolean;
  }
}

const SUBCATEGORY_DATA: SubcategoryData[] = [
  {
    id: 'discipline-styles',
    name: 'Discipline Styles',
    prompts: [
      { text: 'How were you each raised when it came to discipline?', type: 'open-ended' },
      { text: "What's one parenting moment where you felt out of sync with me?", type: 'open-ended' },
      { text: 'What kind of tone do we want to set when correcting our kids?', type: 'open-ended' },
      { text: 'Do you feel like we agree on what discipline should look like?', type: 'yes-no' },
      { text: 'Do you trust me to handle tough moments calmly?', type: 'yes-no' },
    ]
  },
  {
    id: 'nighttime-duties',
    name: 'Nighttime Duties',
    prompts: [
      { text: 'How do you feel when one of us is up more often at night?', type: 'open-ended' },
      { text: "What's one way we could make nights feel more like teamwork?", type: 'open-ended' },
      { text: 'How does lack of sleep affect how we treat each other?', type: 'open-ended' },
      { text: 'Do you feel like nighttime duties are evenly shared?', type: 'yes-no' },
      { text: 'Do you think we give each other enough recovery time?', type: 'yes-no' },
    ]
  },
  {
    id: 'feeling-unsupported',
    name: 'Feeling Unsupported',
    prompts: [
      { text: "What's one recent moment when you felt alone in parenting?", type: 'open-ended' },
      { text: "How do you usually want me to show up when you're struggling?", type: 'open-ended' },
      { text: "How do we repair when one of us feels unseen or overloaded?", type: 'open-ended' },
      { text: "Do you feel like I notice when you're overwhelmed?", type: 'yes-no' },
      { text: "Do you feel appreciated for what you do as a parent?", type: 'yes-no' },
    ]
  },
  {
    id: 'division-of-labor',
    name: 'Division of Labor',
    prompts: [
      { text: "What tasks feel the heaviest to you right now?", type: 'open-ended' },
      { text: "Are there responsibilities that feel unfair or uneven?", type: 'open-ended' },
      { text: "How can we make parenting feel more like a partnership?", type: 'open-ended' },
      { text: "Do you feel like we both understand what the other is carrying?", type: 'yes-no' },
      { text: "Do we regularly talk about what's working and what's not?", type: 'yes-no' },
    ]
  },
  {
    id: 'overwhelm',
    name: 'Overwhelm',
    prompts: [
      { text: "What does parenting overload feel like in your body?", type: 'open-ended' },
      { text: "How do we tend to respond to each other when stress is high?", type: 'open-ended' },
      { text: "How can we tell when it's time to ask for help?", type: 'open-ended' },
      { text: "Do you feel like I notice when you're at your limit?", type: 'yes-no' },
      { text: "Do you think we give ourselves enough grace?", type: 'yes-no' },
    ]
  },
  {
    id: 'different-parenting-approaches',
    name: 'Different Parenting Approaches',
    prompts: [
      { text: "What do we want our kids to say about how we raised them?", type: 'open-ended' },
      { text: "Where do we most often clash in our parenting styles?", type: 'open-ended' },
      { text: "What are our biggest shared values as parents?", type: 'open-ended' },
      { text: "Do you feel like we respect each other's parenting instincts?", type: 'yes-no' },
      { text: "Do we check in often about how things are going?", type: 'yes-no' },
    ]
  }
];

const ParentingSubcategoryDetails: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  
  // State for tracking responses to each prompt
  const [responses, setResponses] = useState<ResponseData>({});
  
  // Find the subcategory data based on the ID
  const subcategory = SUBCATEGORY_DATA.find(item => item.id === subcategoryId);

  // If subcategory doesn't exist, provide default content
  const subcategoryName = subcategory?.name || 'Subcategory';
  const prompts = subcategory?.prompts || [];

  // Handle text input change
  const handleOpenResponseChange = (promptIndex: number, value: string) => {
    const promptId = `${subcategoryId}-${promptIndex}`;
    setResponses(prev => ({
      ...prev,
      [promptId]: {
        ...prev[promptId],
        response: value,
        sent: false
      }
    }));
  };

  // Handle yes/no/sometimes selection
  const handleMultiChoiceSelect = (promptIndex: number, value: string) => {
    const promptId = `${subcategoryId}-${promptIndex}`;
    setResponses(prev => ({
      ...prev,
      [promptId]: {
        ...prev[promptId],
        response: value,
        sent: true
      }
    }));
    
    // Show toast notification for multiple choice responses
    toast({
      title: "Response saved",
      description: "Your answer has been recorded."
    });
  };

  // Handle sending a response
  const handleSendResponse = (promptIndex: number) => {
    const promptId = `${subcategoryId}-${promptIndex}`;
    const response = responses[promptId]?.response;
    
    if (!response || response.trim() === '') {
      toast({
        title: "Empty response",
        description: "Please write a response before sending.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, here we would send the response to the partner
    setResponses(prev => ({
      ...prev,
      [promptId]: {
        ...prev[promptId],
        sent: true
      }
    }));
    
    // Show confirmation toast
    toast({
      title: "Response sent",
      description: "Your response has been sent to your partner."
    });
  };

  // Split prompts by type
  const openEndedPrompts = prompts.filter(prompt => prompt.type === 'open-ended');
  const yesNoPrompts = prompts.filter(prompt => prompt.type === 'yes-no');

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1">
        <BrandSection className="py-10 md:py-16">
          <ContentContainer maxWidth="lg">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center text-midnight-indigo"
              onClick={() => navigate('/bridge-the-gap/categories/parenting')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to parenting topics
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
                {subcategoryName}
              </h1>
              <p className="text-midnight-indigo/70 text-lg">
                Pick a prompt to help you talk about it together.
              </p>
            </div>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              {/* Open-ended prompts */}
              <div className="space-y-6 mb-8">
                <h2 className="font-medium text-lg text-midnight-indigo">Discussion Questions</h2>
                {openEndedPrompts.map((prompt, index) => (
                  <DiscussionPromptCard 
                    key={index}
                    text={prompt.text}
                    response={responses[`${subcategoryId}-${index}`]?.response || ""}
                    sent={responses[`${subcategoryId}-${index}`]?.sent || false}
                    onChange={(value) => handleOpenResponseChange(index, value)}
                    onSend={() => handleSendResponse(index)}
                  />
                ))}
              </div>
              
              {/* Yes/No prompts */}
              <div className="space-y-6">
                <h2 className="font-medium text-lg text-midnight-indigo">Quick Response Questions</h2>
                {yesNoPrompts.map((prompt, index) => (
                  <MultiChoicePromptCard 
                    key={index + openEndedPrompts.length}
                    text={prompt.text}
                    selectedValue={responses[`${subcategoryId}-${index + openEndedPrompts.length}`]?.response}
                    onSelect={(value) => handleMultiChoiceSelect(index + openEndedPrompts.length, value)}
                  />
                ))}
              </div>
              
              {/* Show placeholder if no subcategory is found */}
              {prompts.length === 0 && (
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-medium text-midnight-indigo mb-4">
                      We're developing this content
                    </h2>
                    <p className="text-midnight-indigo/70 mb-6">
                      Our team is creating specialized prompts for this topic. Check back soon for helpful guidance.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/5"
                      onClick={() => navigate('/bridge-the-gap/categories/parenting')}
                    >
                      Try another topic
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ContentContainer>
        </BrandSection>
      </main>
      
      <Footer />
    </div>
  );
};

interface DiscussionPromptCardProps {
  text: string;
  response: string;
  sent: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

const DiscussionPromptCard: React.FC<DiscussionPromptCardProps> = ({ 
  text, 
  response, 
  sent, 
  onChange, 
  onSend 
}) => {
  return (
    <Card className="p-5 bg-white hover:shadow-sm transition-shadow duration-200">
      <div>
        <p className="text-midnight-indigo text-lg font-medium mb-3">{text}</p>
        
        <div className="mt-3">
          <Textarea 
            placeholder="Write your response..." 
            className="w-full resize-none bg-gray-50"
            value={response}
            onChange={(e) => onChange(e.target.value)}
            disabled={sent}
            rows={3}
          />
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="inline-block rounded-full px-2.5 py-0.5 text-xs bg-slate-100 text-slate-600">
            Discussion question
          </span>
          
          {sent ? (
            <span className="text-xs text-green-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Sent to partner
            </span>
          ) : (
            <Button 
              onClick={onSend}
              size="sm" 
              className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
              disabled={!response || response.trim() === ''}
            >
              <Send className="h-4 w-4 mr-1" /> Send
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

interface MultiChoicePromptCardProps {
  text: string;
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const MultiChoicePromptCard: React.FC<MultiChoicePromptCardProps> = ({ 
  text, 
  selectedValue, 
  onSelect 
}) => {
  return (
    <Card className="p-5 bg-white hover:shadow-sm transition-shadow duration-200">
      <div>
        <p className="text-midnight-indigo text-lg font-medium mb-3">{text}</p>
        
        <RadioGroup 
          value={selectedValue} 
          onValueChange={onSelect}
          className="mt-3 space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id={`yes-${text.substring(0, 10)}`} />
            <Label htmlFor={`yes-${text.substring(0, 10)}`} className="text-gray-700">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id={`no-${text.substring(0, 10)}`} />
            <Label htmlFor={`no-${text.substring(0, 10)}`} className="text-gray-700">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sometimes" id={`sometimes-${text.substring(0, 10)}`} />
            <Label htmlFor={`sometimes-${text.substring(0, 10)}`} className="text-gray-700">Sometimes</Label>
          </div>
        </RadioGroup>
        
        <div className="flex justify-between items-center mt-3">
          <span className="inline-block rounded-full px-2.5 py-0.5 text-xs bg-slate-100 text-slate-600">
            Yes / No / Sometimes
          </span>
          
          {selectedValue && (
            <span className="text-xs text-green-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Response saved
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ParentingSubcategoryDetails;
