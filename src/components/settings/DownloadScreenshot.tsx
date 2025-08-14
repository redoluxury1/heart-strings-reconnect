import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import paywallScreenshot from '@/assets/paywall-screenshot.png';

const DownloadScreenshot: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = paywallScreenshot;
    link.download = 'bridge-paywall-screenshot.png';
    link.click();
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">App Store Paywall Screenshot</h4>
      <div className="border rounded-lg p-4">
        <img 
          src={paywallScreenshot} 
          alt="Paywall Screenshot" 
          className="w-full max-w-xs mx-auto rounded-lg shadow-sm"
        />
        <div className="mt-4 text-center">
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Paywall Screenshot
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadScreenshot;