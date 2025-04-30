
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import { Clock, Flame, Heart, MessageCircle, Puzzle, Hourglass } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Feature data
const features = [
  {
    id: 'timeout-timer',
    title: 'Time Out Timer',
    description: 'A gentle way to take space without storming off.',
    icon: <Clock className="h-6 w-6 text-lavender-blue" />,
    comingSoon: false,
    alwaysVisible: true, // New property for features that should always be visible
  },
  {
    id: 'mood-check-in',
    title: 'Mood Check-In',
    description: 'Helps you name what you\'re feeling before you say more.',
    icon: <Heart className="h-6 w-6 text-rosewood-tint" />,
    comingSoon: false,
    alwaysVisible: false,
  },
  {
    id: 'pause-phrase',
    title: 'Pause & Phrase Toolkit',
    description: 'Say what you mean—without making things worse.',
    icon: <MessageCircle className="h-6 w-6 text-midnight-indigo" />,
    comingSoon: false,
    alwaysVisible: false,
  },
  {
    id: 'say-instead',
    title: 'Say This Instead',
    description: 'Turn common conflict phrases into calmer alternatives.',
    icon: <MessageCircle className="h-6 w-6 text-soft-cream" />,
    comingSoon: false,
    alwaysVisible: false,
  },
  {
    id: 'build-bridge',
    title: 'Build a Bridge',
    description: 'Get expert help on what to say next.',
    icon: <Puzzle className="h-6 w-6 text-mauve-rose" />,
    comingSoon: true,
    alwaysVisible: false,
  },
];

// Preset timer options in minutes
const timeoutPresets = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 60 },
  { label: '1 hour', value: 60 },
];

const MidFight = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasHapticFired, setHasHapticFired] = useState(false);
  
  // Timer states
  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [customMinutes, setCustomMinutes] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [customTimeUnit, setCustomTimeUnit] = useState<'minutes' | 'hours'>('minutes');

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

  // Timer countdown effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (timerActive && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            // Timer complete
            clearInterval(interval);
            setTimerActive(false);
            // Haptic feedback on timer completion
            if (navigator.vibrate) {
              navigator.vibrate([100, 50, 100, 50, 100]);
            }
            toast("Time's up!", {
              description: "Your timeout period has ended.",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, remainingSeconds]);

  // Start timer with selected minutes
  const startTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setRemainingSeconds(minutes * 60);
    setTimerActive(true);
    toast("Timeout Started", {
      description: "Your partner has been notified.",
    });
  };

  // Format remaining time for display
  const formatTime = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle custom timer input
  const handleCustomTimerStart = () => {
    if (customMinutes && !isNaN(Number(customMinutes))) {
      let mins = Number(customMinutes);
      
      // Convert hours to minutes if the unit is hours
      if (customTimeUnit === 'hours') {
        mins = mins * 60;
      }
      
      // Limit between 1-120 minutes
      mins = Math.min(Math.max(1, mins), 120);
      
      startTimer(mins);
      setCustomMinutes('');
    }
  };

  // Toggle feature display
  const toggleFeature = (featureId: string) => {
    if (selectedFeature === featureId) {
      setSelectedFeature(null);
    } else {
      setSelectedFeature(featureId);
    }
  };

  // Render the timer tool
  const renderTimeoutTimer = () => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/20 mt-6 mb-10">
      <div className="flex flex-col items-center">
        <div className="flex justify-center mb-4">
          <Hourglass className="h-24 w-24 text-lavender-blue" />
        </div>
        
        <h3 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-6">Take a Breather</h3>
        
        {!timerActive ? (
          <>
            <p className="text-midnight-indigo/80 mb-6 text-center max-w-md">
              Select a preset time or enter your own. Your partner will be notified that you need some space.
            </p>
            
            <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-6">
              {timeoutPresets.map((preset) => (
                <Button 
                  key={preset.value}
                  variant="outline"
                  className="border-lavender-blue text-midnight-indigo hover:bg-lavender-blue/10"
                  onClick={() => startTimer(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            
            <div className="w-full max-w-md mb-6">
              <Label className="block text-midnight-indigo mb-2">Set your own time:</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  type="number"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(e.target.value)}
                  placeholder="Enter time"
                  min="1"
                  max="120"
                  className="flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lavender-blue"
                />
                <div className="flex gap-2">
                  <Button 
                    type="button"
                    variant={customTimeUnit === 'minutes' ? 'default' : 'outline'}
                    className={customTimeUnit === 'minutes' 
                      ? "bg-lavender-blue hover:bg-lavender-blue/90 text-white" 
                      : "border-lavender-blue text-midnight-indigo hover:bg-lavender-blue/10"}
                    onClick={() => setCustomTimeUnit('minutes')}
                  >
                    Minutes
                  </Button>
                  <Button 
                    type="button"
                    variant={customTimeUnit === 'hours' ? 'default' : 'outline'}
                    className={customTimeUnit === 'hours' 
                      ? "bg-lavender-blue hover:bg-lavender-blue/90 text-white" 
                      : "border-lavender-blue text-midnight-indigo hover:bg-lavender-blue/10"}
                    onClick={() => setCustomTimeUnit('hours')}
                  >
                    Hours
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full bg-lavender-blue hover:bg-lavender-blue/90 text-white"
                onClick={handleCustomTimerStart}
              >
                Breathe
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-midnight-indigo mb-2">
              Your partner has been notified that you need some time.
            </p>
            <div className="text-4xl font-bold text-lavender-blue my-6">
              {formatTime()}
            </div>
            <Button 
              variant="outline"
              className="border-mauve-rose text-mauve-rose hover:bg-mauve-rose/10"
              onClick={() => setTimerActive(false)}
            >
              Cancel Timer
            </Button>
          </div>
        )}
      </div>
    </div>
  );

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
            
            <div className="space-y-0">
              <p className="text-midnight-indigo/80 text-lg md:text-xl max-w-2xl mx-auto font-normal">
                Take a second to breathe.
              </p>
              <p className="text-midnight-indigo/80 text-lg md:text-xl max-w-2xl mx-auto font-normal">
                You're doing better than you think.
              </p>
            </div>
          </div>
        </section>
        
        {/* Directly show the time out timer */}
        <section className="py-8 bg-soft-blush/30">
          <ContentContainer maxWidth="lg">
            {renderTimeoutTimer()}
          </ContentContainer>
        </section>

        {/* Feature cards (excluding the timeout timer) */}
        <section className="py-8 bg-soft-blush/30">
          <ContentContainer maxWidth="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.filter(feature => feature.id !== 'timeout-timer').map((feature) => (
                <Collapsible 
                  key={feature.id}
                  open={selectedFeature === feature.id} 
                  onOpenChange={() => !feature.comingSoon && toggleFeature(feature.id)}
                >
                  <Card 
                    className={`border border-white shadow-md hover:shadow-lg transition-all duration-300 ${
                      feature.comingSoon ? 'bg-white/70' : 'bg-white'
                    } ${selectedFeature === feature.id ? 'ring-2 ring-lavender-blue' : ''}`}
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
                      <CollapsibleTrigger asChild disabled={feature.comingSoon}>
                        <Button
                          variant={feature.comingSoon ? "outline" : "default"}
                          className={`w-full ${
                            feature.comingSoon
                              ? "border-mauve-rose text-mauve-rose hover:bg-mauve-rose/10"
                              : "bg-lavender-blue hover:bg-lavender-blue/90 text-white"
                          }`}
                          disabled={feature.comingSoon}
                        >
                          {selectedFeature === feature.id ? "Close Tool" : feature.comingSoon ? "Join Waitlist" : "Open Tool"}
                        </Button>
                      </CollapsibleTrigger>
                    </CardContent>
                  </Card>
                  
                  {/* Other tool contents */}
                  <CollapsibleContent className="mt-4 bg-white rounded-lg shadow-md p-6 border border-lavender-blue/20 overflow-hidden animate-accordion-down">
                    {/* Tool content here */}
                    <div className="text-center text-midnight-indigo/80">
                      Tool content for {feature.title} will appear here.
                    </div>
                  </CollapsibleContent>
                </Collapsible>
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
