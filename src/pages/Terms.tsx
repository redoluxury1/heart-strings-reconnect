
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContentContainer from '../components/common/ContentContainer';
import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-16">
        <ContentContainer>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-cormorant font-bold text-[#1E2A38] mb-8">Terms of Service</h1>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-lg mb-6">
                Last Updated: May 16, 2025
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Bridge For Couples. These Terms of Service ("Terms") govern your use of our website, 
                mobile application, and services (collectively, the "Services"). By using our Services, you agree 
                to be bound by these Terms.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">2. Using Our Services</h2>
              <p className="mb-4">
                You must follow any policies made available to you within the Services. You may use our Services 
                only as permitted by law. We may suspend or stop providing our Services to you if you do not 
                comply with our terms or policies or if we are investigating suspected misconduct.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">3. Your Account</h2>
              <p className="mb-4">
                To use some of our Services, you may need to create an account. You are responsible for the activity 
                that happens on or through your account. We recommend that you keep your password secure and unique.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">4. Privacy</h2>
              <p className="mb-4">
                Our <Link to="/privacy" className="text-[#D36B4B] hover:underline">Privacy Policy</Link> explains 
                how we treat your personal data and protect your privacy when you use our Services. By using our 
                Services, you agree that we can use such data in accordance with our privacy policy.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">5. Content</h2>
              <p className="mb-4">
                Our Services allow you to upload, submit, store, send or receive content. You retain ownership of 
                any intellectual property rights that you hold in that content. When you upload, submit, store, 
                send or receive content to or through our Services, you give us a worldwide license to use, host, 
                store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly 
                display and distribute such content.
              </p>
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/auth">
                <Button className="rounded-full bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default Terms;
