import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DownloadScreenshot from '@/components/settings/DownloadScreenshot';
import ScreenshotTemplates from '@/components/settings/ScreenshotTemplates';
import { SubscriptionService } from '@/services/subscriptionService';
import { Home, Zap, BookOpen, Archive, UserPlus, Crown, Settings } from 'lucide-react';

const ScreenshotStudio: React.FC = () => {
  useEffect(() => {
    // Only enable debug mode in development environment
    if (process.env.NODE_ENV === 'development') {
      SubscriptionService.enableDebugMode();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Screenshot Studio</h1>
        <p className="text-muted-foreground text-center mb-8">
          Generate App Store screenshots without authentication
        </p>
        
        <div className="space-y-8">
          {/* Navigation for Screenshots */}
          <Card>
            <CardHeader>
              <CardTitle>Navigate App for Screenshots</CardTitle>
              <p className="text-sm text-muted-foreground">
                Click these buttons to navigate to different screens for manual screenshots
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link to="/">
                    <Home className="h-5 w-5" />
                    <span className="text-xs">Home Screen</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link to="/during-conflict">
                    <Zap className="h-5 w-5" />
                    <span className="text-xs">During Conflict</span>
                  </Link>
                </Button>
                
                
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link to="/archive">
                    <Archive className="h-5 w-5" />
                    <span className="text-xs">Saved Archive</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link to="/invite">
                    <UserPlus className="h-5 w-5" />
                    <span className="text-xs">Partner Connect</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link to="/signup-choice">
                    <Crown className="h-5 w-5" />
                    <span className="text-xs">Premium Paywall</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link to="/games">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-xs">Games</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Link to="/settings">
                    <Settings className="h-5 w-5" />
                    <span className="text-xs">Settings</span>
                  </Link>
                </Button>
              </div>
              
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Tip:</strong> Open in a new tab, resize your browser to mobile size, and take screenshots manually.
                </p>
              </div>
            </CardContent>
          </Card>

          <DownloadScreenshot />
          <ScreenshotTemplates />
        </div>
      </div>
    </div>
  );
};

export default ScreenshotStudio;