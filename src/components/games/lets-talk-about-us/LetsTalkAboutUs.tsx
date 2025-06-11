
import React, { useState } from 'react';
import { TalkAboutUsCategory, talkAboutUsCategories } from '@/data/lets-talk-about-us';
import CategoryCard from './CategoryCard';
import QuestionFlow from './QuestionFlow';
import { useAuth } from '@/contexts/AuthContext';
import PartnerPresenceIndicator from '@/components/partner/PartnerPresenceIndicator';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';

const LetsTalkAboutUs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TalkAboutUsCategory | null>(null);
  const { relationship } = useAuth();
  
  const handleCategorySelect = (categoryId: string) => {
    const category = talkAboutUsCategories.find(cat => cat.id === categoryId);
    if (category) {
      setSelectedCategory(category);
    }
  };
  
  const handleBack = () => {
    setSelectedCategory(null);
  };
  
  if (selectedCategory) {
    return (
      <QuestionFlow 
        category={selectedCategory} 
        onBack={handleBack}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Partner Status Card */}
      {relationship?.status === 'connected' && (
        <Card className="p-4 bg-soft-cream/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-terracotta" />
              <span className="font-medium text-midnight-indigo">Partner Connected</span>
            </div>
            <PartnerPresenceIndicator showText />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Your responses will be shared with your partner when you're both ready to connect.
          </p>
        </Card>
      )}
      
      {/* Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {talkAboutUsCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSelect={handleCategorySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default LetsTalkAboutUs;
