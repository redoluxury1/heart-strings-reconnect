
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Image } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Image className="h-5 w-5 mr-2" />
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
    </div>
  );
};

export default AssetGuide;
