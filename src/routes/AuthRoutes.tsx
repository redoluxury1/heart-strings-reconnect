
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '@/pages/Auth';
import EmailVerification from '@/pages/EmailVerification';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/verify" element={<EmailVerification />} />
    </Routes>
  );
};

export default AuthRoutes;
