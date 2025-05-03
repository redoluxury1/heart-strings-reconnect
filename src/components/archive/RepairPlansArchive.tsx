
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Heart, Star, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RepairPlan } from '@/types/archive';
import { format } from 'date-fns';
import { reconnectionTips } from '@/data/reconnection-tips';

// Sample data - in a real app, this would come from storage/database
const sampleRepairPlans: RepairPlan[] = [
  {
    id: '1',
    actions: [
      { id: 1, text: reconnectionTips[0].text },
      { id: 2, text: reconnectionTips[4].text },
      { id: 3, text: reconnectionTips[7].text },
      { id: 4, text: reconnectionTips[22].text }
    ],
    dateCreated: new Date(Date.now() - 86400000 * 2), // 2 days ago
    isFavorite: true
  },
  {
    id: '2',
    actions: [
      { id: 1, text: reconnectionTips[1].text },
      { id: 3, text: reconnectionTips[5].text },
      { id: 5, text: reconnectionTips[23].text }
    ],
    dateCreated: new Date(Date.now() - 86400000 * 10), // 10 days ago
    isFavorite: false
  }
];

interface RepairPlanProps {
  repairPlan: RepairPlan;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const RepairPlanCard: React.FC<RepairPlanProps> = ({ repairPlan, onDelete, onToggleFavorite }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-midnight-indigo">Repair Plan</h3>
            <p className="text-sm text-gray-500">
              {format(repairPlan.dateCreated, 'MMM dd, yyyy')}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onToggleFavorite(repairPlan.id)}
              className={repairPlan.isFavorite ? 'text-mauve-rose' : 'text-gray-400'}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(repairPlan.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Our Repair Actions:</h4>
          <ul className="space-y-2">
            {repairPlan.actions.map((action) => (
              <li key={action.id} className="flex items-start text-sm">
                <Check className="h-4 w-4 text-mauve-rose mr-2 mt-0.5 shrink-0" />
                <span className="text-gray-700">{action.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const RepairPlansArchive: React.FC = () => {
  const [repairPlans, setRepairPlans] = useState<RepairPlan[]>(sampleRepairPlans);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { toast } = useToast();
  
  const handleToggleFavorite = (id: string) => {
    setRepairPlans(repairPlans.map(plan => 
      plan.id === id 
        ? { ...plan, isFavorite: !plan.isFavorite } 
        : plan
    ));
    
    toast({
      title: "Updated",
      description: "Repair plan favorite status updated",
    });
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this repair plan?')) {
      setRepairPlans(repairPlans.filter(plan => plan.id !== id));
      
      toast({
        title: "Deleted",
        description: "Repair plan has been removed",
      });
    }
  };
  
  const filteredPlans = showFavoritesOnly
    ? repairPlans.filter(plan => plan.isFavorite)
    : repairPlans;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-cormorant font-medium text-midnight-indigo">Your Repair Plans</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={showFavoritesOnly ? "bg-mauve-rose/10 border-mauve-rose text-mauve-rose" : ""}
          >
            <Star className={`h-4 w-4 mr-1 ${showFavoritesOnly ? "text-mauve-rose" : "text-gray-500"}`} />
            {showFavoritesOnly ? "All Plans" : "Favorites"}
          </Button>
        </div>
      </div>
      
      {filteredPlans.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No repair plans yet</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            After conflicts, create repair plans to help reconnect and prevent similar issues in the future.
          </p>
          <Button 
            onClick={() => {
              window.location.href = '/post-conflict';
            }}
            className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
          >
            Create a Repair Plan
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlans.map(plan => (
            <RepairPlanCard 
              key={plan.id}
              repairPlan={plan}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RepairPlansArchive;
