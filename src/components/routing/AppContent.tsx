
import React from 'react';
import { Routes } from 'react-router-dom';
import AuthRoutes from '@/routes/AuthRoutes';
import MainAppRoutes from '@/routes/MainAppRoutes';
import BridgeTheGapRoutes from '@/routes/BridgeTheGapRoutes';
import DevRoutes from '@/routes/DevRoutes';

const AppContent = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      {AuthRoutes()}
      
      {/* Main App Routes */}
      {MainAppRoutes()}
      
      {/* Bridge The Gap Routes */}
      {BridgeTheGapRoutes()}
      
      {/* Development Routes */}
      {DevRoutes()}
    </Routes>
  );
};

export default AppContent;
