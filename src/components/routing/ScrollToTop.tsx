
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Changed from 'instant' to 'auto' for better browser compatibility
      });
    });
  }, [pathname]);
  
  return null;
}

export default ScrollToTop;
