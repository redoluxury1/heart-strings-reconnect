import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Camera } from 'lucide-react';
import OnboardingPaywall from '@/components/onboarding/OnboardingPaywall';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

const DownloadScreenshot: React.FC = () => {
  const paywallRef = useRef<HTMLDivElement>(null);

  const captureScreenshot = async () => {
    if (!paywallRef.current) return;

    try {
      // Capture the actual paywall component as PNG
      const dataUrl = await htmlToImage.toPng(paywallRef.current, {
        pixelRatio: 2,
        backgroundColor: '#F8F2F0',
        cacheBust: true,
        width: 1290,
        height: 2796,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });
      
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      saveAs(blob, 'bridge-paywall-appstore-screenshot.png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Real App Store Paywall Screenshot</h4>
      <div className="border rounded-lg p-4">
        {/* Preview of actual paywall */}
        <div className="max-w-xs mx-auto">
          <div 
            ref={paywallRef}
            className="transform scale-[0.2] origin-top-left border rounded-lg overflow-hidden"
            style={{ width: '1290px', height: '2796px' }}
          >
            <OnboardingPaywall 
              onContinue={() => {}} 
              onSkip={() => {}}
            />
          </div>
        </div>
        
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            This captures your actual paywall component at App Store screenshot dimensions (1290x2796)
          </p>
          <Button onClick={captureScreenshot} variant="outline" size="sm">
            <Camera className="h-4 w-4 mr-2" />
            Capture Real Paywall Screenshot
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadScreenshot;