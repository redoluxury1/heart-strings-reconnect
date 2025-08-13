
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Image as ImageIcon } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ScreenshotTemplates from './ScreenshotTemplates';
import logoDark from '@/assets/logo-dark.png';
const AssetGuide: React.FC = () => {
  const iconSizes = [
    { name: 'App Store', size: '1024x1024', required: true },
    { name: 'iPhone App', size: '60x60 (180x180 @3x)', required: true },
    { name: 'iPhone Settings', size: '29x29 (87x87 @3x)', required: true },
    { name: 'iPhone Spotlight', size: '40x40 (120x120 @3x)', required: true },
    { name: 'iPad App', size: '76x76 (152x152 @2x)', required: false },
    { name: 'iPad Pro App', size: '83.5x83.5 (167x167 @2x)', required: false },
  ];

  const splashScreenSizes = [
    { name: 'iPhone 14 Pro Max', size: '1290x2796' },
    { name: 'iPhone 14 Pro', size: '1179x2556' },
    { name: 'iPhone 14 Plus', size: '1284x2778' },
    { name: 'iPhone 14', size: '1170x2532' },
    { name: 'iPhone SE (3rd gen)', size: '750x1334' },
    { name: 'iPad Pro 12.9"', size: '2048x2732' },
    { name: 'iPad Pro 11"', size: '1668x2388' },
  ];
 
  const handleGenerateIcons = useCallback(async () => {
    try {
      const bgColor = '#2e4059';
      const sizes = [1024, 180, 120, 87, 152, 167];

      // Load logo image
      const loadImage = (src: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      const logo = await loadImage(logoDark);

      // Create base 1024x1024 icon
      const baseCanvas = document.createElement('canvas');
      baseCanvas.width = 1024;
      baseCanvas.height = 1024;
      const baseCtx = baseCanvas.getContext('2d');
      if (!baseCtx) throw new Error('Canvas not supported');

      // Background
      baseCtx.fillStyle = bgColor;
      baseCtx.fillRect(0, 0, baseCanvas.width, baseCanvas.height);

      // Draw centered logo at ~70% width
      const targetWidth = Math.round(baseCanvas.width * 0.7);
      const scale = targetWidth / logo.naturalWidth;
      const targetHeight = Math.round(logo.naturalHeight * scale);
      const x = Math.round((baseCanvas.width - targetWidth) / 2);
      const y = Math.round((baseCanvas.height - targetHeight) / 2);
      baseCtx.imageSmoothingEnabled = true;
      baseCtx.imageSmoothingQuality = 'high';
      baseCtx.drawImage(logo, x, y, targetWidth, targetHeight);

      // Prepare ZIP
      const zip = new JSZip();

      // Helper to get blob from dataURL
      const dataURLToBlob = async (dataUrl: string) => {
        const res = await fetch(dataUrl);
        return await res.blob();
      };

      for (const size of sizes) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        // Fill background (Apple forbids transparency)
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);
        // Draw scaled from base
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(baseCanvas, 0, 0, size, size);

        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const blob = await dataURLToBlob(dataUrl);
        const nameMap: Record<number, string> = {
          1024: 'AppIcon-1024-AppStore.png',
          180: 'AppIcon-180-iPhone-App.png',
          120: 'AppIcon-120-iPhone-Spotlight.png',
          87: 'AppIcon-87-iPhone-Settings.png',
          152: 'AppIcon-152-iPad-App.png',
          167: 'AppIcon-167-iPadPro-App.png',
        };
        zip.file(nameMap[size] || `AppIcon-${size}.png`, blob);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'ios-app-icons.zip');
    } catch (e) {
      console.error('Icon generation failed', e);
      alert('Icon generation failed. Please try again.');
    }
  }, []);
 
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            App Icons Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Master Icon Requirements</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 1024x1024 pixels, PNG format</li>
                <li>• No transparency or alpha channels</li>
                <li>• Square shape (iOS will apply rounded corners)</li>
                <li>• High quality, suitable for App Store display</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Required Icon Sizes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {iconSizes.map((icon, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">{icon.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">{icon.size}</span>
                      {icon.required && <span className="text-xs text-red-600">Required</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://www.appicon.co/', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Icon Generator Tool
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://developer.apple.com/design/human-interface-guidelines/app-icons', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Apple Guidelines
              </Button>
              <Button 
                size="sm"
                onClick={handleGenerateIcons}
                title="Uses current header logo on flat #2e4059 background"
              >
                <Download className="h-4 w-4 mr-1" />
                Generate iOS Icons (ZIP)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Splash Screen Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Design Requirements</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Use your brand colors (current theme: #2e4059)</li>
                <li>• Keep design simple and clean</li>
                <li>• Avoid text that might be cut off</li>
                <li>• Consider safe areas for notched devices</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Key Device Sizes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {splashScreenSizes.map((screen, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">{screen.name}</span>
                    <span className="text-xs text-gray-600">{screen.size}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://www.figma.com/community/file/809712999095718514', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Figma Template
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Screenshot Templates (iPhone + iPad)</CardTitle>
        </CardHeader>
        <CardContent>
          <ScreenshotTemplates />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetGuide;
