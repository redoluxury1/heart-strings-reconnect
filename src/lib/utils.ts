
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a shareable image with the quote and logo
 * @param quote The quote to include in the image
 * @returns A data URL of the generated image
 */
export async function generateShareableImage(quote: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    
    // Set canvas dimensions
    canvas.width = 1080;  // Instagram recommended width
    canvas.height = 1080; // Square format for Instagram
    
    // Set background
    ctx.fillStyle = '#f8fafc'; // Light background (slate-50)
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create a border
    ctx.strokeStyle = '#cbd5e1'; // slate-300
    ctx.lineWidth = 10;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    
    // Load logo
    const logo = new Image();
    logo.crossOrigin = 'anonymous';
    logo.src = '/lovable-uploads/8c8b4b4e-6eaf-4c82-a30c-b2969459af89.png';
    
    logo.onload = () => {
      try {
        // Draw the quote text
        ctx.fillStyle = '#0f172a'; // Navy-800 color
        ctx.textAlign = 'center';
        ctx.font = 'bold 48px Cormorant, serif';
        
        // Word wrap the quote
        const words = quote.split(' ');
        let line = '';
        const lines = [];
        const maxWidth = canvas.width - 160; // Padding on both sides
        
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > maxWidth && i > 0) {
            lines.push(line);
            line = words[i] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line);
        
        // Calculate the total height of all the lines
        const lineHeight = 65;
        const totalTextHeight = lines.length * lineHeight;
        
        // Draw each line of text centered in the canvas
        let y = (canvas.height - totalTextHeight) / 2;
        lines.forEach(line => {
          ctx.fillText(line, canvas.width / 2, y);
          y += lineHeight;
        });
        
        // Calculate logo size and position (center bottom)
        const logoWidth = 200;
        const logoHeight = (logoWidth / logo.width) * logo.height;
        const logoX = (canvas.width - logoWidth) / 2;
        const logoY = canvas.height - logoHeight - 80; // 80px from bottom
        
        // Draw the logo
        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
        
        // Add Instagram handle
        ctx.fillStyle = '#64748b'; // Slate-500
        ctx.font = '24px system-ui, sans-serif';
        ctx.fillText('@bridgeforcouplesapp', canvas.width / 2, canvas.height - 40);
        
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };
    
    logo.onerror = () => {
      reject(new Error('Failed to load logo image'));
    };
  });
}
