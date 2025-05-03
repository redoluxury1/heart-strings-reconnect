
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import { RepairItem } from './types';
import CreatePlanStep from './CreatePlanStep';
import PlanCreatedStep from './PlanCreatedStep';
import { reconnectionTips } from '@/data/reconnection-tips';

const RepairPlanFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { sessionData } = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize repair actions from reconnection tips
  const initialRepairItems = reconnectionTips
    .slice(0, 8)
    .map(tip => ({
      id: tip.id,
      text: tip.text,
      selected: false
    }));
  
  const [repairItems, setRepairItems] = useState<RepairItem[]>(initialRepairItems);
  
  const handleToggleItem = (id: number) => {
    setRepairItems(items => 
      items.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };
  
  const handleAddCustomItem = (text: string) => {
    const newId = Math.max(...repairItems.map(i => i.id)) + 1;
    setRepairItems([
      ...repairItems,
      { id: newId, text, selected: true }
    ]);
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
    
    setCurrentStep(2);
    
    toast({
      title: "Repair plan created",
      description: "Your custom repair plan has been saved.",
    });
  };

  const handleSavePlan = () => {
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

  const selectedItems = repairItems.filter(item => item.selected);

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
          <CreatePlanStep 
            repairItems={repairItems}
            onToggleItem={handleToggleItem}
            onCreatePlan={handleCreatePlan}
            onAddCustomItem={handleAddCustomItem}
          />
        ) : (
          <PlanCreatedStep 
            selectedItems={selectedItems}
            onSavePlan={handleSavePlan}
          />
        )}
      </div>
    </div>
  );
};

export default RepairPlanFlow;
