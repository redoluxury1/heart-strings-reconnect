
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload critical images
const preloadImages = [
  "/lovable-uploads/8c8b4b4e-6eaf-4c82-a30c-b2969459af89.png", // Logo
  "/lovable-uploads/43d77678-108c-4565-978c-3afdead85010.png", // Footer logo
  "/lovable-uploads/b5890910-9dea-494b-b8b1-c4e2a38a9578.png", // Pause Phrase
  "/lovable-uploads/27295ce7-ea9f-48d5-b8cc-11ced227583b.png"  // Try Again
];

preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
  img.fetchPriority = "high";
});

createRoot(document.getElementById("root")!).render(<App />);
