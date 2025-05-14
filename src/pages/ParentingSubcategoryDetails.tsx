
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import BrandSection from '@/components/common/BrandSection';
import { Button } from '@/components/ui/button';
import Card from '@/components/common/Card';

interface Prompt {
  text: string;
  type: 'open-ended' | 'yes-no';
}

interface SubcategoryData {
  id: string;
  name: string;
  prompts: Prompt[];
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
  
  // Find the subcategory data based on the ID
  const subcategory = SUBCATEGORY_DATA.find(item => item.id === subcategoryId);

  // If subcategory doesn't exist, provide default content
  const subcategoryName = subcategory?.name || 'Subcategory';
  const prompts = subcategory?.prompts || [];

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
              <div className="space-y-3 mb-6">
                {openEndedPrompts.map((prompt, index) => (
                  <PromptCard 
                    key={index} 
                    text={prompt.text} 
                    type="open-ended"
                  />
                ))}
              </div>
              
              {/* Yes/No prompts */}
              <div className="space-y-3">
                {yesNoPrompts.map((prompt, index) => (
                  <PromptCard 
                    key={index} 
                    text={prompt.text} 
                    type="yes-no"
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

interface PromptCardProps {
  text: string;
  type: 'open-ended' | 'yes-no';
}

const PromptCard: React.FC<PromptCardProps> = ({ text, type }) => {
  return (
    <Card className="p-5 bg-white hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <p className="text-midnight-indigo text-lg font-medium pr-4">{text}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="shrink-0 border-mauve-rose/50 text-mauve-rose hover:bg-mauve-rose/10"
        >
          Send
        </Button>
      </div>
      <div className="mt-2">
        <span className="inline-block rounded-full px-2.5 py-0.5 text-xs bg-slate-100 text-slate-600">
          {type === 'open-ended' ? 'Discussion question' : 'Yes / No / Sometimes'}
        </span>
      </div>
    </Card>
  );
};

export default ParentingSubcategoryDetails;
