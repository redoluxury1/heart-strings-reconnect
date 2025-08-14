import React from 'react';
import { usePageAnalytics } from '@/hooks/useAnalytics';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import { Heart, Pause, MessageSquare, RefreshCw, Archive, Brain, Gamepad2, FileText } from 'lucide-react';

const Features = () => {
  usePageAnalytics('features_page');

  const features = [
    {
      icon: <Pause className="h-8 w-8 text-primary" />,
      title: "Code Word / Time Out Timer",
      category: "During Conflict",
      description: "Take a strategic pause when emotions are running high.",
      benefits: [
        "Prevents escalation during heated moments",
        "Gives both partners time to cool down and reflect",
        "Creates a structured way to resume conversation",
        "Builds healthy conflict resolution habits"
      ],
      howItWorks: "Simply activate the code word or timer when you need space. Both partners get notified, and you can set a specific time to reconnect when you're both ready."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Let's Try That Again",
      category: "During Conflict",
      description: "Reframe difficult conversations with guided prompts.",
      benefits: [
        "Helps you communicate needs instead of complaints",
        "Reduces defensive responses from your partner",
        "Provides structure when emotions are overwhelming",
        "Teaches effective communication patterns"
      ],
      howItWorks: "When a conversation isn't going well, use our prompts to restart with more clarity and compassion. Practice 'I feel' statements and focus on solutions."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "What's Really Going On?",
      category: "During Conflict",
      description: "Identify the deeper emotions and needs behind the surface argument.",
      benefits: [
        "Uncovers root causes instead of surface symptoms",
        "Builds emotional awareness and intelligence",
        "Helps partners understand each other's perspectives",
        "Prevents the same fights from recurring"
      ],
      howItWorks: "Answer guided questions that help you explore what's really bothering you and what you actually need from your partner."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "White Flag Tool",
      category: "Post-Conflict",
      description: "Repair and reconnect after difficult moments.",
      benefits: [
        "Facilitates genuine apologies and forgiveness",
        "Helps you take accountability for your part",
        "Creates a safe space for vulnerability",
        "Strengthens your bond after conflict"
      ],
      howItWorks: "Use structured prompts to craft meaningful repair messages, acknowledge hurt feelings, and rebuild trust together."
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-primary" />,
      title: "Color Healing",
      category: "Post-Conflict",
      description: "Process emotions and restore emotional balance.",
      benefits: [
        "Helps you process complex emotions safely",
        "Provides a creative outlet for healing",
        "Reduces lingering resentment and hurt",
        "Promotes emotional regulation and wellness"
      ],
      howItWorks: "Engage with colors and reflective exercises designed to help you move through difficult emotions and find peace."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Reconnection Strategies",
      category: "Reconnecting",
      description: "Rebuild intimacy and closeness when you feel distant.",
      benefits: [
        "Reignites emotional and physical connection",
        "Provides practical steps for getting closer",
        "Addresses different types of intimacy",
        "Helps couples recover from difficult periods"
      ],
      howItWorks: "Follow guided exercises and conversation starters designed to help you rediscover each other and rebuild your bond."
    },
    {
      icon: <Archive className="h-8 w-8 text-primary" />,
      title: "Reflection Archive",
      category: "Growth & Learning",
      description: "Track your relationship progress and patterns over time.",
      benefits: [
        "See how far you've come as a couple",
        "Identify patterns in your conflicts and growth",
        "Celebrate your wins and progress",
        "Learn from past experiences"
      ],
      howItWorks: "All your conversations, exercises, and progress are saved in a private archive that only you and your partner can access."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Love Notes",
      category: "Connection",
      description: "Send thoughtful messages to strengthen your daily connection.",
      benefits: [
        "Maintains connection during busy periods",
        "Creates positive daily interactions",
        "Shows appreciation and gratitude",
        "Builds a foundation of goodwill"
      ],
      howItWorks: "Send personalized love notes to your partner throughout the day. Choose from templates or write your own heartfelt messages."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Communication Analysis",
      category: "Growth & Learning",
      description: "Understand your communication patterns and improve them.",
      benefits: [
        "Reveals blind spots in how you communicate",
        "Provides personalized improvement suggestions",
        "Tracks communication growth over time",
        "Helps prevent miscommunication"
      ],
      howItWorks: "Get insights into your communication style, identify areas for improvement, and receive tailored exercises to enhance your connection."
    },
    {
      icon: <Gamepad2 className="h-8 w-8 text-primary" />,
      title: "Love Code Quiz",
      category: "Understanding",
      description: "Discover your and your partner's unique relationship languages.",
      benefits: [
        "Understand how you both express and receive love",
        "Reduces misunderstandings about intentions",
        "Helps you show love in ways your partner values",
        "Creates deeper emotional intimacy"
      ],
      howItWorks: "Take comprehensive quizzes to understand each other's love languages, attachment styles, and relationship preferences."
    }
  ];

  const categories = [
    "During Conflict",
    "Post-Conflict", 
    "Reconnecting",
    "Growth & Learning",
    "Connection",
    "Understanding"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1 py-12">
        <ContentContainer>
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-midnight-indigo mb-6">
              Bridge Features Guide
            </h1>
            <p className="text-xl text-midnight-indigo/80 max-w-3xl mx-auto leading-relaxed">
              Discover how each feature can help strengthen your relationship, improve communication, 
              and navigate challenges together.
            </p>
          </div>

          {/* Features by Category */}
          {categories.map((category) => {
            const categoryFeatures = features.filter(feature => feature.category === category);
            if (categoryFeatures.length === 0) return null;

            return (
              <div key={category} className="mb-16">
                <h2 className="text-3xl font-cormorant font-semibold text-midnight-indigo mb-8 text-center">
                  {category}
                </h2>
                
                <div className="grid gap-8 md:gap-12">
                  {categoryFeatures.map((feature, index) => (
                    <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          {feature.icon}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-2xl font-cormorant font-semibold text-midnight-indigo mb-3">
                            {feature.title}
                          </h3>
                          
                          <p className="text-midnight-indigo/80 text-lg mb-6 leading-relaxed">
                            {feature.description}
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-lg font-semibold text-midnight-indigo mb-3">
                                Why it helps:
                              </h4>
                              <ul className="space-y-2">
                                {feature.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-midnight-indigo/80">
                                    <Heart className="h-4 w-4 text-primary mt-1 flex-shrink-0" fill="currentColor" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-semibold text-midnight-indigo mb-3">
                                How it works:
                              </h4>
                              <p className="text-midnight-indigo/80 leading-relaxed">
                                {feature.howItWorks}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10">
            <h2 className="text-3xl font-cormorant font-semibold text-midnight-indigo mb-4">
              Ready to strengthen your relationship?
            </h2>
            <p className="text-xl text-midnight-indigo/80 mb-6 max-w-2xl mx-auto">
              Join thousands of couples who are building stronger, more connected relationships with Bridge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/intro" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Start Your Journey
              </a>
              <a 
                href="/signup-choice" 
                className="border border-primary text-primary hover:bg-primary/5 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Create Account
              </a>
            </div>
          </div>
        </ContentContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;