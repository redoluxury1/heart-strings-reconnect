
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface PrivateReflectionFormProps {
  onClose: () => void;
}

const PrivateReflectionForm: React.FC<PrivateReflectionFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast({
        title: "Please fill in both fields",
        description: "Both title and reflection are required.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would save to the user's private journal
    const savedReflections = JSON.parse(localStorage.getItem('private-reflections') || '[]');
    savedReflections.push({
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('private-reflections', JSON.stringify(savedReflections));
    
    toast({
      title: "Reflection saved",
      description: "Your private reflection has been saved successfully."
    });
    
    onClose();
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl text-[#5d4357] font-medium mb-4 text-center">
        Private Reflection
      </h3>
      
      <p className="text-[#5d4357]/80 mb-6 text-center italic">
        This is for your eyes only. Use this space to process your thoughts.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-[#5d4357]">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What I'm feeling right now..."
            className="border-[#5d4357]/20 focus-visible:ring-[#5d4357]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reflection" className="text-[#5d4357]">Reflection</Label>
          <Textarea
            id="reflection"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your private thoughts here..."
            rows={6}
            className="border-[#5d4357]/20 focus-visible:ring-[#5d4357]"
          />
        </div>
        
        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="ghost"
            className="text-[#5d4357] hover:bg-[#5d4357]/10"
            onClick={onClose}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            className="bg-[#5d4357] text-white hover:bg-[#5d4357]/90"
          >
            Save Reflection
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PrivateReflectionForm;
