
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '../context/SessionContext';
import { useNavigate } from 'react-router-dom';

interface RepairItem {
  id: number;
  text: string;
  selected: boolean;
}

const RepairPlanFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { sessionData } = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Repair actions that can be selected by users
  const [repairItems, setRepairItems] = useState<RepairItem[]>([
    { id: 1, text: "Take a 15-minute break before continuing the discussion", selected: false },
    { id: 2, text: "Start conversations with appreciation before bringing up concerns", selected: false },
    { id: 3, text: "Use 'I' statements instead of 'you' accusations", selected: false },
    { id: 4, text: "Check in on feelings regularly during difficult conversations", selected: false },
    { id: 5, text: "Create a signal for when either of us needs a pause", selected: false },
    { id: 6, text: "Schedule regular check-ins to discuss relationship needs", selected: false },
    { id: 7, text: "Validate each other's feelings before problem-solving", selected: false },
    { id: 8, text: "Ask clarifying questions before responding defensively", selected: false },
  ]);
  
  // Custom repair item that user can add
  const [customRepairText, setCustomRepairText] = useState("");
  
  const handleToggleItem = (id: number) => {
    setRepairItems(items => 
      items.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };
  
  const handleAddCustomItem = () => {
    if (customRepairText.trim()) {
      const newId = Math.max(...repairItems.map(i => i.id)) + 1;
      setRepairItems([
        ...repairItems,
        { id: newId, text: customRepairText.trim(), selected: true }
      ]);
      setCustomRepairText("");
      
      toast({
        title: "Custom action added",
        description: "Your repair action has been added to the plan.",
      });
    }
  };
  
  const handleCreatePlan = () => {
    const selectedItems = repairItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      toast({
        title: "No actions selected",
        description: "Please select at least one repair action for your plan.",
      });
      return;
    }
    
    // In a real app, this would save the plan to the user's data
    setCurrentStep(2);
    
    toast({
      title: "Repair plan created",
      description: "Your custom repair plan has been saved.",
    });
  };

  const handleSavePlan = () => {
    // In a real app, this would save the repair plan to a database
    // For now, we'll just navigate to the archive with a success message
    toast({
      title: "Plan saved",
      description: "Your repair plan has been saved to your archive.",
    });
    
    // Redirect to the archive page with the repair-plans tab active
    navigate('/archive', { state: { activeTab: 'repair-plans' } });
  };
  
  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        {currentStep > 1 && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        
        {currentStep === 1 ? (
          <div>
            <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6 text-center">
              Create Your Repair Plan
            </h2>
            
            <p className="text-gray-700 mb-8 text-center">
              Select actions you both commit to trying next time you encounter conflict.
              A good repair plan gives you concrete steps to take when things get tense.
            </p>
            
            <div className="space-y-3 mb-8">
              {repairItems.map(item => (
                <div 
                  key={item.id}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    item.selected 
                      ? 'bg-soft-cream/30 border-mauve-rose' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleToggleItem(item.id)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    item.selected ? 'bg-mauve-rose text-white' : 'border border-gray-300'
                  }`}>
                    {item.selected && <Check className="h-4 w-4" />}
                  </div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add your own repair action:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customRepairText}
                  onChange={(e) => setCustomRepairText(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mauve-rose focus:border-transparent"
                  placeholder="E.g., Take 10 deep breaths before responding"
                />
                <Button 
                  onClick={handleAddCustomItem}
                  disabled={!customRepairText.trim()}
                  className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
                >
                  Add
                </Button>
              </div>
            </div>
            
            <Button
              className="bg-mauve-rose hover:bg-mauve-rose/90 text-white w-full"
              onClick={handleCreatePlan}
            >
              Create My Repair Plan
            </Button>
          </div>
        ) : (
          <div className="animate-fade-in text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-mauve-rose/20 flex items-center justify-center">
                <Heart className="h-8 w-8 text-mauve-rose" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-4">
              Your Repair Plan is Ready
            </h2>
            
            <p className="text-gray-700 mb-8">
              You've selected {repairItems.filter(i => i.selected).length} actions for your repair plan.
              Try to implement these strategies the next time tensions rise.
            </p>
            
            <div className="bg-soft-cream/20 rounded-lg p-6 mb-8">
              <h3 className="font-medium text-mauve-rose mb-4">Your Repair Actions:</h3>
              <ul className="space-y-3 text-left">
                {repairItems
                  .filter(item => item.selected)
                  .map(item => (
                    <li key={item.id} className="flex items-start">
                      <Check className="h-5 w-5 text-mauve-rose mr-2 mt-0.5" />
                      <span className="text-gray-700">{item.text}</span>
                    </li>
                  ))}
              </ul>
            </div>
            
            <div className="text-gray-600 text-sm p-4 border border-gray-200 rounded-lg mb-8">
              <p>
                Remember: Healing after conflict takes practice. Be patient with each other as you try
                these new repair strategies. What matters is that you're both committed to growing together.
              </p>
            </div>
            
            <Button
              className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
              onClick={handleSavePlan}
            >
              Save to Archive
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairPlanFlow;
