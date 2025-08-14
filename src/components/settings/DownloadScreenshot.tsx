import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Camera } from 'lucide-react';
import OnboardingPaywall from '@/components/onboarding/OnboardingPaywall';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

const DownloadScreenshot: React.FC = () => {
  const paywallRef = useRef<HTMLDivElement>(null);

  const captureScreenshot = async (deviceType: 'iphone67' | 'iphone65' | 'iphone55') => {
    if (!paywallRef.current) return;

    // App Store Connect exact requirements
    const dimensions = {
      iphone67: { width: 1290, height: 2796, name: 'iPhone 6.7"' }, // iPhone 14 Pro Max, 15 Pro Max
      iphone65: { width: 1284, height: 2778, name: 'iPhone 6.5"' }, // iPhone 11 Pro Max, XS Max  
      iphone55: { width: 1242, height: 2208, name: 'iPhone 5.5"' }  // iPhone 8 Plus
    };

    const { width, height, name } = dimensions[deviceType];

    try {
      // Create a temporary container with exact dimensions
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = `${width}px`;
      tempContainer.style.height = `${height}px`;
      tempContainer.style.backgroundColor = '#F8F2F0';
      tempContainer.style.overflow = 'hidden';
      
      // Clone the paywall component
      const clone = paywallRef.current.cloneNode(true) as HTMLElement;
      clone.style.width = `${width}px`;
      clone.style.height = `${height}px`;
      clone.style.transform = 'scale(1)';
      clone.style.transformOrigin = 'top left';
      
      tempContainer.appendChild(clone);
      document.body.appendChild(tempContainer);

      // Capture at exact dimensions
      const dataUrl = await htmlToImage.toPng(tempContainer, {
        width,
        height,
        pixelRatio: 1,
        backgroundColor: '#F8F2F0',
        cacheBust: true,
      });
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      saveAs(blob, `bridge-paywall-${deviceType}-${width}x${height}.png`);
      
      console.log(`Screenshot captured: ${width}x${height} for ${name}`);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">App Store Screenshots</h4>
      <div className="border rounded-lg p-4">
        {/* Hidden paywall for capture */}
        <div className="hidden">
          <div ref={paywallRef}>
            <OnboardingPaywall 
              onContinue={() => {}} 
              onSkip={() => {}}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Choose the iPhone size that matches your App Store Connect requirements:
          </p>
          
          <div className="grid gap-2">
            <Button 
              onClick={() => captureScreenshot('iphone67')} 
              variant="outline" 
              size="sm"
              className="justify-start"
            >
              <Camera className="h-4 w-4 mr-2" />
              iPhone 6.7" (1290×2796) - iPhone 14/15 Pro Max
            </Button>
            
            <Button 
              onClick={() => captureScreenshot('iphone65')} 
              variant="outline" 
              size="sm"
              className="justify-start"
            >
              <Camera className="h-4 w-4 mr-2" />
              iPhone 6.5" (1284×2778) - iPhone 11/XS Pro Max
            </Button>
            
            <Button 
              onClick={() => captureScreenshot('iphone55')} 
              variant="outline" 
              size="sm"
              className="justify-start"
            >
              <Camera className="h-4 w-4 mr-2" />
              iPhone 5.5" (1242×2208) - iPhone 8 Plus
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            These match Apple's exact App Store Connect screenshot requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadScreenshot;