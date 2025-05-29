
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import MainAppRoutes from '@/routes/MainAppRoutes';
import AuthRoutes from '@/routes/AuthRoutes';
import BridgeTheGapRoutes from '@/routes/BridgeTheGapRoutes';

const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {MainAppRoutes()}
        <Route path="/auth/*" element={<AuthRoutes />} />
        {BridgeTheGapRoutes()}
      </Routes>
    </>
  );
};

export default AppContent;
