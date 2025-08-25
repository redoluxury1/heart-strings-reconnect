import React from 'react';
import DownloadScreenshot from '@/components/settings/DownloadScreenshot';
import ScreenshotTemplates from '@/components/settings/ScreenshotTemplates';

const ScreenshotStudio: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Screenshot Studio</h1>
        <p className="text-muted-foreground text-center mb-8">
          Generate App Store screenshots without authentication
        </p>
        
        <div className="space-y-8">
          <DownloadScreenshot />
          <ScreenshotTemplates />
        </div>
      </div>
    </div>
  );
};

export default ScreenshotStudio;