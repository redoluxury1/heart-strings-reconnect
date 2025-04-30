
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import { Clock, Flame, Heart, MessageCircle, Puzzle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Feature data
const features = [
  {
    id: 'timeout-timer',
    title: 'Time Out Timer',
    description: 'A gentle way to take space without storming off.',
    icon: <Clock className="h-6 w-6 text-lavender-blue" />,
    comingSoon: false,
  },
  {
    id: 'mood-check-in',
    title: 'Mood Check-In',
    description: 'Helps you name what you\'re feeling before you say more.',
    icon: <Heart className="h-6 w-6 text-rosewood-tint" />,
    comingSoon: false,
  },
  {
    id: 'pause-phrase',
    title: 'Pause & Phrase Toolkit',
    description: 'Say what you mean—without making things worse.',
    icon: <MessageCircle className="h-6 w-6 text-midnight-indigo" />,
    comingSoon: false,
  },
  {
    id: 'say-instead',
    title: 'Say This Instead',
    description: 'Turn common conflict phrases into calmer alternatives.',
    icon: <MessageCircle className="h-6 w-6 text-soft-cream" />,
    comingSoon: false,
  },
  {
    id: 'build-bridge',
    title: 'Build a Bridge',
    description: 'Get expert help on what to say next.',
    icon: <Puzzle className="h-6 w-6 text-mauve-rose" />,
    comingSoon: true,
  },
];

const MidFight = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasHapticFired, setHasHapticFired] = useState(false);

  // Handle visibility and haptic feedback
  useEffect(() => {
    // Set visible with a small delay for fade-in effect
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Fire haptic feedback when visible (if supported)
      if (!hasHapticFired && navigator.vibrate) {
        navigator.vibrate(100); // Subtle 100ms vibration
        setHasHapticFired(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [hasHapticFired]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pb-16">
        {/* Emotional Header Block */}
        <section 
          className={`px-4 sm:px-6 md:px-8 py-16 bg-mauve-rose/30 rounded-md transition-opacity duration-700 ease-in-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Emotional message that reads: 'This moment isn't about being right. It's about not losing each other. Take a second to breathe. You're doing better than you think.'"
        >
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="flex justify-center mb-6">
              <Flame className={`h-16 w-16 text-mauve-rose ${isVisible ? 'animate-pulse' : ''}`} />
            </div>
            
            <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-medium text-midnight-indigo mb-6">
              This moment isn't about being right.<br />
              It's about not losing each other.
            </h1>
            
            <p className="text-midnight-indigo/80 text-lg md:text-xl max-w-2xl mx-auto font-normal mb-4">
              Take a second to breathe.
            </p>
            <p className="text-midnight-indigo/80 text-lg md:text-xl max-w-2xl mx-auto font-normal">
              You're doing better than you think.
            </p>
          </div>
        </section>
        
        {/* Page description */}
        <section className="py-10 bg-white">
          <ContentContainer maxWidth="lg">
            <div className="text-center">
              <p className="text-midnight-indigo/90 text-lg md:text-xl max-w-3xl mx-auto">
                This page provides a supportive space for emotionally charged moments. It includes tools designed to help you pause, regulate, and communicate with clarity.
              </p>
            </div>
          </ContentContainer>
        </section>
        
        {/* Feature cards */}
        <section className="py-12 bg-soft-blush/30">
          <ContentContainer maxWidth="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <Card 
                  key={feature.id} 
                  className={`border border-white shadow-md hover:shadow-lg transition-all duration-300 ${
                    feature.comingSoon ? 'bg-white/70' : 'bg-white'
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-soft-blush">
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-cormorant font-medium text-midnight-indigo">
                          {feature.title}
                          {feature.comingSoon && (
                            <span className="text-sm font-inter ml-2 text-mauve-rose/80">
                              (Coming Soon)
                            </span>
                          )}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-midnight-indigo/80 mb-5">
                      {feature.description}
                    </CardDescription>
                    <Button
                      variant={feature.comingSoon ? "outline" : "default"}
                      className={`w-full ${
                        feature.comingSoon
                          ? "border-mauve-rose text-mauve-rose hover:bg-mauve-rose/10"
                          : "bg-lavender-blue hover:bg-lavender-blue/90 text-white"
                      }`}
                      onClick={() => setSelectedFeature(feature.id)}
                      disabled={feature.comingSoon}
                    >
                      {feature.comingSoon ? "Join Waitlist" : "Open Tool"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ContentContainer>
        </section>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default MidFight;
