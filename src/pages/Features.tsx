import React, { useState } from 'react';
import { usePageAnalytics } from '@/hooks/useAnalytics';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import { Heart, Pause, MessageSquare, RefreshCw, Archive, Brain, Gamepad2, Clock, Shield, Target } from 'lucide-react';

const Features = () => {
  console.log('Features component is rendering successfully');
  usePageAnalytics('features_page');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'during-conflict',
      title: 'During Conflict (Mid-Fight)',
      icon: <Pause className="h-12 w-12 text-white" />,
      gradient: 'bg-gradient-to-br from-slate-400 to-slate-500',
      description: 'Tools to help you navigate heated moments and pause destructive patterns.',
      when: 'Use when emotions are high, voices are raised, or you feel triggered',
      how: 'Activate tools immediately when you notice escalation beginning',
      why: 'Prevents damage to your relationship and creates space for productive resolution',
      features: [
        {
          icon: <Clock className="h-6 w-6" />,
          title: "Code Word / Time Out Timer",
          description: "Take a strategic pause when emotions are running high. Set a timer to reconnect when both partners are ready.",
          benefits: ["Prevents escalation", "Gives time to cool down", "Creates structured reconnection"]
        },
        {
          icon: <MessageSquare className="h-6 w-6" />,
          title: "Let's Try That Again",
          description: "Reframe difficult conversations with guided prompts that help you communicate needs instead of complaints.",
          benefits: ["Reduces defensive responses", "Provides emotional structure", "Teaches effective communication"]
        },
        {
          icon: <Brain className="h-6 w-6" />,
          title: "What's Really Going On?",
          description: "Identify the deeper emotions and needs behind the surface argument through guided self-reflection.",
          benefits: ["Uncovers root causes", "Builds emotional awareness", "Prevents recurring conflicts"]
        }
      ]
    },
    {
      id: 'post-conflict',
      title: 'After Conflict (Post-Fight)',
      icon: <Heart className="h-12 w-12 text-white" />,
      gradient: 'bg-gradient-to-br from-orange-200 to-orange-300',
      description: 'Repair tools to heal, reconnect, and grow stronger after difficult moments.',
      when: 'Use after arguments to repair and rebuild connection',
      how: 'Start with accountability, move to understanding, then reconnection',
      why: 'Transforms conflicts into opportunities for deeper intimacy and trust',
      features: [
        {
          icon: <Shield className="h-6 w-6" />,
          title: "White Flag Tool",
          description: "Facilitate genuine apologies and forgiveness with structured repair prompts that rebuild trust.",
          benefits: ["Creates safe vulnerability", "Facilitates genuine repair", "Strengthens bond after conflict"]
        },
        {
          icon: <Heart className="h-6 w-6" />,
          title: "Color Healing",
          description: "Process complex emotions through creative and reflective exercises designed for emotional regulation.",
          benefits: ["Processes emotions safely", "Reduces lingering resentment", "Promotes emotional wellness"]
        }
      ]
    },
    {
      id: 'reconnecting',
      title: 'Reconnecting',
      icon: <RefreshCw className="h-12 w-12 text-white" />,
      gradient: 'bg-gradient-to-br from-[#572f5a] to-[#6b3867]',
      description: 'Rebuild intimacy and closeness when you feel distant or disconnected.',
      when: 'Use when feeling emotionally or physically distant from your partner',
      how: 'Start small with daily connection, build to deeper intimacy exercises',
      why: 'Prevents relationship drift and maintains strong emotional and physical bonds',
      features: [
        {
          icon: <Target className="h-6 w-6" />,
          title: "Reconnection Strategies",
          description: "Guided exercises and conversation starters to rediscover each other and rebuild your emotional bond.",
          benefits: ["Reignites connection", "Provides practical steps", "Addresses all types of intimacy"]
        },
        {
          icon: <Heart className="h-6 w-6" />,
          title: "Love Notes",
          description: "Send thoughtful messages throughout the day to maintain connection during busy periods.",
          benefits: ["Maintains daily connection", "Creates positive interactions", "Builds foundation of goodwill"]
        }
      ]
    },
    {
      id: 'reflection',
      title: 'Reflection & Growth',
      icon: <Archive className="h-12 w-12 text-white" />,
      gradient: 'bg-gradient-to-br from-stone-300 to-green-200',
      description: 'Track progress, understand patterns, and grow together over time.',
      when: 'Use regularly to review progress and during calm moments for insight',
      how: 'Set aside time weekly or monthly to review and reflect together',
      why: 'Continuous growth prevents stagnation and celebrates your journey together',
      features: [
        {
          icon: <Archive className="h-6 w-6" />,
          title: "Reflection Archive",
          description: "Track your relationship progress and patterns over time in a private, secure space.",
          benefits: ["See your growth", "Identify patterns", "Celebrate progress"]
        },
        {
          icon: <Brain className="h-6 w-6" />,
          title: "Communication Analysis",
          description: "Understand your communication patterns and get personalized suggestions for improvement.",
          benefits: ["Reveals blind spots", "Provides improvement suggestions", "Tracks growth over time"]
        },
        {
          icon: <Gamepad2 className="h-6 w-6" />,
          title: "Relationship Games",
          description: "Fun activities and conversation starters to deepen your connection and understanding.",
          benefits: ["Understand love languages", "Reduces misunderstandings", "Creates deeper intimacy"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1 py-12">
        <ContentContainer>
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-midnight-indigo mb-6">
              Your Relationship Journey
            </h1>
            <p className="text-xl text-midnight-indigo/80 max-w-3xl mx-auto leading-relaxed">
              Discover the four essential stages of relationship growth and the tools to navigate each one successfully.
            </p>
          </div>

          {/* Section Cards */}
          <div className="grid gap-8 mb-16">
            {sections.map((section, index) => (
              <div 
                key={section.id} 
                className={`relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl hover-scale ${
                  activeSection === section.id ? 'scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header with gradient background */}
                <div className={`${section.gradient} p-8 ${section.id === 'reconnecting' ? 'text-white' : 'text-gray-800'} relative`}>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-cormorant font-bold mb-2">
                        {section.title}
                      </h2>
                      <p className={`text-lg ${section.id === 'reconnecting' ? 'text-white/90' : 'text-gray-700'}`}>
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* When, How, Why */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className={`font-semibold mb-2 ${section.id === 'reconnecting' ? 'text-white/90' : 'text-gray-800'}`}>When to use</h4>
                      <p className={`text-sm ${section.id === 'reconnecting' ? 'text-white/80' : 'text-gray-700'}`}>{section.when}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className={`font-semibold mb-2 ${section.id === 'reconnecting' ? 'text-white/90' : 'text-gray-800'}`}>How it works</h4>
                      <p className={`text-sm ${section.id === 'reconnecting' ? 'text-white/80' : 'text-gray-700'}`}>{section.how}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className={`font-semibold mb-2 ${section.id === 'reconnecting' ? 'text-white/90' : 'text-gray-800'}`}>Why it helps</h4>
                      <p className={`text-sm ${section.id === 'reconnecting' ? 'text-white/80' : 'text-gray-700'}`}>{section.why}</p>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="bg-white p-8">
                  <h3 className="text-2xl font-cormorant font-semibold text-midnight-indigo mb-6">
                    Available Tools
                  </h3>
                  <div className="grid gap-6">
                    {section.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-shrink-0 p-2 text-primary">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-midnight-indigo mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-midnight-indigo/80 mb-3 leading-relaxed">
                            {feature.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {feature.benefits.map((benefit, benefitIdx) => (
                              <span 
                                key={benefitIdx}
                                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Relationship Journey Flow */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 mb-16">
            <h2 className="text-3xl font-cormorant font-semibold text-midnight-indigo mb-8 text-center">
              Your Relationship Growth Journey
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {sections.map((section, index) => (
                <div key={section.id} className="text-center relative">
                  <div className={`${section.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <div className="scale-75">
                      {section.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-midnight-indigo mb-2">
                    {section.title.split('(')[0].trim()}
                  </h3>
                  <p className="text-sm text-midnight-indigo/70">
                    {section.description}
                  </p>
                  {index < sections.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl border border-primary/20">
            <h2 className="text-3xl font-cormorant font-semibold text-midnight-indigo mb-4">
              Ready to strengthen your relationship?
            </h2>
            <p className="text-xl text-midnight-indigo/80 mb-6 max-w-2xl mx-auto">
              Join thousands of couples who are building stronger, more connected relationships with Bridge.
            </p>
            <a 
              href="/auth?tab=signup" 
              className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover-scale"
            >
              Get Started Now
            </a>
          </div>
        </ContentContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;