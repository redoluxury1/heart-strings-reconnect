
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Multiple approaches to ensure scroll to top works
    
    // Immediate scroll
    window.scrollTo(0, 0);
    
    // Also try with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    // And another one with requestAnimationFrame
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);
  
  return null;
}

export default ScrollToTop;
