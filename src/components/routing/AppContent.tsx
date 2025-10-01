
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import MainAppRoutes from '@/routes/MainAppRoutes';
import Auth from '@/pages/Auth';
import BridgeTheGapRoutes from '@/routes/BridgeTheGapRoutes';
import ScreenshotStudio from '@/pages/ScreenshotStudio';

const AppContent = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Screenshot studio only accessible in development */}
        {isDevelopment && <Route path="/_screenshots" element={<ScreenshotStudio />} />}
        {MainAppRoutes()}
        <Route path="/auth" element={<Auth />} />
        {BridgeTheGapRoutes()}
      </Routes>
    </>
  );
};

export default AppContent;
