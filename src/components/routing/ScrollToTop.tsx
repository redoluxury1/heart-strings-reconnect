
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useLayoutEffect(() => {
    // Immediate scroll
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Fallback with timeout to override layout shifts and other scrolling
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);
  
  return null;
}

export default ScrollToTop;
