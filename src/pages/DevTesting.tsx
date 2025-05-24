
import React from 'react';
import DeveloperTestingPanel from '@/components/dev/DeveloperTestingPanel';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const DevTesting = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Developer Testing Environment
          </h1>
          <p className="text-gray-600">
            Test partner functionality and interface syncing without real user accounts
          </p>
        </div>
        
        <DeveloperTestingPanel />
      </main>
      
      <Footer />
    </div>
  );
};

export default DevTesting;
