import React, { useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface TemplateSpec {
  id: string;
  label: string;
  device: 'iphone' | 'ipad';
  width: number; // px
  height: number; // px
}

const iphoneSize: TemplateSpec[] = [
  { id: 'home', label: 'Home / Welcome', device: 'iphone', width: 1290, height: 2796 },
  { id: 'talk', label: "Let's Talk This Out", device: 'iphone', width: 1290, height: 2796 },
  { id: 'rewrite', label: 'Say It Better / Phrase Rewrite', device: 'iphone', width: 1290, height: 2796 },
  { id: 'heshe', label: 'He Said / She Said', device: 'iphone', width: 1290, height: 2796 },
  { id: 'pattern', label: "‘OK but now what?’", device: 'iphone', width: 1290, height: 2796 },
  { id: 'paywall', label: 'Premium paywall / features', device: 'iphone', width: 1290, height: 2796 },
];

const ipadSize: TemplateSpec[] = [
  { id: 'home', label: 'Home / Welcome', device: 'ipad', width: 2048, height: 2732 },
  { id: 'talk', label: "Let's Talk This Out", device: 'ipad', width: 2048, height: 2732 },
  { id: 'rewrite', label: 'Say It Better / Phrase Rewrite', device: 'ipad', width: 2048, height: 2732 },
  { id: 'heshe', label: 'He Said / She Said', device: 'ipad', width: 2048, height: 2732 },
  { id: 'pattern', label: "‘OK but now what?’", device: 'ipad', width: 2048, height: 2732 },
  { id: 'paywall', label: 'Premium paywall / features', device: 'ipad', width: 2048, height: 2732 },
];

const frameClasses = 'relative overflow-hidden rounded-lg border';

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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 bg-[hsl(var(--muted))]">
          <div className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
            {spec.device === 'iphone' ? 'iPhone 6.7”' : 'iPad 12.9”'}
          </div>
          <div className="text-center text-sm font-medium text-[hsl(var(--foreground))] max-w-[85%]">
            {spec.label}
          </div>
          <div className="mt-2 text-[10px] text-[hsl(var(--muted-foreground))] text-center px-4">
            Place screenshot here or use this as a layout guide. Export uses full native size.
          </div>
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

  const exportNode = async (node: HTMLElement, filename: string, pixelRatio = 3) => {
    const dataUrl = await htmlToImage.toPng(node, {
      pixelRatio,
      backgroundColor: 'white',
      cacheBust: true,
      skipFonts: true,
    });
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    saveAs(blob, filename);
  };

  const exportAllZip = async () => {
    const zip = new JSZip();

    // Helper to render a higher-res offscreen version using css scaling
    const renderFullRes = async (refEl: HTMLDivElement | null, spec: TemplateSpec) => {
      if (!refEl) return;
      // Clone node to avoid layout shifts
      const clone = refEl.cloneNode(true) as HTMLElement;
      // Scale up for better text sharpness
      clone.style.width = `${spec.width / 4}px`;
      clone.style.height = `${spec.height / 4}px`;
      clone.style.position = 'fixed';
      clone.style.left = '-99999px';
      document.body.appendChild(clone);

      const dataUrl = await htmlToImage.toPng(clone, {
        pixelRatio: 4,
        backgroundColor: 'white',
        cacheBust: true,
        skipFonts: true,
      });
      document.body.removeChild(clone);
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      return blob;
    };

    // iPhone
    for (let i = 0; i < iphone.length; i++) {
      const spec = iphone[i];
      const el = iphoneRefs.current[i];
      const blob = await renderFullRes(el, spec);
      if (blob) zip.file(`iphone/${String(i + 1).padStart(2, '0')}-${spec.id}.png`, blob);
    }

    // iPad
    for (let i = 0; i < ipad.length; i++) {
      const spec = ipad[i];
      const el = ipadRefs.current[i];
      const blob = await renderFullRes(el, spec);
      if (blob) zip.file(`ipad/${String(i + 1).padStart(2, '0')}-${spec.id}.png`, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'screenshot-templates.zip');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-[hsl(var(--foreground))]">Screenshot Templates</h4>
        <Button variant="outline" size="sm" onClick={exportAllZip}>
          <Download className="h-4 w-4 mr-1" /> Download All (ZIP)
        </Button>
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
                onClick={() => iphoneRefs.current[idx] && exportNode(iphoneRefs.current[idx]!, `iphone-${spec.id}.png`)}
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
                onClick={() => ipadRefs.current[idx] && exportNode(ipadRefs.current[idx]!, `ipad-${spec.id}.png`)}
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
