
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BridgeTheGapIntroScreen from '@/components/bridge-the-gap/BridgeTheGapIntroScreen';
import BridgeTheGapCategoryScreen from '@/components/bridge-the-gap/BridgeTheGapCategoryScreen';
import BridgeTheGapSubCategoryScreen from '@/components/bridge-the-gap/BridgeTheGapSubCategoryScreen';

const BridgeTheGap: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<BridgeTheGapIntroScreen />} />
          <Route path="/categories" element={<BridgeTheGapCategoryScreen />} />
          <Route path="/subcategories/:categoryId" element={<BridgeTheGapSubCategoryScreen />} />
          {/* Future routes for prompts will be added here */}
          <Route path="*" element={<Navigate to="/bridge-the-gap" replace />} />
        </Routes>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default BridgeTheGap;
