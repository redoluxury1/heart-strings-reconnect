import React, { useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Camera } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { createRoot } from 'react-dom/client';

// Import actual working app components
import HomeLanding from '@/components/home/HomeLanding';
import FeatureCardSection from '@/components/mid-fight/FeatureCardSection';
import QuizIntro from '@/components/personality-quiz/QuizIntro';
import OnboardingPaywall from '@/components/onboarding/OnboardingPaywall';
import PartnerInvite from '@/components/onboarding/PartnerInvite';
import SavedRephrases from '@/components/archive/SavedRephrases';

interface TemplateSpec {
  id: string;
  label: string;
  device: 'iphone' | 'ipad';
  width: number; // px
  height: number; // px
}

const iphoneSize: TemplateSpec[] = [
  { id: 'home', label: 'Welcome Home Screen', device: 'iphone', width: 1290, height: 2796 },
  { id: 'mid-fight', label: 'During Conflict Tools', device: 'iphone', width: 1290, height: 2796 },
  { id: 'quiz', label: 'Personality Quiz', device: 'iphone', width: 1290, height: 2796 },
  { id: 'archive', label: 'Saved Progress Archive', device: 'iphone', width: 1290, height: 2796 },
  { id: 'partner', label: 'Partner Connection', device: 'iphone', width: 1290, height: 2796 },
  { id: 'paywall', label: 'Premium Features', device: 'iphone', width: 1290, height: 2796 },
];

const ipadSize: TemplateSpec[] = [
  { id: 'home', label: 'Welcome Home Screen', device: 'ipad', width: 2048, height: 2732 },
  { id: 'mid-fight', label: 'During Conflict Tools', device: 'ipad', width: 2048, height: 2732 },
  { id: 'quiz', label: 'Personality Quiz', device: 'ipad', width: 2048, height: 2732 },
  { id: 'archive', label: 'Saved Progress Archive', device: 'ipad', width: 2048, height: 2732 },
  { id: 'partner', label: 'Partner Connection', device: 'ipad', width: 2048, height: 2732 },
  { id: 'paywall', label: 'Premium Features', device: 'ipad', width: 2048, height: 2732 },
];

const frameClasses = 'relative overflow-hidden rounded-lg border';

// Component renderer for each screen type
const renderScreenComponent = (spec: TemplateSpec) => {
  const baseProps = {
    style: { 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden',
      backgroundColor: '#F8F2F0' 
    }
  };

  switch (spec.id) {
    case 'home':
      return <div {...baseProps}><HomeLanding /></div>;
    case 'mid-fight':
      return <div {...baseProps}><FeatureCardSection selectedFeature={null} toggleFeature={() => {}} /></div>;
    case 'quiz':
      return <div {...baseProps}><QuizIntro onStart={() => {}} /></div>;
    case 'archive':
      return <div {...baseProps}><SavedRephrases /></div>;
    case 'partner':
      return <div {...baseProps}><PartnerInvite onComplete={() => {}} onBack={() => {}} /></div>;
    case 'paywall':
      return <div {...baseProps}><OnboardingPaywall onContinue={() => {}} onSkip={() => {}} /></div>;
    default:
      return (
        <div {...baseProps} className="flex flex-col items-center justify-center gap-2 p-4 bg-[hsl(var(--muted))]">
          <div className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
            {spec.device === 'iphone' ? 'iPhone 6.7"' : 'iPad 12.9"'}
          </div>
          <div className="text-center text-sm font-medium text-[hsl(var(--foreground))] max-w-[85%]">
            {spec.label}
          </div>
        </div>
      );
  }
};

const ScreenshotFrame: React.FC<{ spec: TemplateSpec; refCb: (el: HTMLDivElement | null) => void }> = ({ spec, refCb }) => {
  // Display size for editor; export uses full resolution via pixelRatio
  const displayWidth = spec.device === 'iphone' ? 220 : 260;
  const displayHeight = Math.round((displayWidth * spec.height) / spec.width);

  return (
    <div className="space-y-2">
      <div
        ref={refCb}
        className={frameClasses}
        style={{ width: displayWidth, height: displayHeight, background: 'hsl(var(--background))' }}
      >
        <div style={{ 
          width: '100%', 
          height: '100%', 
          transform: `scale(${displayWidth / spec.width})`,
          transformOrigin: 'top left',
          overflow: 'hidden'
        }}>
          {renderScreenComponent(spec)}
        </div>
      </div>
    </div>
  );
};

const ScreenshotTemplates: React.FC = () => {
  const iphoneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ipadRefs = useRef<Array<HTMLDivElement | null>>([]);

  const iphone = useMemo(() => iphoneSize, []);
  const ipad = useMemo(() => ipadSize, []);

  const exportNode = async (node: HTMLElement, filename: string, spec: TemplateSpec) => {
    // Create a temporary container with exact dimensions
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = `${spec.width}px`;
    tempContainer.style.height = `${spec.height}px`;
    tempContainer.style.backgroundColor = '#F8F2F0';
    tempContainer.style.overflow = 'hidden';
    
    // Create the screen component at full size
    const screenDiv = document.createElement('div');
    screenDiv.style.width = `${spec.width}px`;
    screenDiv.style.height = `${spec.height}px`;
    screenDiv.innerHTML = node.innerHTML;
    
    tempContainer.appendChild(screenDiv);
    document.body.appendChild(tempContainer);

    try {
      const dataUrl = await htmlToImage.toPng(tempContainer, {
        width: spec.width,
        height: spec.height,
        pixelRatio: 1,
        backgroundColor: '#F8F2F0',
        cacheBust: true,
        skipFonts: true,
      });
      
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      saveAs(blob, filename);
    } finally {
      document.body.removeChild(tempContainer);
    }
  };

  const exportAllRealScreenshots = async () => {
    const zip = new JSZip();

    const captureSpec = async (spec: TemplateSpec) => {
      // Offscreen exact-size container
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = `${spec.width}px`;
      tempContainer.style.height = `${spec.height}px`;
      tempContainer.style.backgroundColor = '#F8F2F0';
      tempContainer.style.overflow = 'hidden';
      tempContainer.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

      const mount = document.createElement('div');
      mount.style.width = `${spec.width}px`;
      mount.style.height = `${spec.height}px`;
      tempContainer.appendChild(mount);
      document.body.appendChild(tempContainer);

      const root = createRoot(mount);
      root.render(
        <div style={{ width: spec.width, height: spec.height, background: '#F8F2F0' }}>
          {renderScreenComponent(spec)}
        </div>
      );

      // Give React a tick to render
      await new Promise((r) => setTimeout(r, 80));

      try {
        const dataUrl = await htmlToImage.toPng(tempContainer, {
          width: spec.width,
          height: spec.height,
          pixelRatio: 1,
          backgroundColor: '#F8F2F0',
          cacheBust: true,
          skipFonts: true,
        });
        const res = await fetch(dataUrl);
        return await res.blob();
      } finally {
        root.unmount();
        document.body.removeChild(tempContainer);
      }
    };

    // iPhone
    for (const spec of iphone) {
      const blob = await captureSpec(spec);
      if (blob) zip.file(`iphone/${spec.id}-${spec.width}x${spec.height}.png`, blob);
    }

    // iPad
    for (const spec of ipad) {
      const blob = await captureSpec(spec);
      if (blob) zip.file(`ipad/${spec.id}-${spec.width}x${spec.height}.png`, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'bridge-app-screenshots.zip');
  };

  const exportAllZip = async () => {
    const zip = new JSZip();

    // Helper to capture actual screenshots at full resolution
    const captureFullResScreenshot = async (spec: TemplateSpec) => {
      // Create a temporary container with exact App Store dimensions
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = `${spec.width}px`;
      tempContainer.style.height = `${spec.height}px`;
      tempContainer.style.backgroundColor = '#F8F2F0';
      tempContainer.style.overflow = 'hidden';
      tempContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      // Create a React container and render the component
      const componentDiv = document.createElement('div');
      componentDiv.style.width = `${spec.width}px`;
      componentDiv.style.height = `${spec.height}px`;
      
      // Create the component content based on spec type
      const reactContainer = document.createElement('div');
      reactContainer.style.width = `${spec.width}px`;
      reactContainer.style.height = `${spec.height}px`;
      reactContainer.innerHTML = `
        <div style="width: ${spec.width}px; height: ${spec.height}px; background: #F8F2F0; display: flex; align-items: center; justify-content: center; font-family: system-ui;">
          <div style="text-align: center; color: #2e4059;">
            <h2 style="font-size: 32px; margin-bottom: 16px;">${spec.label}</h2>
            <p style="font-size: 18px; opacity: 0.8;">${spec.device === 'iphone' ? 'iPhone 6.7"' : 'iPad 12.9"'} (${spec.width}×${spec.height})</p>
          </div>
        </div>
      `;
      
      tempContainer.appendChild(reactContainer);
      document.body.appendChild(tempContainer);

      try {
        const dataUrl = await htmlToImage.toPng(tempContainer, {
          width: spec.width,
          height: spec.height,
          pixelRatio: 1,
          backgroundColor: '#F8F2F0',
          cacheBust: true,
          skipFonts: true,
        });
        
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        return blob;
      } finally {
        document.body.removeChild(tempContainer);
      }
    };

    // iPhone screenshots
    for (let i = 0; i < iphone.length; i++) {
      const spec = iphone[i];
      const blob = await captureFullResScreenshot(spec);
      if (blob) zip.file(`iphone/${String(i + 1).padStart(2, '0')}-${spec.id}-${spec.width}x${spec.height}.png`, blob);
    }

    // iPad screenshots  
    for (let i = 0; i < ipad.length; i++) {
      const spec = ipad[i];
      const blob = await captureFullResScreenshot(spec);
      if (blob) zip.file(`ipad/${String(i + 1).padStart(2, '0')}-${spec.id}-${spec.width}x${spec.height}.png`, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'app-store-screenshots.zip');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-[hsl(var(--foreground))]">Screenshot Templates</h4>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportAllRealScreenshots}>
            <Camera className="h-4 w-4 mr-1" /> Download Real Screenshots
          </Button>
          <Button variant="outline" size="sm" onClick={exportAllZip}>
            <Download className="h-4 w-4 mr-1" /> Download Templates
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {iphone.map((spec, idx) => (
          <Card key={`iphone-${spec.id}`}>
            <CardHeader>
              <CardTitle className="text-xs">iPhone — {spec.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <ScreenshotFrame
                spec={spec}
                refCb={(el) => (iphoneRefs.current[idx] = el)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => iphoneRefs.current[idx] && exportNode(iphoneRefs.current[idx]!, `iphone-${spec.id}-${spec.width}x${spec.height}.png`, spec)}
              >
                <Download className="h-4 w-4 mr-1" /> PNG
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {ipad.map((spec, idx) => (
          <Card key={`ipad-${spec.id}`}>
            <CardHeader>
              <CardTitle className="text-xs">iPad — {spec.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <ScreenshotFrame
                spec={spec}
                refCb={(el) => (ipadRefs.current[idx] = el)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => ipadRefs.current[idx] && exportNode(ipadRefs.current[idx]!, `ipad-${spec.id}-${spec.width}x${spec.height}.png`, spec)}
              >
                <Download className="h-4 w-4 mr-1" /> PNG
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScreenshotTemplates;