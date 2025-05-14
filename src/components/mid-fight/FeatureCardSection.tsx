
import React from 'react';
import { MessageCircle, ArrowLeftRight, Heart } from 'lucide-react';
import SayThisInsteadTool from './SayThisInsteadTool';
import WhatsReallyGoingOn from './WhatsReallyGoingOn';
import BuildBridgeCard from './build-bridge/BuildBridgeCard';
import ColorHealingMethod from '@/components/post-conflict/color-healing/ColorHealingMethod';

const FeatureCardSection: React.FC = () => {
  return (
    <div className="py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Say This Instead Tool (always visible) */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-16">
            <div className="flex flex-col items-center mb-5">
              <MessageCircle className="h-16 md:h-20 w-16 md:w-20 text-[#C7747F] mb-3" />
              <h3 className="text-2xl font-cormorant font-medium text-[#22254a] mb-2 text-center">
                Say This Instead
              </h3>
              <p className="text-[#22254a]/80 mb-4 text-center max-w-2xl">
                Turn common conflict phrases into calmer alternatives that keep the conversation productive.
              </p>
            </div>
            <SayThisInsteadTool />
          </div>
          
          {/* What's Going On Tool (always visible) */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-16">
            <div className="flex flex-col items-center mb-5">
              <ArrowLeftRight className="h-16 md:h-20 w-16 md:w-20 text-[#536878] mb-3" />
              <h3 className="text-2xl font-cormorant font-medium text-[#22254a] mb-2 text-center">
                What's Really Going On
              </h3>
              <p className="text-[#22254a]/80 mb-4 text-center max-w-2xl">
                Decode what your partner's behavior means
              </p>
            </div>
            <WhatsReallyGoingOn />
          </div>
          
          {/* Color Healing Method */}
          <div className="mt-16">
            <div className="max-w-3xl mx-auto">
              <ColorHealingMethod />
            </div>
          </div>
          
          {/* Build Bridge Card - Simple Version */}
          <div className="bg-[#F7ECD9] rounded-2xl p-6 md:p-8 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-midnight-indigo mb-4">
              Build a Bridge
            </h2>
            
            <div className="text-midnight-indigo text-sm italic mb-6">
              Coming Soon
            </div>
            
            <p className="text-midnight-indigo text-base md:text-lg max-w-md mx-auto mb-8">
              Sometimes we just need a third party to help us navigate something hard.
              We are building our team of experts to bring this feature to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCardSection;
