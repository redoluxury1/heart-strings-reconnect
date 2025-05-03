
import React from 'react';
import { Check } from 'lucide-react';
import { RepairItem } from './types';

interface RepairActionItemProps {
  item: RepairItem;
  onToggle: (id: number) => void;
}

const RepairActionItem: React.FC<RepairActionItemProps> = ({ item, onToggle }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle(item.id);
  };

  return (
    <div 
      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
        item.selected 
          ? 'bg-soft-cream/30 border-mauve-rose' 
          : 'border-gray-200 hover:bg-gray-50'
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={item.selected}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
        item.selected ? 'bg-mauve-rose text-white' : 'border border-gray-300'
      }`}>
        {item.selected && <Check className="h-4 w-4" />}
      </div>
      <p className="text-gray-700">{item.text}</p>
    </div>
  );
};

export default RepairActionItem;
