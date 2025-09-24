
import React from 'react';
import ContentContainer from '../common/ContentContainer';

const PersonalizedConnection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-soft-cream">
      <ContentContainer>
        <div className="text-center mb-12">
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-midnight-indigo mb-4">
            Your Relationship, Understood
          </h2>
          <p className="text-lg text-midnight-indigo/70 max-w-3xl mx-auto">
            Every relationship is unique. Discover personalized insights and tools tailored to your specific relationship dynamics and communication patterns.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-lavender-blue/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="font-cormorant text-2xl font-semibold text-midnight-indigo mb-4">
              Relationship Insights
            </h3>
            <p className="text-midnight-indigo/70 mb-6">
              Understand how you and your partner express and receive love differently, with personalized guidance for deeper connection.
            </p>
            <ul className="space-y-2 text-sm text-midnight-indigo/60">
              <li>• Relationship pattern analysis</li>
              <li>• Partner compatibility insights</li>
              <li>• Communication style guidance</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-mauve-rose/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-cormorant text-2xl font-semibold text-midnight-indigo mb-4">
              Tailored Tools
            </h3>
            <p className="text-midnight-indigo/70 mb-6">
              Get tools and exercises specifically designed for your relationship patterns and growth areas.
            </p>
            <ul className="space-y-2 text-sm text-midnight-indigo/60">
              <li>• Custom conversation starters</li>
              <li>• Conflict resolution strategies</li>
              <li>• Growth-focused activities</li>
            </ul>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default PersonalizedConnection;
