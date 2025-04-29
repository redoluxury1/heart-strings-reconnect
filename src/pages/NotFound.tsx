
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContentContainer from '../components/common/ContentContainer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <ContentContainer>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-cormorant font-semibold mb-4">Page Not Found</h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/" 
              className="inline-block primary-btn"
            >
              Return Home
            </Link>
          </div>
        </ContentContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
