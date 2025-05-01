
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, Target } from 'lucide-react';
import { InterfaceStyle } from '../../pages/Onboarding';

interface OnboardingStyleSelectorProps {
  interfaceStyle: InterfaceStyle;
  setInterfaceStyle: (style: InterfaceStyle) => void;
  onContinue: () => void;
}

const OnboardingStyleSelector: React.FC<OnboardingStyleSelectorProps> = ({
  interfaceStyle,
  setInterfaceStyle,
  onContinue,
}) => {
  const isEmotional = interfaceStyle === 'emotionally-reflective';
  
  return (
    <div>
      <h1 className={`font-cormorant text-3xl md:text-4xl font-medium text-center mb-4 ${
        isEmotional ? 'text-midnight-indigo' : 'text-white'
      }`}>
        Choose the vibe that fits you best
      </h1>
      
      <p className={`text-center mb-10 ${isEmotional ? 'text-midnight-indigo/70' : 'text-gray-300'}`}>
        You can switch anytime if your style changes.
      </p>
      
      <RadioGroup 
        value={interfaceStyle}
        onValueChange={(value) => setInterfaceStyle(value as InterfaceStyle)}
        className="gap-6"
      >
        <label className={`flex cursor-pointer rounded-xl overflow-hidden ${
          isEmotional 
            ? 'border-2 border-mauve-rose bg-soft-cream/30' 
            : 'border-2 border-emerald-700 bg-slate-800'
        } ${interfaceStyle === 'emotionally-reflective' ? 'ring-2 ring-mauve-rose' : ''}`}>
          <div className="p-6">
            <RadioGroupItem 
              value="emotionally-reflective" 
              id="emotionally-reflective"
              className={isEmotional ? 'text-mauve-rose border-mauve-rose' : 'text-emerald-500 border-emerald-500'}
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-4 mb-3">
              <Heart className={`${isEmotional ? 'text-mauve-rose' : 'text-white'}`} />
              <h3 className={`font-medium text-lg ${isEmotional ? 'text-midnight-indigo' : 'text-white'}`}>
                Calm + Emotionally Reflective
              </h3>
            </div>
            <p className={isEmotional ? 'text-midnight-indigo/80' : 'text-gray-300'}>
              "I want support processing emotions, understanding what I feel, and expressing it clearly."
            </p>
          </div>
        </label>
        
        <label className={`flex cursor-pointer rounded-xl overflow-hidden ${
          isEmotional 
            ? 'border-2 border-midnight-indigo bg-soft-cream/30' 
            : 'border-2 border-emerald-600 bg-slate-800'
        } ${interfaceStyle === 'solution-focused' ? 'ring-2 ring-emerald-500' : ''}`}>
          <div className="p-6">
            <RadioGroupItem 
              value="solution-focused" 
              id="solution-focused" 
              className={isEmotional ? 'text-midnight-indigo border-midnight-indigo' : 'text-emerald-500 border-emerald-500'}
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-4 mb-3">
              <Target className={`${isEmotional ? 'text-midnight-indigo' : 'text-white'}`} />
              <h3 className={`font-medium text-lg ${isEmotional ? 'text-midnight-indigo' : 'text-white'}`}>
                Clear + Solution-Focused
              </h3>
            </div>
            <p className={isEmotional ? 'text-midnight-indigo/80' : 'text-gray-300'}>
              "I want help getting to the point, avoiding blowups, and staying calm during conflict."
            </p>
          </div>
        </label>
      </RadioGroup>
      
      <div className="flex justify-center mt-10">
        <Button
          onClick={onContinue}
          className={`px-8 py-2 rounded-full ${
            isEmotional 
              ? 'bg-mauve-rose hover:bg-mauve-rose/90 text-white' 
              : 'bg-emerald-700 hover:bg-emerald-600 text-white'
          }`}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStyleSelector;
